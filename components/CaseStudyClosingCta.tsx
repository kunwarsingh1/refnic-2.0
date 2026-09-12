import { GradientCtaButton } from "@/components/ui/primitives";

export default function CaseStudyClosingCta({ ctaLabel }: { ctaLabel: string }) {
  return (
    <section className="relative overflow-hidden bg-[#161518] pb-24 pt-8 md:pb-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative z-10 flex justify-center px-6">
        <GradientCtaButton href="/contact">{ctaLabel}</GradientCtaButton>
      </div>
    </section>
  );
}
