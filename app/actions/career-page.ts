"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getCareerPageConfig, type CareerPageConfig } from "@/lib/content/careerPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updateCareerPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const traitTitles = formData.getAll("traitTitle").map(String);
  const traitBodies = formData.getAll("traitBody").map(String);
  const positionTitles = formData.getAll("positionTitle").map(String);
  const positionBodies = formData.getAll("positionBody").map(String);
  const positionImageUrls = formData.getAll("positionImageUrl").map(String);
  const photoCaptions = formData.getAll("photoCaption").map(String);
  const photoImageUrls = formData.getAll("photoImageUrl").map(String);

  const args: CareerPageConfig = {
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroSubheading: String(formData.get("heroSubheading") ?? ""),
    heroCtaLabel: String(formData.get("heroCtaLabel") ?? ""),
    missionHeading: String(formData.get("missionHeading") ?? ""),
    missionImageUrl: String(formData.get("missionImageUrl") ?? "") || undefined,
    missionBody: String(formData.get("missionBody") ?? ""),
    lookingForHeading: String(formData.get("lookingForHeading") ?? ""),
    traits: traitTitles.map((title, i) => ({ title, body: traitBodies[i] ?? "" })),
    openPositionsHeading: String(formData.get("openPositionsHeading") ?? ""),
    positions: positionTitles
      .map((title, i) => ({
        title,
        body: positionBodies[i] ?? "",
        imageUrl: positionImageUrls[i] || undefined,
      }))
      .filter((p) => p.title.trim() !== ""),
    applyButtonLabel: String(formData.get("applyButtonLabel") ?? ""),
    lifeHeading: String(formData.get("lifeHeading") ?? ""),
    photos: photoCaptions
      .map((caption, i) => ({ caption, imageUrl: photoImageUrls[i] || undefined }))
      .filter((p) => p.caption.trim() !== ""),
    closingHeading: String(formData.get("closingHeading") ?? ""),
    closingBody: String(formData.get("closingBody") ?? ""),
    closingCtaLabel: String(formData.get("closingCtaLabel") ?? ""),
  };

  const previous = await getCareerPageConfig();

  await submitChange({
    contentType: "careerPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Career page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/career"],
  });
  revalidatePath("/admin/pending-changes");
}
