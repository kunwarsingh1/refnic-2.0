"use server";

import { isAdmin, getAdminEmail } from "@/lib/admin-auth";
import { getNavbarConfig, type NavbarConfig, type NavLink, type AboutMenuItem } from "@/lib/content/navbar";
import { submitChange } from "@/lib/pendingChanges";
import { revalidatePath } from "next/cache";

function parseLinkRows(formData: FormData, labelField: string, hrefField: string): NavLink[] {
  const labels = formData.getAll(labelField).map(String);
  const hrefs = formData.getAll(hrefField).map(String);
  return labels.map((label, i) => ({ label, href: hrefs[i] || "#" }));
}

function parseAboutRows(formData: FormData): AboutMenuItem[] {
  const titles = formData.getAll("aboutTitle").map(String);
  const subtitles = formData.getAll("aboutSubtitle").map(String);
  const hrefs = formData.getAll("aboutHref").map(String);
  return titles.map((title, i) => ({ title, subtitle: subtitles[i] ?? "", href: hrefs[i] || "#" }));
}

export async function updateNavbarConfigAction(formData: FormData): Promise<void> {
  if (!(await isAdmin())) return;

  const args: NavbarConfig = {
    contactEmail: String(formData.get("contactEmail") ?? ""),
    contactPhone: String(formData.get("contactPhone") ?? ""),
    productsMenu: parseLinkRows(formData, "productsLabel", "productsHref"),
    technologiesMenu: parseLinkRows(formData, "techLabel", "techHref"),
    aboutMenu: parseAboutRows(formData),
  };

  const previous = await getNavbarConfig();

  await submitChange({
    contentType: "navbar",
    operation: "update",
    args,
    previousArgs: previous,
    label: "Navbar settings",
    submittedBy: await getAdminEmail(),
    publicRevalidatePaths: ["/"],
  });
  revalidatePath("/admin/pending-changes");
}
