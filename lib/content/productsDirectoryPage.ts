import { getSiteConfig } from "@/lib/content/siteConfig";

export const PRODUCTS_DIRECTORY_PAGE_KEY = "productsDirectoryPage";

export type ProductsDirectoryPageConfig = {
  heroBody: string;
  closingHeading: string;
  closingImageUrl?: string;
  closingBody: string;
  closingCtaLabel: string;
  closingCtaHref: string;
};

export const DEFAULT_PRODUCTS_DIRECTORY_PAGE_CONFIG: ProductsDirectoryPageConfig = {
  heroBody:
    "Every machine, system, and service we design and manufacture — grouped by category. Explore the full range that goes into a Refnic plant.",
  closingHeading: "Ready to Build Your Next Plant?",
  closingBody:
    "From concept to commissioning, Refnic delivers complete engineering solutions tailored to your process, capacity, and business goals.",
  closingCtaLabel: "Start Your Project",
  closingCtaHref: "/contact",
};

export async function getProductsDirectoryPageConfig(): Promise<ProductsDirectoryPageConfig> {
  const stored = await getSiteConfig<Partial<ProductsDirectoryPageConfig>>(PRODUCTS_DIRECTORY_PAGE_KEY, {});
  return { ...DEFAULT_PRODUCTS_DIRECTORY_PAGE_CONFIG, ...stored };
}
