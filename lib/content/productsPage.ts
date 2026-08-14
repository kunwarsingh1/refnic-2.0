import { getSiteConfig } from "@/lib/content/siteConfig";

export const PRODUCTS_PAGE_KEY = "productsPage";

export type ProductsPageConfig = {
  heading: string;
  subtitle: string;
};

export const DEFAULT_PRODUCTS_PAGE_CONFIG: ProductsPageConfig = {
  heading: "Products",
  subtitle: "Indigenously designed industrial machinery built for high performance, reliability, and long-term operation.",
};

export async function getProductsPageConfig(): Promise<ProductsPageConfig> {
  return getSiteConfig<ProductsPageConfig>(PRODUCTS_PAGE_KEY, DEFAULT_PRODUCTS_PAGE_CONFIG);
}
