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
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" className="mx-auto mt-10 aspect-square w-56 rounded-2xl object-cover md:w-72" />
          ) : (
            <CmsImagePlaceholder className="mx-auto mt-10 aspect-square w-56 rounded-2xl md:w-72" />
          )}
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
