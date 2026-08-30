import { CmsImagePlaceholder } from "@/components/ui/primitives";
import type { ProductsPageConfig } from "@/lib/content/productsPage";

export default function MaterialRecoverySection({ config: c }: { config: ProductsPageConfig }) {
  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#3152df] opacity-25 blur-[340px]" aria-hidden />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[697px] w-[697px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" aria-hidden />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[697px] w-[697px] rounded-full bg-[#3152df] opacity-20 blur-[360px]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-[90rem] px-6 md:px-16">
        <h2 className="text-center font-display font-bold text-3xl leading-tight text-[#EBEBEB] md:text-[64px] md:leading-none">
          {c.materialRecoveryHeading}
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {c.materialCards.map((card, i) => (
            <div
              key={i}
              style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
              className="border border-transparent bg-white/[0.03] p-8 md:p-12"
            >
              <h3 className="font-display text-2xl font-bold leading-tight text-[#EBEBEB] md:text-3xl">
                {card.title}
              </h3>
              {card.imageUrl ? (
                <img
                  src={card.imageUrl}
                  alt=""
                  className="mt-10 aspect-square w-full max-w-[280px] rounded-md object-cover md:mt-12"
                />
              ) : (
                <CmsImagePlaceholder className="mt-10 aspect-square w-full max-w-[280px] rounded-md md:mt-12" />
              )}
              <p className="mt-10 text-sm leading-relaxed text-white/70 md:mt-12 md:text-base">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
