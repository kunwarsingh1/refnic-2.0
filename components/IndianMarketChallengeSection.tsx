export default function IndianMarketChallengeSection({
  subheading,
  stats,
}: {
  subheading: string;
  stats: string[];
}) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2 className="font-display text-[40px] font-normal leading-tight text-[#EBEBEB]">
          India&apos;s Resource Challenge
        </h2>
        <p className="mt-10 whitespace-pre-line font-display text-[18px] font-light leading-relaxed text-[#EBEBEB]">
          {subheading}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
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
