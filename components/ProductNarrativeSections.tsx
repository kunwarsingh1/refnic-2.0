import { CmsImagePlaceholder } from "@/components/ui/primitives";
import type { NarrativeSection } from "@/lib/content/solutionsPage";

export default function ProductNarrativeSections({ sections }: { sections: NarrativeSection[] }) {
  if (sections.length === 0) return null;

  return (
    <>
      {sections.map((s, i) => {
        const isRight = i % 2 === 0;

        return (
          <section key={i} className="relative overflow-hidden bg-black py-14 md:py-20">
            <div className="absolute inset-0 bg-grid-dark" aria-hidden />

            <div className="relative z-10 mx-auto max-w-5xl px-6">
              <div className={`flex flex-col gap-10 md:flex-row md:items-center ${isRight ? "" : "md:flex-row-reverse"}`}>
                <div className="relative flex flex-1 justify-center">
                  <div
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[110px] md:h-[380px] md:w-[380px]"
                    aria-hidden
                  />
                  {s.imageUrl ? (
                    <img src={s.imageUrl} alt="" className="relative aspect-[495/488] w-64 object-contain opacity-40 md:w-[400px]" />
                  ) : (
                    <CmsImagePlaceholder className="relative aspect-[495/488] w-64 md:w-[400px]" />
                  )}
                </div>

                <div className={`flex-1 ${isRight ? "md:text-left" : "md:text-right"}`}>
                  {s.heading && (
                    <h2 className="font-display text-2xl font-bold leading-tight text-[#EBEBEB] md:text-3xl">
                      {s.heading}
                    </h2>
                  )}
                  <p className={`mt-4 max-w-md text-[20px] leading-[32.46px] text-white ${isRight ? "" : "md:ml-auto"}`}>
                    {s.body}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
