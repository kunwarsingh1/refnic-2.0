import CareerDecorativeRing from "@/components/CareerDecorativeRing";

type AdvantageCard = { title: string; body: string };

export default function GlobalMarketAdvantageSection({
  heading,
  cards,
}: {
  heading: string;
  cards: AdvantageCard[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#161518] py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2 className="text-right font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-[64px]">
          {heading}
        </h2>

        <div className="mt-12 flex flex-col gap-8">
          {cards.map((card) => (
            <div key={card.title} className="relative">
              <div
                className="pointer-events-none absolute inset-0 border-2 border-white bg-white/[0.03] opacity-[0.61] backdrop-blur-[68.9px]"
                aria-hidden
              />
              <div className="relative flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:gap-4 md:p-10">
                <p className="font-display text-2xl font-bold leading-tight text-[#EBEBEB] md:max-w-[335px]">
                  {card.title}
                </p>
                <CareerDecorativeRing className="mx-auto h-32 w-32 shrink-0 opacity-40 md:h-40 md:w-40" />
                <p className="text-right text-[21.64px] leading-[32.46px] text-white md:max-w-sm">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
