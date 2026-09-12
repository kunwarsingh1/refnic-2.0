export default function CaseStudyResultsSection({ heading, highlights }: { heading: string; highlights: string[] }) {
  return (
    <section className="relative overflow-hidden bg-[#161518] py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[180px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <p
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-6 select-none bg-clip-text text-center font-display text-[80px] font-bold leading-none text-transparent md:-top-12 md:text-[206.86px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #F8F8F8 0%, #9a9a9a 20%, #4a4a4a 40%, #232323 50%, #4a4a4a 60%, #9a9a9a 80%, #F8F8F8 100%)",
          }}
        >
          {heading}
        </p>

        <div className="relative pt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 md:pt-28">
          {highlights.map((h) => (
            <div key={h} className="flex min-h-[130px] items-center justify-center rounded-xl bg-[#F8F8F8] px-6 py-8 text-center">
              <p className="font-display text-2xl font-bold leading-tight text-[#3152DF]">{h}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
