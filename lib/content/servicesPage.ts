import { getSiteConfig } from "@/lib/content/siteConfig";

export const SERVICES_PAGE_KEY = "servicesPage";

export type ServicesPageConfig = {
  heroHeading: string;
  heroBody: string;
  categoryHeading: string;
  categoryTagline: string;
  categoryImageUrl?: string;
  closingHeading: string;
  closingBody: string;
  closingImageUrl?: string;
  closingCtaLabel: string;
  closingCtaHref: string;
};

export const DEFAULT_SERVICES_PAGE_CONFIG: ServicesPageConfig = {
  heroHeading: "Engineering Beyond Equipment.",
  heroBody:
    "From concept development to long-term operational support, Refnic delivers the expertise that powers successful industrial projects.",
  categoryHeading: "Project\nServices",
  categoryTagline: "Integrated technical, operational, and business\nsupport for every project\nphase.",
  closingHeading: "From Planning to Performance.",
  closingBody:
    "Whether you're building a new recycling facility, upgrading an existing plant, or optimizing your operations, Refnic provides the engineering expertise to help you succeed.",
  closingCtaLabel: "Talk to Our Experts",
  closingCtaHref: "/contact",
};

export async function getServicesPageConfig(): Promise<ServicesPageConfig> {
  const stored = await getSiteConfig<Partial<ServicesPageConfig>>(SERVICES_PAGE_KEY, {});
  return { ...DEFAULT_SERVICES_PAGE_CONFIG, ...stored };
}
