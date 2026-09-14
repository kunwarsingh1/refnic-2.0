import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ResourcesPageHero from "@/components/ResourcesPageHero";
import ResourcesGrid, { type ResourceGridItem } from "@/components/ResourcesGrid";
import ResourcesPageClosingCta from "@/components/ResourcesPageClosingCta";
import { getResourceCatalogItems } from "@/lib/content/resourcesCatalog";
import { getResourcesPageConfig } from "@/lib/content/resourcesPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Resources — Refine Nicely",
  description:
    "Technical knowledge, product information, and practical resources to support your refining and recycling projects.",
};

export default async function ResourcesPage() {
  const items = await getResourceCatalogItems();
  const c = await getResourcesPageConfig();
  const cards: ResourceGridItem[] = items.map((r) => ({
    title: r.title,
    description: r.excerpt,
    href: `/resources/${r.slug}`,
    imageUrl: r.cardImageUrl,
  }));

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <ResourcesPageHero heading={c.heroHeading} body={c.heroBody} />
        {cards.length > 0 && <ResourcesGrid items={cards} />}
        <ResourcesPageClosingCta
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
