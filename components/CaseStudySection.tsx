"use client";

import { useState, useEffect } from "react";
import { ArrowLeftIcon, ArrowRightIcon, Button } from "./ui/primitives";
import type { TouchEvent as ReactTouchEvent } from "react";

const caseStudies = [
  {
    number: "01",
    city: "Mumbai",
    label: "Li-ion battery recycling Plant",
    image: "/Li-ion battery recycling.png",
    body: "Designed and commissioned as a turnkey lithium-ion battery recycling facility, this plant enables efficient material recovery through advanced process engineering, indigenous equipment, and scalable industrial infrastructure.",
  },
  {
    number: "02",
    city: "Pune",
    label: "E-Waste Recycling Line",
    image: "/E-waste recycling line.png",
    body: "An integrated mechanical line engineered for safe e-waste processing and high-yield recovery of valuable fractions, from shredding and separation through to refining-ready concentrates.",
  },
  {
    number: "03",
    city: "Ahmedabad",
    label: "Hydrometallurgical Refinery",
    image: "/Metal refining hydrometellury.png",
    body: "A complete hydrometallurgical facility delivering battery-grade refined metals through precisely engineered leaching, solvent extraction, and electrowinning stages.",
  },
];

export default function CaseStudySection() {
  const [index, setIndex] = useState(0);
  const cs = caseStudies[index];

  const prev = () => setIndex((i) => (i - 1 + caseStudies.length) % caseStudies.length);
  const next = () => setIndex((i) => (i + 1) % caseStudies.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const [touchX, setTouchX] = useState<number | null>(null);
  const onTouchStart = (e: ReactTouchEvent) => setTouchX(e.touches[0].clientX);
  const onTouchEnd = (e: ReactTouchEvent) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    setTouchX(null);
  };

  return (
    <section className="relative overflow-hidden rounded-t-[2.5rem] bg-white pt-[80px] pb-12 md:pt-[204px] md:pb-16">
      <style>{`
        @keyframes csFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="pointer-events-none absolute -right-40 top-10 h-[626px] w-[626px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-14 grid items-end gap-8 md:grid-cols-2">
          <h2 className="font-sans font-bold text-3xl leading-tight text-black md:text-5xl">
            Projects That Speak for Themselves
          </h2>
          <p className="max-w-md text-gray-500">
            Every project is a benchmark in precision engineering and
            sustainable resource recovery.
          </p>
        </div>

        <div className="relative px-16 md:px-20">
          <button
            onClick={prev}
            aria-label="Previous case study"
            className="absolute left-0 top-1/2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-black transition-colors hover:border-accent-blue hover:text-accent-blue"
          >
            <ArrowLeftIcon className="size-5" />
          </button>

          <div className="relative rounded-2xl bg-[#f8f8f8] px-8 py-10 md:px-12 md:py-14">
            <div
              key={index}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              style={{ animation: "csFade 0.45s ease" }}
              className="grid items-center gap-10 md:grid-cols-2"
            >
              <div className="flex items-center justify-center">
                <img
                  src={cs.image}
                  alt={cs.label}
                  className="aspect-[438/309] w-full rounded-xl object-cover shadow-[0_4px_86.9px_rgba(0,0,0,0.25),0_4px_76px_rgba(49,82,223,0.35)]"
                />
              </div>
              <div>
                <p className="font-display font-black text-4xl md:text-6xl">
                  <span className="text-[#3152df]">{cs.number} — </span>
                  <span className="text-black">{cs.city}</span>
                </p>
                <p className="mt-6 text-sm font-bold text-[#1b37b0]">{cs.label}</p>
                <p className="mt-3 leading-relaxed text-gray-600">{cs.body}</p>
                <div className="mt-8">
                  <Button href="/case-study" className="rounded-lg">View Case Study</Button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={next}
            aria-label="Next case study"
            className="absolute right-0 top-1/2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-black transition-colors hover:border-accent-blue hover:text-accent-blue"
          >
            <ArrowRightIcon className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
