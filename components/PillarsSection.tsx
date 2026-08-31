import type { Pillar } from "@/lib/content/pillars";

export default function PillarsSection({
  pillars,
  desktopVideoUrl,
  mobileVideoUrl,
}: {
  pillars: Pillar[];
  desktopVideoUrl: string;
  mobileVideoUrl?: string;
}) {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-black py-8 md:py-10">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 pt-2 md:pt-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-sans font-bold text-3xl text-white md:text-5xl">
            Designed for Industrial Excellence
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white md:text-[21.64px] md:leading-[32.46px]">
            Precision engineering, intelligent process design, and indigenous
            manufacturing working together to redefine recycling.
          </p>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[90rem] px-6 py-8 md:py-10">
        <div className="pointer-events-none absolute -bottom-10 left-0 h-[300px] w-[300px] rounded-full bg-[#3152df] opacity-30 blur-[120px] md:h-[420px] md:w-[420px] md:blur-[160px]" aria-hidden />
        <div className="pointer-events-none absolute -bottom-10 right-0 h-[300px] w-[300px] rounded-full bg-[#3152df] opacity-30 blur-[120px] md:h-[420px] md:w-[420px] md:blur-[160px]" aria-hidden />
        <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-black sm:h-96 md:h-[80vh]">
          <video
            src={desktopVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            className="absolute inset-0 hidden h-full w-full rounded-3xl object-cover md:block"
          />
          <video
            src={mobileVideoUrl || desktopVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden
            className="absolute inset-0 h-full w-full rounded-3xl object-cover md:hidden"
          />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-14 md:pb-20 md:pt-20">
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-accent-blue/60 hover:bg-navy-800 hover:shadow-[0_0_60px_-15px_rgba(46,75,224,0.55)] hover:scale-[1.03] md:p-10"
            >
              <h3 className="font-sans font-bold text-3xl leading-tight text-white md:text-4xl">
                {p.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-5 leading-relaxed text-white/55">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
