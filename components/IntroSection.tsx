"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/primitives";
import type { IntroCard } from "@/lib/content/introCards";

const ROTATE_MS = 3500;
const TRANSITION_MS = 700;

export default function IntroSection({ cards }: { cards: IntroCard[] }) {
  const N = cards.length;
  // three copies back-to-back so the track can keep sliding left and loop seamlessly
  const track = useMemo(() => [...cards, ...cards, ...cards], [cards]);

  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState(N);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      if (el.children.length < 2) return;
      const a = el.children[0] as HTMLElement;
      const b = el.children[1] as HTMLElement;
      setStep(b.offsetLeft - a.offsetLeft);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
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
  }, [position]);

  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const middleIndex = position + 1;

  return (
    <section className="relative overflow-hidden bg-black py-6 md:py-12">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-24">
          <h2 className="text-center font-sans text-[18px] font-bold leading-[21.60px] text-[#EBEBEB] md:text-left md:text-5xl md:leading-tight md:text-white">
            Engineering Every Stage
            <br className="md:hidden" /> of Resource Recovery.
          </h2>
          <p
            className="mx-auto max-w-[270px] text-center text-sm font-extralight leading-[18px] text-white md:ml-auto md:max-w-[600px] md:text-left md:pb-2 md:text-[clamp(0.8rem,calc(2.213vw_-_5.34px),20px)] md:font-normal md:leading-[32.46px]"
            style={{ fontFamily: "Plus Jakarta Sans" }}
          >
            Engineering the technologies that transform industrial waste into
            critical materials powering a cleaner, circular future through
            indigenous innovation.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-10 px-0 md:mt-24 md:px-16">
        <div className="overflow-hidden px-0">
          <div
            ref={trackRef}
            className="flex items-center gap-0 md:gap-8"
            style={{
              transform: `translateX(-${position * step}px)`,
              transition: animate ? `transform ${TRANSITION_MS}ms ease` : "none",
            }}
          >
            {track.map((c, i) => {
              const emphasized = i === middleIndex;
              return (
                <div
                  key={i}
                  style={{ perspective: "1000px" }}
                  className={`flex w-full shrink-0 flex-col items-center border border-white/10 px-0 py-4 text-center transition-all duration-700 sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-4rem)/3)] md:p-6`}
                >
                  {c.imageUrl && (
                    <div className="relative flex w-full items-center justify-center">
                      {emphasized && (
                        <div
                          className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152DF] opacity-50 blur-[90px] md:hidden"
                          aria-hidden
                        />
                      )}
                      <img
                        src={c.imageUrl}
                        alt={c.title}
                        className={`relative w-full object-contain shadow-[0px_2px_14px_rgba(0,0,0,0.5)] transition-all duration-700 md:shadow-none md:[filter:drop-shadow(0_0_60px_rgba(46,75,224,0.85))] ${emphasized ? "h-64 md:h-60" : "h-28 md:h-40"}`}
                      />
                    </div>
                  )}
                  <p className={`mt-3 px-4 font-sans text-white transition-all duration-700 md:mt-6 md:px-0 ${emphasized ? "text-2xl font-bold md:text-3xl" : "text-lg font-medium text-white/80"}`}>
                    {c.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative mx-auto hidden max-w-7xl px-6 md:block">
        <div className="relative mt-20 flex justify-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152df] opacity-40 blur-[100px]" aria-hidden />
          <Button href="/products">View Products</Button>
        </div>
      </div>
    </section>
  );
}
