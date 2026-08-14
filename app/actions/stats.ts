"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getStatsConfig, type StatsConfig } from "@/lib/content/stats";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";
import type { StatItem } from "@/components/StatsSection";

export async function updateStatsConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const values = formData.getAll("statValue").map(String);
  const labels = formData.getAll("statLabel").map(String);
  const stats: StatItem[] = values
    .map((value, i) => ({ value, label: labels[i] ?? "" }))
    .filter((s) => s.value.trim() !== "" || s.label.trim() !== "");

  const args: StatsConfig = {
    stats,
    batteryImageUrl: String(formData.get("batteryImageUrl") ?? ""),
    plantImageUrl: String(formData.get("plantImageUrl") ?? ""),
  };

  const previous = await getStatsConfig();

  await submitChange({
    contentType: "stats",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Stats settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}
