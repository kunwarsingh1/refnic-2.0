export default function CaseStudyDetailHero() {
  return (
    <section className="relative overflow-hidden bg-black pb-8 pt-20 md:pt-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-[4%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[180px] md:h-[632px] md:w-[626px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p
          aria-hidden
          className="pointer-events-none select-none font-display text-[clamp(2.0625rem,9vw,7.5rem)] font-bold leading-[1.02] text-[#F8F8F8]/10"
        >
          Case
          <br />
          Studies
        </p>
      </div>
    </section>
  );
}
