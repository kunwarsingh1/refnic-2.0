import { GradientCtaButton, CmsImagePlaceholder } from "@/components/ui/primitives";

export default function ProductDetailHero({
  title,
  body,
  imageUrl,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  body: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-black pb-16 pt-24 md:pb-20 md:pt-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-[0.78]"
        style={{ background: "linear-gradient(180deg, black 0%, rgba(0,0,0,0) 100%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[6%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[180px] md:h-[632px] md:w-[626px]"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p
          aria-hidden
          className="pointer-events-none select-none font-display text-[80px] font-bold leading-none text-[#F8F8F8]/10 md:text-[165px]"
        >
          Products
        </p>

        <div className="mx-auto mt-4 flex justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="aspect-[495/488] w-64 object-contain opacity-90 md:w-[400px]" />
          ) : (
            <CmsImagePlaceholder className="aspect-[495/488] w-64 md:w-[400px]" />
          )}
        </div>

        <h1 className="mt-10 font-display text-2xl font-bold uppercase leading-tight text-[#EBEBEB] md:text-[51.64px]">
          {title}
        </h1>
        <p className="mx-auto mt-8 max-w-3xl whitespace-pre-line text-[18px] leading-[26px] text-white md:text-[21px] md:leading-[26.19px]">
          {body}
        </p>

        {ctaLabel && (
          <div className="mt-10 flex justify-center">
            <GradientCtaButton href={ctaHref ?? "/contact"}>{ctaLabel}</GradientCtaButton>
          </div>
        )}
      </div>
    </section>
  );
}
