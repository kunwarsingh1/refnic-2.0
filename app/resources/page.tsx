import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ResourcesPageHero from "@/components/ResourcesPageHero";
import ResourcesGrid, { type ResourceGridItem } from "@/components/ResourcesGrid";
import ResourcesPageClosingCta from "@/components/ResourcesPageClosingCta";
import { getResourceCatalogItems } from "@/lib/content/resourcesCatalog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Resources — Refine Nicely",
  description:
    "Technical knowledge, product information, and practical resources to support your refining and recycling projects.",
};

export default async function ResourcesPage() {
  const items = await getResourceCatalogItems();
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
        <ResourcesPageHero />
        {cards.length > 0 && <ResourcesGrid items={cards} />}
        <ResourcesPageClosingCta />
      </main>

      <Footer />
    </>
  );
}
