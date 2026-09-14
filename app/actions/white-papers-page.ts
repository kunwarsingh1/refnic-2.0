"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getWhitePapersPageConfig, type WhitePapersPageConfig } from "@/lib/content/whitePapersPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updateWhitePapersPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: WhitePapersPageConfig = {
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroBody: String(formData.get("heroBody") ?? ""),
    heroImageUrl: String(formData.get("heroImageUrl") ?? "") || undefined,
    closingHeading: String(formData.get("closingHeading") ?? ""),
    closingImageUrl: String(formData.get("closingImageUrl") ?? "") || undefined,
    closingBody: String(formData.get("closingBody") ?? ""),
    closingCtaLabel: String(formData.get("closingCtaLabel") ?? ""),
    closingCtaHref: String(formData.get("closingCtaHref") ?? ""),
  };

  const previous = await getWhitePapersPageConfig();

  await submitChange({
    contentType: "whitePapersPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "White Papers page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/white-papers"],
  });
  revalidatePath("/admin/pending-changes");
}
