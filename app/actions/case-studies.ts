"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getCaseStudyById, type CaseStudyInput } from "@/lib/content/caseStudies";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function parseInput(formData: FormData): CaseStudyInput {
  return {
    city: String(formData.get("city") ?? ""),
    country: String(formData.get("country") ?? "") || undefined,
    label: String(formData.get("label") ?? ""),
    body: String(formData.get("body") ?? ""),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    imageUrl2: String(formData.get("imageUrl2") ?? "") || undefined,
    tagline: String(formData.get("tagline") ?? "") || undefined,
    overviewSubheading: String(formData.get("overviewSubheading") ?? "") || undefined,
    overviewBody: String(formData.get("overviewBody") ?? "") || undefined,
    challengeSubheading: String(formData.get("challengeSubheading") ?? "") || undefined,
    challengeBody: String(formData.get("challengeBody") ?? "") || undefined,
    approachSubheading: String(formData.get("approachSubheading") ?? "") || undefined,
    approachIntro: String(formData.get("approachIntro") ?? "") || undefined,
    approachBody: String(formData.get("approachBody") ?? "") || undefined,
    approachSecondaryHeading: String(formData.get("approachSecondaryHeading") ?? "") || undefined,
    approachBullets: formData
      .getAll("approachBullet")
      .map(String)
      .map((s) => s.trim())
      .filter(Boolean),
    status: String(formData.get("status") ?? "") || undefined,
    subtitle: String(formData.get("subtitle") ?? "") || undefined,
    modelUrl: String(formData.get("modelUrl") ?? "") || undefined,
  };
}

export async function createCaseStudyAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const args = parseInput(formData);
  await submitChange({
    contentType: "caseStudies",
    operation: "create",
    args,
    label: `New case study: ${args.city}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/", "/case-study"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function updateCaseStudyAction(id: string, formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getCaseStudyById(id);
  const args = { id, ...parseInput(formData) };
  await submitChange({
    contentType: "caseStudies",
    operation: "update",
    args,
    previousArgs: previous,
    label: `Case study: ${args.city}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/", "/case-study"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function deleteCaseStudyAction(id: string): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getCaseStudyById(id);
  await submitChange({
    contentType: "caseStudies",
    operation: "delete",
    args: { id },
    previousArgs: previous,
    label: `Delete case study: ${previous?.city ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/", "/case-study"],
  });
  revalidatePath("/admin/pending-changes");
}

export async function reorderCaseStudyAction(id: string, direction: "up" | "down"): Promise<void> {
  if (!(await isAdmin())) return;
  const previous = await getCaseStudyById(id);
  await submitChange({
    contentType: "caseStudies",
    operation: "reorder",
    args: { id, direction },
    label: `Reorder case study: ${previous?.city ?? id}`,
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/", "/case-study"],
  });
  revalidatePath("/admin/pending-changes");
}
