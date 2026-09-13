import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import CareerPageHero from "@/components/CareerPageHero";
import CareerPageMission from "@/components/CareerPageMission";
import CareerPageLookingFor from "@/components/CareerPageLookingFor";
import CareerPageOpenPositions from "@/components/CareerPageOpenPositions";
import CareerPageLifeAtRefnic from "@/components/CareerPageLifeAtRefnic";
import CareerPageClosingCta from "@/components/CareerPageClosingCta";
import { getCareerPageConfig } from "@/lib/content/careerPage";

export const metadata: Metadata = {
  title: "Careers — Refine Nicely",
  description: "Join the team engineering the future of metal refining, recycling, and critical material recovery.",
};

export const revalidate = 60;

export default async function CareerPage() {
  const c = await getCareerPageConfig();

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="">
        <CareerPageHero heading={c.heroHeading} subheading={c.heroSubheading} ctaLabel={c.heroCtaLabel} />
        <CareerPageMission heading={c.missionHeading} imageUrl={c.missionImageUrl} body={c.missionBody} />
        <CareerPageLookingFor heading={c.lookingForHeading} traits={c.traits} />
        <CareerPageOpenPositions
          heading={c.openPositionsHeading}
          positions={c.positions}
          applyLabel={c.applyButtonLabel}
        />
        <CareerPageLifeAtRefnic heading={c.lifeHeading} photos={c.photos} />
        <CareerPageClosingCta heading={c.closingHeading} body={c.closingBody} ctaLabel={c.closingCtaLabel} />
      </main>

      <Footer />
    </>
  );
}
