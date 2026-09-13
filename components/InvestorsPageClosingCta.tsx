import { GradientCtaButton } from "@/components/ui/primitives";

export default function InvestorsPageClosingCta({ heading, ctaLabel }: { heading: string; ctaLabel: string }) {
  return (
    <section className="relative overflow-hidden bg-black pb-24 pt-8 md:pb-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-2xl font-bold leading-tight text-[#EBEBEB] md:text-3xl">{heading}</h2>
        <div className="mt-8 flex justify-center">
          <GradientCtaButton href="/contact">{ctaLabel}</GradientCtaButton>
        </div>
      </div>
    </section>
  );
}
