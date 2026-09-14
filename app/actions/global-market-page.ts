"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getGlobalMarketPageConfig, type GlobalMarketPageConfig } from "@/lib/content/globalMarketPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function nonEmpty(values: FormDataEntryValue[]): string[] {
  return values.map(String).filter((s) => s.trim() !== "");
}

export async function updateGlobalMarketPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const sectionHeadings = formData.getAll("sectionHeading").map(String);
  const sectionBodies = formData.getAll("sectionBody").map(String);
  const sectionImageUrls = formData.getAll("sectionImageUrl").map(String);
  const advTitles = formData.getAll("advTitle").map(String);
  const advBodies = formData.getAll("advBody").map(String);
  const advImageUrls = formData.getAll("advImageUrl").map(String);

  const args: GlobalMarketPageConfig = {
    heroBadges: nonEmpty(formData.getAll("heroBadge")),
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroParagraphs: formData.getAll("heroParagraph").map(String),
    narrativeSections: sectionHeadings
      .map((heading, i) => ({ heading, body: sectionBodies[i] ?? "", imageUrl: sectionImageUrls[i] || undefined }))
      .filter((s) => s.heading.trim() !== ""),
    marketCards: nonEmpty(formData.getAll("marketCard")),
    advantageCards: advTitles
      .map((title, i) => ({ title, body: advBodies[i] ?? "", imageUrl: advImageUrls[i] || undefined }))
      .filter((c) => c.title.trim() !== ""),
    closingLabel: String(formData.get("closingLabel") ?? ""),
    closingHeading: String(formData.get("closingHeading") ?? ""),
    closingBody: String(formData.get("closingBody") ?? ""),
    ctaLabel: String(formData.get("ctaLabel") ?? ""),
  };

  const previous = await getGlobalMarketPageConfig();

  await submitChange({
    contentType: "globalMarketPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Global Market page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/global-market"],
  });
  revalidatePath("/admin/pending-changes");
}
