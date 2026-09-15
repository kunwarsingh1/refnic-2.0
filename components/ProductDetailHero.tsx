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
        <h1 className="whitespace-pre-line font-display text-[clamp(2.0625rem,9vw,7.5rem)] font-bold uppercase leading-tight text-[#EBEBEB]">
          {title}
        </h1>

        <div className="relative mx-auto mt-6 flex justify-center">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152DF] opacity-40 blur-[110px] md:h-[400px] md:w-[400px]"
            aria-hidden
          />
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="relative aspect-[4/3] w-full max-w-80 object-contain md:w-[560px] md:max-w-none"
            />
          ) : (
            <CmsImagePlaceholder className="relative aspect-[4/3] w-full max-w-80 md:w-[560px] md:max-w-none" />
          )}
        </div>

        <p className="mx-auto mt-6 max-w-3xl whitespace-pre-line text-[18px] font-light leading-relaxed text-white">
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
