import { setSiteConfig } from "@/lib/content/siteConfig";
import { createCard, updateCard, deleteCard, reorderCard } from "@/lib/content/cards";
import { createCaseStudy, updateCaseStudy, deleteCaseStudy, reorderCaseStudy } from "@/lib/content/caseStudies";
import { updateProcessStep, reorderProcessStep } from "@/lib/content/processSteps";
import { createPillar, updatePillar, deletePillar, reorderPillar } from "@/lib/content/pillars";
import { PILLARS_SECTION_KEY } from "@/lib/content/pillarsSection";
import { createIntroCard, updateIntroCard, deleteIntroCard, reorderIntroCard } from "@/lib/content/introCards";
import {
  createNewsletterPost,
  updateNewsletterPost,
  deleteNewsletterPost,
  reorderNewsletterPost,
} from "@/lib/content/newsletter";
import {
  createNewsletterTab,
  updateNewsletterTab,
  deleteNewsletterTab,
  reorderNewsletterTab,
} from "@/lib/content/newsletterTabs";
import {
  createProductCategory,
  updateProductCategory,
  deleteProductCategory,
  reorderProductCategory,
} from "@/lib/content/productCategories";
import {
  createProductCatalogItem,
  updateProductCatalogItem,
  deleteProductCatalogItem,
  reorderProductCatalogItem,
} from "@/lib/content/productCatalog";
import {
  createSolutionCatalogItem,
  updateSolutionCatalogItem,
  deleteSolutionCatalogItem,
  reorderSolutionCatalogItem,
} from "@/lib/content/solutionsCatalog";
import {
  createServiceCatalogItem,
  updateServiceCatalogItem,
  deleteServiceCatalogItem,
  reorderServiceCatalogItem,
} from "@/lib/content/servicesCatalog";
import {
  createSustainabilityCatalogItem,
  updateSustainabilityCatalogItem,
  deleteSustainabilityCatalogItem,
  reorderSustainabilityCatalogItem,
} from "@/lib/content/sustainabilityCatalog";
import {
  createResourceCatalogItem,
  updateResourceCatalogItem,
  deleteResourceCatalogItem,
  reorderResourceCatalogItem,
} from "@/lib/content/resourcesCatalog";
import { STATS_KEY } from "@/lib/content/stats";
import { FOOTER_KEY } from "@/lib/content/footer";
import { NAVBAR_KEY } from "@/lib/content/navbar";
import { CASE_STUDY_PAGE_KEY } from "@/lib/content/caseStudyPage";
import { CAREER_PAGE_KEY } from "@/lib/content/careerPage";
import { CONTACT_PAGE_KEY } from "@/lib/content/contactPage";
import { GLOBAL_MARKET_PAGE_KEY } from "@/lib/content/globalMarketPage";
import { INDIAN_MARKET_PAGE_KEY } from "@/lib/content/indianMarketPage";
import { INVESTORS_PAGE_KEY } from "@/lib/content/investorsPage";
import { OUR_STORY_PAGE_KEY } from "@/lib/content/ourStoryPage";
import { PRODUCTS_PAGE_KEY } from "@/lib/content/productsPage";
import { SOLUTIONS_PAGE_KEY } from "@/lib/content/solutionsPage";
import { SUSTAINABILITY_PAGE_KEY } from "@/lib/content/sustainabilityPage";
import { TECHNOLOGIES_PAGE_KEY } from "@/lib/content/technologiesPage";
import { NEWSLETTER_PAGE_KEY } from "@/lib/content/newsletterPage";
import { SERVICES_PAGE_KEY } from "@/lib/content/servicesPage";
import { RESOURCES_PAGE_KEY } from "@/lib/content/resourcesPage";
import { DIGITAL_TOOLS_PAGE_KEY } from "@/lib/content/digitalToolsPage";
import { WHITE_PAPERS_PAGE_KEY } from "@/lib/content/whitePapersPage";
import { PRODUCTS_DIRECTORY_PAGE_KEY } from "@/lib/content/productsDirectoryPage";
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
  "pillarsSection:update": (args) => setSiteConfig(PILLARS_SECTION_KEY, args),

  "introCards:create": (args) => createIntroCard(args),
  "introCards:update": (args) => updateIntroCard(args.id, args),
  "introCards:delete": (args) => deleteIntroCard(args.id),
  "introCards:reorder": (args) => reorderIntroCard(args.id, args.direction),

  "newsletter:create": (args) => createNewsletterPost(args),
  "newsletter:update": (args) => updateNewsletterPost(args.id, args),
  "newsletter:delete": (args) => deleteNewsletterPost(args.id),
  "newsletter:reorder": (args) => reorderNewsletterPost(args.id, args.direction),

  "newsletterTabs:create": (args) => createNewsletterTab(args),
  "newsletterTabs:update": (args) => updateNewsletterTab(args.id, args),
  "newsletterTabs:delete": (args) => deleteNewsletterTab(args.id),
  "newsletterTabs:reorder": (args) => reorderNewsletterTab(args.id, args.direction),

  "productCategories:create": (args) => createProductCategory(args),
  "productCategories:update": (args) => updateProductCategory(args.id, args),
  "productCategories:delete": (args) => deleteProductCategory(args.id),
  "productCategories:reorder": (args) => reorderProductCategory(args.id, args.direction),

  "productCatalog:create": (args) => createProductCatalogItem(args),
  "productCatalog:update": (args) => updateProductCatalogItem(args.id, args),
  "productCatalog:delete": (args) => deleteProductCatalogItem(args.id),
  "productCatalog:reorder": (args) => reorderProductCatalogItem(args.id, args.direction),

  "solutionsCatalog:create": (args) => createSolutionCatalogItem(args),
  "solutionsCatalog:update": (args) => updateSolutionCatalogItem(args.id, args),
  "solutionsCatalog:delete": (args) => deleteSolutionCatalogItem(args.id),
  "solutionsCatalog:reorder": (args) => reorderSolutionCatalogItem(args.id, args.direction),

  "servicesCatalog:create": (args) => createServiceCatalogItem(args),
  "servicesCatalog:update": (args) => updateServiceCatalogItem(args.id, args),
  "servicesCatalog:delete": (args) => deleteServiceCatalogItem(args.id),
  "servicesCatalog:reorder": (args) => reorderServiceCatalogItem(args.id, args.direction),

  "sustainabilityCatalog:create": (args) => createSustainabilityCatalogItem(args),
  "sustainabilityCatalog:update": (args) => updateSustainabilityCatalogItem(args.id, args),
  "sustainabilityCatalog:delete": (args) => deleteSustainabilityCatalogItem(args.id),
  "sustainabilityCatalog:reorder": (args) => reorderSustainabilityCatalogItem(args.id, args.direction),

  "resourcesCatalog:create": (args) => createResourceCatalogItem(args),
  "resourcesCatalog:update": (args) => updateResourceCatalogItem(args.id, args),
  "resourcesCatalog:delete": (args) => deleteResourceCatalogItem(args.id),
  "resourcesCatalog:reorder": (args) => reorderResourceCatalogItem(args.id, args.direction),

  "stats:update": (args) => setSiteConfig(STATS_KEY, args),
  "footer:update": (args) => setSiteConfig(FOOTER_KEY, args),
  "navbar:update": (args) => setSiteConfig(NAVBAR_KEY, args),
  "caseStudyPage:update": (args) => setSiteConfig(CASE_STUDY_PAGE_KEY, args),
  "careerPage:update": (args) => setSiteConfig(CAREER_PAGE_KEY, args),
  "contactPage:update": (args) => setSiteConfig(CONTACT_PAGE_KEY, args),
  "globalMarketPage:update": (args) => setSiteConfig(GLOBAL_MARKET_PAGE_KEY, args),
  "indianMarketPage:update": (args) => setSiteConfig(INDIAN_MARKET_PAGE_KEY, args),
  "investorsPage:update": (args) => setSiteConfig(INVESTORS_PAGE_KEY, args),
  "ourStoryPage:update": (args) => setSiteConfig(OUR_STORY_PAGE_KEY, args),
  "productsPage:update": (args) => setSiteConfig(PRODUCTS_PAGE_KEY, args),
  "solutionsPage:update": (args) => setSiteConfig(SOLUTIONS_PAGE_KEY, args),
  "sustainabilityPage:update": (args) => setSiteConfig(SUSTAINABILITY_PAGE_KEY, args),
  "technologiesPage:update": (args) => setSiteConfig(TECHNOLOGIES_PAGE_KEY, args),
  "newsletterPage:update": (args) => setSiteConfig(NEWSLETTER_PAGE_KEY, args),
  "servicesPage:update": (args) => setSiteConfig(SERVICES_PAGE_KEY, args),
  "resourcesPage:update": (args) => setSiteConfig(RESOURCES_PAGE_KEY, args),
  "digitalToolsPage:update": (args) => setSiteConfig(DIGITAL_TOOLS_PAGE_KEY, args),
  "whitePapersPage:update": (args) => setSiteConfig(WHITE_PAPERS_PAGE_KEY, args),
  "productsDirectoryPage:update": (args) => setSiteConfig(PRODUCTS_DIRECTORY_PAGE_KEY, args),
};

export async function applyChange(change: PendingChange): Promise<void> {
  const key = `${change.contentType}:${change.operation}`;
  const handler = REGISTRY[key];
  if (!handler) {
    throw new Error(`No registry handler for "${key}".`);
  }
  await handler(change.args);
}
