"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getNewsletterPageConfig, type NewsletterPageConfig } from "@/lib/content/newsletterPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updateNewsletterPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: NewsletterPageConfig = {
    subscribeImageUrl: String(formData.get("subscribeImageUrl") ?? "") || undefined,
  };

  const previous = await getNewsletterPageConfig();

  await submitChange({
    contentType: "newsletterPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Newsletter page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/newsletter"],
  });
  revalidatePath("/admin/pending-changes");
}
