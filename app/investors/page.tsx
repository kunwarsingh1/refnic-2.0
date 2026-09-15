import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import InvestorsHero from "@/components/InvestorsHero";
import { ZigzagFeatureSections } from "@/components/ZigzagFeatureSections";
import InvestorsWhyNowSection from "@/components/InvestorsWhyNowSection";
import InvestorsVisionSection from "@/components/InvestorsVisionSection";
import InvestorsPageClosingCta from "@/components/InvestorsPageClosingCta";
import { getInvestorsPageConfig } from "@/lib/content/investorsPage";

export const metadata: Metadata = {
  title: "Investors — Refine Nicely",
  description: "Why Refnic: the market opportunity, the platform, and the vision.",
};

export const revalidate = 60;

export default async function InvestorsPage() {
  const c = await getInvestorsPageConfig();

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <InvestorsHero heading={c.heroHeading} body={c.heroSubheading} />
        <ZigzagFeatureSections sections={c.numberedSections} />
        <InvestorsWhyNowSection heading={c.whyNowHeading} reasons={c.whyNowReasons} />
        <InvestorsVisionSection
          label={c.visionLabel}
          imageUrl={c.visionImageUrl}
          heading={c.visionHeading}
          body={c.visionBody}
        />
        <InvestorsPageClosingCta heading={c.closingHeading} ctaLabel={c.ctaLabel} />
      </main>

      <Footer />
    </>
  );
}
