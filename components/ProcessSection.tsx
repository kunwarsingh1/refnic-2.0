import type { ProcessStep } from "@/lib/content/processSteps";
import { ModelViewer } from "@/components/ModelViewer";

const placement = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-2 lg:row-start-1 lg:row-span-2",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-4 lg:row-start-1 lg:row-span-2",
];

export default function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  return (
      <section className="relative min-h-screen overflow-hidden bg-black py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[850px] w-[850px] -translate-x-1/2 rounded-full bg-[#3152df] opacity-30 blur-[380px]" aria-hidden />

      <p
  className="pointer-events-none absolute inset-x-0 -top-2 select-none whitespace-nowrap text-center font-display font-black leading-none text-transparent bg-clip-text text-[19vw] md:text-[9rem] opacity-30 drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]"
  style={{
    background: "linear-gradient(0deg, #232323, #919191 54.33%, #fffefe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }}
  aria-hidden
>
  PROCESS
</p>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-[55px] lg:grid-cols-4 lg:auto-rows-[16rem]">
          {steps.map((s, i) => {
            const isTall = i === 2 || i === 5;
            const highlighted = Boolean(s.extra);
            const n = String(i + 1).padStart(2, "0");
            return (
              <div
                key={s.id}
                className={`relative ${isTall ? "lg:h-auto" : "h-64"} ${placement[i]}`}
              >
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-lg bg-white p-8 transition-colors duration-300 ${highlighted ? "shadow-[0_0_60px_-10px_rgba(59,79,228,0.55)]" : ""}`}
                >
                  <div className="flex min-h-0 flex-1 flex-col">
                    <span
                      className={`font-display font-black text-5xl ${highlighted ? "text-[#3b4fe4]" : "text-black"}`}
                    >
                      {n}
                    </span>
                    {s.modelUrl ? (
                      <div
                        className={`mt-2 mr-[-2rem] min-h-0 flex-1 ${highlighted ? "opacity-0 md:opacity-100 md:transition-opacity md:duration-300 md:group-hover:opacity-0" : ""}`}
                      >
                        <ModelViewer src={s.modelUrl} alt={s.title} className="h-full w-full" />
                      </div>
                    ) : (
                      s.imageUrl && (
                        <div
                          className={`mt-2 mr-[-2rem] min-h-0 flex-1 ${highlighted ? "opacity-0 md:opacity-100 md:transition-opacity md:duration-300 md:group-hover:opacity-0" : ""}`}
                        >
                          <img
                            src={s.imageUrl}
                            alt={s.title}
                            className="h-full w-full rounded-md object-contain object-right"
                          />
                        </div>
                      )
                    )}
                  </div>
                  <p
                    className={`mt-3 font-sans font-bold text-2xl leading-tight ${highlighted ? "text-[#3b4fe4]" : "text-black"}`}
                  >
                    {s.title}
                  </p>
                  {s.extra && (
                    <p className="mt-2 text-sm leading-relaxed text-[#3b4fe4] opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100">
                      {s.extra}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
