"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getProductCatalogItemById } from "@/lib/content/productCatalog";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";
import type { Block } from "@/lib/content/blog";

function parseInput(formData: FormData) {
  let content: Block[] = [];
  try {
    const raw = String(formData.get("content") ?? "[]");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) content = parsed;
  } catch {
    content = [];
  }

  return {
    category: String(formData.get("category") ?? ""),
    title: String(formData.get("title") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? "") || undefined,
    content,
  };
}

export async function createProductCatalogItemAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const args = parseInput(formData);
  await submitChange({
    contentType: "productCatalog",
    operation: "create",
    args,
    label: `New product: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/products"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function updateProductCatalogItemAction(id: string, formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getProductCatalogItemById(id);
  const args = { id, ...parseInput(formData) };
  await submitChange({
    contentType: "productCatalog",
    operation: "update",
    args,
    previousArgs: previous,
    label: `Product: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/products"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function deleteProductCatalogItemAction(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getProductCatalogItemById(id);
  await submitChange({
    contentType: "productCatalog",
    operation: "delete",
    args: { id },
    previousArgs: previous,
    label: `Delete product: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/products"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function reorderProductCatalogItemAction(id: string, direction: "up" | "down"): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getProductCatalogItemById(id);
  await submitChange({
    contentType: "productCatalog",
    operation: "reorder",
    args: { id, direction },
    label: `Reorder product: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/products"],
  });
  revalidatePath("/admin/pending-changes");
}
