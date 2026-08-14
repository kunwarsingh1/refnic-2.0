"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getFooterConfig, type FooterConfig, type FooterLink } from "@/lib/content/footer";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function parseLinkList(formData: FormData, labelField: string, hrefField: string): FooterLink[] {
  const labels = formData.getAll(labelField).map(String);
  const hrefs = formData.getAll(hrefField).map(String);
  return labels
    .map((label, i) => ({ label, href: hrefs[i] || "#" }))
    .filter((l) => l.label.trim() !== "");
}

export async function updateFooterConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const columnTitles = formData.getAll("columnTitle").map(String);
  const linkColumns = columnTitles.map((title, i) => ({
    title,
    links: parseLinkList(formData, `columnLinkLabel-${i}`, `columnLinkHref-${i}`),
  }));

  const args: FooterConfig = {
    brandName: String(formData.get("brandName") ?? "Refnic"),
    watermarkText: String(formData.get("watermarkText") ?? "REFINE NICELY"),
    tagline: String(formData.get("tagline") ?? ""),
    linkColumns,
    social: {
      linkedin: String(formData.get("linkedin") ?? "#"),
      youtube: String(formData.get("youtube") ?? "#"),
      email: String(formData.get("socialEmail") ?? "#"),
    },
    contactHeading: String(formData.get("contactHeading") ?? "Contact Us"),
    contactEmail: String(formData.get("contactEmail") ?? ""),
    contactPhone: String(formData.get("contactPhone") ?? ""),
    contactAddress: String(formData.get("contactAddress") ?? ""),
    copyrightName: String(formData.get("copyrightName") ?? ""),
    bottomLinks: parseLinkList(formData, "bottomLinkLabel", "bottomLinkHref"),
  };

  const previous = await getFooterConfig();

  await submitChange({
    contentType: "footer",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Footer settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}
