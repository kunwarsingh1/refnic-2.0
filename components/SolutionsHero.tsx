import {
  GradientCtaButton,
  CmsImagePlaceholder,
} from "@/components/ui/primitives";
import type { SolutionsPageConfig } from "@/lib/content/solutionsPage";

export default function SolutionsHero({
  config: c,
}: {
  config: SolutionsPageConfig;
}) {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 md:pt-6 md:pb-16">
      {/* Top gradient */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-[0.78]"
        style={{
          background:
            "linear-gradient(180deg, black 0%, rgba(0,0,0,0) 100%)",
        }}
        aria-hidden
      />

      {/* Blue glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152df] opacity-40 blur-[220px] md:top-[80px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Heading */}
        <h1 className="whitespace-pre-line font-display text-[40px] font-bold leading-tight text-[#EBEBEB]">
          {c.heroHeading}
        </h1>

        {/* Hero Image */}
        {c.heroImageUrl ? (
          <img
            src={c.heroImageUrl}
            alt=""
            className="relative z-10 mx-auto mt-0 mb-0 aspect-[495/488] w-[312px] object-contain md:w-[480px]"
          />
        ) : (
          <CmsImagePlaceholder className="relative z-10 mx-auto mt-0 mb-0 aspect-[495/488] w-[312px] md:w-[480px]" />
        )}

        {/* Description */}
        <p className="mx-auto mt-0 max-w-[979px] whitespace-pre-line text-center text-[18px] font-normal leading-relaxed text-white">
          {c.heroBody}
        </p>

        {/* CTA */}
        <div className="mt-6 flex justify-center">
          <GradientCtaButton href={c.heroCtaHref}>
            {c.heroCtaLabel}
          </GradientCtaButton>
        </div>
      </div>
    </section>
  );
}