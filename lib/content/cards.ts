import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";

const COLLECTION = "cards";

export type CardVariant = "products" | "solutions" | "services";

type CardDoc = {
  _id: ObjectId;
  variant: CardVariant;
  title: string;
  body: string;
  imageUrl: string;
  order: number;
  modelUrl?: string;
};

export type Card = {
  id: string;
  variant: CardVariant;
  title: string;
  body: string;
  imageUrl: string;
  order: number;
  modelUrl?: string;
};

async function getCollection(): Promise<Collection<CardDoc>> {
  const db = await getDb();
  return db.collection<CardDoc>(COLLECTION);
}

function toCard(doc: CardDoc): Card {
  return {
    id: doc._id.toHexString(),
    variant: doc.variant,
    title: doc.title,
    body: doc.body,
    imageUrl: doc.imageUrl,
    order: doc.order ?? 0,
    modelUrl: doc.modelUrl || undefined,
  };
}

export async function getCards(variant?: CardVariant): Promise<Card[]> {
  try {
    const col = await getCollection();
    const query = variant ? { variant } : {};
    const docs = await col.find(query).sort({ order: 1 }).toArray();
    return docs.map(toCard);
  } catch {
    return [];
  }
}

export async function getCardById(id: string): Promise<Card | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toCard(doc) : null;
  } catch {
    return null;
  }
}

export async function createCard(input: {
  variant: CardVariant;
  title: string;
  body: string;
  imageUrl: string;
  modelUrl?: string;
}): Promise<void> {
  const col = await getCollection();
  const count = await col.countDocuments({ variant: input.variant });
  await col.insertOne({
    _id: new ObjectId(),
    variant: input.variant,
    title: input.title,
    body: input.body,
    imageUrl: input.imageUrl,
    modelUrl: input.modelUrl || undefined,
    order: count,
  });
}

export async function updateCard(
  id: string,
  input: { variant: CardVariant; title: string; body: string; imageUrl: string; modelUrl?: string },
): Promise<void> {
  const col = await getCollection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        variant: input.variant,
        title: input.title,
        body: input.body,
        imageUrl: input.imageUrl,
        modelUrl: input.modelUrl || undefined,
      },
    },
  );
}

export async function deleteCard(id: string): Promise<void> {
  const col = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderCard(id: string, direction: "up" | "down"): Promise<void> {
  const col = await getCollection();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  if (!doc) return;

  const neighbor = await col.findOne(
    direction === "up" ? { variant: doc.variant, order: { $lt: doc.order } } : { variant: doc.variant, order: { $gt: doc.order } },
    { sort: { order: direction === "up" ? -1 : 1 } },
  );
  if (!neighbor) return;

  await col.updateOne({ _id: doc._id }, { $set: { order: neighbor.order } });
  await col.updateOne({ _id: neighbor._id }, { $set: { order: doc.order } });
}
