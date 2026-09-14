"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getDigitalToolsPageConfig, type DigitalToolsPageConfig } from "@/lib/content/digitalToolsPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updateDigitalToolsPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: DigitalToolsPageConfig = {
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroBody: String(formData.get("heroBody") ?? ""),
    heroImageUrl: String(formData.get("heroImageUrl") ?? "") || undefined,
    closingHeading: String(formData.get("closingHeading") ?? ""),
    closingImageUrl: String(formData.get("closingImageUrl") ?? "") || undefined,
    closingBody: String(formData.get("closingBody") ?? ""),
    closingCtaLabel: String(formData.get("closingCtaLabel") ?? ""),
    closingCtaHref: String(formData.get("closingCtaHref") ?? ""),
  };

  const previous = await getDigitalToolsPageConfig();

  await submitChange({
    contentType: "digitalToolsPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Digital Tools page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/digital-tools"],
  });
  revalidatePath("/admin/pending-changes");
}
