import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/primitives";
import { getSustainabilityPageConfig } from "@/lib/content/sustainabilityPage";

export const metadata: Metadata = {
  title: "Sustainability — Refine Nicely",
  description: "How Refnic turns waste into measurable, circular impact.",
};

export const revalidate = 60;

export default async function SustainabilityPage() {
  const c = await getSustainabilityPageConfig();

  return (
    <>
      <div className="bg-black">
        <SiteHeader />
      </div>

      <main className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <div className="pointer-events-none absolute -left-40 top-10 h-[626px] w-[626px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" aria-hidden />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-wide text-accent-blue">{c.heroLabel}</p>
          <p className="mt-3 font-display font-black text-4xl leading-tight text-white md:text-6xl">{c.heroHeading}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{c.heroBody}</p>
          <div className="mt-8">
            <Button href="#impact" className="rounded-lg">
              {c.heroCtaLabel}
            </Button>
          </div>
        </div>

        <div id="impact" className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
          <p className="font-display font-black text-3xl text-white md:text-5xl">{c.impactSectionHeading}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {c.impactCards.map((card) => (
              <div key={card.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="font-sans font-bold text-lg text-white">{card.title}</p>
                <p className="mt-2 leading-relaxed text-white/60">{card.body}</p>
                <div className="mt-4">
                  <Button href="/case-study" className="rounded-lg">
                    {card.ctaLabel}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {c.processSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <span className="rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white">
                  {step}
                </span>
                {i < c.processSteps.length - 1 && <span className="text-white/30">→</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
          <p className="font-display font-black text-3xl text-white md:text-5xl">{c.approachHeading}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-white/60">{c.approachBody}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {c.approachCards.map((card) => (
              <div key={card.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="font-sans font-bold text-lg text-white">{card.title}</p>
                <p className="mt-2 leading-relaxed text-white/60">{card.body}</p>
                <div className="mt-4">
                  <Button href="/#contact" className="rounded-lg">
                    {card.ctaLabel}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 text-center">
          <p className="mx-auto max-w-2xl leading-relaxed text-white/60">{c.closingBody}</p>
          <div className="mt-8 flex justify-center">
            <Button href="/#contact" className="rounded-lg">
              {c.closingCtaLabel}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
