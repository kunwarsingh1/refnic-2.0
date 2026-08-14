import { google } from "googleapis";
import type { Block, BlogPost } from "@/lib/content/blog";
import { slugify } from "@/lib/blogShared";

const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const SHEET_NAME = "Posts";
const HEADERS = [
  "id",
  "title",
  "slug",
  "excerpt",
  "cover_image",
  "content",
  "published",
  "created_at",
  "updated_at",
  "deleted",
  "status",
  "author",
];
const LEADS_SHEET_NAME = "Leads";
const LEADS_HEADERS = ["email", "post_slug", "pdf_url", "created_at"];

function getSpreadsheetId(): string {
  const id = process.env.GOOGLE_SHEETS_ID;
  if (!id) throw new Error("GOOGLE_SHEETS_ID is not set.");
  return id;
}

function getSheets() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not set.");

  const trimmed = raw.trim();
  const decoded = trimmed.startsWith("{")
    ? trimmed
    : Buffer.from(trimmed, "base64").toString("utf8");

  let creds: unknown;
  try {
    creds = JSON.parse(decoded);
  } catch {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_KEY is not a valid service-account JSON. Paste the raw JSON key file, or its base64.",
    );
  }

  const { client_email, private_key } = creds as {
    client_email?: string;
    private_key?: string;
  };
  if (!client_email || !private_key) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_KEY is missing client_email or private_key.",
    );
  }

  const auth = new google.auth.JWT({
    email: client_email,
    key: private_key,
    scopes: [SCOPE],
  });

  return google.sheets({ version: "v4", auth });
}

function columnLetter(n: number): string {
  let out = "";
  while (n > 0) {
    const rem = (n - 1) % 26;
    out = String.fromCharCode(65 + rem) + out;
    n = Math.floor((n - 1) / 26);
  }
  return out;
}

async function ensureSheet(): Promise<void> {
  const sheets = getSheets();
  const spreadsheetId = getSpreadsheetId();
  const range = `'${SHEET_NAME}'!A1:${columnLetter(HEADERS.length)}1`;

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const first = res.data.values?.[0];
    if (first && first.length >= HEADERS.length) return;
  } catch {
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: SHEET_NAME } } }],
        },
      });
    } catch {
      // Sheet likely already exists; continue to header write below.
    }
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values: [HEADERS] },
  });
}

function rowToPost(row: string[], rowNumber: number): BlogPost {
  const get = (i: number) => row[i]?.trim() ?? "";
  let content: Block[] = [];
  try {
    const parsed = JSON.parse(get(5));
    if (Array.isArray(parsed)) content = parsed;
  } catch {
    content = [];
  }
  const published = get(6).toLowerCase() === "true";
  const rawStatus = get(10).toLowerCase();
  return {
    id: get(0),
    title: get(1),
    slug: get(2),
    excerpt: get(3) || null,
    coverImageUrl: get(4) || null,
    content,
    published,
    status:
      rawStatus === "approved" || rawStatus === "pending" || rawStatus === "rejected"
        ? rawStatus
        : published
          ? "approved"
          : "pending",
    createdAt: get(7),
    updatedAt: get(8) || get(7),
    deleted: get(9).toLowerCase() === "true",
    row: rowNumber,
    author: get(11),
  };
}

async function readPosts(options: { publishedOnly: boolean }): Promise<BlogPost[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSpreadsheetId(),
    range: `'${SHEET_NAME}'!A:L`,
  });
  const rows = res.data.values ?? [];
  const posts: BlogPost[] = [];
  for (let i = 1; i < rows.length; i++) {
    const post = rowToPost(rows[i], i + 1);
    if (!post.slug) continue;
    if (post.deleted) continue;
    if (options.publishedOnly && !post.published) continue;
    posts.push(post);
  }
  return posts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    return await readPosts({ publishedOnly: true });
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    return await readPosts({ publishedOnly: false });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getPostByRow(row: number): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.row === row) ?? null;
}

export type NewPost = {
  title: string;
  excerpt: string;
  coverImage: string;
  content: Block[];
  published: boolean;
  author?: string;
};

export async function appendPost(
  input: NewPost,
): Promise<{ slug: string; row: number; id: string }> {
  const sheets = getSheets();
  const spreadsheetId = getSpreadsheetId();
  await ensureSheet();

  const now = new Date().toISOString();
  const id = crypto.randomUUID();
  let slug = slugify(input.title) || `post-${Date.now()}`;

  const existing = await getAllPosts();
  if (existing.some((p) => p.slug === slug)) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const rowValues = [
    id,
    input.title,
    slug,
    input.excerpt,
    input.coverImage,
    JSON.stringify(input.content),
    "false", // published — hidden until approved
    now,
    now,
    "false", // deleted
    "pending", // status — awaiting approval
    input.author ?? "",
  ];

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${SHEET_NAME}'!A:L`,
    valueInputOption: "RAW",
    requestBody: { values: [rowValues] },
  });

  const range = res.data.updates?.updatedRange ?? "";
  const match = range.match(/(\d+)$/);
  const row = match ? Number(match[1]) : NaN;
  if (!Number.isInteger(row) || row < 2) {
    throw new Error("Could not determine where the post was saved.");
  }

  return { slug, row, id };
}

