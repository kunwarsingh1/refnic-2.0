import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ProductsHero from "@/components/ProductsHero";
import PlantProcessOverview from "@/components/PlantProcessOverview";
import MaterialRecoverySection from "@/components/MaterialRecoverySection";
import ProductsCtaSection from "@/components/ProductsCtaSection";
import { getProductsPageConfig } from "@/lib/content/productsPage";

export const metadata: Metadata = {
  title: "Products — Refine Nicely",
  description: "Refnic designs lithium-ion battery recycling plants for the controlled recovery of valuable materials from end-of-life NMC and LCO batteries.",
};

export const revalidate = 60;

export default async function ProductsOverviewPage() {
  const config = await getProductsPageConfig();

  return (
    <>
      <SiteHeader />

      <main className="bg-black">
        <ProductsHero config={config} />
        <PlantProcessOverview config={config} />
        <MaterialRecoverySection config={config} />
        <ProductsCtaSection config={config} />
      </main>

      <Footer />
    </>
  );
}
