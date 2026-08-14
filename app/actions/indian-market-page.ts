"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getIndianMarketPageConfig, type IndianMarketPageConfig } from "@/lib/content/indianMarketPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function nonEmpty(values: FormDataEntryValue[]): string[] {
  return values.map(String).filter((s) => s.trim() !== "");
}

export async function updateIndianMarketPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const sectionHeadings = formData.getAll("sectionHeading").map(String);
  const sectionBodies = formData.getAll("sectionBody").map(String);

  const args: IndianMarketPageConfig = {
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroSubheading: String(formData.get("heroSubheading") ?? ""),
    statHighlights: nonEmpty(formData.getAll("statHighlight")),
    driversHeading: String(formData.get("driversHeading") ?? ""),
    driverBadges: nonEmpty(formData.getAll("driverBadge")),
    driverParagraphs: formData.getAll("driverParagraph").map(String),
    industriesHeading: String(formData.get("industriesHeading") ?? ""),
    industries: nonEmpty(formData.getAll("industry")),
    narrativeSections: sectionHeadings
      .map((heading, i) => ({ heading, body: sectionBodies[i] ?? "" }))
      .filter((s) => s.heading.trim() !== ""),
    closingTagline: String(formData.get("closingTagline") ?? ""),
    closingHeading: String(formData.get("closingHeading") ?? ""),
  };

  const previous = await getIndianMarketPageConfig();

  await submitChange({
    contentType: "indianMarketPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Indian Market page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/indian-market"],
  });
  revalidatePath("/admin/pending-changes");
}
