import { Button, CmsImagePlaceholder } from "@/components/ui/primitives";
import type { ProductsPageConfig } from "@/lib/content/productsPage";

export default function ProductsCtaSection({ config: c }: { config: ProductsPageConfig }) {
  return (
    <section className="relative overflow-hidden bg-black pb-16 pt-16 md:pb-24 md:pt-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-display font-bold text-3xl leading-tight text-[#EBEBEB] md:text-[64px] md:leading-none">
          {c.ctaHeading}
        </h2>
        <CmsImagePlaceholder className="mx-auto mt-8 h-24 w-24 rounded-xl md:h-28 md:w-28" />
        <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white md:text-[21.64px] md:leading-[32.46px]">
          {c.ctaBlurb}
        </p>
        <div className="mt-10 flex justify-center">
          <Button href={c.ctaButtonHref} className="rounded-lg">
            {c.ctaButtonLabel}
          </Button>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-20 max-w-[90rem] px-4 md:px-6">
        <CmsImagePlaceholder className="h-[280px] w-full rounded-2xl md:h-[520px]" />
      </div>
    </section>
  );
}
