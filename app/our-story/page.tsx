import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import OurStoryHero from "@/components/OurStoryHero";
import { ZigzagFeatureSections } from "@/components/ZigzagFeatureSections";
import OurStoryClosingSection from "@/components/OurStoryClosingSection";
import { getOurStoryPageConfig } from "@/lib/content/ourStoryPage";

export const metadata: Metadata = {
  title: "Our Story — Refine Nicely",
  description: "How Refnic started, and how we're building the engineering platform for resource recovery.",
};

export const revalidate = 60;

export default async function OurStoryPage() {
  const c = await getOurStoryPageConfig();

  return (
    <>
      <SiteHeader />

      <main className="bg-black">
        <OurStoryHero heading={c.heroLabel} body={c.heroSubheading} />
        <ZigzagFeatureSections sections={c.numberedSections} bodyPlacement="opposite" bg="bg-black" />
        <OurStoryClosingSection tagline={c.closingTagline} ctaLabel={c.ctaLabel} />
      </main>

      <Footer />
    </>
  );
}
