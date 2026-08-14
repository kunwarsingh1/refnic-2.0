"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getTechnologiesPageConfig, type TechnologiesPageConfig } from "@/lib/content/technologiesPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function nonEmpty(values: FormDataEntryValue[]): string[] {
  return values.map(String).filter((s) => s.trim() !== "");
}

export async function updateTechnologiesPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: TechnologiesPageConfig = {
    intelligenceLabel: String(formData.get("intelligenceLabel") ?? ""),
    heading: String(formData.get("heading") ?? ""),
    bodyParagraphs: nonEmpty(formData.getAll("bodyParagraph")),
    topics: nonEmpty(formData.getAll("topic")),
    newsletterHeading: String(formData.get("newsletterHeading") ?? ""),
    newsletterBody: String(formData.get("newsletterBody") ?? ""),
    newsletterCtaLabel: String(formData.get("newsletterCtaLabel") ?? ""),
  };

  const previous = await getTechnologiesPageConfig();

  await submitChange({
    contentType: "technologiesPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Technologies page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/technologies"],
  });
  revalidatePath("/admin/pending-changes");
}
