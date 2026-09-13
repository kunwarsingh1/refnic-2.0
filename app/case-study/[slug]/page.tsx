import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import CaseStudyDetailHero from "@/components/CaseStudyDetailHero";
import CaseStudyDetailCard from "@/components/CaseStudyDetailCard";
import CaseStudyExploreMore from "@/components/CaseStudyExploreMore";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content/caseStudies";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case Study — Refine Nicely" };
  return {
    title: `${cs.label} — Refine Nicely`,
    description: cs.body,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [cs, all] = await Promise.all([getCaseStudyBySlug(slug), getCaseStudies()]);
  if (!cs) notFound();

  const index = all.findIndex((item) => item.id === cs.id);
  const prev = index > 0 ? all[index - 1] : undefined;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : undefined;
  const others = all.filter((item) => item.id !== cs.id);

  return (
    <>
      <SiteHeader bgClassName="bg-black" />

      <main className="bg-black">
        <CaseStudyDetailHero />
        <CaseStudyDetailCard cs={cs} />
        <CaseStudyExploreMore others={others} prev={prev} next={next} />
      </main>

      <Footer />
    </>
  );
}
