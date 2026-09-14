import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import WhitePapersPageHero from "@/components/WhitePapersPageHero";
import WhitePapersGrid from "@/components/WhitePapersGrid";
import WhitePapersPageClosingCta from "@/components/WhitePapersPageClosingCta";
import { getWhitePapersPageConfig } from "@/lib/content/whitePapersPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "White Papers — Refine Nicely",
  description:
    "Our white papers examine the technologies, processes, and challenges shaping modern metal refining, recycling, and resource recovery.",
};

export default async function WhitePapersPage() {
  const c = await getWhitePapersPageConfig();

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <WhitePapersPageHero heading={c.heroHeading} body={c.heroBody} imageUrl={c.heroImageUrl} />
        <WhitePapersGrid />
        <WhitePapersPageClosingCta
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
