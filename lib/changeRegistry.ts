import { setSiteConfig } from "@/lib/content/siteConfig";
import { createCard, updateCard, deleteCard, reorderCard } from "@/lib/content/cards";
import { createCaseStudy, updateCaseStudy, deleteCaseStudy, reorderCaseStudy } from "@/lib/content/caseStudies";
import { updateProcessStep, reorderProcessStep } from "@/lib/content/processSteps";
import { createPillar, updatePillar, deletePillar, reorderPillar } from "@/lib/content/pillars";
import { createIntroCard, updateIntroCard, deleteIntroCard, reorderIntroCard } from "@/lib/content/introCards";
import {
  createNewsletterPost,
  updateNewsletterPost,
  deleteNewsletterPost,
  reorderNewsletterPost,
} from "@/lib/content/newsletter";
import { STATS_KEY } from "@/lib/content/stats";
import { FOOTER_KEY } from "@/lib/content/footer";
import { NAVBAR_KEY } from "@/lib/content/navbar";
import { CASE_STUDY_PAGE_KEY } from "@/lib/content/caseStudyPage";
import { GLOBAL_MARKET_PAGE_KEY } from "@/lib/content/globalMarketPage";
import { INDIAN_MARKET_PAGE_KEY } from "@/lib/content/indianMarketPage";
import { INVESTORS_PAGE_KEY } from "@/lib/content/investorsPage";
import { OUR_STORY_PAGE_KEY } from "@/lib/content/ourStoryPage";
import { PRODUCTS_PAGE_KEY } from "@/lib/content/productsPage";
import { SOLUTIONS_PAGE_KEY } from "@/lib/content/solutionsPage";
import { SUSTAINABILITY_PAGE_KEY } from "@/lib/content/sustainabilityPage";
import { TECHNOLOGIES_PAGE_KEY } from "@/lib/content/technologiesPage";
import type { PendingChange } from "@/lib/pendingChanges";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const REGISTRY: Record<string, (args: any) => Promise<void>> = {
  "cards:create": (args) => createCard(args),
  "cards:update": (args) => updateCard(args.id, args),
  "cards:delete": (args) => deleteCard(args.id),
  "cards:reorder": (args) => reorderCard(args.id, args.direction),

  "caseStudies:create": (args) => createCaseStudy(args),
  "caseStudies:update": (args) => updateCaseStudy(args.id, args),
  "caseStudies:delete": (args) => deleteCaseStudy(args.id),
  "caseStudies:reorder": (args) => reorderCaseStudy(args.id, args.direction),

  "processSteps:update": (args) => updateProcessStep(args.id, args),
  "processSteps:reorder": (args) => reorderProcessStep(args.id, args.direction),

  "pillars:create": (args) => createPillar(args),
  "pillars:update": (args) => updatePillar(args.id, args),
  "pillars:delete": (args) => deletePillar(args.id),
  "pillars:reorder": (args) => reorderPillar(args.id, args.direction),

  "introCards:create": (args) => createIntroCard(args),
  "introCards:update": (args) => updateIntroCard(args.id, args),
  "introCards:delete": (args) => deleteIntroCard(args.id),
  "introCards:reorder": (args) => reorderIntroCard(args.id, args.direction),

  "newsletter:create": (args) => createNewsletterPost(args),
  "newsletter:update": (args) => updateNewsletterPost(args.id, args),
  "newsletter:delete": (args) => deleteNewsletterPost(args.id),
  "newsletter:reorder": (args) => reorderNewsletterPost(args.id, args.direction),

  "stats:update": (args) => setSiteConfig(STATS_KEY, args),
  "footer:update": (args) => setSiteConfig(FOOTER_KEY, args),
  "navbar:update": (args) => setSiteConfig(NAVBAR_KEY, args),
  "caseStudyPage:update": (args) => setSiteConfig(CASE_STUDY_PAGE_KEY, args),
  "globalMarketPage:update": (args) => setSiteConfig(GLOBAL_MARKET_PAGE_KEY, args),
  "indianMarketPage:update": (args) => setSiteConfig(INDIAN_MARKET_PAGE_KEY, args),
  "investorsPage:update": (args) => setSiteConfig(INVESTORS_PAGE_KEY, args),
  "ourStoryPage:update": (args) => setSiteConfig(OUR_STORY_PAGE_KEY, args),
  "productsPage:update": (args) => setSiteConfig(PRODUCTS_PAGE_KEY, args),
  "solutionsPage:update": (args) => setSiteConfig(SOLUTIONS_PAGE_KEY, args),
  "sustainabilityPage:update": (args) => setSiteConfig(SUSTAINABILITY_PAGE_KEY, args),
  "technologiesPage:update": (args) => setSiteConfig(TECHNOLOGIES_PAGE_KEY, args),
};

export async function applyChange(change: PendingChange): Promise<void> {
  const key = `${change.contentType}:${change.operation}`;
  const handler = REGISTRY[key];
  if (!handler) {
    throw new Error(`No registry handler for "${key}".`);
  }
  await handler(change.args);
}
