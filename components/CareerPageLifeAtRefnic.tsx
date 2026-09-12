import { ImagePlaceholder } from "@/components/ui/primitives";

const ASPECTS = ["aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]"];

// Vertical offset applied per grid column to create the staggered, zigzag rhythm
const COLUMN_OFFSETS = ["translate-y-0", "translate-y-12", "translate-y-6"];

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
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:[grid-auto-flow:column] lg:[grid-template-rows:repeat(5,auto)]">
          {/* Heading anchors the top of the first column, spanning two rows */}
          <div className="row-span-2 flex items-start">
            <h2 className="text-left font-display text-[clamp(2.25rem,7vw,4rem)] font-bold leading-tight text-[#F8F8F8]">
              {heading}
            </h2>
          </div>

          {photos.map((p, i) => {
            const col = i % 3;
            return (
              <div
                key={i}
                className={`flex flex-col ${COLUMN_OFFSETS[col]} transition-transform`}
              >
                <ImagePlaceholder
                  dark
                  tone={i % 4}
                  className={`w-full rounded-lg ${ASPECTS[i % ASPECTS.length]}`}
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