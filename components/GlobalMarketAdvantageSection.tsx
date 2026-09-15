import { CmsImagePlaceholder } from "@/components/ui/primitives";

type AdvantageCard = { title: string; body: string; imageUrl?: string };

export default function GlobalMarketAdvantageSection({
  heading,
  cards,
}: {
  heading: string;
  cards: AdvantageCard[];
}) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
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
                className="pointer-events-none absolute inset-0 border border-transparent bg-white/[0.03]"
                aria-hidden
              />
              <div className="relative grid grid-cols-1 items-center gap-6 p-5 text-center md:grid-cols-[1fr_auto_1fr] md:min-h-[320px] md:items-stretch md:gap-6 md:p-10 md:text-left">
                <p className="whitespace-pre-line font-display text-lg font-bold leading-tight text-[#EBEBEB] md:self-start md:text-xl">
                  {card.title}
                </p>
                {card.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={card.imageUrl}
                    alt=""
                    className="mx-auto h-56 w-72 shrink-0 rounded-xl object-contain md:h-72 md:w-[30rem] md:self-center"
                  />
                ) : (
                  <CmsImagePlaceholder className="mx-auto h-56 w-72 shrink-0 md:h-72 md:w-[30rem] md:self-center" />
                )}
                <p className="whitespace-pre-line text-sm font-light leading-relaxed text-white md:self-end md:text-right">
                  {card.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
