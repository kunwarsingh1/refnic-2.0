import type { Pillar } from "@/lib/content/pillars";

export default function PillarsSection({ pillars }: { pillars: Pillar[] }) {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden bg-black py-8 md:min-h-screen md:py-10">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-sans font-bold text-3xl text-white md:text-5xl">
            Designed for Industrial Excellence
          </h2>
          <p className="mt-4 text-white/60">
            Precision engineering, intelligent process design, and indigenous
            manufacturing working together to redefine recycling.
          </p>
        </div>

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
