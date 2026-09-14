"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getSolutionCatalogItemById, type SolutionCatalogItemInput } from "@/lib/content/solutionsCatalog";
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

function parseInput(formData: FormData): SolutionCatalogItemInput {
  return {
    category: String(formData.get("category") ?? ""),
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
    contentType: String(formData.get("contentType") ?? "pdf") as "pdf" | "image" | "text",
    showcaseImageUrl: String(formData.get("showcaseImageUrl") ?? "") || undefined,
    showcaseText: String(formData.get("showcaseText") ?? ""),
  };
}

export async function createSolutionCatalogItemAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const args = parseInput(formData);
  await submitChange({
    contentType: "solutionsCatalog",
    operation: "create",
    args,
    label: `New solution: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/solutions"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function updateSolutionCatalogItemAction(id: string, formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getSolutionCatalogItemById(id);
  const args = { id, ...parseInput(formData) };
  await submitChange({
    contentType: "solutionsCatalog",
    operation: "update",
    args,
    previousArgs: previous,
    label: `Solution: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/solutions"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function deleteSolutionCatalogItemAction(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getSolutionCatalogItemById(id);
  await submitChange({
    contentType: "solutionsCatalog",
    operation: "delete",
    args: { id },
    previousArgs: previous,
    label: `Delete solution: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/solutions"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function reorderSolutionCatalogItemAction(id: string, direction: "up" | "down"): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getSolutionCatalogItemById(id);
  await submitChange({
    contentType: "solutionsCatalog",
    operation: "reorder",
    args: { id, direction },
    label: `Reorder solution: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/solutions"],
  });
  revalidatePath("/admin/pending-changes");
}
