import { getSiteConfig } from "@/lib/content/siteConfig";

export const DIGITAL_TOOLS_PAGE_KEY = "digitalToolsPage";

export type DigitalToolsPageConfig = {
  heroHeading: string;
  heroBody: string;
  heroImageUrl?: string;
  closingHeading: string;
  closingImageUrl?: string;
  closingBody: string;
  closingCtaLabel: string;
  closingCtaHref: string;
};

export const DEFAULT_DIGITAL_TOOLS_PAGE_CONFIG: DigitalToolsPageConfig = {
  heroHeading: "Digital Tools",
  heroBody:
    "Practical digital tools to help you evaluate materials, explore processes, and make informed engineering decisions.",
  closingHeading: "Ready to Go Beyond the Calculator?",
  closingBody:
    "Take the next step from digital estimates to engineered refining and recycling solutions tailored to your process.",
  closingCtaLabel: "Talk To Our Experts",
  closingCtaHref: "/contact",
};

export async function getDigitalToolsPageConfig(): Promise<DigitalToolsPageConfig> {
  const stored = await getSiteConfig<Partial<DigitalToolsPageConfig>>(DIGITAL_TOOLS_PAGE_KEY, {});
  return { ...DEFAULT_DIGITAL_TOOLS_PAGE_CONFIG, ...stored };
}
