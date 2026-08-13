"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { posts } from "@/lib/newsletter";

const loopPosts = [...posts, ...posts];

export default function NewsletterSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const speed = 0.15;
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      if (!pausedRef.current) {
        const base = el.scrollWidth / 2;
        if (base > 0 && el.scrollLeft >= base) {
          el.scrollLeft -= base;
        }
        el.scrollLeft += speed * dt;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative overflow-hidden bg-navy-950 pt-12 md:pt-16 pb-0">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative w-full px-6">
        <div className="mb-14 grid items-end gap-8 md:grid-cols-2">
          <h2 className="font-sans font-bold text-3xl leading-tight text-white md:text-5xl">
            Newsletters
          </h2>
          <p className="max-w-md text-white/60">
            From concept development to long-term operational support, Refnic
            delivers the expertise that powers successful industrial projects.
          </p>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        className="relative w-full flex gap-8 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loopPosts.map((post, i) => (
          <article
            key={i}
            className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-none bg-white text-black shadow-sm transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_-15px_rgba(46,75,224,0.55)]"
          >
            <div className="aspect-[412/244] bg-white" />
            <div className="px-5 pb-5 pt-5">
              <span className="text-xs text-gray-500">
                {post.category}
              </span>
              <h3 className="mt-2 font-sans font-bold text-lg text-black">{post.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                {post.excerpt}
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-indigo-400 text-xs font-bold text-white">
                  LB
                </div>
                <div className="text-sm">
                  <p className="font-bold text-black">{post.author}</p>
                  <p className="text-xs text-gray-400">{post.meta}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="relative mt-10 flex justify-center">
        <Link
          href="/newsletter"
          className="rounded-none bg-accent-blue px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark"
        >
          View all
        </Link>
      </div>
    </section>
  );
}
