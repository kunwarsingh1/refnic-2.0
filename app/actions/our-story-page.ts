"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getOurStoryPageConfig, type OurStoryPageConfig } from "@/lib/content/ourStoryPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updateOurStoryPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const numbers = formData.getAll("sectionNumber").map(String);
  const headings = formData.getAll("sectionHeading").map(String);
  const bodies = formData.getAll("sectionBody").map(String);

  const args: OurStoryPageConfig = {
    heroLabel: String(formData.get("heroLabel") ?? ""),
    heroSubheading: String(formData.get("heroSubheading") ?? ""),
    numberedSections: headings
      .map((heading, i) => ({ number: numbers[i] ?? String(i + 1).padStart(2, "0"), heading, body: bodies[i] ?? "" }))
      .filter((s) => s.heading.trim() !== ""),
    closingTagline: String(formData.get("closingTagline") ?? ""),
    ctaLabel: String(formData.get("ctaLabel") ?? ""),
  };

  const previous = await getOurStoryPageConfig();

  await submitChange({
    contentType: "ourStoryPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Our Story page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/our-story"],
  });
  revalidatePath("/admin/pending-changes");
}
