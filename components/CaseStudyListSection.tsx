import CaseStudyCard from "@/components/CaseStudyCard";
import type { CaseStudy } from "@/lib/content/caseStudies";

export default function CaseStudyListSection({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section className="relative overflow-hidden bg-[#161518] pb-20 md:pb-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div
        className="pointer-events-none absolute left-0 top-1/4 hidden h-[632px] w-[626px] -translate-x-1/3 rounded-full bg-[#3152DF] opacity-30 blur-[180px] md:block"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-3/4 hidden h-[632px] w-[626px] translate-x-1/3 rounded-full bg-[#3152DF] opacity-30 blur-[180px] md:block"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {caseStudies.length === 0 ? (
          <p className="text-sm text-white/40">No case studies yet.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {caseStudies.map((cs) => (
              <CaseStudyCard key={cs.id} cs={cs} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
