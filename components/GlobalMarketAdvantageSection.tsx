import { CmsImagePlaceholder } from "@/components/ui/primitives";

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
        <h2 className="text-center font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-5xl">
          {heading}
        </h2>

        <div className="mt-12 flex flex-col gap-8">
          {cards.map((card) => (
            <div key={card.title} className="relative">
              <div
                style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
                className="pointer-events-none absolute inset-0 border-2 border-transparent bg-white/[0.03] opacity-[0.61] backdrop-blur-[68.9px]"
                aria-hidden
              />
              <div className="relative grid grid-cols-1 items-center gap-6 p-8 text-center md:grid-cols-[1fr_auto_1fr] md:gap-8 md:p-10 md:text-left">
                <p className="font-display text-2xl font-bold leading-tight text-[#EBEBEB]">{card.title}</p>
                <CmsImagePlaceholder className="mx-auto h-32 w-32 shrink-0 md:h-40 md:w-40" />
                <p className="text-[21.64px] leading-[32.46px] text-white md:text-right">{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
