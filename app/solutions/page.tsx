import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import SolutionsHero from "@/components/SolutionsHero";
import SolutionsNarrative from "@/components/SolutionsNarrative";
import SolutionsCtaSection from "@/components/SolutionsCtaSection";
import { getSolutionsPageConfig } from "@/lib/content/solutionsPage";

export const metadata: Metadata = {
  title: "Solution — Refine Nicely",
  description: "Why lithium-ion battery recycling matters, and how Refnic's approach turns end-of-life batteries into recoverable material value.",
};

export const revalidate = 60;

export default async function SolutionsPage() {
  const config = await getSolutionsPageConfig();

  return (
    <>
      <SiteHeader bgClassName="bg-[#161518]" />

      <main className="relative overflow-hidden bg-[#161518]">
        <div className="pointer-events-none absolute inset-0 bg-grid-dark" aria-hidden />
        <SolutionsHero config={config} />
        <SolutionsNarrative config={config} />
        <SolutionsCtaSection config={config} />
      </main>

      <Footer />
    </>
  );
}
