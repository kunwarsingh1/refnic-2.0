"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getServiceCatalogItemById, type ServiceCatalogItemInput } from "@/lib/content/servicesCatalog";
import type { NarrativeLayout, NarrativeSection } from "@/lib/content/solutionsPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

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
    .filter((s) => s.heading.trim() !== "");
}

function parseInput(formData: FormData): ServiceCatalogItemInput {
  return {
    title: String(formData.get("title") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    cardImageUrl: String(formData.get("cardImageUrl") ?? "") || undefined,
    heroBody: String(formData.get("heroBody") ?? ""),
    heroImageUrl: String(formData.get("heroImageUrl") ?? "") || undefined,
    heroCtaLabel: String(formData.get("heroCtaLabel") ?? ""),
    heroCtaHref: String(formData.get("heroCtaHref") ?? ""),
    narrativeSections: parseNarrativeSections(formData),
    closingHeading: String(formData.get("closingHeading") ?? ""),
    closingBody: String(formData.get("closingBody") ?? ""),
    closingImageUrl: String(formData.get("closingImageUrl") ?? "") || undefined,
    closingCtaLabel: String(formData.get("closingCtaLabel") ?? ""),
    closingCtaHref: String(formData.get("closingCtaHref") ?? ""),
    pdfUrl: String(formData.get("pdfUrl") ?? "") || undefined,
    pdfCaption: String(formData.get("pdfCaption") ?? ""),
    contentType: (String(formData.get("contentType") ?? "pdf") as "pdf" | "image" | "text"),
    showcaseImageUrl: String(formData.get("showcaseImageUrl") ?? "") || undefined,
    showcaseText: String(formData.get("showcaseText") ?? ""),
  };
}

export async function createServiceCatalogItemAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const args = parseInput(formData);
  await submitChange({
    contentType: "servicesCatalog",
    operation: "create",
    args,
    label: `New service: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/services"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function updateServiceCatalogItemAction(id: string, formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getServiceCatalogItemById(id);
  const args = { id, ...parseInput(formData) };
  await submitChange({
    contentType: "servicesCatalog",
    operation: "update",
    args,
    previousArgs: previous,
    label: `Service: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/services"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function deleteServiceCatalogItemAction(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getServiceCatalogItemById(id);
  await submitChange({
    contentType: "servicesCatalog",
    operation: "delete",
    args: { id },
    previousArgs: previous,
    label: `Delete service: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/services"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function reorderServiceCatalogItemAction(id: string, direction: "up" | "down"): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getServiceCatalogItemById(id);
  await submitChange({
    contentType: "servicesCatalog",
    operation: "reorder",
    args: { id, direction },
    label: `Reorder service: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/services"],
  });
  revalidatePath("/admin/pending-changes");
}
