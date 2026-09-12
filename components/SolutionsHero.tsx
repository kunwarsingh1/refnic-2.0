import { GradientCtaButton, CmsImagePlaceholder } from "@/components/ui/primitives";
import type { SolutionsPageConfig } from "@/lib/content/solutionsPage";

export default function SolutionsHero({ config: c }: { config: SolutionsPageConfig }) {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 md:pt-20 md:pb-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-[0.78]"
        style={{ background: "linear-gradient(180deg, black 0%, rgba(0,0,0,0) 100%)" }}
        aria-hidden
      />
      <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152df] opacity-40 blur-[220px] md:top-[122px]" aria-hidden />

      <p
        className="pointer-events-none absolute inset-x-0 top-8 select-none whitespace-nowrap text-center font-display font-bold leading-none text-[#F8F8F8]/10 text-[clamp(2.5rem,18vw,165px)] md:top-10"
        aria-hidden
      >
        {c.heroWatermark}
      </p>

      <div className="relative z-10 mx-auto mt-30 max-w-5xl px-6 text-center">
        {c.heroImageUrl ? (
          <img
            src={c.heroImageUrl}
            alt=""
            className="relative z-10 mx-auto mb-6 aspect-[495/488] w-40 rounded-2xl object-cover md:w-60"
          />
        ) : (
          <CmsImagePlaceholder className="relative z-10 mx-auto mb-6 aspect-[495/488] w-40 rounded-2xl md:w-60" />
        )}

        <h1 className="font-display font-bold text-4xl leading-tight text-[#EBEBEB] md:text-5xl md:leading-none">
          {c.heroHeading}
        </h1>

        <p className="mx-auto mt-6 max-w-[979px] text-center text-base font-normal leading-relaxed text-white md:text-[21.64px] md:leading-[32.46px]">
          {c.heroBody}
        </p>

        <div className="mt-8 flex justify-center">
          <GradientCtaButton href={c.heroCtaHref}>
            {c.heroCtaLabel}
          </GradientCtaButton>
        </div>
      </div>
    </section>
  );
}
