import { CmsImagePlaceholder } from "@/components/ui/primitives";
import type { NumberedSection } from "@/lib/content/investorsPage";

export function ZigzagFeatureSections({
  sections,
  bodyPlacement = "same",
}: {
  sections: NumberedSection[];
  /** "same" keeps the body paragraph on the same side as the heading (Investors page);
   *  "opposite" moves it to the other side, leaving the ring next to the heading (Our Story page). */
  bodyPlacement?: "same" | "opposite";
}) {
  return (
    <>
      {sections.map((s, i) => {
        const isRight = i % 2 === 0;

        return (
          <section key={s.number} className="relative overflow-hidden bg-[#161518] py-14 md:py-24">
            <div className="absolute inset-0 bg-grid-dark" aria-hidden />
            <div
              className={`pointer-events-none absolute top-1/2 hidden h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[180px] md:block ${
                isRight ? "right-0 translate-x-1/3" : "left-0 -translate-x-1/3"
              }`}
              aria-hidden
            />

            <div className="relative z-10 mx-auto max-w-5xl px-6">
              {bodyPlacement === "same" ? (
                <div className={`flex flex-col gap-10 md:flex-row md:items-center ${isRight ? "md:flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${isRight ? "text-right" : "text-left"}`}>
                    <p className="font-display text-6xl font-bold leading-none text-[#F8F8F8]/20 md:text-[120px]">
                      {s.number}
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-5xl md:leading-tight">
                      {s.heading}
                    </h2>
                    <p className="mx-auto mt-6 max-w-md text-[20px] leading-[32.46px] text-white md:mx-0">{s.body}</p>
                  </div>

                  <div className="flex flex-1 justify-center md:justify-center">
                    {s.imageUrl ? (
                      <img
                        src={s.imageUrl}
                        alt={s.heading}
                        className="aspect-square w-40 rounded-2xl object-cover md:w-60"
                      />
                    ) : (
                      <CmsImagePlaceholder className="aspect-square w-40 rounded-2xl md:w-60" />
                    )}
                  </div>
                </div>
              ) : (
                <div className={`flex flex-col gap-10 md:flex-row md:items-center ${isRight ? "md:flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${isRight ? "text-right" : "text-left"}`}>
                    <p className="font-display text-6xl font-bold leading-none text-[#F8F8F8]/20 md:text-[120px]">
                      {s.number}
                    </p>
                    <h2 className="mt-2 font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-5xl md:leading-tight">
                      {s.heading}
                    </h2>
                    <div className={`mt-24 flex justify-center md:mt-44 ${isRight ? "md:justify-end" : "md:justify-start"}`}>
                      {s.imageUrl ? (
                        <img
                          src={s.imageUrl}
                          alt={s.heading}
                          className="aspect-square w-32 rounded-2xl object-cover md:w-40"
                        />
                      ) : (
                        <CmsImagePlaceholder className="aspect-square w-32 rounded-2xl md:w-40" />
                      )}
                    </div>
                  </div>

                  <div className={`flex-1 ${isRight ? "text-left" : "text-right"}`}>
                    <p className="mx-auto max-w-md text-[20px] leading-[32.46px] text-white md:mx-0">{s.body}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}
