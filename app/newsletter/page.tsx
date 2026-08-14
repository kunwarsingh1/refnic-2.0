import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { getNewsletterPosts } from "@/lib/content/newsletter";

export const metadata: Metadata = {
  title: "Newsletters — Refine Nicely",
  description:
    "News and insights from Refnic on recycling technology, metal refining, and the circular economy.",
};

export const revalidate = 60;

export default async function NewsletterPage() {
  const posts = await getNewsletterPosts();

  return (
    <>
      <div className="bg-navy-950">
        <SiteHeader />
      </div>

      <main className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-14 grid items-end gap-8 md:grid-cols-2">
            <h2 className="font-sans font-bold text-3xl leading-tight text-white md:text-5xl">
              Newsletters
            </h2>
            <p className="max-w-md text-white/60">
              From concept development to long-term operational support, Refnic
              delivers the expertise that powers successful industrial projects.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:scale-[1.03] hover:border-accent-blue/60 hover:shadow-[0_0_40px_-15px_rgba(46,75,224,0.55)]"
              >
                <div className={`aspect-[412/244] rounded-xl bg-gradient-to-br ${post.gradient}`} />
                <div className="pt-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-accent-blue">
                    {post.category}
                  </span>
                  <h3 className="mt-2 font-sans font-bold text-lg text-white">{post.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-indigo-400 text-xs font-bold text-white">
                      LB
                    </div>
                    <div className="text-sm">
                      <p className="font-bold text-white">{post.author}</p>
                      <p className="text-xs text-white/40">{post.meta}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
