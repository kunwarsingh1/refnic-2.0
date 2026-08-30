import { CmsImagePlaceholder } from "@/components/ui/primitives";
import type { SolutionsPageConfig } from "@/lib/content/solutionsPage";

// Exact per-section text colors from the Figma spec (Problem/Solution, What Recycling
// Solves, and Refnic Approach/Outcome each use a very slightly different near-black shade).
const TEXT_COLORS = ["#0D0C0E", "#0D0C0E", "#151417", "#161518", "#161518"];

// Exact heading box widths from the Figma spec — narrower boxes (e.g. "The Refnic
// Approach" at 573px) are meant to force the heading to wrap onto two lines.
const HEADING_WIDTH_CLASS = [
  "md:max-w-[390px]",
  "md:max-w-[390px]",
  "md:max-w-[709px]",
  "md:max-w-[573px]",
  "md:max-w-[436px]",
];

export default function SolutionsNarrative({ config: c }: { config: SolutionsPageConfig }) {
  return (
    <section className="relative px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[90rem] overflow-hidden rounded-xl bg-[#F8F8F8] px-6 py-16 md:px-16 md:py-24">
        <div className="space-y-20 md:space-y-28">
          {c.narrativeSections.map((section, i) => {
            const color = TEXT_COLORS[i] ?? "#151417";
            const headingWidthClass = HEADING_WIDTH_CLASS[i] ?? "";

            if (section.layout === "plain") {
              return (
                <div key={i}>
                  <h2
                    style={{ color }}
                    className={`font-display font-bold text-3xl leading-tight md:text-[64px] md:leading-none ${headingWidthClass}`}
                  >
                    {section.heading}
                  </h2>
                  <p
                    style={{ color }}
                    className="mt-10 whitespace-pre-line text-base leading-relaxed md:text-[21.64px] md:leading-[32.46px]"
                  >
                    {section.body}
                  </p>
                </div>
              );
            }

            if (section.layout === "side-right") {
              return (
                <div key={i}>
                  <h2
                    style={{ color }}
                    className={`font-display font-bold text-3xl leading-tight md:text-[64px] md:leading-none ${headingWidthClass}`}
                  >
                    {section.heading}
                  </h2>
                  <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
                    <p
                      style={{ color }}
                      className="whitespace-pre-line text-base leading-relaxed md:max-w-[800px] md:text-[21.64px] md:leading-[32.46px]"
                    >
                      {section.body}
                    </p>
                    {section.imageUrl ? (
                      <img
                        src={section.imageUrl}
                        alt=""
                        className="aspect-[627/549] w-full shrink-0 rounded-[23px] object-cover md:w-[560px]"
                      />
                    ) : (
                      <CmsImagePlaceholder className="aspect-[627/549] w-full shrink-0 rounded-[23px] md:w-[560px]" />
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div key={i}>
                <h2
                  style={{ color }}
                  className={`font-display font-bold text-3xl leading-tight md:text-[64px] md:leading-none ${headingWidthClass}`}
                >
                  {section.heading}
                </h2>
                {section.imageUrl ? (
                  <img
                    src={section.imageUrl}
                    alt=""
                    className="mt-10 aspect-[1435/506] w-full rounded-[23px] object-cover"
                  />
                ) : (
                  <CmsImagePlaceholder className="mt-10 aspect-[1435/506] w-full rounded-[23px]" />
                )}
                <p
                  style={{ color }}
                  className="mt-10 whitespace-pre-line text-base leading-relaxed md:text-[21.64px] md:leading-[32.46px]"
                >
                  {section.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
