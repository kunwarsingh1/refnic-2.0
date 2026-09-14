import { getSiteConfig } from "@/lib/content/siteConfig";

export const WHITE_PAPERS_PAGE_KEY = "whitePapersPage";

export type WhitePapersPageConfig = {
  heroHeading: string;
  heroBody: string;
  heroImageUrl?: string;
  closingHeading: string;
  closingImageUrl?: string;
  closingBody: string;
  closingCtaLabel: string;
  closingCtaHref: string;
};

export const DEFAULT_WHITE_PAPERS_PAGE_CONFIG: WhitePapersPageConfig = {
  heroHeading: "White Papers",
  heroBody:
    "Our white papers examine the technologies, processes, and challenges shaping modern metal refining, recycling, and resource recovery. Developed to provide deeper technical insight, they support engineers, decision-makers, and industry professionals evaluating new processes and technologies.",
  closingHeading: "Go Deeper Into the Technology",
  closingBody:
    "Explore our technical research and engineering perspectives, or connect with the Refnic team to discuss how these insights can be applied to your refining or recycling project.",
  closingCtaLabel: "Contact us",
  closingCtaHref: "/contact",
};

export async function getWhitePapersPageConfig(): Promise<WhitePapersPageConfig> {
  const stored = await getSiteConfig<Partial<WhitePapersPageConfig>>(WHITE_PAPERS_PAGE_KEY, {});
  return { ...DEFAULT_WHITE_PAPERS_PAGE_CONFIG, ...stored };
}
