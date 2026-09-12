import CareerDecorativeRing from "@/components/CareerDecorativeRing";

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
    <section className="relative overflow-hidden bg-[#161518] py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      {ringSide !== "none" && (
        <CareerDecorativeRing
          className={`pointer-events-none absolute bottom-0 hidden h-[26rem] w-[26rem] translate-y-1/3 opacity-40 md:block ${
            ringSide === "left" ? "left-0 -translate-x-1/3" : "right-0 translate-x-1/3"
          }`}
        />
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2 className="text-center font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-[64px]">
          {heading}
        </h2>

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
