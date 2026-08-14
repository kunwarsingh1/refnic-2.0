import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";

const COLLECTION = "pillars";

type PillarDoc = {
  _id: ObjectId;
  titleLine1: string;
  titleLine2: string;
  body: string;
  order: number;
};

export type Pillar = {
  id: string;
  title: [string, string];
  body: string;
  order: number;
};

async function getCollection(): Promise<Collection<PillarDoc>> {
  const db = await getDb();
  return db.collection<PillarDoc>(COLLECTION);
}

function toPillar(doc: PillarDoc): Pillar {
  return { id: doc._id.toHexString(), title: [doc.titleLine1, doc.titleLine2], body: doc.body, order: doc.order ?? 0 };
}

export async function getPillars(): Promise<Pillar[]> {
  try {
    const col = await getCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return docs.map(toPillar);
  } catch {
    return [];
  }
}

export async function getPillarById(id: string): Promise<Pillar | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toPillar(doc) : null;
  } catch {
    return null;
  }
}

export async function createPillar(input: { titleLine1: string; titleLine2: string; body: string }): Promise<void> {
  const col = await getCollection();
  const count = await col.countDocuments({});
  await col.insertOne({
    _id: new ObjectId(),
    titleLine1: input.titleLine1,
    titleLine2: input.titleLine2,
    body: input.body,
    order: count,
  });
}

export async function updatePillar(
  id: string,
  input: { titleLine1: string; titleLine2: string; body: string },
): Promise<void> {
  const col = await getCollection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { titleLine1: input.titleLine1, titleLine2: input.titleLine2, body: input.body } },
  );
}

export async function deletePillar(id: string): Promise<void> {
  const col = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderPillar(id: string, direction: "up" | "down"): Promise<void> {
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
