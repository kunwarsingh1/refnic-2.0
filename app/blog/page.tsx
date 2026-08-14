import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { getPublishedPosts } from "@/lib/content/blog";
import { formatDate } from "@/lib/blogShared";

export const metadata: Metadata = {
  title: "Blog — Refine Nicely",
  description: "News and insights from Refnic on recycling technology, metal refining, and the circular economy.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <div className="bg-navy-950">
        <SiteHeader />
      </div>

      <main className="relative overflow-hidden bg-navy-950 py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mb-14 grid items-end gap-8 md:grid-cols-2">
            <h2 className="font-sans font-bold text-3xl leading-tight text-white md:text-5xl">Blog</h2>
            <p className="max-w-md text-white/60">
              Updates and perspectives from the Refnic team on recycling technology, metal refining, and the circular
              economy.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-white/40">No posts yet — check back soon.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:scale-[1.03] hover:border-accent-blue/60 hover:shadow-[0_0_40px_-15px_rgba(46,75,224,0.55)]"
                >
                  {post.coverImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={post.coverImageUrl} alt="" className="aspect-[412/244] w-full rounded-xl object-cover" />
                  ) : (
                    <div className="aspect-[412/244] rounded-xl bg-gradient-to-br from-accent-blue/40 to-indigo-500/30" />
                  )}
                  <div className="pt-5">
                    <span className="text-xs font-bold uppercase tracking-wide text-accent-blue">
                      {formatDate(post.createdAt)}
                    </span>
                    <h3 className="mt-2 font-sans font-bold text-lg text-white">{post.title}</h3>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">{post.excerpt}</p>
                    )}
                    {post.author && <p className="mt-4 text-xs text-white/40">{post.author}</p>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
