"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function StickyNavShell({
  children,
  roundedBottom = true,
}: {
  children: ReactNode;
  /** true/false: static. "onScroll": stays square while the #hero-end-sentinel element
   *  is on screen, then rounds once the user scrolls past it. */
  roundedBottom?: boolean | "onScroll";
}) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    if (roundedBottom !== "onScroll") return;
    const sentinel = document.getElementById("hero-end-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolledPastHero(entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [roundedBottom]);

  const isRounded = roundedBottom === "onScroll" ? scrolledPastHero : roundedBottom;

  return (
    <div className={`mx-auto max-w-[90rem] bg-white transition-[border-radius] duration-300 ${isRounded ? "rounded-b-2xl" : ""}`}>
      {children}
    </div>
  );
}
