import { CmsImagePlaceholder } from "@/components/ui/primitives";

export default function StatCardsSection({
  heading,
  stats,
  ringSide = "left",
}: {
  heading: string;
  stats: string[];
  ringSide?: "left" | "right" | "none";
}) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          {ringSide === "left" && <CmsImagePlaceholder className="h-16 w-16 shrink-0 rounded-xl md:h-20 md:w-20" />}
          <h2 className="text-center font-display text-[40px] font-normal leading-tight text-[#EBEBEB]">
            {heading}
          </h2>
          {ringSide === "right" && <CmsImagePlaceholder className="h-16 w-16 shrink-0 rounded-xl md:h-20 md:w-20" />}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat} className="flex min-h-[130px] items-center justify-center rounded-xl bg-[#F8F8F8] px-6 py-8 text-center">
              <p className="font-display text-2xl font-bold leading-tight text-[#3152DF]">{stat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
