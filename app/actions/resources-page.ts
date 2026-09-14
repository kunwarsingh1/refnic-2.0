"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getResourcesPageConfig, type ResourcesPageConfig } from "@/lib/content/resourcesPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updateResourcesPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: ResourcesPageConfig = {
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroBody: String(formData.get("heroBody") ?? ""),
    closingHeading: String(formData.get("closingHeading") ?? ""),
    closingImageUrl: String(formData.get("closingImageUrl") ?? "") || undefined,
    closingBody: String(formData.get("closingBody") ?? ""),
    closingCtaLabel: String(formData.get("closingCtaLabel") ?? ""),
    closingCtaHref: String(formData.get("closingCtaHref") ?? ""),
  };

  const previous = await getResourcesPageConfig();

  await submitChange({
    contentType: "resourcesPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Resources page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/resources"],
  });
  revalidatePath("/admin/pending-changes");
}
