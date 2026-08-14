import { ObjectId, type Collection } from "mongodb";
import { getDb } from "@/lib/mongo";
import type { ProcessIconKey } from "@/lib/processIcons";

const COLLECTION = "processSteps";

export type { ProcessIconKey };

type ProcessStepDoc = {
  _id: ObjectId;
  title: string;
  icon: ProcessIconKey;
  imageUrl?: string;
  modelUrl?: string;
  extra?: string;
  order: number;
};

export type ProcessStep = {
  id: string;
  title: string;
  icon: ProcessIconKey;
  imageUrl?: string;
  modelUrl?: string;
  extra?: string;
  order: number;
};

const DEFAULT_STEPS: Omit<ProcessStepDoc, "_id">[] = [
  { title: "Research", icon: "flask", imageUrl: "/RESEARCH.png", order: 0 },
  { title: "Process Design", icon: "monitor", imageUrl: "/PROCESS DESIGN.png", order: 1 },
  { title: "Equipment Manufacturing", icon: "hopper", imageUrl: "/EQUIPMENT MANUFACTURIMNG.png", order: 2 },
  {
    title: "Plant Engineering",
    icon: "shredder",
    imageUrl: "/PLANT ENG.png",
    extra: "Optimized process design for maximum efficiency and recovery.",
    order: 3,
  },
  { title: "Installation", icon: "crane", order: 4 },
  { title: "Commissioning & Training", icon: "plant", imageUrl: "/COMMISIONING AND TRAINING.png", order: 5 },
];

async function getCollection(): Promise<Collection<ProcessStepDoc>> {
  const db = await getDb();
  return db.collection<ProcessStepDoc>(COLLECTION);
}

function toProcessStep(doc: ProcessStepDoc): ProcessStep {
  return {
    id: doc._id.toHexString(),
    title: doc.title,
    icon: doc.icon,
    imageUrl: doc.imageUrl,
    modelUrl: doc.modelUrl || undefined,
    extra: doc.extra,
    order: doc.order ?? 0,
  };
}

async function ensureSeeded(col: Collection<ProcessStepDoc>): Promise<void> {
  const count = await col.countDocuments({});
  if (count === 0) {
    await col.insertMany(DEFAULT_STEPS.map((s) => ({ ...s, _id: new ObjectId() })));
  }
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const col = await getCollection();
    await ensureSeeded(col);
    const docs = await col.find({}).sort({ order: 1 }).toArray();
    return docs.map(toProcessStep);
  } catch {
    return DEFAULT_STEPS.map((s, i) => ({ id: `default-${i}`, ...s }));
  }
}

export async function getProcessStepById(id: string): Promise<ProcessStep | null> {
  try {
    const col = await getCollection();
    const doc = await col.findOne({ _id: new ObjectId(id) });
    return doc ? toProcessStep(doc) : null;
  } catch {
    return null;
  }
}

export async function updateProcessStep(
  id: string,
  input: { title: string; icon: ProcessIconKey; imageUrl?: string; modelUrl?: string; extra?: string },
): Promise<void> {
  const col = await getCollection();
  await col.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title: input.title,
        icon: input.icon,
        imageUrl: input.imageUrl,
        modelUrl: input.modelUrl,
        extra: input.extra,
      },
    },
  );
}

export async function reorderProcessStep(id: string, direction: "up" | "down"): Promise<void> {
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
