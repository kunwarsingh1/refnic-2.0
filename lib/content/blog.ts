import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";

const COLLECTION = "blogPosts";

export type TextBlock = {
  id: string;
  type: "text";
  text: string;
};

export type ImageBlock = {
  id: string;
  type: "image";
  url: string;
  caption?: string;
  align?: "left" | "center" | "right";
};

export type VideoBlock = {
  id: string;
  type: "video";
  url: string;
  caption?: string;
};

export type YoutubeBlock = {
  id: string;
  type: "youtube";
  url: string;
  caption?: string;
};

export type PdfBlock = {
  id: string;
  type: "pdf";
  url: string;
  label?: string;
  downloadable?: boolean;
};

export type LinkBlock = {
  id: string;
  type: "link";
  url: string;
  label: string;
};

export type Block = TextBlock | ImageBlock | VideoBlock | YoutubeBlock | PdfBlock | LinkBlock;

export type PostStatus = "pending" | "approved" | "rejected";

type BlogPostDoc = {
  _id: ObjectId;
  row: number;
  postId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  content: Block[];
  published: boolean;
  status: PostStatus;
  author: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
};

export type BlogPost = {
  id: string;
  row: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  content: Block[];
  published: boolean;
  status: PostStatus;
  author: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
};

async function getCollection(): Promise<Collection<BlogPostDoc>> {
  const db = await getDb();
  const col = db.collection<BlogPostDoc>(COLLECTION);
  await col.createIndex({ row: 1 }, { unique: true }).catch(() => {});
  await col.createIndex({ slug: 1 }, { unique: true }).catch(() => {});
  return col;
}

function toBlogPost(doc: BlogPostDoc): BlogPost {
  return {
    id: doc._id.toHexString(),
    row: doc.row,
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    coverImageUrl: doc.coverImageUrl,
    content: doc.content ?? [],
    published: doc.published,
    status: doc.status,
    author: doc.author,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    deleted: doc.deleted,
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const col = await getCollection();
    const docs = await col
      .find({ published: true, deleted: { $ne: true } })
      .sort({ createdAt: -1 })
      .toArray();
    return docs.map(toBlogPost);
  } catch {
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const col = await getCollection();
    const docs = await col
      .find({ deleted: { $ne: true } })
      .sort({ createdAt: -1 })
      .toArray();
    return docs.map(toBlogPost);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ slug, deleted: { $ne: true } });
    return doc ? toBlogPost(doc) : null;
  } catch {
    return null;
  }
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toBlogPost(doc) : null;
  } catch {
    return null;
  }
}

export async function getPostByRow(row: number): Promise<BlogPost | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ row });
    return doc ? toBlogPost(doc) : null;
  } catch {
    return null;
  }
}

export type UpsertBlogPostInput = {
  row: number;
  postId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  content: Block[];
  published: boolean;
  status: PostStatus;
  author: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
};

export async function upsertPostByRow(input: UpsertBlogPostInput): Promise<void> {
  const col = await getCollection();
  await col.updateOne(
    { row: input.row },
    {
      $set: {
        postId: input.postId,
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt,
        coverImageUrl: input.coverImageUrl,
        content: input.content,
        published: input.published,
        status: input.status,
        author: input.author,
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
        deleted: input.deleted,
      },
      $setOnInsert: { _id: new ObjectId(), row: input.row },
    },
    { upsert: true },
  );
}

export async function deletePostByRow(row: number): Promise<void> {
  const col = await getCollection();
  await col.updateOne({ row }, { $set: { deleted: true } });
}
