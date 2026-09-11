import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import NewsletterTopicFilter from "@/components/NewsletterTopicFilter";
import NewsletterSignupForm from "@/components/NewsletterSignupForm";
import { CmsImagePlaceholder } from "@/components/ui/primitives";
import { getNewsletterPosts } from "@/lib/content/newsletter";
import { getNewsletterTabs } from "@/lib/content/newsletterTabs";

export const metadata: Metadata = {
  title: "Newsletters — Refine Nicely",
  description:
    "News and insights from Refnic on recycling technology, metal refining, and the circular economy.",
};

export const revalidate = 60;

export default async function NewsletterPage() {
  const posts = await getNewsletterPosts();
  const tabs = await getNewsletterTabs();

  return (
    <>
      <SiteHeader bgClassName="bg-navy-950" />

      <main className="relative overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />

        <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-14 text-center md:pt-28">
          <h1 className="font-sans font-bold text-4xl leading-tight text-white md:text-6xl">
            Industrial Intelligence
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
            Stay ahead with engineering breakthroughs, market trends, policy updates, case
            studies, and technology insights delivered by Refnic.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-24">
          <NewsletterTopicFilter posts={posts} tabs={tabs} />

          <div className="mt-20 flex flex-col items-center justify-between gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:flex-row md:p-10">
            <div>
              <h2 className="font-sans font-bold text-2xl text-white md:text-3xl">
                Stay Ahead of the Industry
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
                Get engineering insights, market intelligence, and the latest innovations in
                recycling and metal refining.
              </p>
              <NewsletterSignupForm ctaLabel="Subscribe" />
            </div>
            <CmsImagePlaceholder className="h-24 w-24 shrink-0 rounded-xl md:h-28 md:w-28" />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
