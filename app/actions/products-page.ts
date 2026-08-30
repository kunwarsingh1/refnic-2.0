"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import {
  getProductsPageConfig,
  type MaterialCard,
  type PlantStep,
  type ProductsPageConfig,
} from "@/lib/content/productsPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function parsePlantSteps(formData: FormData): PlantStep[] {
  const titles = formData.getAll("plantStepTitle").map(String);
  const subheadings = formData.getAll("plantStepSubheading").map(String);
  const keyEquipment = formData.getAll("plantStepKeyEquipment").map(String);
  const descriptions = formData.getAll("plantStepDescription").map(String);
  const imageUrls = formData.getAll("plantStepImageUrl").map(String);
  return titles
    .map((title, i) => ({
      title,
      subheading: subheadings[i] ?? "",
      keyEquipment: keyEquipment[i] ?? "",
      description: descriptions[i] ?? "",
      imageUrl: imageUrls[i] || undefined,
    }))
    .filter((s) => s.title.trim() !== "");
}

function parseMaterialCards(formData: FormData): MaterialCard[] {
  const titles = formData.getAll("materialCardTitle").map(String);
  const descriptions = formData.getAll("materialCardDescription").map(String);
  const imageUrls = formData.getAll("materialCardImageUrl").map(String);
  return titles
    .map((title, i) => ({ title, description: descriptions[i] ?? "", imageUrl: imageUrls[i] || undefined }))
    .filter((c) => c.title.trim() !== "");
}

export async function updateProductsPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: ProductsPageConfig = {
    heroWatermark: String(formData.get("heroWatermark") ?? ""),
    heroHeading: String(formData.get("heroHeading") ?? ""),
    heroIntro: String(formData.get("heroIntro") ?? ""),
    heroImageUrl: String(formData.get("heroImageUrl") ?? "") || undefined,
    heroCtaLabel: String(formData.get("heroCtaLabel") ?? ""),
    heroCtaHref: String(formData.get("heroCtaHref") ?? ""),
    crushingBlurb: String(formData.get("crushingBlurb") ?? ""),
    crushingImageUrl: String(formData.get("crushingImageUrl") ?? "") || undefined,
    processHeading: String(formData.get("processHeading") ?? ""),
    processIntro: String(formData.get("processIntro") ?? ""),
    plantSteps: parsePlantSteps(formData),
    materialRecoveryHeading: String(formData.get("materialRecoveryHeading") ?? ""),
    materialCards: parseMaterialCards(formData),
    ctaHeading: String(formData.get("ctaHeading") ?? ""),
    ctaBlurb: String(formData.get("ctaBlurb") ?? ""),
    ctaImageUrl: String(formData.get("ctaImageUrl") ?? "") || undefined,
    ctaButtonLabel: String(formData.get("ctaButtonLabel") ?? ""),
    ctaButtonHref: String(formData.get("ctaButtonHref") ?? ""),
  };

  const previous = await getProductsPageConfig();

  await submitChange({
    contentType: "productsPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Products page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/products"],
  });
  revalidatePath("/admin/pending-changes");
}
