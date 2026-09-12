import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

type Tool = { title: string; description: string };

function ToolCard({ item }: { item: Tool }) {
  return (
    <div className="relative h-full">
      <div
        style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
        className="pointer-events-none absolute inset-0 border-2 border-transparent bg-white/[0.03] opacity-[0.61] backdrop-blur-[68.9px]"
        aria-hidden
      />
      <span className="absolute right-0 top-0 rounded-bl-sm bg-[#3152DF] px-3 py-1.5 text-sm font-bold leading-[30.69px] text-white">
        Active soon
      </span>
      <div className="relative flex h-full flex-col p-10">
        <h3 className="min-h-12 font-display text-lg font-bold leading-tight text-[#EBEBEB] md:min-h-16 md:text-xl">
          {item.title}
        </h3>

        <div className="my-10 flex justify-center">
          <CmsImagePlaceholder className="h-40 w-40" />
        </div>

        <p className="flex-1 text-[21.64px] leading-[32.46px] text-white">{item.description}</p>
        <div className="mt-8">
          <GradientCtaButton href="/technologies">View</GradientCtaButton>
        </div>
      </div>
    </div>
  );
}

const BLACK_MASS_CALCULATOR: Tool = {
  title: "Black Mass Calculator",
  description: "Estimate the metal composition and recovery potential of lithium-ion battery black mass.",
};

const PROCESS_DESIGN: Tool = {
  title: "Process Design",
  description: "Explore process configurations and equipment requirements for your refining and recycling application.",
};

export default function DigitalToolsGrid() {
  return (
    <section className="relative overflow-hidden bg-[#161518] pb-20 md:pb-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <ToolCard item={BLACK_MASS_CALCULATOR} />
          <ToolCard item={PROCESS_DESIGN} />
        </div>
      </div>
    </section>
  );
}
