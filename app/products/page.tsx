import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ProductsDirectoryHero from "@/components/ProductsDirectoryHero";
import ProductsDirectoryGrid from "@/components/ProductsDirectoryGrid";
import ProductsDirectoryCta from "@/components/ProductsDirectoryCta";
import { getProductCategories } from "@/lib/content/productCategories";
import { getProductCatalogItems } from "@/lib/content/productCatalog";
import { getProductsDirectoryPageConfig } from "@/lib/content/productsDirectoryPage";

export const metadata: Metadata = {
  title: "Products — Refine Nicely",
  description: "The full range of equipment, systems, and services Refnic engineers and manufactures in-house.",
};

export const revalidate = 60;

export default async function ProductsDirectoryPage() {
  const [categories, items, c] = await Promise.all([
    getProductCategories(),
    getProductCatalogItems(),
    getProductsDirectoryPageConfig(),
  ]);

  return (
    <>
      <SiteHeader />

      <main className="bg-black">
        <ProductsDirectoryHero body={c.heroBody} />
        <ProductsDirectoryGrid categories={categories} items={items} />
        <ProductsDirectoryCta
          heading={c.closingHeading}
          body={c.closingBody}
          imageUrl={c.closingImageUrl}
          ctaLabel={c.closingCtaLabel}
          ctaHref={c.closingCtaHref}
        />
      </main>

      <Footer />
    </>
  );
}
