import type { Collection } from "mongodb";
import { getDb } from "@/lib/mongo";

const COLLECTION = "siteConfig";

type SiteConfigDoc = {
  key: string;
  value: unknown;
};

async function getCollection(): Promise<Collection<SiteConfigDoc>> {
  const db = await getDb();
  return db.collection<SiteConfigDoc>(COLLECTION);
}

export async function getSiteConfig<T>(key: string, fallback: T): Promise<T> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ key });
    if (!doc) return fallback;
    return doc.value as T;
  } catch {
    return fallback;
  }
}

export async function setSiteConfig<T>(key: string, value: T): Promise<void> {
  const col = await getCollection();
  await col.updateOne({ key }, { $set: { key, value } }, { upsert: true });
}
