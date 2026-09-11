import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/primitives";
import { getInvestorsPageConfig } from "@/lib/content/investorsPage";
import { ZigzagFeatureSections } from "@/components/ZigzagFeatureSections";

export const metadata: Metadata = {
  title: "Investors — Refine Nicely",
  description: "Why Refnic: the market opportunity, the platform, and the vision.",
};

export const revalidate = 60;

export default async function InvestorsPage() {
  const c = await getInvestorsPageConfig();

  return (
    <>
      <SiteHeader />

      <main className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <div className="pointer-events-none absolute -left-40 top-10 h-[626px] w-[626px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" aria-hidden />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
          <p className="font-display font-black text-4xl leading-tight text-white md:text-6xl">{c.heroHeading}</p>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/60">{c.heroSubheading}</p>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
          <ZigzagFeatureSections sections={c.numberedSections} />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
          <p className="text-center font-display font-black text-3xl text-white md:text-5xl">{c.whyNowHeading}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {c.whyNowReasons.map((r, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-6">
                <p className="text-sm leading-relaxed text-white/70">{r}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 text-center">
          <p className="font-display font-black text-3xl text-white/10 md:text-6xl">{c.visionLabel}</p>
          <p className="mt-4 font-display font-black text-2xl text-white md:text-4xl">{c.visionHeading}</p>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/60">{c.visionBody}</p>

          <p className="mx-auto mt-16 max-w-xl font-sans font-bold text-2xl text-white">{c.closingHeading}</p>
          <div className="mt-8 flex justify-center">
            <Button href="/#contact">
              {c.ctaLabel}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
