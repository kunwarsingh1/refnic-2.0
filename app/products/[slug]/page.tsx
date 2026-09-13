import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ProductDetailHero from "@/components/ProductDetailHero";
import ProductNarrativeSections from "@/components/ProductNarrativeSections";
import ProductMaterialsSection from "@/components/ProductMaterialsSection";
import ContentShowcase from "@/components/ContentShowcase";
import ProductClosingSection from "@/components/ProductClosingSection";
import { getProductCatalogItemBySlug } from "@/lib/content/productCatalog";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getProductCatalogItemBySlug(slug);
  if (!item) return { title: "Products — Refine Nicely" };
  return {
    title: `${item.title} — Refine Nicely`,
    description: item.excerpt,
  };
}

export default async function ProductCatalogItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getProductCatalogItemBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <SiteHeader />

      <main className="bg-black">
        <ProductDetailHero
          title={item.title}
          body={item.excerpt}
          imageUrl={item.imageUrl}
          ctaLabel={item.heroCtaLabel}
          ctaHref={item.heroCtaHref}
        />
        <ProductNarrativeSections sections={item.narrativeSections} />
        <ProductMaterialsSection heading={item.materialsHeading} materials={item.materials} />
        <ContentShowcase
          slug={item.slug}
          contentType={item.contentType}
          pdfUrl={item.pdfUrl}
          imageUrl={item.showcaseImageUrl}
          text={item.showcaseText}
          caption={item.pdfCaption}
          sectionBg="#000000"
        />
        <ProductClosingSection
          heading={item.closingHeading}
          tagline={item.closingTagline}
          ctaLabel={item.closingCtaLabel}
          ctaHref={item.closingCtaHref}
          imageUrl={item.closingImageUrl}
        />
      </main>

      <Footer />
    </>
  );
}