export async function updatePost(
  input: NewPost,
  row: number,
): Promise<{ slug: string; previousStatus: BlogPost["status"] }> {
  const sheets = getSheets();
  const spreadsheetId = getSpreadsheetId();
  await ensureSheet();

  const existingRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${SHEET_NAME}'!A${row}:L${row}`,
  });
  const existing = existingRes.data.values?.[0];
  if (!existing || existing.length < 9) {
    throw new Error("Could not find the post to edit.");
  }

  const now = new Date().toISOString();
  const slug = existing[2].trim() || "post";
  const rawStatus = existing[10]?.trim().toLowerCase();
  const wasPublished = existing[6]?.trim().toLowerCase() === "true";
  const previousStatus: BlogPost["status"] =
    rawStatus === "approved" || rawStatus === "rejected"
      ? rawStatus
      : wasPublished
        ? "approved"
        : "pending";

  const updated = [
    existing[0], // id — keep
    input.title,
    slug, // slug — keep, so blog URLs stay stable
    input.excerpt,
    input.coverImage,
    JSON.stringify(input.content),
    "false", // published — edits are hidden until re-approved
    existing[7], // created_at — keep
    now,
    existing[9]?.trim() || "false", // deleted — keep
    "pending", // status — needs approval again
    input.author ?? "",
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${SHEET_NAME}'!A${row}:L${row}`,
    valueInputOption: "RAW",
    requestBody: { values: [updated] },
  });

  return { slug, previousStatus };
}

export async function deletePost(row: number): Promise<void> {
  const sheets = getSheets();
  const spreadsheetId = getSpreadsheetId();

  const existingRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${SHEET_NAME}'!A${row}:L${row}`,
  });
  const existing = existingRes.data.values?.[0];
  if (!existing || existing.length < 9) {
    throw new Error("Could not find the post to delete.");
  }

  const softDeleted = [
    existing[0], // id — keep
    existing[1], // title — keep
    existing[2], // slug — keep
    existing[3] ?? "", // excerpt — keep
    existing[4] ?? "", // cover_image — keep
    existing[5] ?? "", // content — keep
    "false", // published — hide from the blog
    existing[7] ?? "", // created_at — keep
    new Date().toISOString(), // updated_at
    "true", // deleted — marked, but the row stays in the sheet
    existing[10]?.trim() || "pending", // status — keep
    existing[11] ?? "", // author — keep
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${SHEET_NAME}'!A${row}:L${row}`,
    valueInputOption: "RAW",
    requestBody: { values: [softDeleted] },
  });
}

export async function approvePost(row: number): Promise<{ slug: string }> {
  const sheets = getSheets();
  const spreadsheetId = getSpreadsheetId();

  const existingRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${SHEET_NAME}'!A${row}:L${row}`,
  });
  const existing = existingRes.data.values?.[0];
  if (!existing || existing.length < 9) {
    throw new Error("Could not find the post to approve.");
  }

  const slug = existing[2].trim();
  if (!slug) {
    throw new Error("Could not find the post to approve.");
  }

  const approved = [
    existing[0], // id — keep
    existing[1], // title — keep
    existing[2], // slug — keep
    existing[3] ?? "", // excerpt — keep
    existing[4] ?? "", // cover_image — keep
    existing[5] ?? "", // content — keep
    "true", // published — now visible to everyone
    existing[7] ?? "", // created_at — keep
    new Date().toISOString(), // updated_at
    existing[9]?.trim() || "false", // deleted — keep
    "approved", // status
    existing[11] ?? "", // author — keep
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${SHEET_NAME}'!A${row}:L${row}`,
    valueInputOption: "RAW",
    requestBody: { values: [approved] },
  });

  return { slug };
}

export async function rejectPost(row: number): Promise<{ slug: string }> {
  const sheets = getSheets();
  const spreadsheetId = getSpreadsheetId();

  const existingRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${SHEET_NAME}'!A${row}:L${row}`,
  });
  const existing = existingRes.data.values?.[0];
  if (!existing || existing.length < 9) {
    throw new Error("Could not find the post to reject.");
  }

  const slug = existing[2].trim();
  if (!slug) {
    throw new Error("Could not find the post to reject.");
  }

  const rejected = [
    existing[0], // id — keep
    existing[1], // title — keep
    existing[2], // slug — keep
    existing[3] ?? "", // excerpt — keep
    existing[4] ?? "", // cover_image — keep
    existing[5] ?? "", // content — keep
    "false", // published — stays private
    existing[7] ?? "", // created_at — keep
    new Date().toISOString(), // updated_at
    existing[9]?.trim() || "false", // deleted — keep
    "rejected", // status
    existing[11] ?? "", // author — keep
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `'${SHEET_NAME}'!A${row}:L${row}`,
    valueInputOption: "RAW",
    requestBody: { values: [rejected] },
  });

  return { slug };
}

async function ensureLeadsSheet(): Promise<void> {
  const sheets = getSheets();
  const spreadsheetId = getSpreadsheetId();
  const range = `'${LEADS_SHEET_NAME}'!A1:${columnLetter(LEADS_HEADERS.length)}1`;

  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const first = res.data.values?.[0];
    if (first && first.length >= LEADS_HEADERS.length) return;
  } catch {
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: LEADS_SHEET_NAME } } }],
        },
      });
    } catch {
      // Sheet likely already exists; continue to header write below.
    }
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values: [LEADS_HEADERS] },
  });
}

export type Lead = {
  email: string;
  postSlug: string;
  pdfUrl: string;
};

export async function appendLead(input: Lead): Promise<void> {
  const sheets = getSheets();
  const spreadsheetId = getSpreadsheetId();
  await ensureLeadsSheet();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${LEADS_SHEET_NAME}'!A:D`,
    valueInputOption: "RAW",
    requestBody: {
      values: [[input.email, input.postSlug, input.pdfUrl, new Date().toISOString()]],
    },
  });
}
