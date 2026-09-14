"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getInvestorsPageConfig, type InvestorsPageConfig } from "@/lib/content/investorsPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updateInvestorsPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const numbers = formData.getAll("sectionNumber").map(String);
  const headings = formData.getAll("sectionHeading").map(String);
  const bodies = formData.getAll("sectionBody").map(String);
  const imageUrls = formData.getAll("sectionImageUrl").map(String);

  const args: InvestorsPageConfig = {
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroSubheading: String(formData.get("heroSubheading") ?? ""),
    numberedSections: headings
      .map((heading, i) => ({
        number: numbers[i] ?? String(i + 1).padStart(2, "0"),
        heading,
        body: bodies[i] ?? "",
        imageUrl: imageUrls[i] || undefined,
      }))
      .filter((s) => s.heading.trim() !== ""),
    whyNowHeading: String(formData.get("whyNowHeading") ?? ""),
    whyNowReasons: formData
      .getAll("whyNowReasonText")
      .map(String)
      .map((text, i) => ({
        text,
        imageUrl: String(formData.getAll("whyNowReasonImageUrl")[i] ?? "") || undefined,
      }))
      .filter((r) => r.text.trim() !== ""),
    visionLabel: String(formData.get("visionLabel") ?? ""),
    visionHeading: String(formData.get("visionHeading") ?? ""),
    visionBody: String(formData.get("visionBody") ?? ""),
    closingHeading: String(formData.get("closingHeading") ?? ""),
    ctaLabel: String(formData.get("ctaLabel") ?? ""),
  };

  const previous = await getInvestorsPageConfig();

  await submitChange({
    contentType: "investorsPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Investors page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/investors"],
  });
  revalidatePath("/admin/pending-changes");
}
