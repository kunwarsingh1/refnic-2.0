export default function ProductsDirectoryHero({
  body = "Every machine, system, and service we design and manufacture — grouped by category. Explore the full range that goes into a Refnic plant.",
}: {
  body?: string;
} = {}) {
  return (
    <section className="relative overflow-hidden bg-black pt-20 pb-16 md:pt-28 md:pb-20">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h1 className="relative font-display font-bold text-3xl leading-tight text-[#F8F8F8] md:text-[100px] md:leading-[100px]">
          Engineered
          <br />
          <span className="relative inline-block">
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue opacity-60 blur-[180px]"
              aria-hidden
            />
            Equipment. Built
          </span>
          <br />
          In-House.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-base leading-relaxed text-white md:text-[21.64px] md:leading-[32.46px]">
          {body}
        </p>
      </div>
    </section>
  );
}
