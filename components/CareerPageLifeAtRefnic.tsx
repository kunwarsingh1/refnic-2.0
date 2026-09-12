import { ImagePlaceholder } from "@/components/ui/primitives";

// Explicit grid coordinates per photo, taken directly from the Figma export.
// col/row are 1-indexed, matching the reference screenshot exactly. Keyed by
// caption text (rather than array position) since the CMS may reorder photos.
const PLACEMENTS: Record<string, { col: number; row: number }> = {
  "Own Projects End-to-End": { col: 4, row: 1 },
  "Work on Cutting-Edge Technologies": { col: 3, row: 2 },
  "Contribute to sustainable innovation": { col: 5, row: 2 },
  "Turn research into real-world applications": { col: 2, row: 3 },
  "Solve complex industrial challenges": { col: 4, row: 3 },
  "Work on real industrial plants": { col: 1, row: 4 },
  "Build technologies from concept to commissioning": { col: 3, row: 4 },
  "Collaborate across engineering disciplines": { col: 5, row: 4 },
};

export default function CareerPageLifeAtRefnic({
  heading,
  photos,
}: {
  heading: string;
  photos: { caption: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#161518] py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div
        className="pointer-events-none absolute -left-40 top-[30%] h-[420px] w-[420px] rounded-full bg-[#3152DF] opacity-30 blur-[180px] md:h-[632px] md:w-[626px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Mobile/tablet: simple stacked flow. Desktop: exact hand-placed grid. */}
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-5 lg:grid-rows-4 lg:gap-x-8 lg:gap-y-6">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1 flex items-start">
            <h2 className="text-left font-display text-3xl md:text-5xl font-bold leading-tight text-[#F8F8F8]">
              {heading}
            </h2>
          </div>

          {photos.map((p, i) => {
            const placement = PLACEMENTS[p.caption];
            return (
              <div
                key={i}
                className="flex flex-col"
                style={
                  placement
                    ? {
                        gridColumn: `${placement.col} / span 1`,
                        gridRow: `${placement.row} / span 1`,
                      }
                    : undefined
                }
              >
                <ImagePlaceholder
                  dark
                  tone={i % 4}
                  className="aspect-[3/2] w-full rounded-lg"
                />
                <p className="mt-4 text-[20px] leading-[32.46px] text-white">
                  {p.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
