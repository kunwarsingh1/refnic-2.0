import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";

const COLLECTION = "caseStudies";

type CaseStudyDoc = {
  _id: ObjectId;
  city: string;
  label: string;
  body: string;
  imageUrl: string;
  order: number;
  status?: string;
  subtitle?: string;
  modelUrl?: string;
};

export type CaseStudy = {
  id: string;
  city: string;
  label: string;
  body: string;
  imageUrl: string;
  order: number;
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
    city: doc.city,
    label: doc.label,
    body: doc.body,
    imageUrl: doc.imageUrl,
    order: doc.order ?? 0,
    status: doc.status,
    subtitle: doc.subtitle,
    modelUrl: doc.modelUrl || undefined,
  };
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

export async function createCaseStudy(input: {
  city: string;
  label: string;
  body: string;
  imageUrl: string;
  status?: string;
  subtitle?: string;
  modelUrl?: string;
}): Promise<void> {
  const col = await getCollection();
  const count = await col.countDocuments({});
  await col.insertOne({
    _id: new ObjectId(),
    city: input.city,
    label: input.label,
    body: input.body,
    imageUrl: input.imageUrl,
    status: input.status,
    subtitle: input.subtitle,
    modelUrl: input.modelUrl || undefined,
    order: count,
  });
}

export async function updateCaseStudy(
  id: string,
  input: {
    city: string;
    label: string;
    body: string;
    imageUrl: string;
    status?: string;
    subtitle?: string;
    modelUrl?: string;
  },
): Promise<void> {
  const col = await getCollection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        city: input.city,
        label: input.label,
        body: input.body,
        imageUrl: input.imageUrl,
        status: input.status,
        subtitle: input.subtitle,
        modelUrl: input.modelUrl || undefined,
      },
    },
  );
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
