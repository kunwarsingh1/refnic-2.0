"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  CmsImagePlaceholder,
} from "./ui/primitives";
import type { TouchEvent as ReactTouchEvent } from "react";
import type { CaseStudy } from "@/lib/content/caseStudies";
import { ModelViewer } from "./ModelViewer";

export default function CaseStudySection({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [index, setIndex] = useState(0);
  const cs = caseStudies[index];
  const number = String(index + 1).padStart(2, "0");

  const prev = () => {
    setIndex(
      (i) => (i - 1 + caseStudies.length) % caseStudies.length
    );
  };

  const next = () => {
    setIndex(
      (i) => (i + 1) % caseStudies.length
    );
  };

  /* --------------------------------
     Keyboard navigation
  -------------------------------- */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prev();
      }

      if (e.key === "ArrowRight") {
        next();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  /* --------------------------------
     Touch / swipe navigation
  -------------------------------- */

  const [touchX, setTouchX] = useState<number | null>(null);

  const onTouchStart = (e: ReactTouchEvent) => {
    setTouchX(e.touches[0].clientX);
  };

  const onTouchEnd = (e: ReactTouchEvent) => {
    if (touchX === null) return;

    const dx = e.changedTouches[0].clientX - touchX;

    if (Math.abs(dx) > 50) {
      if (dx < 0) {
        next();
      } else {
        prev();
      }
    }

    setTouchX(null);
  };

  if (!cs) {
    return (
      <section className="relative overflow-hidden bg-black pt-[80px] pb-12 md:pt-[204px] md:pb-16">
        <div className="absolute inset-0 bg-grid-dark" aria-hidden />
        <div className="relative z-10 mx-auto w-[90%] px-6">
          <div className="rounded-t-[2.5rem] bg-white px-6 py-14 text-center text-gray-400 md:px-12">
            No case studies yet.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-black pt-[80px] pb-12 md:pt-[204px] md:pb-16">
      
      {/* ==========================================
          BACKGROUND GRID
      ========================================== */}

      <div
        className="absolute inset-0 bg-grid-dark"
        aria-hidden
      />

      {/* ==========================================
          ANIMATION
      ========================================== */}

      <style>{`
        @keyframes csFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* ==========================================
          MAIN CONTAINER
      ========================================== */}

      <div className="relative z-10 mx-auto w-[90%] px-6">
        
        <div className="rounded-t-[2.5rem] bg-white px-6 pt-10 pb-14 md:px-12 md:pt-14 md:pb-20">

          {/* ========================================
              SECTION HEADER
          ======================================== */}

          <div className="mb-14 grid items-start gap-8 md:grid-cols-2">

            <h2 className="font-sans text-3xl font-bold leading-tight text-black md:text-5xl">
              Projects That Speak for Themselves
            </h2>

            <p
              className="ml-auto max-w-[180px] text-right text-[12px] leading-[16.60px] text-[#151515] md:max-w-xl md:text-[clamp(0.8rem,calc(2.213vw_-_3.7px),16px)] md:leading-[32.46px] md:text-black/60"
              style={{ fontFamily: "Plus Jakarta Sans", fontWeight: 400 }}
            >
              Every project is a benchmark in precision engineering and
              sustainable resource recovery.
            </p>

          </div>

          {/* ========================================
              CAROUSEL WRAPPER
          ======================================== */}

          <div className="relative px-2 lg:px-20">

            {/* ======================================
                PREVIOUS BUTTON
            ====================================== */}

            <button
              onClick={prev}
              aria-label="Previous case study"
              className="
                absolute
                left-0
                top-1/2
                z-40
                hidden
                size-9
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-gray-300
                bg-white
                text-black
                transition-colors
                hover:border-accent-blue
                hover:text-accent-blue
                lg:flex
                lg:size-12
              "
            >
              <ArrowLeftIcon className="size-4 lg:size-5" />
            </button>

            {/* ======================================
                CASE STUDY CARD

                IMPORTANT:
                NO PADDING HERE.

                This allows the image and grid
                lines to use exactly the same
                coordinate system.
            ====================================== */}

            <div
              className="
                relative
                min-h-0
                overflow-hidden
                rounded-2xl
                bg-white
                lg:min-h-[410px]
              "
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >

              {/* ====================================
                  GRID — LEFT VERTICAL LINE
              ==================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-6
                  left-[13%]
                  z-30
                  hidden
                  w-px
                  bg-gray-300
                  lg:block
                "
                aria-hidden
              />

              {/* ====================================
                  GRID — IMAGE / CONTENT LINE
              ==================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-y-6
                  left-[45%]
                  z-30
                  hidden
                  w-px
                  bg-accent-blue/40
                  lg:block
                "
                aria-hidden
              />

              {/* ====================================
                  GRID — TOP HORIZONTAL LINE
              ==================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  top-[96px]
                  z-30
                  hidden
                  h-px
                  bg-accent-blue/40
                  lg:block
                "
                aria-hidden
              />

              {/* ====================================
                  GRID — BOTTOM HORIZONTAL LINE
              ==================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-x-0
                  bottom-[110px]
                  z-30
                  hidden
                  h-px
                  bg-accent-blue/40
                  lg:block
                "
                aria-hidden
              />

              {/* ====================================
                  IMAGE

                  13% → 45%

                  Therefore:

                  left = 13%
                  width = 32%

                  13 + 32 = 45%

                  So the image ends EXACTLY
                  at the second vertical line.
              ==================================== */}

              <div
                key={`img-${index}`}
                style={{
                  animation: "csFade 0.45s ease",
                }}
                className="
                  relative
                  z-10
                  mb-6
                  aspect-[4/3]
                  w-full
                  overflow-hidden
                  shadow-[0_4px_40px_rgba(0,0,0,0.2),0_4px_32px_rgba(49,82,223,0.3)]
                  lg:absolute
                  lg:left-[13%]
                  lg:top-[96px]
                  lg:bottom-[110px]
                  lg:mb-0
                  lg:aspect-auto
                  lg:w-[32%]
                "
              >
                {cs.modelUrl ? (
                  <ModelViewer src={cs.modelUrl} alt={cs.label} className="h-full w-full" />
                ) : cs.imageUrl ? (
                  <img
                    src={cs.imageUrl}
                    alt={cs.label}
                    className="h-full w-full scale-150 object-cover"
                  />
                ) : (
                  <CmsImagePlaceholder className="h-full w-full" />
                )}
              </div>

              {/* ====================================
                  CONTENT GRID

                  13% = number
                  32% = image
                  55% = content

                  Total = 100%
              ==================================== */}

              <div
                key={index}
                style={{
                  animation: "csFade 0.45s ease",
                }}
                className="
                  relative
                  z-10
                  grid
                  min-h-0
                  grid-cols-1
                  items-start
                  lg:min-h-[410px]
                  lg:items-stretch
                  lg:grid-cols-[13%_32%_55%]
                "
              >

                {/* ==================================
                    NUMBER
                ================================== */}

                <div className="hidden items-start justify-center lg:flex">
                  <p className="
                    font-display
                    text-6xl
                    font-black
                    text-black/10
                  ">
                    {number}
                  </p>
                </div>

                {/* ==================================
                    IMAGE COLUMN

                    Empty intentionally.
                    The actual image is absolutely
                    positioned above this column.
                ================================== */}

                <div aria-hidden className="hidden lg:block" />

                {/* ==================================
                    CONTENT
                ================================== */}

                <div className="min-w-0 px-8 pt-16 pb-16 lg:relative lg:h-full lg:px-12 lg:pt-0 lg:pb-20">

                  <p
                    className="
                      break-words
                      text-4xl
                      font-bold
                      leading-tight
                      lg:text-[clamp(1.65rem,calc(11.5vw_-_4rem),4rem)]
                      lg:leading-[64px]
                    "
                    style={{
                      color: "#1B37B0",
                      fontFamily: "Plus Jakarta Sans",
                    }}
                  >
                    {cs.city}
                  </p>

                  <div className="lg:absolute lg:left-12 lg:right-12 lg:top-[96px] lg:bottom-[110px] lg:flex lg:flex-col lg:justify-center">
                    <p className="
                      mt-3
                      text-sm
                      font-bold
                      text-[#1b37b0]
                      lg:mt-0
                    ">
                      {cs.label}
                    </p>

                    <p className="
                      mt-2
                      max-w-xl
                      text-[12px]
                      font-normal
                      leading-[16.60px]
                      text-[#151515]
                      md:text-base
                      md:leading-snug
                      md:text-gray-600
                    ">
                      {cs.body}
                    </p>
                  </div>

                  <div className="mt-3 lg:absolute lg:bottom-8 lg:left-12">
                    <Button
                      href="/case-study"
                      className="rounded-lg"
                    >
                      View Case Study
                    </Button>
                  </div>

                </div>
              </div>
            </div>

            {/* ======================================
                NEXT BUTTON
            ====================================== */}

            <button
              onClick={next}
              aria-label="Next case study"
              className="
                absolute
                right-0
                top-1/2
                z-40
                hidden
                size-9
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-gray-300
                bg-white
                text-black
                transition-colors
                hover:border-accent-blue
                hover:text-accent-blue
                lg:flex
                lg:size-12
              "
            >
              <ArrowRightIcon className="size-4 lg:size-5" />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}