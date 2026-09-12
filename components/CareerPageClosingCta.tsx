import { GradientCtaButton } from "@/components/ui/primitives";

export default function CareerPageClosingCta({
  heading,
  body,
  ctaLabel,
}: {
  heading: string;
  body: string;
  ctaLabel: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#161518] py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-[#EBEBEB]">
          {heading}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[20px] leading-[32.46px] text-white">{body}</p>

        <div className="mt-10 flex justify-center">
          <GradientCtaButton href="/contact">{ctaLabel}</GradientCtaButton>
        </div>
      </div>
    </section>
  );
}
