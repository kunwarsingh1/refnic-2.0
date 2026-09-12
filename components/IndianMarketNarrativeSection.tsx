import CareerDecorativeRing from "@/components/CareerDecorativeRing";

export default function IndianMarketNarrativeSection({
  heading,
  body,
  align,
}: {
  heading: string;
  body: string;
  align: "left" | "right";
}) {
  const isRight = align === "right";
  const paragraphs = body.split("\n\n");

  return (
    <section className="relative overflow-hidden bg-[#161518] py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <CareerDecorativeRing
        className={`pointer-events-none absolute top-1/2 hidden h-[26rem] w-[26rem] -translate-y-1/2 opacity-40 md:block ${
          isRight ? "left-0 -translate-x-1/3" : "right-0 translate-x-1/3"
        }`}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className={`ml-auto max-w-2xl ${isRight ? "text-right" : "text-left mr-auto ml-0"}`}>
          <h2 className="font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-[64px]">{heading}</h2>
          <div className="mt-6 space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[20px] leading-[32.46px] text-white">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
