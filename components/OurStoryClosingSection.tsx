import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

export default function OurStoryClosingSection({
  tagline,
  ctaLabel,
  imageUrl,
}: {
  tagline: string;
  ctaLabel: string;
  imageUrl?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[180px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt="" className="mx-auto mb-8 aspect-square w-48 rounded-2xl object-contain md:w-72" />
        ) : (
          <CmsImagePlaceholder className="mx-auto mb-8 aspect-square w-48 rounded-2xl md:w-72" />
        )}
        <p className="whitespace-pre-line font-display text-2xl font-bold leading-[1.4] text-white md:text-3xl">
          {tagline}
        </p>
        <div className="mt-10 flex justify-center">
          <GradientCtaButton href="/case-study">{ctaLabel}</GradientCtaButton>
        </div>
      </div>
    </section>
  );
}
