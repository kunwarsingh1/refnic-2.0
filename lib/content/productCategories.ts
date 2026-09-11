import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";

const COLLECTION = "productCategories";

type ProductCategoryDoc = {
  _id: ObjectId;
  name: string;
  tagline: string;
  imageUrl?: string;
  invertLayout?: boolean;
  order: number;
};

export type ProductCategory = {
  id: string;
  name: string;
  tagline: string;
  imageUrl?: string;
  invertLayout: boolean;
  order: number;
};

async function getCollection(): Promise<Collection<ProductCategoryDoc>> {
  const db = await getDb();
  return db.collection<ProductCategoryDoc>(COLLECTION);
}

function toCategory(doc: ProductCategoryDoc): ProductCategory {
  return {
    id: doc._id.toHexString(),
    name: doc.name,
    tagline: doc.tagline ?? "",
    imageUrl: doc.imageUrl,
    invertLayout: doc.invertLayout ?? false,
    order: doc.order ?? 0,
  };
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const col = await getCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return docs.map(toCategory);
  } catch {
    return [];
  }
}

export async function getProductCategoryById(id: string): Promise<ProductCategory | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toCategory(doc) : null;
  } catch {
    return null;
  }
}

export async function createProductCategory(input: {
  name: string;
  tagline: string;
  imageUrl?: string;
  invertLayout?: boolean;
}): Promise<void> {
  const col = await getCollection();
  const count = await col.countDocuments({});
  await col.insertOne({
    _id: new ObjectId(),
    name: input.name,
    tagline: input.tagline,
    imageUrl: input.imageUrl || undefined,
    invertLayout: input.invertLayout ?? false,
    order: count,
  });
}

export async function updateProductCategory(
  id: string,
  input: { name: string; tagline: string; imageUrl?: string; invertLayout?: boolean },
): Promise<void> {
  const col = await getCollection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        name: input.name,
        tagline: input.tagline,
        imageUrl: input.imageUrl || undefined,
        invertLayout: input.invertLayout ?? false,
      },
    },
  );
}

export async function deleteProductCategory(id: string): Promise<void> {
  const col = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderProductCategory(id: string, direction: "up" | "down"): Promise<void> {
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
