import { ImagePlaceholder } from "@/components/ui/primitives";

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
        <h2 className="text-center font-display text-[clamp(2.25rem,7vw,6rem)] font-bold leading-tight text-[#F8F8F8]">
          {heading}
        </h2>

        <div className="mt-16 columns-1 gap-8 sm:columns-2 lg:columns-4">
          {photos.map((p, i) => (
            <div key={i} className="mb-8 break-inside-avoid">
              <ImagePlaceholder dark tone={i % 4} className="aspect-[3/2] w-full rounded-lg" />
              <p className="mt-4 text-[20px] leading-[32.46px] text-white">{p.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
