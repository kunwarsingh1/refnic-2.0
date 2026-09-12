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
      <SiteHeader bgClassName="bg-[#161518]" />

      <main className="bg-[#161518]">
        <IndianMarketHero heading={heroSection?.heading ?? ""} body={whyItMattersLegacy?.body ?? ""} />

        {globalShift && (
          <IndianMarketNarrativeSection heading={globalShift.heading} body={globalShift.body} align="right" />
        )}

        <IndianMarketDriversSection heading="Global Market Drivers" badges={c.heroBadges} paragraphs={c.heroParagraphs} />

        <StatCardsSection heading="Markets We Enable" stats={c.marketCards} ringSide="left" />

        {whyItMattersLegacy && (
          <IndianMarketNarrativeSection heading={whyItMattersLegacy.heading} body={whyItMattersBody} align="right" />
        )}

        {builtInIndia && (
          <IndianMarketNarrativeSection heading={builtInIndia.heading} body={builtInIndia.body} align="left" />
        )}

        <GlobalMarketAdvantageSection heading="Our Competitive Advantage" cards={c.advantageCards} />

        <GlobalMarketVisionSection label={c.closingLabel} body={visionBody} />

        <GlobalMarketFinalCta heading={c.closingHeading} body={c.closingBody} ctaLabel={c.ctaLabel} />
      </main>

      <Footer />
    </>
  );
}
