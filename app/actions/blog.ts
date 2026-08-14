"use server";

import { getAdminEmail, isAdmin } from "@/lib/admin-auth";
import {
  appendPost,
  approvePost,
  deletePost,
  rejectPost,
  updatePost,
  type NewPost,
} from "@/lib/sheets";
import { upsertPostByRow, deletePostByRow, getPostByRow, type PostStatus } from "@/lib/content/blog";
import { createApprovalToken, verifyApprovalToken } from "@/lib/approve";
import { sendApprovalEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";

export type PublishResult = {
  ok: boolean;
  error?: string;
};

async function normalize(input: NewPost): Promise<NewPost & { author: string }> {
  const title = input.title.trim();
  if (!title) throw new Error("A title is required.");
  return {
    title,
    excerpt: input.excerpt.trim(),
    coverImage: input.coverImage,
    content: Array.isArray(input.content) ? input.content : [],
    published: false,
    author: input.author || (await getAdminEmail()),
  };
}

function approvalEmailInput(post: NewPost & { author: string }, row: number, slug: string) {
  const baseUrl = (process.env.APP_URL ?? "").replace(/\/$/, "");
  const token = createApprovalToken(row, slug);
  return {
    to: process.env.CEO_EMAIL ?? "",
    from: process.env.SUPPORT_EMAIL ?? "",
    postTitle: post.title,
    author: post.author,
    approveUrl: `${baseUrl}/approve/${encodeURIComponent(token)}`,
  };
}

async function mirrorToMongo(
  row: number,
  postId: string,
  data: NewPost & { author: string },
  status: PostStatus,
  slug: string,
  createdAt: string,
): Promise<void> {
  const now = new Date().toISOString();
  await upsertPostByRow({
    row,
    postId,
    title: data.title,
    slug,
    excerpt: data.excerpt || null,
    coverImageUrl: data.coverImage || null,
    content: data.content,
    published: status === "approved",
    status,
    author: data.author,
    createdAt,
    updatedAt: now,
    deleted: false,
  });
}

export async function publishPost(input: NewPost): Promise<PublishResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "You must be signed in as admin." };
  }

  try {
    const data = await normalize(input);
    const now = new Date().toISOString();
    const { slug, row, id } = await appendPost(data);

    try {
      await mirrorToMongo(row, id, data, "pending", slug, now);
    } catch {
      return {
        ok: false,
        error: "The post was saved to Google Sheets but could not be synced to MongoDB.",
      };
    }

    try {
      await sendApprovalEmail(approvalEmailInput(data, row, slug));
    } catch (err) {
      const detail = err instanceof Error ? err.message : "";
      return {
        ok: false,
        error: `The post was saved but the approval email could not be sent${
          detail ? `: ${detail}` : ""
        }. Approve it via the emailed link instead.`,
      };
    }

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not save the post.",
    };
  }
}

export async function updatePostAction(input: NewPost, row: number): Promise<PublishResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "You must be signed in as admin." };
  }

  if (!Number.isInteger(row) || row < 2) {
    return { ok: false, error: "Invalid post to edit." };
  }

  try {
    const data = await normalize(input);
    const { slug, previousStatus } = await updatePost(data, row);
    const existing = await getPostByRow(row);

    try {
      await mirrorToMongo(row, existing?.id ?? "", data, "pending", slug, existing?.createdAt ?? new Date().toISOString());
    } catch {
      return {
        ok: false,
        error: "The post was updated in Google Sheets but could not be synced to MongoDB.",
      };
    }

    if (previousStatus !== "pending") {
      try {
        await sendApprovalEmail(approvalEmailInput(data, row, slug));
      } catch (err) {
        const detail = err instanceof Error ? err.message : "";
        return {
          ok: false,
          error: `The post was updated but the approval email could not be sent${
            detail ? `: ${detail}` : ""
          }. Approve it via the emailed link instead.`,
        };
      }
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not update the post.",
    };
  }
}

async function setStatusByRow(row: number, status: "approved" | "rejected"): Promise<PublishResult> {
  try {
    const { slug } = status === "approved" ? await approvePost(row) : await rejectPost(row);
    const existing = await getPostByRow(row);
    if (existing) {
      await upsertPostByRow({
        row,
        postId: existing.id,
        title: existing.title,
        slug,
        excerpt: existing.excerpt,
        coverImageUrl: existing.coverImageUrl,
        content: existing.content,
        published: status === "approved",
        status,
        author: existing.author,
        createdAt: existing.createdAt,
        updatedAt: new Date().toISOString(),
        deleted: false,
      });
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : `Could not ${status === "approved" ? "approve" : "reject"} the post.`,
    };
  }
}

export async function approveByToken(token: string): Promise<PublishResult> {
  const parsed = verifyApprovalToken(token);
  if (!parsed) {
    return { ok: false, error: "This approval link is invalid or has been tampered with." };
  }
  return setStatusByRow(parsed.row, "approved");
}

export async function rejectByToken(token: string): Promise<PublishResult> {
  const parsed = verifyApprovalToken(token);
  if (!parsed) {
    return { ok: false, error: "This approval link is invalid or has been tampered with." };
  }
  return setStatusByRow(parsed.row, "rejected");
}

export async function deletePostAction(row: number): Promise<PublishResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "You must be signed in as admin." };
  }

  if (!Number.isInteger(row) || row < 2) {
    return { ok: false, error: "Invalid post to delete." };
  }

  try {
    await deletePost(row);

    try {
      await deletePostByRow(row);
    } catch {
      return {
        ok: false,
        error: "The post was deleted from Google Sheets but could not be synced to MongoDB.",
      };
    }

    revalidatePath("/blog");
    revalidatePath("/admin/blog");
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not delete the post.",
    };
  }
}
