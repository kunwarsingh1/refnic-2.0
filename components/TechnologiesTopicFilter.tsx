"use client";

import { useState } from "react";
import type { NewsletterPost } from "@/lib/content/newsletter";

export default function TechnologiesTopicFilter({ posts, topics }: { posts: NewsletterPost[]; topics: string[] }) {
  const [activeTopic, setActiveTopic] = useState(topics[0] ?? "");
  const filtered = posts.filter((p) => p.category === activeTopic);
  const visible = filtered.length > 0 ? filtered : posts;

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => setActiveTopic(topic)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
              activeTopic === topic
                ? "border-accent-blue bg-accent-blue text-white"
                : "border-white/15 text-white/60 hover:border-white/30 hover:text-white"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.length === 0 ? (
          <p className="text-sm text-white/40">No posts yet.</p>
        ) : (
          visible.map((post) => (
            <article
              key={post.id}
              className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
            >
              <div className={`aspect-[412/244] bg-gradient-to-br ${post.gradient}`} />
              <div className="p-5">
                <span className="text-xs font-bold uppercase tracking-wide text-accent-blue">{post.category}</span>
                <h3 className="mt-2 font-sans font-bold text-lg text-white">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/55">{post.excerpt}</p>
                <div className="mt-4 text-sm">
                  <p className="font-bold text-white">{post.author}</p>
                  <p className="text-xs text-white/40">{post.meta}</p>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
