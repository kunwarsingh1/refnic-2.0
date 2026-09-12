import Link from "next/link";
import type { Block } from "@/lib/content/blog";
import { formatDate, getYoutubeEmbedUrl } from "@/lib/blogShared";
import { PdfEmbed } from "@/components/admin/PdfEmbed";
import { PdfDownloadGate } from "@/components/PdfDownloadGate";

type BlogPostViewProps = {
  post: {
    title: string;
    slug: string;
    excerpt: string | null;
    coverImageUrl: string | null;
    content: Block[];
    createdAt: string;
  };
};

function BlockView({ block, postSlug }: { block: Block; postSlug: string }) {
  switch (block.type) {
    case "text":
      return <p className="my-6 whitespace-pre-wrap text-[1.05rem] leading-7 text-white/80">{block.text}</p>;
    case "image":
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.url} alt={block.caption || ""} className="w-full rounded-lg" />
          {block.caption && <figcaption className="mt-2 text-center text-sm text-white/40">{block.caption}</figcaption>}
        </figure>
      );
    case "video":
      return (
        <figure className="my-8">
          <video src={block.url} controls preload="metadata" className="w-full rounded-lg bg-black" />
          {block.caption && <figcaption className="mt-2 text-center text-sm text-white/40">{block.caption}</figcaption>}
        </figure>
      );
    case "youtube": {
      const embedUrl = getYoutubeEmbedUrl(block.url);
      return (
        <figure className="my-8">
          {embedUrl ? (
            <div className="aspect-video overflow-hidden rounded-lg bg-black">
              <iframe
                src={embedUrl}
                title={block.caption || "YouTube video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <a
              href={block.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-white transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              {block.caption || block.url}
            </a>
          )}
          {block.caption && <figcaption className="mt-2 text-center text-sm text-white/40">{block.caption}</figcaption>}
        </figure>
      );
    }
    case "pdf":
      return (
        <PdfEmbed
          url={block.url}
          title={block.label}
          downloadButton={
            block.downloadable ? <PdfDownloadGate postSlug={postSlug} url={block.url} label={block.label} /> : undefined
          }
        />
      );
    case "link":
      return (
        <div className="my-6">
          <a
            href={block.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
          >
            <span className="block text-sm font-medium text-white">{block.label || block.url}</span>
            <span className="block truncate text-sm text-white/40">{block.url}</span>
          </a>
        </div>
      );
  }
}

export function BlogPostView({ post }: BlogPostViewProps) {
  return (
    <article>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-white">{post.title}</h1>
        <p className="mt-2 text-sm text-white/40">{formatDate(post.createdAt)}</p>
        {post.coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.coverImageUrl} alt="" className="mt-8 mb-10 h-56 w-full rounded-lg object-cover" />
        )}
        {post.excerpt && <p className="mt-4 text-lg text-white/60">{post.excerpt}</p>}
        <div>
          {post.content.map((block) => (
            <BlockView key={block.id} block={block} postSlug={post.slug} />
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6">
          <Link href="/blog" className="text-sm font-medium text-white underline underline-offset-4">
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  );
}
