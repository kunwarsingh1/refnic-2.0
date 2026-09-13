import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import WhitePapersPageHero from "@/components/WhitePapersPageHero";
import WhitePapersGrid from "@/components/WhitePapersGrid";
import WhitePapersPageClosingCta from "@/components/WhitePapersPageClosingCta";

export const metadata: Metadata = {
  title: "White Papers — Refine Nicely",
  description:
    "Our white papers examine the technologies, processes, and challenges shaping modern metal refining, recycling, and resource recovery.",
};

export default function WhitePapersPage() {
  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <WhitePapersPageHero />
        <WhitePapersGrid />
        <WhitePapersPageClosingCta />
      </main>

      <Footer />
    </>
  );
}
