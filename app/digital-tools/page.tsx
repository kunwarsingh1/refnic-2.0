import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import DigitalToolsPageHero from "@/components/DigitalToolsPageHero";
import DigitalToolsGrid from "@/components/DigitalToolsGrid";
import DigitalToolsPageClosingCta from "@/components/DigitalToolsPageClosingCta";
import { getDigitalToolsPageConfig } from "@/lib/content/digitalToolsPage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Digital Tools — Refine Nicely",
  description:
    "Practical digital tools to help you evaluate materials, explore processes, and make informed engineering decisions.",
};

export default async function DigitalToolsPage() {
  const c = await getDigitalToolsPageConfig();

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <DigitalToolsPageHero heading={c.heroHeading} body={c.heroBody} imageUrl={c.heroImageUrl} />
        <DigitalToolsGrid />
        <DigitalToolsPageClosingCta
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
