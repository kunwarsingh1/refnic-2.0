import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";

const COLLECTION = "newsletterTabs";

type NewsletterTabDoc = {
  _id: ObjectId;
  name: string;
  tagline: string;
  order: number;
};

export type NewsletterTab = {
  id: string;
  name: string;
  tagline: string;
  order: number;
};

async function getCollection(): Promise<Collection<NewsletterTabDoc>> {
  const db = await getDb();
  return db.collection<NewsletterTabDoc>(COLLECTION);
}

function toTab(doc: NewsletterTabDoc): NewsletterTab {
  return { id: doc._id.toHexString(), name: doc.name, tagline: doc.tagline ?? "", order: doc.order ?? 0 };
}

export async function getNewsletterTabs(): Promise<NewsletterTab[]> {
  try {
    const col = await getCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return docs.map(toTab);
  } catch {
    return [];
  }
}

export async function getNewsletterTabById(id: string): Promise<NewsletterTab | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toTab(doc) : null;
  } catch {
    return null;
  }
}

export async function createNewsletterTab(input: { name: string; tagline: string }): Promise<void> {
  const col = await getCollection();
  const count = await col.countDocuments({});
  await col.insertOne({ _id: new ObjectId(), name: input.name, tagline: input.tagline, order: count });
}

export async function updateNewsletterTab(id: string, input: { name: string; tagline: string }): Promise<void> {
  const col = await getCollection();
  await col.updateOne({ _id: new ObjectId(id) }, { $set: { name: input.name, tagline: input.tagline } });
}

export async function deleteNewsletterTab(id: string): Promise<void> {
  const col = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderNewsletterTab(id: string, direction: "up" | "down"): Promise<void> {
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
