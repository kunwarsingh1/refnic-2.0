"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getIntroCardById } from "@/lib/content/introCards";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function parseInput(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
  };
}

export async function createIntroCardAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const args = parseInput(formData);
  await submitChange({
    contentType: "introCards",
    operation: "create",
    args,
    label: `New intro card: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function updateIntroCardAction(id: string, formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getIntroCardById(id);
  const args = { id, ...parseInput(formData) };
  await submitChange({
    contentType: "introCards",
    operation: "update",
    args,
    previousArgs: previous,
    label: `Intro card: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function deleteIntroCardAction(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getIntroCardById(id);
  await submitChange({
    contentType: "introCards",
    operation: "delete",
    args: { id },
    previousArgs: previous,
    label: `Delete intro card: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function reorderIntroCardAction(id: string, direction: "up" | "down"): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getIntroCardById(id);
  await submitChange({
    contentType: "introCards",
    operation: "reorder",
    args: { id, direction },
    label: `Reorder intro card: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}
