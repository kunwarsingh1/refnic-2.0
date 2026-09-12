import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";

const COLLECTION = "caseStudies";

type CaseStudyDoc = {
  _id: ObjectId;
  slug: string;
  city: string;
  country?: string;
  label: string;
  body: string;
  imageUrl: string;
  imageUrl2?: string;
  tagline?: string;
  overviewSubheading?: string;
  overviewBody?: string;
  challengeSubheading?: string;
  challengeBody?: string;
  approachSubheading?: string;
  approachIntro?: string;
  approachBody?: string;
  approachSecondaryHeading?: string;
  approachBullets?: string[];
  order: number;
  status?: string;
  subtitle?: string;
  modelUrl?: string;
};

export type CaseStudy = {
  id: string;
  slug: string;
  city: string;
  country?: string;
  label: string;
  body: string;
  imageUrl: string;
  imageUrl2?: string;
  tagline?: string;
  overviewSubheading?: string;
  overviewBody?: string;
  challengeSubheading?: string;
  challengeBody?: string;
  approachSubheading?: string;
  approachIntro?: string;
  approachBody?: string;
  approachSecondaryHeading?: string;
  approachBullets: string[];
  order: number;
  status?: string;
  subtitle?: string;
  modelUrl?: string;
};

export type CaseStudyInput = {
  city: string;
  country?: string;
  label: string;
  body: string;
  imageUrl: string;
  imageUrl2?: string;
  tagline?: string;
  overviewSubheading?: string;
  overviewBody?: string;
  challengeSubheading?: string;
  challengeBody?: string;
  approachSubheading?: string;
  approachIntro?: string;
  approachBody?: string;
  approachSecondaryHeading?: string;
  approachBullets?: string[];
  status?: string;
  subtitle?: string;
  modelUrl?: string;
};

async function getCollection(): Promise<Collection<CaseStudyDoc>> {
  const db = await getDb();
  return db.collection<CaseStudyDoc>(COLLECTION);
}

function toCaseStudy(doc: CaseStudyDoc): CaseStudy {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    city: doc.city,
    country: doc.country,
    label: doc.label,
    body: doc.body,
    imageUrl: doc.imageUrl,
    imageUrl2: doc.imageUrl2,
    tagline: doc.tagline,
    overviewSubheading: doc.overviewSubheading,
    overviewBody: doc.overviewBody,
    challengeSubheading: doc.challengeSubheading,
    challengeBody: doc.challengeBody,
    approachSubheading: doc.approachSubheading,
    approachIntro: doc.approachIntro,
    approachBody: doc.approachBody,
    approachSecondaryHeading: doc.approachSecondaryHeading,
    approachBullets: doc.approachBullets ?? [],
    order: doc.order ?? 0,
    status: doc.status,
    subtitle: doc.subtitle,
    modelUrl: doc.modelUrl || undefined,
  };
}

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "case-study"
  );
}

async function uniqueSlug(col: Collection<CaseStudyDoc>, title: string, excludeId?: ObjectId): Promise<string> {
  const base = slugify(title);
  let slug = base;
  let n = 2;
  while (await col.findOne({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const col = await getCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return docs.map(toCaseStudy);
  } catch {
    return [];
  }
}

export async function getCaseStudyById(id: string): Promise<CaseStudy | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toCaseStudy(doc) : null;
  } catch {
    return null;
  }
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ slug });
    return doc ? toCaseStudy(doc) : null;
  } catch {
    return null;
  }
}

export async function createCaseStudy(input: CaseStudyInput): Promise<void> {
  const col = await getCollection();
  const count = await col.countDocuments({});
  const slug = await uniqueSlug(col, input.label || input.city);
  await col.insertOne({
    _id: new ObjectId(),
    slug,
    ...input,
    order: count,
  });
}

export async function updateCaseStudy(id: string, input: CaseStudyInput): Promise<void> {
  const col = await getCollection();
  const objectId = new ObjectId(id);
  const existing = await col.findOne({ _id: objectId });
  const title = input.label || input.city;
  const slug =
    existing && existing.label === input.label && existing.city === input.city
      ? existing.slug
      : await uniqueSlug(col, title, objectId);
  await col.updateOne({ _id: objectId }, { $set: { slug, ...input } });
}

export async function deleteCaseStudy(id: string): Promise<void> {
  const col = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderCaseStudy(id: string, direction: "up" | "down"): Promise<void> {
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
