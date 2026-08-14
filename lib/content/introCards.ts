import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";

const COLLECTION = "introCards";

type IntroCardDoc = {
  _id: ObjectId;
  title: string;
  imageUrl: string;
  order: number;
};

export type IntroCard = {
  id: string;
  title: string;
  imageUrl: string;
  order: number;
};

async function getCollection(): Promise<Collection<IntroCardDoc>> {
  const db = await getDb();
  return db.collection<IntroCardDoc>(COLLECTION);
}

function toIntroCard(doc: IntroCardDoc): IntroCard {
  return { id: doc._id.toHexString(), title: doc.title, imageUrl: doc.imageUrl, order: doc.order ?? 0 };
}

export async function getIntroCards(): Promise<IntroCard[]> {
  try {
    const col = await getCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return docs.map(toIntroCard);
  } catch {
    return [];
  }
}

export async function getIntroCardById(id: string): Promise<IntroCard | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toIntroCard(doc) : null;
  } catch {
    return null;
  }
}

export async function createIntroCard(input: { title: string; imageUrl: string }): Promise<void> {
  const col = await getCollection();
  const count = await col.countDocuments({});
  await col.insertOne({ _id: new ObjectId(), title: input.title, imageUrl: input.imageUrl, order: count });
}

export async function updateIntroCard(id: string, input: { title: string; imageUrl: string }): Promise<void> {
  const col = await getCollection();
  await col.updateOne({ _id: new ObjectId(id) }, { $set: { title: input.title, imageUrl: input.imageUrl } });
}

export async function deleteIntroCard(id: string): Promise<void> {
  const col = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderIntroCard(id: string, direction: "up" | "down"): Promise<void> {
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
