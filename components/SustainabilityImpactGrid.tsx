import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

export type SustainabilityPillarItem = { title: string; description: string; href?: string; imageUrl?: string };

export default function SustainabilityImpactGrid({ items }: { items: SustainabilityPillarItem[] }) {
  return (
    <section className="relative overflow-hidden bg-[#161518] pb-20 md:pb-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="relative">
              <div
                className="pointer-events-none absolute inset-0 border-[1.89px] border-white bg-white/[0.03] opacity-[0.61] backdrop-blur-[65.16px]"
                aria-hidden
              />
              <div className="relative flex h-full flex-col p-10">
                <h3 className="min-h-12 font-display text-lg font-bold leading-tight text-[#EBEBEB] md:min-h-16 md:text-xl">
                  {item.title}
                </h3>

                <div className="my-10 flex justify-center">
                  {item.imageUrl ? (
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
          ))}
        </div>
      </div>
    </section>
  );
}
