import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";
import type { NarrativeSection } from "@/lib/content/solutionsPage";

const COLLECTION = "servicesCatalogItems";

type ServiceCatalogItemDoc = {
  _id: ObjectId;
  slug: string;
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
  pdfUrl?: string;
  pdfCaption?: string;
  contentType?: "pdf" | "image" | "text";
  showcaseImageUrl?: string;
  showcaseText?: string;
  order: number;
};

export type ServiceCatalogItem = {
  id: string;
  slug: string;
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
  pdfUrl?: string;
  pdfCaption?: string;
  contentType?: "pdf" | "image" | "text";
  showcaseImageUrl?: string;
  showcaseText?: string;
  order: number;
};

export type ServiceCatalogItemInput = {
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
  pdfUrl?: string;
  pdfCaption?: string;
  contentType?: "pdf" | "image" | "text";
  showcaseImageUrl?: string;
  showcaseText?: string;
};

async function getCollection(): Promise<Collection<ServiceCatalogItemDoc>> {
  const db = await getDb();
  return db.collection<ServiceCatalogItemDoc>(COLLECTION);
}

function toItem(doc: ServiceCatalogItemDoc): ServiceCatalogItem {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
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
    pdfUrl: doc.pdfUrl,
    pdfCaption: doc.pdfCaption,
    contentType: doc.contentType,
    showcaseImageUrl: doc.showcaseImageUrl,
    showcaseText: doc.showcaseText,
    order: doc.order ?? 0,
  };
}

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "service"
  );
}

async function uniqueSlug(
  col: Collection<ServiceCatalogItemDoc>,
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

export async function getServiceCatalogItems(): Promise<ServiceCatalogItem[]> {
  try {
    const col = await getCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return docs.map(toItem);
  } catch {
    return [];
  }
}

export async function getServiceCatalogItemBySlug(slug: string): Promise<ServiceCatalogItem | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ slug });
    return doc ? toItem(doc) : null;
  } catch {
    return null;
  }
}

export async function getServiceCatalogItemById(id: string): Promise<ServiceCatalogItem | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toItem(doc) : null;
  } catch {
    return null;
  }
}

export async function createServiceCatalogItem(input: ServiceCatalogItemInput): Promise<void> {
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

export async function updateServiceCatalogItem(id: string, input: ServiceCatalogItemInput): Promise<void> {
  const col = await getCollection();
  const objectId = new ObjectId(id);
  const existing = await col.findOne({ _id: objectId });
  const slug =
    existing && existing.title === input.title ? existing.slug : await uniqueSlug(col, input.title, objectId);
  await col.updateOne({ _id: objectId }, { $set: { slug, ...input } });
}

export async function deleteServiceCatalogItem(id: string): Promise<void> {
  const col = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderServiceCatalogItem(id: string, direction: "up" | "down"): Promise<void> {
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
