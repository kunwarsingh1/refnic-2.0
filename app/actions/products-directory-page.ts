"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import {
  getProductsDirectoryPageConfig,
  type ProductsDirectoryPageConfig,
} from "@/lib/content/productsDirectoryPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updateProductsDirectoryPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: ProductsDirectoryPageConfig = {
    heroBody: String(formData.get("heroBody") ?? ""),
    closingHeading: String(formData.get("closingHeading") ?? ""),
    closingImageUrl: String(formData.get("closingImageUrl") ?? "") || undefined,
    closingBody: String(formData.get("closingBody") ?? ""),
    closingCtaLabel: String(formData.get("closingCtaLabel") ?? ""),
    closingCtaHref: String(formData.get("closingCtaHref") ?? ""),
  };

  const previous = await getProductsDirectoryPageConfig();

  await submitChange({
    contentType: "productsDirectoryPage",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Products directory page settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/products"],
  });
  revalidatePath("/admin/pending-changes");
}
