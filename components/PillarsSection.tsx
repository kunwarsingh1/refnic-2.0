"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Pillar } from "@/lib/content/pillars";

const ROTATE_MS = 4000;

export default function PillarsSection({
  pillars,
  desktopVideoUrl,
  mobileVideoUrl,
}: {
  pillars: Pillar[];
  desktopVideoUrl: string;
  mobileVideoUrl?: string;
}) {
  const N = pillars.length;

  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isUserScrolling = useRef(false);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;
    const left = card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2;
    scroller.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (isUserScrolling.current) return;
      setActiveIndex((prev) => {
        const next = (prev + 1) % N;
        scrollToIndex(next);
        return next;
      });
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [N, scrollToIndex]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const handleScroll = () => {
      isUserScrolling.current = true;
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
      resumeTimeout.current = setTimeout(() => {
        isUserScrolling.current = false;
      }, ROTATE_MS);

      const center = scroller.scrollLeft + scroller.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full flex flex-col justify-center overflow-hidden bg-black py-8 md:py-10">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 pt-2 md:pt-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-sans text-[18px] font-bold leading-[18px] text-[#EBEBEB] md:text-5xl md:leading-tight md:text-white">
            Designed for
            <br /> Industrial Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-[260px] text-sm font-extralight leading-[18px] text-white md:max-w-md md:font-normal md:text-[21.64px] md:leading-[32.46px]">
            Precision engineering, intelligent process design, and indigenous
            manufacturing working together to redefine recycling.
          </p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[90rem] px-6 py-3 md:py-10">
        <div className="pointer-events-none absolute -bottom-10 left-0 h-[300px] w-[300px] rounded-full bg-[#3152df] opacity-30 blur-[120px] md:h-[420px] md:w-[420px] md:blur-[160px]" aria-hidden />
        <div className="pointer-events-none absolute -bottom-10 right-0 h-[300px] w-[300px] rounded-full bg-[#3152df] opacity-30 blur-[120px] md:h-[420px] md:w-[420px] md:blur-[160px]" aria-hidden />
        <div className="relative aspect-[1376/768] w-full overflow-hidden rounded-3xl bg-black">
          <video
            src={desktopVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            className="absolute inset-0 hidden h-full w-full rounded-3xl object-cover md:block"
          />
          <video
            src={mobileVideoUrl || desktopVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            className="absolute inset-0 h-full w-full rounded-3xl object-cover md:hidden"
          />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-14 pt-4 md:pb-20 md:pt-20">
        {/* Mobile: contained swipeable snap carousel — no negative margins, can't overflow the page */}
        <div className="w-full min-w-0 md:hidden">
          <div
            ref={scrollerRef}
            className="hide-scrollbar flex w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
            style={{ scrollPaddingLeft: "8%", scrollPaddingRight: "8%" }}
          >
            {pillars.map((p, i) => (
              <div
                key={p.title.join("-")}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="relative w-[85%] shrink-0 snap-center first:ml-[8%] last:mr-[8%]"
              >
                <div
                  className="pointer-events-none absolute inset-0 border border-white/20 bg-white/[0.03]"
                  aria-hidden
                />
                <div className="relative p-8 text-left">
                  <h3 className="font-sans text-3xl font-bold leading-tight text-white">
                    {p.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-5 max-w-[190px] whitespace-pre-line text-[12px] font-normal leading-[16.57px] text-white">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {pillars.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  setActiveIndex(i);
                  scrollToIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: static grid, unchanged */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {pillars.map((p) => (
            <div
              key={p.title.join("-")}
              className="relative transition-all duration-300 hover:scale-[1.03]"
            >
              <div
                className="pointer-events-none absolute inset-0 border border-transparent [border-image:linear-gradient(to_top_right,#1f1313,#737373,#191717)_1]"
                aria-hidden
              />
              <div className="relative p-10 text-left">
                <h3 className="font-sans text-4xl font-bold leading-tight text-white">
                  {p.title.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="mt-5 whitespace-pre-line text-base font-normal leading-relaxed text-white/55">
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}