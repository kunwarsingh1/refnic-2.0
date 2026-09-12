import { GradientCtaButton, CmsImagePlaceholder } from "@/components/ui/primitives";

export default function ContactPageClosingCta({
  heading,
  imageUrl,
  tagline,
  body,
  ctaLabel,
}: {
  heading: string;
  imageUrl?: string;
  tagline: string;
  body: string;
  ctaLabel: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#161518] py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-[#F8F8F8]">
          {heading}
        </h2>

        <div className="mx-auto mt-8 flex justify-center">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="" className="h-56 w-full max-w-md rounded-lg object-cover" />
          ) : (
            <CmsImagePlaceholder className="h-56 w-full max-w-md rounded-lg" />
          )}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-[21.64px] leading-[32.46px] text-white">{tagline}</p>
        <p className="mx-auto mt-4 max-w-2xl text-[21.64px] leading-[32.46px] text-white">{body}</p>

        <div className="mt-10 flex justify-center">
          <GradientCtaButton href="#contact-form">{ctaLabel}</GradientCtaButton>
        </div>
      </div>
    </section>
  );
}
