import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import SustainabilityItemHero from "@/components/SustainabilityItemHero";
import ContentShowcase from "@/components/ContentShowcase";
import SustainabilityItemClosingCta from "@/components/SustainabilityItemClosingCta";
import { getSustainabilityCatalogItemBySlug } from "@/lib/content/sustainabilityCatalog";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getSustainabilityCatalogItemBySlug(slug);
  if (!item) return { title: "Sustainability — Refine Nicely" };
  return {
    title: `${item.title} — Refine Nicely`,
    description: item.excerpt,
  };
}

export default async function SustainabilityCatalogItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getSustainabilityCatalogItemBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <SustainabilityItemHero heading={item.title} body={item.heroBody} />
        <ContentShowcase
          slug={item.slug}
          contentType={item.contentType}
          pdfUrl={item.pdfUrl}
          imageUrl={item.showcaseImageUrl}
          text={item.showcaseText}
          caption={item.pdfCaption}
        />
        <SustainabilityItemClosingCta
          heading={item.closingHeading}
          body={item.closingBody}
          ctaLabel={item.closingCtaLabel}
          ctaHref={item.closingCtaHref}
        />
      </main>

      <Footer />
    </>
  );
}
