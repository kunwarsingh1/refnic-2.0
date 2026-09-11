import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ProductsDirectoryHero from "@/components/ProductsDirectoryHero";
import ProductsDirectoryGrid from "@/components/ProductsDirectoryGrid";
import ProductsDirectoryCta from "@/components/ProductsDirectoryCta";
import { getProductCategories } from "@/lib/content/productCategories";
import { getProductCatalogItems } from "@/lib/content/productCatalog";

export const metadata: Metadata = {
  title: "Products — Refine Nicely",
  description: "The full range of equipment, systems, and services Refnic engineers and manufactures in-house.",
};

export const revalidate = 60;

export default async function ProductsDirectoryPage() {
  const [categories, items] = await Promise.all([getProductCategories(), getProductCatalogItems()]);

  return (
    <>
      <div className="bg-black">
        <SiteHeader />
      </div>

      <main className="bg-black">
        <ProductsDirectoryHero />
        <ProductsDirectoryGrid categories={categories} items={items} />
        <ProductsDirectoryCta />
      </main>

      <Footer />
    </>
  );
}
