import Link from "next/link";
import { GradientCtaButton, ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/primitives";
import CaseStudyCard from "@/components/CaseStudyCard";
import type { CaseStudy } from "@/lib/content/caseStudies";

export default function CaseStudyExploreMore({
  others,
  prev,
  next,
}: {
  others: CaseStudy[];
  prev?: CaseStudy;
  next?: CaseStudy;
}) {
  if (others.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-[40px] font-bold leading-[40px] text-[#EBEBEB]">
            Explore more
          </h2>
          <GradientCtaButton href="/case-study">View All</GradientCtaButton>
        </div>

        <div className="relative mt-12 flex flex-col gap-8">
          {others.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} />
          ))}

          <Link
            href={prev ? `/case-study/${prev.slug}` : "#"}
            aria-label="Previous case study"
            aria-disabled={!prev}
            className={`absolute left-0 top-1/2 hidden size-[92px] -translate-x-[calc(100%+16px)] -translate-y-1/2 items-center justify-center rounded-full border border-[#F9FAFB] text-[#F9FAFB] transition-opacity md:flex ${
              prev ? "hover:opacity-70" : "pointer-events-none opacity-30"
            }`}
          >
            <ArrowLeftIcon className="size-5" />
          </Link>
          <Link
            href={next ? `/case-study/${next.slug}` : "#"}
            aria-label="Next case study"
            aria-disabled={!next}
            className={`absolute right-0 top-1/2 hidden size-[92px] translate-x-[calc(100%+16px)] -translate-y-1/2 items-center justify-center rounded-full border border-[#F9FAFB] text-[#F9FAFB] transition-opacity md:flex ${
              next ? "hover:opacity-70" : "pointer-events-none opacity-30"
            }`}
          >
            <ArrowRightIcon className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
