"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { Pillar } from "@/lib/content/pillars";

const ROTATE_MS = 3500;
const TRANSITION_MS = 700;

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
  // three copies back-to-back so the track can keep sliding left and loop seamlessly
  const track = useMemo(() => [...pillars, ...pillars, ...pillars], [pillars]);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [centerOffset, setCenterOffset] = useState(0);
  const [position, setPosition] = useState(N);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    const el = trackRef.current;
    const container = containerRef.current;
    if (!el || !container) return;
    const measure = () => {
      if (el.children.length < 2) return;
      const a = el.children[0] as HTMLElement;
      const b = el.children[1] as HTMLElement;
      setStep(b.offsetLeft - a.offsetLeft);
      // center the active (narrower-than-container) card so its peek is symmetric
      setCenterOffset((container.clientWidth - a.offsetWidth) / 2);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimate(true);
      setPosition((p) => p + 1);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  // once we've slid a full loop ahead, snap back by one loop with no transition
  // so the slide can continue indefinitely without ever reaching the end of the track
  useEffect(() => {
    if (position < N * 2) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setPosition((p) => p - N);
    }, TRANSITION_MS);
    return () => clearTimeout(t);
  }, [position, N]);

  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-black py-8 md:py-10">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 pt-2 md:pt-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-sans text-[18px] font-bold leading-[18px] text-[#EBEBEB] md:text-5xl md:leading-tight md:text-white">
            Designed for
            <br className="md:hidden" /> Industrial Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-[260px] text-sm font-extralight leading-[18px] text-white md:max-w-md md:font-normal md:text-[21.64px] md:leading-[32.46px]">
            Precision engineering, intelligent process design, and indigenous
            manufacturing working together to redefine recycling.
          </p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[90rem] px-6 py-8 md:py-10">
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

      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-14 md:pb-20 md:pt-20">
        <div ref={containerRef} className="overflow-hidden md:overflow-visible">
          <div
            ref={trackRef}
            className="flex gap-4 md:!transform-none md:grid md:grid-cols-3 md:gap-6"
            style={{
              transform: `translateX(${centerOffset - position * step}px)`,
              transition: animate ? `transform ${TRANSITION_MS}ms ease` : "none",
            }}
          >
            {track.map((p, i) => (
              <div
                key={i}
                className="relative w-[58%] shrink-0 transition-all duration-300 hover:scale-[1.03] md:w-auto"
              >
                <div
                  className="pointer-events-none absolute inset-0 border border-white/20 bg-white/[0.03] md:border-transparent md:[border-image:linear-gradient(to_top_right,#1f1313,#737373,#191717)_1]"
                  aria-hidden
                />
                <div className="relative p-8 text-left md:p-10">
                  <h3 className="font-sans font-bold text-3xl leading-tight text-white md:text-4xl">
                    {p.title.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="mt-5 max-w-[190px] text-[12px] font-normal leading-[16.57px] text-white md:max-w-none md:text-base md:leading-relaxed md:text-white/55">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
