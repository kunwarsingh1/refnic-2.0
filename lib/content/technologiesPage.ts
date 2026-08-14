import { getSiteConfig } from "@/lib/content/siteConfig";

export const TECHNOLOGIES_PAGE_KEY = "technologiesPage";

export type TechnologiesPageConfig = {
  intelligenceLabel: string;
  heading: string;
  bodyParagraphs: string[];
  topics: string[];
  newsletterHeading: string;
  newsletterBody: string;
  newsletterCtaLabel: string;
};

export const DEFAULT_TECHNOLOGIES_PAGE_CONFIG: TechnologiesPageConfig = {
  intelligenceLabel: "Industrial Intelligence",
  heading: "Industry Reports",
  bodyParagraphs: [
    "Stay ahead with engineering breakthroughs, market trends, policy updates, case studies, and technology insights delivered by Refnic.",
    "Market trends, investment opportunities, government policies, and global recycling developments.",
  ],
  topics: ["Engineering Insights", "Industry Reports", "Technology", "Sustainability", "Case Studies", "Company Updates"],
  newsletterHeading: "Stay Ahead of the Industry",
  newsletterBody: "Get engineering insights, market intelligence, and the latest innovations in recycling and metal refining.",
  newsletterCtaLabel: "Subscribe",
};

export async function getTechnologiesPageConfig(): Promise<TechnologiesPageConfig> {
  return getSiteConfig<TechnologiesPageConfig>(TECHNOLOGIES_PAGE_KEY, DEFAULT_TECHNOLOGIES_PAGE_CONFIG);
}
