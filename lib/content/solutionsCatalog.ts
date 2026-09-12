import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";
import type { NarrativeSection } from "@/lib/content/solutionsPage";

const COLLECTION = "solutionsCatalogItems";

type SolutionCatalogItemDoc = {
  _id: ObjectId;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  cardImageUrl?: string;
  heroBody: string;
  heroImageUrl?: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  narrativeSections: NarrativeSection[];
  closingHeading: string;
  closingBody: string;
  closingImageUrl?: string;
  closingCtaLabel: string;
  closingCtaHref: string;
  order: number;
};

export type SolutionCatalogItem = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  cardImageUrl?: string;
  heroBody: string;
  heroImageUrl?: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  narrativeSections: NarrativeSection[];
  closingHeading: string;
  closingBody: string;
  closingImageUrl?: string;
  closingCtaLabel: string;
  closingCtaHref: string;
  order: number;
};

export type SolutionCatalogItemInput = {
  category: string;
  title: string;
  excerpt: string;
  cardImageUrl?: string;
  heroBody: string;
  heroImageUrl?: string;
  heroCtaLabel: string;
  heroCtaHref: string;
  narrativeSections: NarrativeSection[];
  closingHeading: string;
  closingBody: string;
  closingImageUrl?: string;
  closingCtaLabel: string;
  closingCtaHref: string;
};

async function getCollection(): Promise<Collection<SolutionCatalogItemDoc>> {
  const db = await getDb();
  return db.collection<SolutionCatalogItemDoc>(COLLECTION);
}

function toItem(doc: SolutionCatalogItemDoc): SolutionCatalogItem {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    category: doc.category,
    title: doc.title,
    excerpt: doc.excerpt,
    cardImageUrl: doc.cardImageUrl,
    heroBody: doc.heroBody,
    heroImageUrl: doc.heroImageUrl,
    heroCtaLabel: doc.heroCtaLabel,
    heroCtaHref: doc.heroCtaHref,
    narrativeSections: doc.narrativeSections ?? [],
    closingHeading: doc.closingHeading,
    closingBody: doc.closingBody,
    closingImageUrl: doc.closingImageUrl,
    closingCtaLabel: doc.closingCtaLabel,
    closingCtaHref: doc.closingCtaHref,
    order: doc.order ?? 0,
  };
}

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "solution"
  );
}

async function uniqueSlug(
  col: Collection<SolutionCatalogItemDoc>,
  title: string,
  excludeId?: ObjectId,
): Promise<string> {
  const base = slugify(title);
  let slug = base;
  let n = 2;
  while (await col.findOne({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export async function getSolutionCatalogItems(): Promise<SolutionCatalogItem[]> {
  try {
    const col = await getCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return docs.map(toItem);
  } catch {
    return [];
  }
}

export async function getSolutionCatalogItemBySlug(slug: string): Promise<SolutionCatalogItem | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ slug });
    return doc ? toItem(doc) : null;
  } catch {
    return null;
  }
}

export async function getSolutionCatalogItemById(id: string): Promise<SolutionCatalogItem | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toItem(doc) : null;
  } catch {
    return null;
  }
}

export async function createSolutionCatalogItem(input: SolutionCatalogItemInput): Promise<void> {
  const col = await getCollection();
  const count = await col.countDocuments({});
  const slug = await uniqueSlug(col, input.title);
  await col.insertOne({
    _id: new ObjectId(),
    slug,
    ...input,
    order: count,
  });
}

export async function updateSolutionCatalogItem(
  id: string,
  input: SolutionCatalogItemInput,
): Promise<void> {
  const col = await getCollection();
  const objectId = new ObjectId(id);
  const existing = await col.findOne({ _id: objectId });
  const slug =
    existing && existing.title === input.title ? existing.slug : await uniqueSlug(col, input.title, objectId);
  await col.updateOne({ _id: objectId }, { $set: { slug, ...input } });
}

export async function deleteSolutionCatalogItem(id: string): Promise<void> {
  const col = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderSolutionCatalogItem(id: string, direction: "up" | "down"): Promise<void> {
  const col = await getCollection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  if (!doc) return;

  const neighbor = await col.findOne(
    direction === "up" ? { order: { $lt: doc.order } } : { order: { $gt: doc.order } },
    { sort: { order: direction === "up" ? -1 : 1 } },
  );
  if (!neighbor) return;

  await col.updateOne({ _id: doc._id }, { $set: { order: neighbor.order } });
  await col.updateOne({ _id: neighbor._id }, { $set: { order: doc.order } });
}
