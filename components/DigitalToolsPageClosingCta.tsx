import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

export default function DigitalToolsPageClosingCta({
  heading = "Ready to Go Beyond the Calculator?",
  body = "Take the next step from digital estimates to engineered refining and recycling solutions tailored to your process.",
  imageUrl,
  ctaLabel = "Talk To Our Experts",
  ctaHref = "/contact",
}: {
  heading?: string;
  body?: string;
  imageUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
} = {}) {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="whitespace-pre-line font-display text-3xl md:text-5xl font-bold leading-tight text-[#EBEBEB]">
          {heading}
        </h2>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="" className="mx-auto mt-8 aspect-square w-48 rounded-2xl object-contain md:w-72" />
        ) : (
          <CmsImagePlaceholder className="mx-auto mt-8 aspect-square w-48 rounded-2xl md:w-72" />
        )}
        <p className="mx-auto mt-8 max-w-2xl whitespace-pre-line text-[20px] leading-[32.46px] text-white">{body}</p>

        <div className="mt-10 flex justify-center">
          <GradientCtaButton href={ctaHref}>{ctaLabel}</GradientCtaButton>
        </div>
      </div>
    </section>
  );
}
