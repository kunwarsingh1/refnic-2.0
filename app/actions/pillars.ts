"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getPillarById } from "@/lib/content/pillars";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function parseInput(formData: FormData) {
  return {
    titleLine1: String(formData.get("titleLine1") ?? ""),
    titleLine2: String(formData.get("titleLine2") ?? ""),
    body: String(formData.get("body") ?? ""),
  };
}

export async function createPillarAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const args = parseInput(formData);
  await submitChange({
    contentType: "pillars",
    operation: "create",
    args,
    label: `New pillar: ${args.titleLine1} ${args.titleLine2}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function updatePillarAction(id: string, formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getPillarById(id);
  const args = { id, ...parseInput(formData) };
  await submitChange({
    contentType: "pillars",
    operation: "update",
    args,
    previousArgs: previous,
    label: `Pillar: ${args.titleLine1} ${args.titleLine2}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function deletePillarAction(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getPillarById(id);
  await submitChange({
    contentType: "pillars",
    operation: "delete",
    args: { id },
    previousArgs: previous,
    label: `Delete pillar: ${previous?.title?.join(" ") ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function reorderPillarAction(id: string, direction: "up" | "down"): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getPillarById(id);
  await submitChange({
    contentType: "pillars",
    operation: "reorder",
    args: { id, direction },
    label: `Reorder pillar: ${previous?.title?.join(" ") ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}
