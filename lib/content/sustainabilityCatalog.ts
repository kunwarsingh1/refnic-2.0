import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";

const COLLECTION = "sustainabilityCatalogItems";

type SustainabilityCatalogItemDoc = {
  _id: ObjectId;
  slug: string;
  title: string;
  excerpt: string;
  cardImageUrl?: string;
  heroBody: string;
  pdfUrl?: string;
  pdfCaption?: string;
  contentType?: "pdf" | "image" | "text";
  showcaseImageUrl?: string;
  showcaseText?: string;
  closingHeading: string;
  closingBody: string;
  closingCtaLabel: string;
  closingCtaHref: string;
  order: number;
};

export type SustainabilityCatalogItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cardImageUrl?: string;
  heroBody: string;
  pdfUrl?: string;
  pdfCaption?: string;
  contentType?: "pdf" | "image" | "text";
  showcaseImageUrl?: string;
  showcaseText?: string;
  closingHeading: string;
  closingBody: string;
  closingCtaLabel: string;
  closingCtaHref: string;
  order: number;
};

export type SustainabilityCatalogItemInput = {
  title: string;
  excerpt: string;
  cardImageUrl?: string;
  heroBody: string;
  pdfUrl?: string;
  pdfCaption?: string;
  contentType?: "pdf" | "image" | "text";
  showcaseImageUrl?: string;
  showcaseText?: string;
  closingHeading: string;
  closingBody: string;
  closingCtaLabel: string;
  closingCtaHref: string;
};

async function getCollection(): Promise<Collection<SustainabilityCatalogItemDoc>> {
  const db = await getDb();
  return db.collection<SustainabilityCatalogItemDoc>(COLLECTION);
}

function toItem(doc: SustainabilityCatalogItemDoc): SustainabilityCatalogItem {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    cardImageUrl: doc.cardImageUrl,
    heroBody: doc.heroBody,
    pdfUrl: doc.pdfUrl,
    pdfCaption: doc.pdfCaption,
    contentType: doc.contentType,
    showcaseImageUrl: doc.showcaseImageUrl,
    showcaseText: doc.showcaseText,
    closingHeading: doc.closingHeading,
    closingBody: doc.closingBody,
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
      .replace(/^-+|-+$/g, "") || "pillar"
  );
}

async function uniqueSlug(
  col: Collection<SustainabilityCatalogItemDoc>,
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

export async function getSustainabilityCatalogItems(): Promise<SustainabilityCatalogItem[]> {
  try {
    const col = await getCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return docs.map(toItem);
  } catch {
    return [];
  }
}

export async function getSustainabilityCatalogItemBySlug(slug: string): Promise<SustainabilityCatalogItem | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ slug });
    return doc ? toItem(doc) : null;
  } catch {
    return null;
  }
}

export async function getSustainabilityCatalogItemById(id: string): Promise<SustainabilityCatalogItem | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toItem(doc) : null;
  } catch {
    return null;
  }
}

export async function createSustainabilityCatalogItem(input: SustainabilityCatalogItemInput): Promise<void> {
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

export async function updateSustainabilityCatalogItem(
  id: string,
  input: SustainabilityCatalogItemInput,
): Promise<void> {
  const col = await getCollection();
  const objectId = new ObjectId(id);
  const existing = await col.findOne({ _id: objectId });
  const slug =
    existing && existing.title === input.title ? existing.slug : await uniqueSlug(col, input.title, objectId);
  await col.updateOne({ _id: objectId }, { $set: { slug, ...input } });
}

export async function deleteSustainabilityCatalogItem(id: string): Promise<void> {
  const col = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderSustainabilityCatalogItem(id: string, direction: "up" | "down"): Promise<void> {
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
