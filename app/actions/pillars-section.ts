"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getPillarsSectionConfig, type PillarsSectionConfig } from "@/lib/content/pillarsSection";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updatePillarsSectionConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const previous = await getPillarsSectionConfig();
  const args: PillarsSectionConfig = {
    desktopVideoUrl: String(formData.get("desktopVideoUrl") ?? "") || previous.desktopVideoUrl,
    mobileVideoUrl: String(formData.get("mobileVideoUrl") ?? ""),
  };

  await submitChange({
    contentType: "pillarsSection",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Pillars section video",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}
