"use server";

import { getChangeByToken, resolveChange } from "@/lib/pendingChanges";
import { applyChange } from "@/lib/changeRegistry";
import { revalidatePath } from "next/cache";

export type ChangeActionResult = {
  ok: boolean;
  error?: string;
};

export async function approveChangeByToken(token: string): Promise<ChangeActionResult> {
  const change = await getChangeByToken(token);
  if (!change) {
    return { ok: false, error: "This review link is invalid or has been tampered with." };
  }
  if (change.status !== "pending") {
    return { ok: false, error: `This change was already ${change.status}.` };
  }

  try {
    await applyChange(change);
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not apply this change.",
    };
  }

  await resolveChange(change.id, "approved");

  for (const path of change.publicRevalidatePaths) {
    // "/" is revalidated layout-wide since site-chrome content (footer, navbar)
    // is rendered per-page rather than from the root layout, so a plain
    // page-level revalidation of "/" alone would miss every other route.
    if (path === "/") {
      revalidatePath("/", "layout");
    } else {
      revalidatePath(path);
    }
  }
  revalidatePath("/admin/pending-changes");

  return { ok: true };
}

export async function rejectChangeByToken(token: string): Promise<ChangeActionResult> {
  const change = await getChangeByToken(token);
  if (!change) {
    return { ok: false, error: "This review link is invalid or has been tampered with." };
  }
  if (change.status !== "pending") {
    return { ok: false, error: `This change was already ${change.status}.` };
  }

  await resolveChange(change.id, "rejected");
  revalidatePath("/admin/pending-changes");

  return { ok: true };
}
