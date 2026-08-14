import { getSiteConfig } from "@/lib/content/siteConfig";

export const CASE_STUDY_PAGE_KEY = "caseStudyPage";

export type CaseStudyPageConfig = {
  heroHeading: string;
  resultsHeading: string;
  resultHighlights: string[];
  galleryImageUrls: string[];
  brandLine: string;
  ctaLabel: string;
};

export const DEFAULT_CASE_STUDY_PAGE_CONFIG: CaseStudyPageConfig = {
  heroHeading:
    "Every plant is more than an installation — it's a case study in engineering, execution, and sustainable resource recovery.",
  resultsHeading: "RESULTS",
  resultHighlights: [
    "Optimized Material Flow",
    "Reduced Operational Complexity",
    "Engineered for High Recovery",
    "Designed for Future Expansion",
    "Scalable Plant Architecture",
    "Commercially Operational",
  ],
  galleryImageUrls: [],
  brandLine: "Refine Nicely.",
  ctaLabel: "Get Quote",
};

export async function getCaseStudyPageConfig(): Promise<CaseStudyPageConfig> {
  return getSiteConfig<CaseStudyPageConfig>(CASE_STUDY_PAGE_KEY, DEFAULT_CASE_STUDY_PAGE_CONFIG);
}
