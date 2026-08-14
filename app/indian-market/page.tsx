import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { getIndianMarketPageConfig } from "@/lib/content/indianMarketPage";

export const metadata: Metadata = {
  title: "Indian Market — Refine Nicely",
  description: "The drivers behind India's recycling economy, and Refnic's role in building it.",
};

export const revalidate = 60;

export default async function IndianMarketPage() {
  const c = await getIndianMarketPageConfig();

  return (
    <>
      <div className="bg-black">
        <SiteHeader />
      </div>

      <main className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <div className="pointer-events-none absolute -right-40 top-10 h-[626px] w-[626px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" aria-hidden />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="font-display font-black text-4xl leading-tight text-white md:text-6xl">{c.heroHeading}</p>
          <p className="mt-4 text-lg text-white/60">{c.heroSubheading}</p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {c.statHighlights.map((s) => (
              <div key={s} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-6">
                <p className="font-sans font-bold text-white">{s}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
          <p className="font-display font-black text-3xl text-white md:text-5xl">{c.driversHeading}</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {c.driverBadges.map((badge, i) => (
              <div key={badge}>
                <span className="rounded-full bg-accent-blue px-4 py-1.5 text-xs font-bold text-white">{badge}</span>
                <p className="mt-4 leading-relaxed text-white/60">{c.driverParagraphs[i]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
          <p className="font-display font-black text-3xl text-white md:text-5xl">{c.industriesHeading}</p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {c.industries.map((ind) => (
              <div key={ind} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-6">
                <p className="font-sans font-bold text-white">{ind}</p>
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

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 text-center">
          <p className="mx-auto max-w-2xl leading-relaxed text-white/60">{c.closingTagline}</p>
          <p className="mt-3 font-display font-black text-3xl text-white md:text-5xl">{c.closingHeading}</p>
        </div>
      </main>

      <Footer />
    </>
  );
}
