import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/primitives";
import { getOurStoryPageConfig } from "@/lib/content/ourStoryPage";

export const metadata: Metadata = {
  title: "Our Story — Refine Nicely",
  description: "How Refnic started, and how we're building the engineering platform for resource recovery.",
};

export const revalidate = 60;

export default async function OurStoryPage() {
  const c = await getOurStoryPageConfig();

  return (
    <>
      <div className="bg-black">
        <SiteHeader />
      </div>

      <main className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <div className="pointer-events-none absolute -right-40 top-10 h-[626px] w-[626px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" aria-hidden />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 text-center md:py-28">
          <p className="font-display font-black text-4xl leading-tight text-white/10 md:text-6xl">{c.heroLabel}</p>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/70">{c.heroSubheading}</p>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
          <div className="space-y-14">
            {c.numberedSections.map((s) => (
              <div key={s.number} className="grid gap-4 md:grid-cols-[100px_1fr]">
                <p className="font-display font-black text-5xl text-white/10">{s.number}</p>
                <div>
                  <p className="font-display font-black text-2xl text-white md:text-3xl">{s.heading}</p>
                  <p className="mt-3 max-w-2xl leading-relaxed text-white/60">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 text-center">
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-white">{c.closingTagline}</p>
          <div className="mt-8 flex justify-center">
            <Button href="/case-study" className="rounded-lg">
              {c.ctaLabel}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
