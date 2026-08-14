import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import CardGridSection from "@/components/CardGridSection";
import { getCards } from "@/lib/content/cards";
import { getProductsPageConfig } from "@/lib/content/productsPage";

export const metadata: Metadata = {
  title: "Products — Refine Nicely",
  description: "Indigenously designed industrial machinery built for high performance, reliability, and long-term operation.",
};

export const revalidate = 60;

export default async function ProductsPage() {
  const [products, config] = await Promise.all([getCards("products"), getProductsPageConfig()]);

  return (
    <>
      <div className="bg-black">
        <SiteHeader />
      </div>

      <main className="bg-black">
        <CardGridSection title={config.heading} subtitle={config.subtitle} cards={products} variant="products" />
      </main>

      <Footer />
    </>
  );
}
