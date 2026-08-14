import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";
import { NEWSLETTER_GRADIENTS as GRADIENTS } from "@/lib/newsletterGradients";

const COLLECTION = "newsletterPosts";

type NewsletterPostDoc = {
  _id: ObjectId;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  meta: string;
  gradient: string;
  order: number;
};

export type NewsletterPost = {
  id: string;
  slug: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  meta: string;
  gradient: string;
  order: number;
};

async function getCollection(): Promise<Collection<NewsletterPostDoc>> {
  const db = await getDb();
  return db.collection<NewsletterPostDoc>(COLLECTION);
}

function toPost(doc: NewsletterPostDoc): NewsletterPost {
  return {
    id: doc._id.toHexString(),
    slug: doc.slug,
    date: doc.date,
    category: doc.category,
    title: doc.title,
    excerpt: doc.excerpt,
    author: doc.author,
    meta: doc.meta,
    gradient: doc.gradient,
    order: doc.order ?? 0,
  };
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "post";
}

async function uniqueSlug(col: Collection<NewsletterPostDoc>, title: string, excludeId?: ObjectId): Promise<string> {
  const base = slugify(title);
  let slug = base;
  let n = 2;
  while (await col.findOne({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) })) {
    slug = `${base}-${n}`;
    n += 1;
  }
  return slug;
}

export async function getNewsletterPosts(): Promise<NewsletterPost[]> {
  try {
    const col = await getCollection();
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return docs.map(toPost);
  } catch {
    return [];
  }
}

export async function getNewsletterPostBySlug(slug: string): Promise<NewsletterPost | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ slug });
    return doc ? toPost(doc) : null;
  } catch {
    return null;
  }
}

export async function getNewsletterPostById(id: string): Promise<NewsletterPost | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toPost(doc) : null;
  } catch {
    return null;
  }
}

export async function createNewsletterPost(input: {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  meta: string;
  gradient?: string;
  date: string;
}): Promise<void> {
  const col = await getCollection();
  const count = await col.countDocuments({});
  const slug = await uniqueSlug(col, input.title);
  await col.insertOne({
    _id: new ObjectId(),
    slug,
    date: input.date,
    category: input.category,
    title: input.title,
    excerpt: input.excerpt,
    author: input.author,
    meta: input.meta,
    gradient: input.gradient || GRADIENTS[count % GRADIENTS.length],
    order: count,
  });
}

export async function updateNewsletterPost(
  id: string,
  input: { category: string; title: string; excerpt: string; author: string; meta: string; gradient: string; date: string },
): Promise<void> {
  const col = await getCollection();
  const objectId = new ObjectId(id);
  const existing = await col.findOne({ _id: objectId });
  const slug = existing && existing.title === input.title ? existing.slug : await uniqueSlug(col, input.title, objectId);
  await col.updateOne(
    { _id: objectId },
    {
      $set: {
        slug,
        date: input.date,
        category: input.category,
        title: input.title,
        excerpt: input.excerpt,
        author: input.author,
        meta: input.meta,
        gradient: input.gradient,
      },
    },
  );
}

export async function deleteNewsletterPost(id: string): Promise<void> {
  const col = await getCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
}

export async function reorderNewsletterPost(id: string, direction: "up" | "down"): Promise<void> {
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
