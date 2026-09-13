import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

export default function ProductClosingSection({
  heading,
  tagline,
  ctaLabel,
  ctaHref,
  imageUrl,
}: {
  heading?: string;
  tagline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageUrl?: string;
}) {
  const hasHeadingSection = Boolean(heading);
  if (!heading && !tagline && !ctaLabel) return null;

  return (
    <section className="relative overflow-hidden bg-black pb-16 pt-16 md:pb-24 md:pt-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      {hasHeadingSection && (
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-2xl font-bold uppercase leading-tight text-[#EBEBEB] md:text-5xl">
            {heading}
          </h2>
          <div className="relative mx-auto mt-10 flex justify-center">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[100px] md:h-[340px] md:w-[340px]"
              aria-hidden
            />
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" className="relative aspect-[3/2] w-72 rounded-2xl object-cover md:w-[420px]" />
            ) : (
              <CmsImagePlaceholder className="relative aspect-[3/2] w-72 rounded-2xl md:w-[420px]" />
            )}
          </div>
        </div>
      )}

      {(tagline || ctaLabel) && (
        <div className="relative z-10 mx-auto mt-10 max-w-3xl px-6 text-center">
          {tagline && <p className="text-[21.64px] leading-[32.46px] text-white">{tagline}</p>}
          {ctaLabel && (
            <div className="mt-8 flex justify-center">
              <GradientCtaButton href={ctaHref ?? "/contact"}>{ctaLabel}</GradientCtaButton>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
