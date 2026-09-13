export default function IndianMarketIndustriesSection({
  heading,
  industries,
}: {
  heading: string;
  industries: string[];
}) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2 className="font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-5xl">{heading}</h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {industries.map((ind) => (
            <div key={ind} className="relative">
              <div
                style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
                className="pointer-events-none absolute inset-0 border border-transparent bg-white/[0.03]"
                aria-hidden
              />
              <div className="relative flex min-h-[132px] items-center justify-center p-6 text-center">
                <p className="font-display text-lg font-bold leading-tight text-[#EBEBEB] md:text-xl">{ind}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
