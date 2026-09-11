"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getNewsletterTabById } from "@/lib/content/newsletterTabs";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function parseInput(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
  };
}

export async function createNewsletterTabAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const args = parseInput(formData);
  await submitChange({
    contentType: "newsletterTabs",
    operation: "create",
    args,
    label: `New newsletter tab: ${args.name}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/newsletter"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function updateNewsletterTabAction(id: string, formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getNewsletterTabById(id);
  const args = { id, ...parseInput(formData) };
  await submitChange({
    contentType: "newsletterTabs",
    operation: "update",
    args,
    previousArgs: previous,
    label: `Newsletter tab: ${args.name}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/newsletter"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function deleteNewsletterTabAction(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getNewsletterTabById(id);
  await submitChange({
    contentType: "newsletterTabs",
    operation: "delete",
    args: { id },
    previousArgs: previous,
    label: `Delete newsletter tab: ${previous?.name ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/newsletter"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function reorderNewsletterTabAction(id: string, direction: "up" | "down"): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getNewsletterTabById(id);
  await submitChange({
    contentType: "newsletterTabs",
    operation: "reorder",
    args: { id, direction },
    label: `Reorder newsletter tab: ${previous?.name ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/newsletter"],
  });
  revalidatePath("/admin/pending-changes");
}
