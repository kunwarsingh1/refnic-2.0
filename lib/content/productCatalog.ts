import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";
import type { Block } from "@/lib/content/blog";
import type { NarrativeSection } from "@/lib/content/solutionsPage";

const COLLECTION = "productCatalogItems";

export type ProductRecoveredMaterial = { title: string; body: string };

type ProductCatalogItemDoc = {
  _id: ObjectId;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  content: Block[];
  order: number;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  narrativeSections?: NarrativeSection[];
  materialsHeading?: string;
  materials?: ProductRecoveredMaterial[];
  pdfUrl?: string;
  pdfCaption?: string;
  contentType?: "pdf" | "image" | "text";
  showcaseImageUrl?: string;
  showcaseText?: string;
  closingHeading?: string;
  closingTagline?: string;
  closingCtaLabel?: string;
  closingCtaHref?: string;
  closingImageUrl?: string;
};

export type ProductCatalogItem = {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  content: Block[];
  order: number;
  heroCtaLabel: string;
  heroCtaHref: string;
  narrativeSections: NarrativeSection[];
  materialsHeading: string;
  materials: ProductRecoveredMaterial[];
  pdfUrl?: string;
  pdfCaption: string;
  contentType?: "pdf" | "image" | "text";
  showcaseImageUrl?: string;
  showcaseText?: string;
  closingHeading: string;
  closingTagline: string;
  closingCtaLabel: string;
  closingCtaHref: string;
  closingImageUrl?: string;
};

async function getCollection(): Promise<Collection<ProductCatalogItemDoc>> {
  const db = await getDb();
  return db.collection<ProductCatalogItemDoc>(COLLECTION);
}

function toItem(doc: ProductCatalogItemDoc): ProductCatalogItem {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    category: doc.category,
    title: doc.title,
    excerpt: doc.excerpt,
    imageUrl: doc.imageUrl,
    content: doc.content ?? [],
    order: doc.order ?? 0,
    heroCtaLabel: doc.heroCtaLabel ?? "",
    heroCtaHref: doc.heroCtaHref ?? "/contact",
    narrativeSections: doc.narrativeSections ?? [],
    materialsHeading: doc.materialsHeading ?? "",
    materials: doc.materials ?? [],
    pdfUrl: doc.pdfUrl,
    pdfCaption: doc.pdfCaption ?? "",
    contentType: doc.contentType,
    showcaseImageUrl: doc.showcaseImageUrl,
    showcaseText: doc.showcaseText,
    closingHeading: doc.closingHeading ?? "",
    closingTagline: doc.closingTagline ?? "",
    closingCtaLabel: doc.closingCtaLabel ?? "",
    closingCtaHref: doc.closingCtaHref ?? "/contact",
    closingImageUrl: doc.closingImageUrl,
  };
}

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "product"
  );
}

async function uniqueSlug(
  col: Collection<ProductCatalogItemDoc>,
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

export async function getProductCatalogItems(): Promise<ProductCatalogItem[]> {
  try {
    const col = await getCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return docs.map(toItem);
  } catch {
    return [];
  }
}

export async function getProductCatalogItemBySlug(slug: string): Promise<ProductCatalogItem | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ slug });
    return doc ? toItem(doc) : null;
  } catch {
    return null;
  }
}

export async function getProductCatalogItemById(id: string): Promise<ProductCatalogItem | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toItem(doc) : null;
  } catch {
    return null;
  }
}

export type ProductCatalogItemInput = {
  category: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  content?: Block[];
  heroCtaLabel?: string;
  heroCtaHref?: string;
  narrativeSections?: NarrativeSection[];
  materialsHeading?: string;
  materials?: ProductRecoveredMaterial[];
  pdfUrl?: string;
  pdfCaption?: string;
  contentType?: "pdf" | "image" | "text";
  showcaseImageUrl?: string;
  showcaseText?: string;
  closingHeading?: string;
  closingTagline?: string;
  closingCtaLabel?: string;
  closingCtaHref?: string;
  closingImageUrl?: string;
};

export async function createProductCatalogItem(input: ProductCatalogItemInput): Promise<void> {
  const col = await getCollection();
  const count = await col.countDocuments({});
  const slug = await uniqueSlug(col, input.title);
  await col.insertOne({
    _id: new ObjectId(),
    slug,
    category: input.category,
    title: input.title,
    excerpt: input.excerpt,
    imageUrl: input.imageUrl || undefined,
    content: input.content ?? [],
    order: count,
    heroCtaLabel: input.heroCtaLabel,
    heroCtaHref: input.heroCtaHref,
    narrativeSections: input.narrativeSections ?? [],
    materialsHeading: input.materialsHeading,
    materials: input.materials ?? [],
    pdfUrl: input.pdfUrl || undefined,
    pdfCaption: input.pdfCaption,
    contentType: input.contentType,
    showcaseImageUrl: input.showcaseImageUrl || undefined,
    showcaseText: input.showcaseText,
    closingHeading: input.closingHeading,
    closingTagline: input.closingTagline,
    closingCtaLabel: input.closingCtaLabel,
    closingCtaHref: input.closingCtaHref,
    closingImageUrl: input.closingImageUrl || undefined,
  });
}

export async function updateProductCatalogItem(id: string, input: ProductCatalogItemInput): Promise<void> {
  const col = await getCollection();
  const objectId = new ObjectId(id);
  const existing = await col.findOne({ _id: objectId });
  const slug =
    existing && existing.title === input.title ? existing.slug : await uniqueSlug(col, input.title, objectId);
  await col.updateOne(
    { _id: objectId },
    {
      $set: {
        slug,
        category: input.category,
        title: input.title,
        excerpt: input.excerpt,
        imageUrl: input.imageUrl || undefined,
        content: input.content ?? [],
        heroCtaLabel: input.heroCtaLabel,
        heroCtaHref: input.heroCtaHref,
        narrativeSections: input.narrativeSections ?? [],
        materialsHeading: input.materialsHeading,
        materials: input.materials ?? [],
        pdfUrl: input.pdfUrl || undefined,
        pdfCaption: input.pdfCaption,
        contentType: input.contentType,
        showcaseImageUrl: input.showcaseImageUrl || undefined,
        showcaseText: input.showcaseText,
        closingHeading: input.closingHeading,
        closingTagline: input.closingTagline,
        closingCtaLabel: input.closingCtaLabel,
        closingCtaHref: input.closingCtaHref,
        closingImageUrl: input.closingImageUrl || undefined,
      },
    },
  );
}

export async function deleteProductCatalogItem(id: string): Promise<void> {
  const col = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderProductCatalogItem(id: string, direction: "up" | "down"): Promise<void> {
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
