"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getProductCatalogItemById, type ProductCatalogItemInput } from "@/lib/content/productCatalog";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";
import type { Block } from "@/lib/content/blog";
import type { NarrativeLayout, NarrativeSection } from "@/lib/content/solutionsPage";

function parseNarrativeSections(formData: FormData): NarrativeSection[] {
  const headings = formData.getAll("narrativeHeading").map(String);
  const bodies = formData.getAll("narrativeBody").map(String);
  const layouts = formData.getAll("narrativeLayout").map(String);
  const imageUrls = formData.getAll("narrativeImageUrl").map(String);
  return headings
    .map((heading, i) => ({
      heading,
      body: bodies[i] ?? "",
      layout: (layouts[i] as NarrativeLayout) ?? "banner",
      imageUrl: imageUrls[i] || undefined,
    }))
    .filter((s) => s.heading.trim() !== "" || s.body.trim() !== "");
}

function parseMaterials(formData: FormData): { title: string; body: string }[] {
  const titles = formData.getAll("materialTitle").map(String);
  const bodies = formData.getAll("materialBody").map(String);
  return titles
    .map((title, i) => ({ title, body: bodies[i] ?? "" }))
    .filter((m) => m.title.trim() !== "");
}

function parseInput(formData: FormData): ProductCatalogItemInput {
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
    heroCtaLabel: String(formData.get("heroCtaLabel") ?? ""),
    heroCtaHref: String(formData.get("heroCtaHref") ?? ""),
    narrativeSections: parseNarrativeSections(formData),
    materialsHeading: String(formData.get("materialsHeading") ?? ""),
    materials: parseMaterials(formData),
    pdfUrl: String(formData.get("pdfUrl") ?? "") || undefined,
    pdfCaption: String(formData.get("pdfCaption") ?? ""),
    contentType: (String(formData.get("contentType") ?? "pdf") as "pdf" | "image" | "text"),
    showcaseImageUrl: String(formData.get("showcaseImageUrl") ?? "") || undefined,
    showcaseText: String(formData.get("showcaseText") ?? ""),
    closingHeading: String(formData.get("closingHeading") ?? ""),
    closingTagline: String(formData.get("closingTagline") ?? ""),
    closingCtaLabel: String(formData.get("closingCtaLabel") ?? ""),
    closingCtaHref: String(formData.get("closingCtaHref") ?? ""),
    closingImageUrl: String(formData.get("closingImageUrl") ?? "") || undefined,
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
