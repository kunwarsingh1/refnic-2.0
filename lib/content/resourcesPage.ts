import { getSiteConfig } from "@/lib/content/siteConfig";

export const RESOURCES_PAGE_KEY = "resourcesPage";

export type ResourcesPageConfig = {
  heroHeading: string;
  heroBody: string;
  closingHeading: string;
  closingImageUrl?: string;
  closingBody: string;
  closingCtaLabel: string;
  closingCtaHref: string;
};

export const DEFAULT_RESOURCES_PAGE_CONFIG: ResourcesPageConfig = {
  heroHeading: "Resources",
  heroBody:
    "Technical knowledge, product information, and practical resources to support your refining and recycling projects.",
  closingHeading: "Need More Technical Information?",
  closingBody:
    "Whether you are exploring a new refining process, evaluating equipment, or planning a recycling project, our team is here to help. Access our technical resources or speak with our engineers to find the right solution for your application.",
  closingCtaLabel: "Talk To Our Experts",
  closingCtaHref: "/contact",
};

export async function getResourcesPageConfig(): Promise<ResourcesPageConfig> {
  const stored = await getSiteConfig<Partial<ResourcesPageConfig>>(RESOURCES_PAGE_KEY, {});
  return { ...DEFAULT_RESOURCES_PAGE_CONFIG, ...stored };
}
