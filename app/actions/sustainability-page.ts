"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getSustainabilityPageConfig, type SustainabilityPageConfig } from "@/lib/content/sustainabilityPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function nonEmpty(values: FormDataEntryValue[]): string[] {
  return values.map(String).filter((s) => s.trim() !== "");
}

function parseCards(
  formData: FormData,
  titleField: string,
  bodyField: string,
  ctaField: string,
): { title: string; body: string; ctaLabel: string }[] {
  const titles = formData.getAll(titleField).map(String);
  const bodies = formData.getAll(bodyField).map(String);
  const ctas = formData.getAll(ctaField).map(String);
  return titles
    .map((title, i) => ({ title, body: bodies[i] ?? "", ctaLabel: ctas[i] ?? "" }))
    .filter((c) => c.title.trim() !== "");
}

export async function updateSustainabilityPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: SustainabilityPageConfig = {
    heroLabel: String(formData.get("heroLabel") ?? ""),
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroBody: String(formData.get("heroBody") ?? ""),
    heroCtaLabel: String(formData.get("heroCtaLabel") ?? ""),
    impactCards: parseCards(formData, "impactTitle", "impactBody", "impactCta"),
    impactSectionHeading: String(formData.get("impactSectionHeading") ?? ""),
    processSteps: nonEmpty(formData.getAll("processStep")),
    approachHeading: String(formData.get("approachHeading") ?? ""),
    approachBody: String(formData.get("approachBody") ?? ""),
    approachCards: parseCards(formData, "approachTitle", "approachBody2", "approachCta"),
    closingBody: String(formData.get("closingBody") ?? ""),
    closingCtaLabel: String(formData.get("closingCtaLabel") ?? ""),
  };

  const previous = await getSustainabilityPageConfig();

  await submitChange({
    contentType: "sustainabilityPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Sustainability page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/sustainability"],
  });
  revalidatePath("/admin/pending-changes");
}
