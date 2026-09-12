export default function IndianMarketDriversSection({
  heading,
  badges,
  paragraphs,
}: {
  heading: string;
  badges: string[];
  paragraphs: string[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#161518] py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2 className="text-center font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-[64px]">
          {heading}
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {badges.map((badge, i) => (
            <div key={badge} className="relative">
              <div
                className="pointer-events-none absolute inset-0 border-2 border-white bg-white/[0.03] opacity-[0.61] backdrop-blur-[68.9px]"
                aria-hidden
              />
              <div className="relative flex h-full flex-col gap-4 p-8">
                <h3 className="font-display text-3xl font-bold leading-tight text-[#EBEBEB]">{badge}</h3>
                <p className="text-[21.64px] leading-[32.46px] text-white">{paragraphs[i]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
