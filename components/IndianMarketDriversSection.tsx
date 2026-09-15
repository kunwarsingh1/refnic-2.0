export default function IndianMarketDriversSection({
  heading,
  badges,
  paragraphs,
  headingClassName = "whitespace-pre-line text-center font-display text-[40px] font-normal leading-tight text-[#EBEBEB]",
}: {
  heading: string;
  badges: string[];
  paragraphs: string[];
  headingClassName?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2 className={headingClassName}>{heading}</h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {badges.map((badge, i) => (
            <div key={badge} className="relative">
              <div
                style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
                className="pointer-events-none absolute inset-0 border border-transparent bg-white/[0.03]"
                aria-hidden
              />
              <div className="relative flex h-full flex-col gap-25 p-5">
                <h3 className="font-display text-[40px] font-normal leading-tight text-[#EBEBEB]">{badge}</h3>
                <p className="text-[18px] font-light  leading-relaxed text-white">{paragraphs[i]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
