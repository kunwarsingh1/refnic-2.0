import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

export type ResourceGridItem = { title: string; description: string; href?: string; imageUrl?: string };

function ResourceCard({ item }: { item: ResourceGridItem }) {
  return (
    <div className="relative h-full">
      <div
        style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
        className="pointer-events-none absolute inset-0 border-2 border-transparent bg-white/[0.03] opacity-[0.61] backdrop-blur-[68.9px]"
        aria-hidden
      />
      <div className="relative flex h-full flex-col p-10">
        <h3 className="min-h-[86px] font-display text-[36px] font-bold leading-tight text-[#EBEBEB] md:min-h-[130px]">
          {item.title}
        </h3>

        <div className="my-10 flex justify-center">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageUrl} alt={item.title} className="h-40 w-40 object-cover" />
          ) : (
            <CmsImagePlaceholder className="h-40 w-40" />
          )}
        </div>

        <p className="flex-1 text-[21.64px] leading-[32.46px] text-white">{item.description}</p>
        <div className="mt-8">
          <GradientCtaButton href={item.href ?? "/technologies"}>View</GradientCtaButton>
        </div>
      </div>
    </div>
  );
}

export default function ResourcesGrid({ items }: { items: ResourceGridItem[] }) {
  return (
    <section className="relative overflow-hidden bg-[#161518] pb-20 md:pb-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <ResourceCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
