import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/primitives";
import { getGlobalMarketPageConfig } from "@/lib/content/globalMarketPage";

export const metadata: Metadata = {
  title: "Global Market — Refine Nicely",
  description: "The global drivers behind critical material recovery, and Refnic's role in it.",
};

export const revalidate = 60;

export default async function GlobalMarketPage() {
  const c = await getGlobalMarketPageConfig();

  return (
    <>
      <div className="bg-black">
        <SiteHeader />
      </div>

      <main className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <div className="pointer-events-none absolute -left-40 top-10 h-[626px] w-[626px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" aria-hidden />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="font-display font-black text-4xl leading-tight text-white md:text-6xl">{c.heroHeading}</p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {c.heroBadges.map((badge, i) => (
              <div key={badge}>
                <span className="rounded-full bg-accent-blue px-4 py-1.5 text-xs font-bold text-white">{badge}</span>
                <p className="mt-4 leading-relaxed text-white/60">{c.heroParagraphs[i]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
          <div className="space-y-16">
            {c.narrativeSections.map((s) => (
              <div key={s.heading} className="max-w-3xl">
                <p className="font-display font-black text-2xl text-white md:text-3xl">{s.heading}</p>
                {s.body.split("\n\n").map((para, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-white/60">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
          <p className="font-display font-black text-3xl text-white md:text-5xl">Markets We Enable</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {c.marketCards.map((card) => (
              <div key={card} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-6">
                <p className="font-sans font-bold text-white">{card}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
          <p className="font-display font-black text-3xl text-white md:text-5xl">Our Competitive Advantage</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {c.advantageCards.map((card) => (
              <div key={card.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="font-sans font-bold text-lg text-white">{card.title}</p>
                <p className="mt-2 leading-relaxed text-white/60">{card.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-accent-blue">{c.closingLabel}</p>
          <p className="mt-3 font-display font-black text-3xl text-white md:text-5xl">{c.closingHeading}</p>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/60">{c.closingBody}</p>
          <div className="mt-8 flex justify-center">
            <Button href="/technologies" className="rounded-lg">
              {c.ctaLabel}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
