import { Button, CmsImagePlaceholder } from "@/components/ui/primitives";
import type { ProductsPageConfig } from "@/lib/content/productsPage";

export default function ProductsHero({ config: c }: { config: ProductsPageConfig }) {
  return (
    <section className="relative overflow-hidden bg-black pt-20 pb-20 md:pt-28 md:pb-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152df] opacity-40 blur-[220px] md:top-[122px]" aria-hidden />

      <p
        className="pointer-events-none absolute inset-x-0 top-8 select-none whitespace-nowrap text-center font-display font-bold leading-none text-[#F8F8F8]/10 text-[clamp(2.5rem,18vw,165px)] md:top-10"
        aria-hidden
      >
        {c.heroWatermark}
      </p>

      <div className="relative z-10 mx-auto mt-30 max-w-5xl px-6 text-center">
        {c.heroImageUrl ? (
          <img
            src={c.heroImageUrl}
            alt=""
            className="relative z-10 mx-auto mb-6 h-24 w-24 rounded-xl object-cover md:h-32 md:w-32"
          />
        ) : (
          <CmsImagePlaceholder className="relative z-10 mx-auto mb-6 h-24 w-24 rounded-xl md:h-32 md:w-32" />
        )}

        <h1 className="whitespace-pre-line font-display font-bold text-4xl leading-tight text-[#EBEBEB] md:text-5xl md:leading-none">
          {c.heroHeading}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl whitespace-pre-line text-center text-base leading-relaxed text-white md:text-[21.64px] md:leading-[32.46px]">
          {c.heroIntro}
        </p>

        <div className="mt-8 flex justify-center">
          <Button href={c.heroCtaHref}>
            {c.heroCtaLabel}
          </Button>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-20 flex max-w-6xl flex-col items-center gap-10 px-6 md:flex-row md:items-center md:justify-between">
        <div className="relative shrink-0">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152df] opacity-45 blur-[110px]" aria-hidden />
          {c.crushingImageUrl ? (
            <img src={c.crushingImageUrl} alt="" className="relative h-32 w-32 rounded-xl object-cover" />
          ) : (
            <CmsImagePlaceholder className="relative h-32 w-32 rounded-xl" />
          )}
        </div>
        <p className="max-w-lg whitespace-pre-line text-right text-[18px] font-light leading-relaxed text-white">
          {c.crushingBlurb}
        </p>
      </div>
    </section>
  );
}
