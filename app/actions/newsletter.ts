"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getNewsletterPostById } from "@/lib/content/newsletter";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function parseInput(formData: FormData) {
  return {
    category: String(formData.get("category") ?? ""),
    title: String(formData.get("title") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    author: String(formData.get("author") ?? ""),
    meta: String(formData.get("meta") ?? ""),
    gradient: String(formData.get("gradient") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? "") || undefined,
    date: String(formData.get("date") ?? ""),
  };
}

export async function createNewsletterPostAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const args = parseInput(formData);
  await submitChange({
    contentType: "newsletter",
    operation: "create",
    args,
    label: `New newsletter post: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/", "/newsletter"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function updateNewsletterPostAction(id: string, formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getNewsletterPostById(id);
  const args = { id, ...parseInput(formData) };
  await submitChange({
    contentType: "newsletter",
    operation: "update",
    args,
    previousArgs: previous,
    label: `Newsletter post: ${args.title}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/", "/newsletter"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function deleteNewsletterPostAction(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getNewsletterPostById(id);
  await submitChange({
    contentType: "newsletter",
    operation: "delete",
    args: { id },
    previousArgs: previous,
    label: `Delete newsletter post: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/", "/newsletter"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function reorderNewsletterPostAction(id: string, direction: "up" | "down"): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getNewsletterPostById(id);
  await submitChange({
    contentType: "newsletter",
    operation: "reorder",
    args: { id, direction },
    label: `Reorder newsletter post: ${previous?.title ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/", "/newsletter"],
  });
  revalidatePath("/admin/pending-changes");
}
