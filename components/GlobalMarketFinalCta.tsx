import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

export default function GlobalMarketFinalCta({
  heading,
  body,
  ctaLabel,
}: {
  heading: string;
  body: string;
  ctaLabel: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#161518] py-16 pb-24 md:pb-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-[64px]">{heading}</h2>
        <CmsImagePlaceholder className="mx-auto mt-8 aspect-[495/488] w-48 rounded-2xl md:w-72" />
        <p className="mx-auto mt-8 max-w-2xl text-[20px] leading-[32.46px] text-white">{body}</p>
        <div className="mt-10 flex justify-center">
          <GradientCtaButton href="/technologies">{ctaLabel}</GradientCtaButton>
        </div>
      </div>
    </section>
  );
}
