const steps = [
  { n: "01", title: "Research", icon: "flask", image: "/RESEARCH.png" },
  { n: "02", title: "Process Design", icon: "monitor", image: "/PROCESS DESIGN.png" },
  {
    n: "03",
    title: "Equipment Manufacturing",
    icon: "hopper",
    image: "/EQUIPMENT MANUFACTURIMNG.png",
  },
  {
    n: "04",
    title: "Plant Engineering",
    icon: "shredder",
    image: "/PLANT ENG.png",
    extra: "Optimized process design for maximum efficiency and recovery.",
  },
  { n: "05", title: "Installation", icon: "crane" },
  { n: "06", title: "Commissioning & Training", icon: "plant", image: "/COMMISIONING AND TRAINING.png" },
];

const placement = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:-mt-6",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-4 lg:row-start-1 lg:row-span-2",
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-8 md:py-10">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="pointer-events-none absolute -left-32 top-24 h-[882px] w-[882px] rounded-full bg-[#3152df] opacity-30 blur-[360px]" aria-hidden />

      <p
        className="pointer-events-none absolute left-1/2 top-4 select-none font-display font-black leading-none text-[28vw] text-white/[0.03] md:text-[18rem] -translate-x-1/2"
        aria-hidden
      >
        PROCESS
      </p>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[16rem]">
          {steps.map((s, i) => {
            const isTall = i === 2 || i === 5;
            const highlighted = Boolean(s.extra);
            return (
              <div
                key={s.n}
                className={`relative ${isTall ? "lg:h-auto" : "h-64"} ${placement[i]}`}
              >
                <div
                  className={`group flex h-full flex-col justify-between overflow-hidden rounded-lg bg-white p-8 transition-colors duration-300 ${highlighted ? "shadow-[0_0_60px_-10px_rgba(59,79,228,0.55)]" : ""}`}
                >
                  <div className="flex min-h-0 flex-1 flex-col">
                    <span
                      className={`font-display font-black text-5xl ${highlighted ? "text-[#3b4fe4]" : "text-black"}`}
                    >
                      {s.n}
                    </span>
                    {s.image && (
                      <div className="mt-2 mr-[-2rem] min-h-0 flex-1">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="h-full w-full rounded-md object-contain object-right"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-sans font-bold text-xl ${highlighted ? "text-[#3b4fe4]" : "text-black group-hover:text-[#3b4fe4]"}`}>{s.title}</h3>
                    {s.extra && (
                      <p className="mt-2 text-sm leading-relaxed text-[#3b4fe4]">{s.extra}</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
