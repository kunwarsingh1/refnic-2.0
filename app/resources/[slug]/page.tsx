import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ResourceItemHero from "@/components/ResourceItemHero";
import ContentShowcase from "@/components/ContentShowcase";
import ResourceItemClosingCta from "@/components/ResourceItemClosingCta";
import { getResourceCatalogItemBySlug } from "@/lib/content/resourcesCatalog";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getResourceCatalogItemBySlug(slug);
  if (!item) return { title: "Resources — Refine Nicely" };
  return {
    title: `${item.title} — Refine Nicely`,
    description: item.excerpt,
  };
}

export default async function ResourceCatalogItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getResourceCatalogItemBySlug(slug);
  if (!item) notFound();

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <ResourceItemHero heading={item.title} body={item.heroBody} />
        <ContentShowcase
          slug={item.slug}
          contentType={item.contentType}
          pdfUrl={item.pdfUrl}
          imageUrl={item.showcaseImageUrl}
          text={item.showcaseText}
          caption={item.pdfCaption}
        />
        <ResourceItemClosingCta
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
