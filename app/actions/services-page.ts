"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getServicesPageConfig, type ServicesPageConfig } from "@/lib/content/servicesPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updateServicesPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: ServicesPageConfig = {
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroBody: String(formData.get("heroBody") ?? ""),
    categoryHeading: String(formData.get("categoryHeading") ?? ""),
    categoryTagline: String(formData.get("categoryTagline") ?? ""),
    categoryImageUrl: String(formData.get("categoryImageUrl") ?? "") || undefined,
    closingHeading: String(formData.get("closingHeading") ?? ""),
    closingBody: String(formData.get("closingBody") ?? ""),
    closingImageUrl: String(formData.get("closingImageUrl") ?? "") || undefined,
    closingCtaLabel: String(formData.get("closingCtaLabel") ?? ""),
    closingCtaHref: String(formData.get("closingCtaHref") ?? ""),
  };

  const previous = await getServicesPageConfig();

  await submitChange({
    contentType: "servicesPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Services page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/services"],
  });
  revalidatePath("/admin/pending-changes");
}
