"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getProductsPageConfig, type ProductsPageConfig } from "@/lib/content/productsPage";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

export async function updateProductsPageConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: ProductsPageConfig = {
    heading: String(formData.get("heading") ?? ""),
    subtitle: String(formData.get("subtitle") ?? ""),
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
