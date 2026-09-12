import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

export default function CareerPageOpenPositions({
  heading,
  positions,
  applyLabel,
}: {
  heading: string;
  positions: { title: string; body: string }[];
  applyLabel: string;
}) {
  return (
    <section id="open-positions" className="relative overflow-hidden bg-[#161518] py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2 className="text-center font-display text-[clamp(2rem,6vw,4rem)] font-bold leading-tight text-[#EBEBEB]">
          {heading}
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {positions.map((p) => (
            <div key={p.title} className="relative">
              <div
                style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
                className="pointer-events-none absolute inset-0 border-2 border-transparent bg-white/[0.03] opacity-[0.61] backdrop-blur-[68.9px]"
                aria-hidden
              />
              <div className="relative flex h-full flex-col p-10">
                <h3 className="min-h-[86px] font-display text-[36px] font-bold leading-tight text-[#EBEBEB] md:min-h-[130px]">
                  {p.title}
                </h3>

                <div className="my-10 flex justify-center">
                  <CmsImagePlaceholder className="h-40 w-40" />
                </div>

                <p className="flex-1 text-[21.64px] leading-[32.46px] text-white">{p.body}</p>
                <div className="mt-8">
                  <GradientCtaButton href="/contact">{applyLabel}</GradientCtaButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
