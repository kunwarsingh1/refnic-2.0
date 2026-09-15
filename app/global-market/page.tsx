import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import IndianMarketHero from "@/components/IndianMarketHero";
import IndianMarketNarrativeSection from "@/components/IndianMarketNarrativeSection";
import IndianMarketDriversSection from "@/components/IndianMarketDriversSection";
import StatCardsSection from "@/components/StatCardsSection";
import GlobalMarketAdvantageSection from "@/components/GlobalMarketAdvantageSection";
import GlobalMarketVisionSection from "@/components/GlobalMarketVisionSection";
import GlobalMarketFinalCta from "@/components/GlobalMarketFinalCta";
import { getGlobalMarketPageConfig } from "@/lib/content/globalMarketPage";

export const metadata: Metadata = {
  title: "Global Market — Refine Nicely",
  description: "The global drivers behind critical material recovery, and Refnic's role in it.",
};

export const revalidate = 60;

function splitAtMarker(body: string, marker: string): [string, string] {
  const idx = body.indexOf(marker);
  if (idx === -1) return [body, ""];
  return [body.slice(0, idx).trim(), body.slice(idx).trim()];
}

export default async function GlobalMarketPage() {
  const c = await getGlobalMarketPageConfig();
  const [globalShift, whyItMattersLegacy, builtInIndia, heroSection] = c.narrativeSections;
  const [whyItMattersBody, visionBody] = splitAtMarker(
    heroSection?.body ?? "",
    "As industries around the world",
  );

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <IndianMarketHero
          heading={heroSection?.heading ?? ""}
          body={whyItMattersLegacy?.body ?? ""}
          headingClassName="whitespace-pre-line font-display text-[120px] font-bold leading-[1.02] text-[#F8F8F8]"
        />

        {globalShift && (
          <IndianMarketNarrativeSection
            heading={globalShift.heading}
            body={globalShift.body}
            align="right"
            imageUrl={globalShift.imageUrl}
          />
        )}

        <IndianMarketDriversSection
          heading="Global Market Drivers"
          badges={c.heroBadges}
          paragraphs={c.heroParagraphs}
          headingClassName="whitespace-pre-line text-center font-display text-[40px] font-bold leading-tight text-[#EBEBEB]"
        />

        <StatCardsSection heading="Markets We Enable" stats={c.marketCards} ringSide="none" />

        {whyItMattersLegacy && (
          <IndianMarketNarrativeSection
            heading={whyItMattersLegacy.heading}
            body={whyItMattersBody}
            align="right"
            imageUrl={whyItMattersLegacy.imageUrl}
          />
        )}

        {builtInIndia && (
          <IndianMarketNarrativeSection
            heading={builtInIndia.heading}
            body={builtInIndia.body}
            align="left"
            imageUrl={builtInIndia.imageUrl}
          />
        )}

        <GlobalMarketAdvantageSection heading="Our Competitive Advantage" cards={c.advantageCards} />

        <GlobalMarketVisionSection label={c.closingLabel} body={visionBody} />

        <GlobalMarketFinalCta heading={c.closingHeading} body={c.closingBody} ctaLabel={c.ctaLabel} />
      </main>

      <Footer />
    </>
  );
}
