"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getProductCategoryById } from "@/lib/content/productCategories";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function parseInput(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? "") || undefined,
    invertLayout: formData.get("invertLayout") === "on",
  };
}

export async function createProductCategoryAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const args = parseInput(formData);
  await submitChange({
    contentType: "productCategories",
    operation: "create",
    args,
    label: `New product category: ${args.name}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/products"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function updateProductCategoryAction(id: string, formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getProductCategoryById(id);
  const args = { id, ...parseInput(formData) };
  await submitChange({
    contentType: "productCategories",
    operation: "update",
    args,
    previousArgs: previous,
    label: `Product category: ${args.name}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/products"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function deleteProductCategoryAction(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getProductCategoryById(id);
  await submitChange({
    contentType: "productCategories",
    operation: "delete",
    args: { id },
    previousArgs: previous,
    label: `Delete product category: ${previous?.name ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/products"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function reorderProductCategoryAction(id: string, direction: "up" | "down"): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getProductCategoryById(id);
  await submitChange({
    contentType: "productCategories",
    operation: "reorder",
    args: { id, direction },
    label: `Reorder product category: ${previous?.name ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/products"],
  });
  revalidatePath("/admin/pending-changes");
}
