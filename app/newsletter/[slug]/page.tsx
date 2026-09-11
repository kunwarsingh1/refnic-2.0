import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { CmsImagePlaceholder } from "@/components/ui/primitives";
import { getNewsletterPostBySlug, getNewsletterPosts } from "@/lib/content/newsletter";
import type { Block } from "@/lib/content/blog";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsletterPostBySlug(slug);
  if (!post) return { title: "Newsletters — Refine Nicely" };
  return {
    title: `${post.title} — Refine Nicely`,
    description: post.excerpt,
  };
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <p className="my-6 whitespace-pre-wrap text-[1.05rem] leading-7 text-gray-600">{block.text}</p>;
    case "image": {
      const alignClass =
        block.align === "left"
          ? "mr-auto max-w-md"
          : block.align === "right"
            ? "ml-auto max-w-md"
            : block.align === "center"
              ? "mx-auto max-w-md"
              : "";
      return (
        <figure className={`my-8 w-full ${alignClass}`}>
          {block.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={block.url} alt={block.caption || ""} className="w-full" />
          ) : (
            <CmsImagePlaceholder className="aspect-[16/9] w-full" />
          )}
          {block.caption && <figcaption className="mt-2 text-center text-sm text-gray-400">{block.caption}</figcaption>}
        </figure>
      );
    }
    default:
      return null;
  }
}

export default async function NewsletterPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsletterPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getNewsletterPosts();
  const sameCategory = allPosts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = allPosts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  const similar = [...sameCategory, ...others].slice(0, 3);

  const initials =
    post.author
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "LB";

  return (
    <>
      <div className="bg-navy-950">
        <SiteHeader />
      </div>

      <div className="relative overflow-hidden bg-navy-950 px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <div
          className="pointer-events-none absolute left-1/2 top-[42%] h-[632px] w-[626px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue opacity-30 blur-[180px]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <p
            className="pointer-events-none mx-auto w-full max-w-2xl select-none text-center font-sans font-bold leading-none text-[#F8F8F8] opacity-10 text-[13vw] md:text-[6.5rem]"
            aria-hidden
          >
            Industrial Intelligence
          </p>
        </div>
      </div>

      <main className="relative overflow-hidden bg-navy-950 px-6 pb-16 md:px-12 md:pb-24">
        <div className="relative mx-auto max-w-6xl bg-white px-6 py-14 md:px-10 md:py-16">
          <span className="absolute right-0 top-0 rounded-bl-xl bg-accent-blue px-6 py-4 text-xs font-bold uppercase tracking-wide text-white">
            {post.category}
          </span>

          <h1 className="font-sans font-bold text-3xl leading-tight text-accent-blue md:text-4xl">{post.title}</h1>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-indigo-400 text-xs font-bold text-white">
              {initials}
            </div>
            <div className="text-sm">
              <p className="font-bold text-navy-950">{post.author}</p>
              <p className="text-xs text-gray-400">{post.meta}</p>
            </div>
          </div>

          {post.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.imageUrl} alt="" className="mt-8 aspect-[412/244] w-full object-cover" />
          ) : (
            <CmsImagePlaceholder className="mt-8 aspect-[412/244] w-full" />
          )}

          {post.excerpt && <p className="mt-6 text-lg text-gray-500">{post.excerpt}</p>}

          <div>
            {post.content.map((block) => (
              <BlockView key={block.id} block={block} />
            ))}
          </div>

          <div className="mt-12 border-t border-gray-200 pt-6">
            <Link href="/newsletter" className="text-sm font-medium text-navy-950 underline underline-offset-4">
              ← Back to all newsletters
            </Link>
          </div>
        </div>
      </main>

      {similar.length > 0 && (
        <div className="relative overflow-hidden bg-navy-950 px-6 py-20">
          <div className="absolute inset-0 bg-grid-dark" aria-hidden />
          <div className="relative mx-auto max-w-6xl">
            <div className="flex items-center justify-between">
              <h2 className="font-sans font-bold text-2xl text-white">Explore Similar</h2>
              <Link
                href="/newsletter"
                className="bg-accent-blue px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark"
              >
                View all
              </Link>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <Link
                  key={p.id}
                  href={`/newsletter/${p.slug}`}
                  className="flex flex-col overflow-hidden bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]"
                >
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.title} className="aspect-[412/244] w-full object-cover" />
                  ) : (
                    <div className={`aspect-[412/244] w-full bg-gradient-to-br ${p.gradient}`} />
                  )}
                  <div className="p-5">
                    <span className="text-xs font-bold uppercase tracking-wide text-accent-blue">{p.category}</span>
                    <h3 className="mt-2 font-sans font-bold text-lg text-navy-950">{p.title}</h3>
                    <div className="mt-4 text-sm">
                      <p className="font-bold text-navy-950">{p.author}</p>
                      <p className="text-xs text-gray-400">{p.meta}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
