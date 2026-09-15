"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getContactPageConfig, type ContactPageConfig } from "@/lib/content/contactPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function nonEmpty(values: FormDataEntryValue[]): string[] {
  return values.map(String).filter((s) => s.trim() !== "");
}

export async function updateContactPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: ContactPageConfig = {
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroSubheading: String(formData.get("heroSubheading") ?? ""),
    contactInfoHeading: String(formData.get("contactInfoHeading") ?? ""),
    formImageUrl: String(formData.get("formImageUrl") ?? "") || undefined,
    subjects: nonEmpty(formData.getAll("subject")),
    closingHeading: String(formData.get("closingHeading") ?? ""),
    closingImageUrl: String(formData.get("closingImageUrl") ?? "") || undefined,
    closingTagline: String(formData.get("closingTagline") ?? ""),
    closingBody: String(formData.get("closingBody") ?? ""),
    closingCtaLabel: String(formData.get("closingCtaLabel") ?? ""),
  };

  const previous = await getContactPageConfig();

  await submitChange({
    contentType: "contactPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Contact page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/contact", "/"],
  });
  revalidatePath("/admin/pending-changes");
}
