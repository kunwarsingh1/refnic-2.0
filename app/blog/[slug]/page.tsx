import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/lib/content/blog";
import { BlogPostView } from "@/components/BlogPostView";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) return { title: "Blog — Refine Nicely" };
  return {
    title: `${post.title} — Refine Nicely`,
    description: post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) notFound();

  return (
    <>
      <SiteHeader bgClassName="bg-navy-950" />

      <main className="relative overflow-hidden bg-navy-950 px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <div className="relative">
          <BlogPostView post={post} />
        </div>
      </main>

      <Footer />
    </>
  );
}
