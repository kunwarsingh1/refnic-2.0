import { CmsImagePlaceholder } from "@/components/ui/primitives";
import type { NumberedSection } from "@/lib/content/investorsPage";

export function ZigzagFeatureSections({
  sections,
  bodyPlacement = "same",
  bg = "bg-black",
}: {
  sections: NumberedSection[];

  /**
   * "same":
   * Heading + body stay on the same side,
   * image stays on the opposite side.
   *
   * "opposite":
   * Heading + image stay together,
   * body moves to the opposite side.
   */
  bodyPlacement?: "same" | "opposite";

  bg?: string;
}) {
  return (
    <>
      {sections.map((s, i) => {
        // Controls the zig-zag:
        // 1st section  -> content RIGHT
        // 2nd section  -> content LEFT
        // 3rd section  -> content RIGHT
        // 4th section  -> content LEFT
        const isRight = i % 2 === 0;

        return (
          <section
            key={s.number}
            className={`relative overflow-hidden ${bg} py-14 md:py-24`}
          >
            {/* Background grid */}
            <div
              className="pointer-events-none absolute inset-0 bg-grid-dark"
              aria-hidden="true"
            />

            {/* Blue background glow */}
            <div
              className={`pointer-events-none absolute top-1/2 hidden h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[180px] md:block ${
                isRight
                  ? "right-0 translate-x-1/3"
                  : "left-0 -translate-x-1/3"
              }`}
              aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-5xl px-6">
              {bodyPlacement === "same" ? (
                /* =====================================================
                   SAME
                   ===================================================== */
                <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:items-start md:gap-16">
                  {/* ===================================================
                     CONTENT
                     =================================================== */}
                  <div
                    className={`w-full ${
                      isRight
                        ? "md:col-start-2 md:row-start-1 md:text-right"
                        : "md:col-start-1 md:row-start-1 md:text-left"
                    }`}
                  >
                    {/* Number */}
                    <p className="font-display text-6xl font-bold leading-none text-[#F8F8F8]/20 md:text-[120px]">
                      {s.number}
                    </p>

                    {/* Heading */}
                    <h2 className="mt-2 whitespace-pre-line font-display text-[40px] font-normal leading-tight text-[#EBEBEB]">
                      {s.heading}
                    </h2>

                    {/* Body */}
                    <p
                      className={`mx-auto mt-6 max-w-md text-[18px] font-light leading-relaxed text-white ${
                        isRight
                          ? "md:ml-auto md:mr-0"
                          : "md:ml-0 md:mr-auto"
                      }`}
                    >
                      {s.body}
                    </p>
                  </div>

                  {/* ===================================================
                     IMAGE
                     =================================================== */}
                  <div
                    className={`flex w-full md:mt-8 ${
                      isRight
                        ? "md:col-start-1 md:row-start-1 md:justify-start"
                        : "md:col-start-2 md:row-start-1 md:justify-end"
                    } justify-center`}
                  >
                    {s.imageUrl ? (
                      <img
                        src={s.imageUrl}
                        alt={s.heading}
                        className="aspect-square w-52 rounded-2xl object-contain md:w-80"
                      />
                    ) : (
                      <CmsImagePlaceholder className="aspect-square w-52 rounded-2xl md:w-80" />
                    )}
                  </div>
                </div>
              ) : (
                /* =====================================================
                   OPPOSITE
                   ===================================================== */
                <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-24">
                  {/* ===================================================
                     HEADING + IMAGE
                     =================================================== */}
                  <div
                    className={`w-full ${
                      isRight
                        ? "md:col-start-2 md:row-start-1 md:text-right"
                        : "md:col-start-1 md:row-start-1 md:text-left"
                    }`}
                  >
                    {/* Number */}
                    <p className="font-display text-6xl font-bold leading-none text-[#F8F8F8]/20 md:text-[120px]">
                      {s.number}
                    </p>

                    {/* Heading */}
                    <h2 className="mt-2 whitespace-pre-line font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-5xl md:leading-tight">
                      {s.heading}
                    </h2>

                    {/* Image */}
                    <div
                      className={`relative mt-1 flex md:mt-2 ${
                        isRight ? "justify-end" : "justify-start"
                      }`}
                    >
                      {/* Mobile blue glow */}
                      <div
                        className={`pointer-events-none absolute top-1/2 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-[#3152DF] opacity-40 blur-[90px] md:hidden ${
                          isRight ? "right-0" : "left-0"
                        }`}
                        aria-hidden="true"
                      />

                      <div
                    className={`w-full ${
                      isRight
                        ? "md:col-start-1 md:row-start-1 md:pt-0 md:text-right"
                        : "md:col-start-2 md:row-start-1 md:pt-0 md:text-left"
                    }`}
                  >
                    <p
                      className={`mx-auto max-w-md whitespace-pre-line text-[17px] leading-[27px] text-white md:mx-0 md:text-[20px] md:leading-[32.46px] ${
                        isRight ? "md:mr-auto" : "md:ml-auto"
                      }`}
                    >
                      {s.body}
                    </p>
                  </div>
                    </div>
                  </div>

                  {/* ===================================================
                     BODY
                     =================================================== */}
                  {s.imageUrl ? (
                        <img
                          src={s.imageUrl}
                          alt={s.heading}
                          className="relative mt-6 aspect-square w-60 rounded-2xl object-cover md:mt-10 md:w-[360px] md:object-contain"
                        />
                      ) : (
                        <CmsImagePlaceholder className="relative mt-6 aspect-square w-60 rounded-2xl md:mt-10 md:w-[360px]" />
                      )}
                </div>
              )}
            </div>
          </section>
        );
      })}
    </>
  );
}