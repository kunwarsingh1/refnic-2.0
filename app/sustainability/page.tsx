import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import SustainabilityPageHero from "@/components/SustainabilityPageHero";
import SustainabilityImpactGrid, { type SustainabilityPillarItem } from "@/components/SustainabilityImpactGrid";
import SolutionsPageClosingCta from "@/components/SolutionsPageClosingCta";
import { getSustainabilityCatalogItems } from "@/lib/content/sustainabilityCatalog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Sustainability — Refine Nicely",
  description:
    "We develop refining and recycling technologies that recover valuable metals, reduce resource consumption, and transform industrial waste into useful resources.",
};

export default async function SustainabilityPage() {
  const items = await getSustainabilityCatalogItems();
  const pillars: SustainabilityPillarItem[] = items.map((s) => ({
    title: s.title,
    description: s.excerpt,
    href: `/sustainability/${s.slug}`,
    imageUrl: s.cardImageUrl,
  }));

  return (
    <>
      <SiteHeader bgClassName="bg-[#161518]" />

      <main className="bg-[#161518]">
        <SustainabilityPageHero />
        {pillars.length > 0 && <SustainabilityImpactGrid items={pillars} />}
        <SolutionsPageClosingCta />
      </main>

      <Footer />
    </>
  );
}
