"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getCardById, type CardVariant } from "@/lib/content/cards";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function parseVariant(value: FormDataEntryValue | null): CardVariant {
  return value === "solutions" || value === "services" ? value : "products";
}

export async function createCardAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const args = {
    variant: parseVariant(formData.get("variant")),
    title: String(formData.get("title") ?? ""),
    body: String(formData.get("body") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    modelUrl: String(formData.get("modelUrl") ?? "") || undefined,
  };
  await submitChange({
    contentType: "cards",
    operation: "create",
    args,
    label: `New card: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function updateCardAction(id: string, formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getCardById(id);
  const args = {
    id,
    variant: parseVariant(formData.get("variant")),
    title: String(formData.get("title") ?? ""),
    body: String(formData.get("body") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    modelUrl: String(formData.get("modelUrl") ?? "") || undefined,
  };
  await submitChange({
    contentType: "cards",
    operation: "update",
    args,
    previousArgs: previous,
    label: `Card: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function deleteCardAction(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getCardById(id);
  await submitChange({
    contentType: "cards",
    operation: "delete",
    args: { id },
    previousArgs: previous,
    label: `Delete card: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function reorderCardAction(id: string, direction: "up" | "down"): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getCardById(id);
  await submitChange({
    contentType: "cards",
    operation: "reorder",
    args: { id, direction },
    label: `Reorder card: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}
