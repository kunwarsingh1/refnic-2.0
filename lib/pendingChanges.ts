import { ObjectId, type Collection } from "mongodb";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/mongo";
import { createChangeToken, verifyChangeToken } from "@/lib/changeToken";
import { applyChange } from "@/lib/changeRegistry";

const COLLECTION = "pendingChanges";

export type ContentType =
  | "cards"
  | "caseStudies"
  | "processSteps"
  | "pillars"
  | "pillarsSection"
  | "introCards"
  | "newsletter"
  | "newsletterTabs"
  | "productCategories"
  | "productCatalog"
  | "solutionsCatalog"
  | "servicesCatalog"
  | "sustainabilityCatalog"
  | "resourcesCatalog"
  | "stats"
  | "footer"
  | "navbar"
  | "caseStudyPage"
  | "careerPage"
  | "contactPage"
  | "globalMarketPage"
  | "indianMarketPage"
  | "investorsPage"
  | "ourStoryPage"
  | "productsPage"
  | "solutionsPage"
  | "sustainabilityPage"
  | "technologiesPage"
  | "newsletterPage"
  | "servicesPage"
  | "resourcesPage"
  | "digitalToolsPage"
  | "whitePapersPage"
  | "productsDirectoryPage";

export type Operation = "create" | "update" | "delete" | "reorder";

export type ChangeStatus = "pending" | "approved" | "rejected";

type PendingChangeDoc = {
  _id: ObjectId;
  contentType: ContentType;
  operation: Operation;
  args: unknown;
  previousArgs: unknown;
  label: string;
  submittedBy: string;
  submittedAt: string;
  status: ChangeStatus;
  resolvedAt: string | null;
  token: string;
  emailSent: boolean;
  publicRevalidatePaths: string[];
};

export type PendingChange = {
  id: string;
  contentType: ContentType;
  operation: Operation;
  args: unknown;
  previousArgs: unknown;
  label: string;
  submittedBy: string;
  submittedAt: string;
  status: ChangeStatus;
  resolvedAt: string | null;
  token: string;
  emailSent: boolean;
  publicRevalidatePaths: string[];
};

async function getCollection(): Promise<Collection<PendingChangeDoc>> {
  const db = await getDb();
  return db.collection<PendingChangeDoc>(COLLECTION);
}

function toPendingChange(doc: PendingChangeDoc): PendingChange {
  return {
    id: doc._id.toHexString(),
    contentType: doc.contentType,
    operation: doc.operation,
    args: doc.args,
    previousArgs: doc.previousArgs,
    label: doc.label,
    submittedBy: doc.submittedBy,
    submittedAt: doc.submittedAt,
    status: doc.status,
    resolvedAt: doc.resolvedAt,
    token: doc.token,
    emailSent: doc.emailSent,
    publicRevalidatePaths: doc.publicRevalidatePaths,
  };
}

export type SubmitChangeInput = {
  contentType: ContentType;
  operation: Operation;
  args?: unknown;
  previousArgs?: unknown;
  label: string;
  submittedBy: string;
  publicRevalidatePaths: string[];
};

export async function submitChange(input: SubmitChangeInput): Promise<{ id: string; token: string }> {
  const col = await getCollection();
  const id = new ObjectId();
  const token = createChangeToken(id.toHexString());
  const now = new Date().toISOString();

  const doc: PendingChangeDoc = {
    _id: id,
    contentType: input.contentType,
    operation: input.operation,
    args: input.args ?? null,
    previousArgs: input.previousArgs ?? null,
    label: input.label,
    submittedBy: input.submittedBy,
    submittedAt: now,
    status: "approved",
    resolvedAt: now,
    token,
    emailSent: false,
    publicRevalidatePaths: input.publicRevalidatePaths,
  };

  await col.insertOne(doc);

  try {
    await applyChange(toPendingChange(doc));
  } catch (err) {
    console.error(`Failed to apply change "${input.label}":`, err);
  }

  for (const path of input.publicRevalidatePaths) {
    // "/" is revalidated layout-wide since site-chrome content (footer, navbar)
    // is rendered per-page rather than from the root layout, so a plain
    // page-level revalidation of "/" alone would miss every other route.
    if (path === "/") {
      revalidatePath("/", "layout");
    } else {
      revalidatePath(path);
    }
  }

  return { id: id.toHexString(), token };
}

export async function getChangeById(id: string): Promise<PendingChange | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toPendingChange(doc) : null;
  } catch {
    return null;
  }
}

export async function getChangeByToken(token: string): Promise<PendingChange | null> {
  const id = verifyChangeToken(token);
  if (!id) return null;
  return getChangeById(id);
}

export async function listPendingChanges(): Promise<PendingChange[]> {
  try {
    const col = await getCollection();
    const docs = await col.find({ status: "pending" }).sort({ submittedAt: -1 }).toArray();
    return docs.map(toPendingChange);
  } catch {
    return [];
  }
}

export async function resolveChange(id: string, status: "approved" | "rejected"): Promise<void> {
  const col = await getCollection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status, resolvedAt: new Date().toISOString() } },
  );
}
