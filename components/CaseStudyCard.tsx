import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";
import type { CaseStudy } from "@/lib/content/caseStudies";

export default function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <div className="relative">
      <div
        style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
        className="pointer-events-none absolute inset-0 border border-transparent bg-white/[0.03]"
        aria-hidden
      />
      <div className="relative grid grid-cols-1 items-center gap-6 p-8 text-center md:grid-cols-[1fr_auto_1fr] md:gap-4 md:p-10 md:text-left">
        <div className="min-w-0">
          <p className="font-display text-lg font-bold leading-tight text-[#EBEBEB] md:text-xl">{cs.city.toUpperCase()}</p>
          <p className="mt-2 text-[21.64px] leading-[32.46px] text-white">{cs.label}</p>
          {cs.subtitle && <p className="mt-1 text-[21.64px] leading-[32.46px] text-white">{cs.subtitle}</p>}
        </div>

        <CmsImagePlaceholder className="mx-auto h-32 w-32 shrink-0 md:h-40 md:w-40" />

        <div className="flex flex-col items-center gap-4 md:items-end">
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
