import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import IndianMarketHero from "@/components/IndianMarketHero";
import IndianMarketNarrativeSection from "@/components/IndianMarketNarrativeSection";
import IndianMarketDriversSection from "@/components/IndianMarketDriversSection";
import IndianMarketChallengeSection from "@/components/IndianMarketChallengeSection";
import IndianMarketIndustriesSection from "@/components/IndianMarketIndustriesSection";
import IndianMarketClosingSection from "@/components/IndianMarketClosingSection";
import { getIndianMarketPageConfig } from "@/lib/content/indianMarketPage";

export const metadata: Metadata = {
  title: "Indian Market — Refine Nicely",
  description: "The drivers behind India's recycling economy, and Refnic's role in building it.",
};

export const revalidate = 60;

export default async function IndianMarketPage() {
  const c = await getIndianMarketPageConfig();
  const [opportunity, indigenousTech, closing] = c.narrativeSections;

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <IndianMarketHero heading={c.closingHeading} body={c.closingTagline} />

        {opportunity && (
          <IndianMarketNarrativeSection
            heading={opportunity.heading}
            body={opportunity.body}
            align="right"
            imageUrl={opportunity.imageUrl}
            imageClassName="h-56 w-80 rounded-2xl object-contain md:h-72 md:w-[26rem]"
            placeholderClassName="h-56 w-80 rounded-2xl md:h-72 md:w-[26rem]"
            headingClassName="whitespace-pre-line font-display text-[40px] font-normal leading-tight text-[#EBEBEB]"
          />
        )}

        <IndianMarketDriversSection
          heading={c.driversHeading}
          badges={c.driverBadges}
          paragraphs={c.driverParagraphs}
        />

        <IndianMarketChallengeSection subheading={c.heroHeading} stats={c.statHighlights} />

        {indigenousTech && (
          <IndianMarketNarrativeSection
            heading={indigenousTech.heading}
            body={indigenousTech.body}
            align="right"
            imageUrl={indigenousTech.imageUrl}
            imageClassName="h-56 w-80 rounded-2xl object-contain md:h-72 md:w-[26rem]"
            placeholderClassName="h-56 w-80 rounded-2xl md:h-72 md:w-[26rem]"
            headingClassName="whitespace-pre-line font-display text-[40px] font-normal leading-tight text-[#EBEBEB]"
          />
        )}

        <IndianMarketIndustriesSection heading={c.industriesHeading} industries={c.industries} />

        {closing && <IndianMarketClosingSection heading={closing.heading} body={closing.body} />}
      </main>

      <Footer />
    </>
  );
}
