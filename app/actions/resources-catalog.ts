"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getResourceCatalogItemById, type ResourceCatalogItemInput } from "@/lib/content/resourcesCatalog";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function parseInput(formData: FormData): ResourceCatalogItemInput {
  return {
    title: String(formData.get("title") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    cardImageUrl: String(formData.get("cardImageUrl") ?? "") || undefined,
    heroBody: String(formData.get("heroBody") ?? ""),
    pdfUrl: String(formData.get("pdfUrl") ?? "") || undefined,
    pdfCaption: String(formData.get("pdfCaption") ?? ""),
    contentType: (String(formData.get("contentType") ?? "pdf") as "pdf" | "image" | "text"),
    showcaseImageUrl: String(formData.get("showcaseImageUrl") ?? "") || undefined,
    showcaseText: String(formData.get("showcaseText") ?? ""),
    closingHeading: String(formData.get("closingHeading") ?? ""),
    closingBody: String(formData.get("closingBody") ?? ""),
    closingCtaLabel: String(formData.get("closingCtaLabel") ?? ""),
    closingCtaHref: String(formData.get("closingCtaHref") ?? ""),
  };
}

export async function createResourceCatalogItemAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const args = parseInput(formData);
  await submitChange({
    contentType: "resourcesCatalog",
    operation: "create",
    args,
    label: `New resource: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/resources"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function updateResourceCatalogItemAction(id: string, formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getResourceCatalogItemById(id);
  const args = { id, ...parseInput(formData) };
  await submitChange({
    contentType: "resourcesCatalog",
    operation: "update",
    args,
    previousArgs: previous,
    label: `Resource: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/resources"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function deleteResourceCatalogItemAction(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getResourceCatalogItemById(id);
  await submitChange({
    contentType: "resourcesCatalog",
    operation: "delete",
    args: { id },
    previousArgs: previous,
    label: `Delete resource: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/resources"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function reorderResourceCatalogItemAction(id: string, direction: "up" | "down"): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getResourceCatalogItemById(id);
  await submitChange({
    contentType: "resourcesCatalog",
    operation: "reorder",
    args: { id, direction },
    label: `Reorder resource: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/resources"],
  });
  revalidatePath("/admin/pending-changes");
}
