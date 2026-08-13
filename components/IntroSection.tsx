"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "./ui/primitives";

const cards = [
  {
    title: "Metal Refining",
    image: "/Metall_refining.png",
  },
  {
    title: "Material Recovery",
    image: "/Material_recovery.png",
  },
  {
    title: "Hydrometallurgy",
    image: "/Hydrometallurgy.png",
  },
  {
    title: "Process Engineering",
    image: "/PROCESS_ENG.png",
  },
  {
    title: "E-Waste Recycling",
    image: "/E_waste_recycling.png",
  },
];

const N = cards.length;
// three copies back-to-back so the track can keep sliding left and loop seamlessly
const track = [...cards, ...cards, ...cards];

const ROTATE_MS = 3500;
const TRANSITION_MS = 700;

export default function IntroSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState(N);
  const [animate, setAnimate] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el || el.children.length < 2) return;
      const a = el.children[0] as HTMLElement;
      const b = el.children[1] as HTMLElement;
      setStep(b.offsetLeft - a.offsetLeft);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
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
    <section className="relative overflow-hidden bg-navy-950 py-10 md:py-12">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="pointer-events-none absolute -left-40 top-20 h-[626px] w-[626px] rounded-full bg-[#3152df] opacity-30 blur-[360px]" aria-hidden />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[797px] w-[797px] rounded-full bg-[#3152df] opacity-50 blur-[456px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-end gap-10 md:grid-cols-2 md:gap-24">
          <h2 className="font-sans font-bold text-3xl leading-tight text-white md:text-5xl">
            Engineering Every Stage of Resource Recovery.
          </h2>
          <p className="leading-relaxed text-white/60 md:pb-2">
            Engineering the technologies that transform industrial waste into
            critical materials powering a cleaner, circular future through
            indigenous innovation.
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-24 px-6 md:px-16">
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex items-center gap-6 md:gap-8"
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
                  className={`flex w-[calc((100%-3rem)/3)] shrink-0 flex-col items-center border border-white/10 p-6 text-center transition-all duration-700 md:w-[calc((100%-4rem)/3)] ${emphasized ? "md:py-10" : ""}`}
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    className={`w-full object-contain transition-all duration-700 ${emphasized ? "h-40 md:h-56" : "h-28 md:h-36"}`}
                  />
                  <p className={`mt-6 font-sans text-white transition-all duration-700 ${emphasized ? "text-2xl font-bold md:text-3xl" : "text-lg font-medium text-white/80"}`}>
                    {c.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mt-20 flex justify-center">
          <Button>View Products</Button>
        </div>
      </div>
    </section>
  );
}
