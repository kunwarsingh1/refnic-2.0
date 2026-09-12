import { GradientCtaButton } from "@/components/ui/primitives";
import CareerDecorativeRing from "@/components/CareerDecorativeRing";

export default function OurStoryClosingSection({ tagline, ctaLabel }: { tagline: string; ctaLabel: string }) {
  return (
    <section className="relative overflow-hidden bg-[#161518] py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[180px]"
        aria-hidden
      />
      <CareerDecorativeRing className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 opacity-40 md:block" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="font-display text-2xl font-bold leading-[1.4] text-white md:text-[36px]">{tagline}</p>
        <div className="mt-10 flex justify-center">
          <GradientCtaButton href="/case-study">{ctaLabel}</GradientCtaButton>
        </div>
      </div>
    </section>
  );
}
