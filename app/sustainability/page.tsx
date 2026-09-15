import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import SustainabilityPageHero from "@/components/SustainabilityPageHero";
import SustainabilityImpactGrid, { type SustainabilityPillarItem } from "@/components/SustainabilityImpactGrid";
import SolutionsPageClosingCta from "@/components/SolutionsPageClosingCta";
import { getSustainabilityCatalogItems } from "@/lib/content/sustainabilityCatalog";
import { getSustainabilityPageConfig } from "@/lib/content/sustainabilityPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Sustainability — Refine Nicely",
  description:
    "We develop refining and recycling technologies that recover valuable metals, reduce resource consumption, and transform industrial waste into useful resources.",
};

export default async function SustainabilityPage() {
  const items = await getSustainabilityCatalogItems();
  const c = await getSustainabilityPageConfig();
  const pillars: SustainabilityPillarItem[] = items.map((s) => ({
    title: s.title,
    description: s.excerpt,
    href: `/sustainability/${s.slug}`,
    imageUrl: s.cardImageUrl,
  }));

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <SustainabilityPageHero heading={c.heroHeading} body={c.heroBody} imageUrl={c.heroImageUrl} />
        {pillars.length > 0 && <SustainabilityImpactGrid items={pillars} />}
        <SolutionsPageClosingCta
          heading={c.closingHeading}
          body={c.closingBody}
          imageUrl={c.closingImageUrl}
          ctaLabel={c.closingCtaLabel}
          ctaHref={c.closingCtaHref}
          imageClassName="mx-auto mt-0 block h-auto w-[350px] rounded-2xl object-contain md:w-[437px]"
          placeholderClassName="mx-auto mt-0 aspect-square w-[350px] rounded-2xl md:w-[437px]"
          bodyClassName="mx-auto mt-0 max-w-2xl whitespace-pre-line text-[18px] font-light leading-relaxed text-white"
          headingClassName="whitespace-pre-line font-display text-3xl md:text-5xl font-bold leading-tight text-[#EBEBEB]"
        />
      </main>

      <Footer />
    </>
  );
}
