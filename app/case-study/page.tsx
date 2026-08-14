import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/primitives";
import { getCaseStudies } from "@/lib/content/caseStudies";
import { getCaseStudyPageConfig } from "@/lib/content/caseStudyPage";
import { ModelViewer } from "@/components/ModelViewer";

export const metadata: Metadata = {
  title: "Case Studies — Refine Nicely",
  description: "Real plants, real results — engineering and execution across Refnic's recycling projects.",
};

export const revalidate = 60;

export default async function CaseStudyPage() {
  const [caseStudies, config] = await Promise.all([getCaseStudies(), getCaseStudyPageConfig()]);

  return (
    <>
      <div className="bg-black">
        <SiteHeader />
      </div>

      <main className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <div className="pointer-events-none absolute -right-40 top-10 h-[626px] w-[626px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" aria-hidden />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="font-display font-black text-4xl leading-tight text-white md:text-6xl">Case Studies</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{config.heroHeading}</p>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.length === 0 ? (
              <p className="text-sm text-white/40">No case studies yet.</p>
            ) : (
              caseStudies.map((cs) => (
                <div
                  key={cs.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#f8f8f8]">
                    {cs.modelUrl ? (
                      <ModelViewer src={cs.modelUrl} alt={cs.city} className="h-full w-full" />
                    ) : (
                      cs.imageUrl && <img src={cs.imageUrl} alt={cs.city} className="h-full w-full object-cover" />
                    )}
                    {cs.status && (
                      <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
                        <span className="size-2 rounded-full bg-[#97f88c]" aria-hidden />
                        {cs.status}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-display font-black text-lg text-white">{cs.city.toUpperCase()}</p>
                    <p className="mt-1 text-sm text-white/60">{cs.label}</p>
                    {cs.subtitle && <p className="text-sm text-white/40">{cs.subtitle}</p>}
                    <div className="mt-4">
                      <Button href="/case-study" className="rounded-lg">
                        View Case Study
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
          <p className="font-display font-black text-3xl text-white md:text-5xl">{config.resultsHeading}</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {config.resultHighlights.map((r) => (
              <div key={r} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-6">
                <p className="font-sans font-bold text-white">{r}</p>
              </div>
            ))}
          </div>
        </div>

        {config.galleryImageUrls.length > 0 && (
          <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {config.galleryImageUrls.map((url, i) => (
                <img key={i} src={url} alt="" className="aspect-[4/3] w-full rounded-lg object-cover" />
              ))}
            </div>
          </div>
        )}

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 text-center">
          <p className="font-display font-black text-4xl text-white/10 md:text-6xl">{config.brandLine}</p>
          <div className="mt-8 flex justify-center">
            <Button href="/#contact" className="rounded-lg">
              {config.ctaLabel}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
