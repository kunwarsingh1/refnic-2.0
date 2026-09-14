import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import SolutionsHero from "@/components/SolutionsHero";
import SolutionsNarrative from "@/components/SolutionsNarrative";
import SolutionsCtaSection from "@/components/SolutionsCtaSection";
import ContentShowcase from "@/components/ContentShowcase";
import { getServiceCatalogItemBySlug } from "@/lib/content/servicesCatalog";
import type { SolutionsPageConfig } from "@/lib/content/solutionsPage";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getServiceCatalogItemBySlug(slug);
  if (!item) return { title: "Service — Refine Nicely" };
  return {
    title: `${item.title} — Refine Nicely`,
    description: item.excerpt,
  };
}

export default async function ServiceCatalogItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getServiceCatalogItemBySlug(slug);
  if (!item) notFound();

  const config: SolutionsPageConfig = {
    heroWatermark: "Services",
    heroHeading: item.title.toUpperCase(),
    heroBody: item.heroBody,
    heroImageUrl: item.heroImageUrl,
    heroCtaLabel: item.heroCtaLabel,
    heroCtaHref: item.heroCtaHref,
    narrativeSections: item.narrativeSections,
    mechanicalHeading: "",
    mechanicalTagline: "",
    chemicalHeading: "",
    chemicalTagline: "",
    closingHeading: item.closingHeading,
    closingBody: item.closingBody,
    closingImageUrl: item.closingImageUrl,
    closingCtaLabel: item.closingCtaLabel,
    closingCtaHref: item.closingCtaHref,
  };

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="relative overflow-hidden bg-black">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden />
        <SolutionsHero config={config} />
        {config.narrativeSections.length > 0 && <SolutionsNarrative config={config} />}
        <ContentShowcase
          slug={item.slug}
          contentType={item.contentType}
          pdfUrl={item.pdfUrl}
          imageUrl={item.showcaseImageUrl}
          text={item.showcaseText}
          caption={item.pdfCaption}
        />
        <SolutionsCtaSection config={config} showClosingImage={false} />
      </main>

      <Footer />
    </>
  );
}
