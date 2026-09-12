export default function IndianMarketIndustriesSection({
  heading,
  industries,
}: {
  heading: string;
  industries: string[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#161518] py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-[64px]">{heading}</h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {industries.map((ind) => (
            <div key={ind} className="relative">
              <div
                style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
                className="pointer-events-none absolute inset-0 border-2 border-transparent bg-white/[0.03] opacity-[0.61] backdrop-blur-[68.9px]"
                aria-hidden
              />
              <div className="relative flex min-h-[132px] items-center justify-center p-6 text-center">
                <p className="font-display text-2xl font-medium leading-tight text-[#EBEBEB]">{ind}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
