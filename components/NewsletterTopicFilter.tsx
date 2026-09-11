"use client";

import { useState } from "react";
import Link from "next/link";
import type { NewsletterPost } from "@/lib/content/newsletter";
import type { NewsletterTab } from "@/lib/content/newsletterTabs";

function PostCard({ post, featured = false }: { post: NewsletterPost; featured?: boolean }) {
  return (
    <Link
      href={`/newsletter/${post.slug}`}
      className="flex flex-col overflow-hidden bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]"
    >
      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt={post.title}
          className={`w-full object-cover ${featured ? "aspect-[16/7]" : "aspect-[412/244]"}`}
        />
      ) : (
        <div className={`w-full bg-gradient-to-br ${post.gradient} ${featured ? "aspect-[16/7]" : "aspect-[412/244]"}`} />
      )}
      <div className="p-5">
        <span className="text-xs font-bold uppercase tracking-wide text-accent-blue">{post.category}</span>
        <h3 className={`mt-2 font-sans font-bold text-navy-950 ${featured ? "text-2xl" : "text-lg"}`}>{post.title}</h3>
        <p className={`mt-2 leading-relaxed text-gray-500 ${featured ? "line-clamp-3 text-base" : "line-clamp-3 text-sm"}`}>
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-indigo-400 text-xs font-bold text-white">
            {post.author
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase() || "LB"}
          </div>
          <div className="text-sm">
            <p className="font-bold text-navy-950">{post.author}</p>
            <p className="text-xs text-gray-400">{post.meta}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function NewsletterTopicFilter({
  posts,
  tabs,
}: {
  posts: NewsletterPost[];
  tabs: NewsletterTab[];
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.name ?? "");
  const activeTabInfo = tabs.find((t) => t.name === activeTab);
  const filtered = posts.filter((p) => p.category === activeTab);
  const visible = filtered.length > 0 ? filtered : posts;
  const featuredPost = visible.find((p) => p.featured) ?? visible[0];
  const restPosts = visible.filter((p) => p.id !== featuredPost?.id);

  if (tabs.length === 0) {
    return <p className="text-center text-sm text-white/40">No newsletter tabs set up yet.</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center text-sm text-white/40">No newsletter posts yet.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.name)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
              activeTab === tab.name
                ? "border-accent-blue bg-accent-blue text-white"
                : "border-white/15 text-white/60 hover:border-white/30 hover:text-white"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="mt-14 grid items-center gap-8 md:grid-cols-2">
        <h2 className="font-sans font-bold text-4xl leading-tight text-white md:max-w-md md:text-7xl">{activeTab}</h2>
        {activeTabInfo?.tagline && (
          <p
            className="ml-auto max-w-md text-right text-white/60 md:max-w-xl md:text-[clamp(0.8rem,calc(2.213vw_-_3.7px),21.64px)] md:leading-[32.46px]"
            style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 400 }}
          >
            {activeTabInfo.tagline}
          </p>
        )}
      </div>

      {featuredPost && (
        <div className="mt-8">
          <PostCard post={featuredPost} featured />
        </div>
      )}

      {restPosts.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
