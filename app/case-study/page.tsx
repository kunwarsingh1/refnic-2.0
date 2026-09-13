import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import CaseStudyPageHero from "@/components/CaseStudyPageHero";
import CaseStudyListSection from "@/components/CaseStudyListSection";
import CaseStudyResultsSection from "@/components/CaseStudyResultsSection";
import CaseStudyGallerySection from "@/components/CaseStudyGallerySection";
import CaseStudyClosingCta from "@/components/CaseStudyClosingCta";
import { getCaseStudies } from "@/lib/content/caseStudies";
import { getCaseStudyPageConfig } from "@/lib/content/caseStudyPage";

export const metadata: Metadata = {
  title: "Case Studies — Refine Nicely",
  description: "Real plants, real results — engineering and execution across Refnic's recycling projects.",
};

export const revalidate = 60;

export default async function CaseStudyPage() {
  const [caseStudies, config] = await Promise.all([getCaseStudies(), getCaseStudyPageConfig()]);

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <CaseStudyPageHero body={config.heroHeading} />
        <CaseStudyListSection caseStudies={caseStudies} />
        <CaseStudyResultsSection heading={config.resultsHeading} highlights={config.resultHighlights} />
        <CaseStudyGallerySection imageUrls={config.galleryImageUrls} />
        <CaseStudyClosingCta ctaLabel={config.ctaLabel} />
      </main>

      <Footer />
    </>
  );
}
