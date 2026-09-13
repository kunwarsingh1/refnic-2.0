import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

type Paper = { title: string; description: string };

function PaperCard({ item }: { item: Paper }) {
  return (
    <div className="relative h-full">
      <div
        style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
        className="pointer-events-none absolute inset-0 border border-transparent bg-white/[0.03]"
        aria-hidden
      />
      <div className="relative flex h-full flex-col p-5">
        <h3 className="min-h-12 font-display text-lg font-bold leading-tight text-[#EBEBEB] md:min-h-16 md:text-xl">
          {item.title}
        </h3>

        <CmsImagePlaceholder className="mt-4 aspect-[4/3] w-full rounded-xl" />

        <p className="mt-2 flex-1 text-[21.64px] leading-[32.46px] text-white">{item.description}</p>
        <div className="mt-6">
          <GradientCtaButton href="/technologies">View</GradientCtaButton>
        </div>
      </div>
    </div>
  );
}

const PAPER_1: Paper = { title: "Paper 1", description: "Lorem ipsum" };
const PAPER_2: Paper = { title: "Paper 2", description: "Lorem ipsum" };

export default function WhitePapersGrid() {
  return (
    <section className="relative overflow-hidden bg-[#161518] pb-20 md:pb-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <PaperCard item={PAPER_1} />
          <PaperCard item={PAPER_2} />
        </div>
      </div>
    </section>
  );
}
