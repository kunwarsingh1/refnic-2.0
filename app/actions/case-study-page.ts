"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getCaseStudyPageConfig, type CaseStudyPageConfig } from "@/lib/content/caseStudyPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updateCaseStudyPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: CaseStudyPageConfig = {
    heroHeading: String(formData.get("heroHeading") ?? ""),
    resultsHeading: String(formData.get("resultsHeading") ?? ""),
    resultHighlights: formData
      .getAll("resultHighlight")
      .map(String)
      .filter((s) => s.trim() !== ""),
    galleryImageUrls: formData
      .getAll("galleryImageUrl")
      .map(String)
      .filter((s) => s.trim() !== ""),
    brandLine: String(formData.get("brandLine") ?? ""),
    ctaLabel: String(formData.get("ctaLabel") ?? ""),
  };

  const previous = await getCaseStudyPageConfig();

  await submitChange({
    contentType: "caseStudyPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Case Study page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/case-study"],
  });
  revalidatePath("/admin/pending-changes");
}
