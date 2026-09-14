"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import {
  getSolutionsPageConfig,
  type NarrativeLayout,
  type NarrativeSection,
  type SolutionsPageConfig,
} from "@/lib/content/solutionsPage";
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

export async function updateSolutionsPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: SolutionsPageConfig = {
    heroWatermark: String(formData.get("heroWatermark") ?? ""),
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroBody: String(formData.get("heroBody") ?? ""),
    heroImageUrl: String(formData.get("heroImageUrl") ?? "") || undefined,
    heroCtaLabel: String(formData.get("heroCtaLabel") ?? ""),
    heroCtaHref: String(formData.get("heroCtaHref") ?? ""),
    narrativeSections: parseNarrativeSections(formData),
    mechanicalHeading: String(formData.get("mechanicalHeading") ?? ""),
    mechanicalTagline: String(formData.get("mechanicalTagline") ?? ""),
    mechanicalImageUrl: String(formData.get("mechanicalImageUrl") ?? "") || undefined,
    chemicalHeading: String(formData.get("chemicalHeading") ?? ""),
    chemicalTagline: String(formData.get("chemicalTagline") ?? ""),
    chemicalImageUrl: String(formData.get("chemicalImageUrl") ?? "") || undefined,
    closingHeading: String(formData.get("closingHeading") ?? ""),
    closingBody: String(formData.get("closingBody") ?? ""),
    closingImageUrl: String(formData.get("closingImageUrl") ?? "") || undefined,
    closingCtaLabel: String(formData.get("closingCtaLabel") ?? ""),
    closingCtaHref: String(formData.get("closingCtaHref") ?? ""),
  };

  const previous = await getSolutionsPageConfig();

  await submitChange({
    contentType: "solutionsPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Solutions page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/solutions"],
  });
  revalidatePath("/admin/pending-changes");
}
