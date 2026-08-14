"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getProcessStepById, type ProcessIconKey } from "@/lib/content/processSteps";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updateProcessStepAction(id: string, formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getProcessStepById(id);
  const args = {
    id,
    title: String(formData.get("title") ?? ""),
    icon: String(formData.get("icon") ?? "flask") as ProcessIconKey,
    imageUrl: String(formData.get("imageUrl") ?? "") || undefined,
    modelUrl: String(formData.get("modelUrl") ?? "") || undefined,
    extra: String(formData.get("extra") ?? "") || undefined,
  };
  await submitChange({
    contentType: "processSteps",
    operation: "update",
    args,
    previousArgs: previous,
    label: `Process step: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function reorderProcessStepAction(id: string, direction: "up" | "down"): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getProcessStepById(id);
  await submitChange({
    contentType: "processSteps",
    operation: "reorder",
    args: { id, direction },
    label: `Reorder process step: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}
