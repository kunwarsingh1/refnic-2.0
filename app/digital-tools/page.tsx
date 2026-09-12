import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import DigitalToolsPageHero from "@/components/DigitalToolsPageHero";
import DigitalToolsGrid from "@/components/DigitalToolsGrid";
import DigitalToolsPageClosingCta from "@/components/DigitalToolsPageClosingCta";

export const metadata: Metadata = {
  title: "Digital Tools — Refine Nicely",
  description:
    "Practical digital tools to help you evaluate materials, explore processes, and make informed engineering decisions.",
};

export default function DigitalToolsPage() {
  return (
    <>
      <SiteHeader bgClassName="bg-[#161518]" />

      <main className="bg-[#161518]">
        <DigitalToolsPageHero />
        <DigitalToolsGrid />
        <DigitalToolsPageClosingCta />
      </main>

      <Footer />
    </>
  );
}
