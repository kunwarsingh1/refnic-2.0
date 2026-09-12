import { GradientCtaButton } from "@/components/ui/primitives";
import CareerDecorativeRing from "@/components/CareerDecorativeRing";
import type { CaseStudy } from "@/lib/content/caseStudies";

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 border-2 border-white bg-white/[0.03] opacity-[0.61] backdrop-blur-[68.9px]"
        aria-hidden
      />
      <div className="relative flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:gap-4 md:p-10">
        <div className="min-w-0">
          <p className="font-display text-3xl font-bold leading-tight text-[#EBEBEB]">{cs.city.toUpperCase()}</p>
          <p className="mt-2 text-[21.64px] leading-[32.46px] text-white">{cs.label}</p>
          {cs.subtitle && <p className="mt-1 text-[21.64px] leading-[32.46px] text-white">{cs.subtitle}</p>}
        </div>

        <CareerDecorativeRing className="mx-auto h-32 w-32 shrink-0 opacity-40 md:h-40 md:w-40" />

        <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
          {cs.status && (
            <span className="inline-flex items-center gap-2 text-[21.64px] leading-[32.46px] text-white">
              {cs.status}
              <span className="size-[27px] rounded-full bg-[#97F88C]" aria-hidden />
            </span>
          )}
          <GradientCtaButton href={`/case-study/${cs.slug}`}>View Case Study</GradientCtaButton>
        </div>
      </div>
    </div>
  );
}
