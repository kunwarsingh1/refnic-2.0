export default function CaseStudyPageHero({ body }: { body: string }) {
  return (
    <section className="relative overflow-hidden bg-black pb-16 pt-20 md:pb-24 md:pt-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-[0.78]"
        style={{ background: "linear-gradient(180deg, black 0%, rgba(0,0,0,0) 100%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[4%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[180px] md:h-[632px] md:w-[626px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1 className="font-display text-[clamp(2.0625rem,9vw,7.5rem)] font-bold leading-[1.02] text-[#F8F8F8]">
          Case
          <br />
          Studies
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-[21.64px] leading-[32.46px] text-white">{body}</p>
      </div>
    </section>
  );
}
