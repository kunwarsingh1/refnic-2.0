import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import TechnologiesTopicFilter from "@/components/TechnologiesTopicFilter";
import NewsletterSignupForm from "@/components/NewsletterSignupForm";
import { getTechnologiesPageConfig } from "@/lib/content/technologiesPage";
import { getNewsletterPosts } from "@/lib/content/newsletter";

export const metadata: Metadata = {
  title: "Technologies — Refine Nicely",
  description: "Engineering insights, industry reports, and technology updates from Refnic.",
};

export const revalidate = 60;

export default async function TechnologiesPage() {
  const [config, posts] = await Promise.all([getTechnologiesPageConfig(), getNewsletterPosts()]);

  return (
    <>
      <div className="bg-black">
        <SiteHeader />
      </div>

      <main className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <div className="pointer-events-none absolute -right-40 top-10 h-[626px] w-[626px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" aria-hidden />

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-wide text-accent-blue">{config.intelligenceLabel}</p>
          <p className="mt-3 font-display font-black text-4xl leading-tight text-white md:text-6xl">{config.heading}</p>
          {config.bodyParagraphs.map((p, i) => (
            <p key={i} className="mt-4 max-w-2xl leading-relaxed text-white/60">
              {p}
            </p>
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
          <TechnologiesTopicFilter posts={posts} topics={config.topics} />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
          <div className="flex flex-col items-center justify-between gap-8 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-12 md:flex-row md:px-16">
            <div className="flex-1">
              <h2 className="font-sans text-2xl font-bold leading-tight text-white">{config.newsletterHeading}</h2>
              <p className="mt-3 max-w-md leading-relaxed text-white/60">{config.newsletterBody}</p>
              <NewsletterSignupForm ctaLabel={config.newsletterCtaLabel} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
