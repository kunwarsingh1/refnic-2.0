import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

export default function DigitalToolsPageClosingCta() {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-[#EBEBEB]">
          Ready to Go Beyond the Calculator?
        </h2>
        <CmsImagePlaceholder className="mx-auto mt-8 aspect-[495/488] w-48 rounded-2xl md:w-72" />
        <p className="mx-auto mt-8 max-w-2xl text-[20px] leading-[32.46px] text-white">
          Take the next step from digital estimates to engineered refining and recycling solutions tailored to
          your process.
        </p>

        <div className="mt-10 flex justify-center">
          <GradientCtaButton href="/contact">Talk To Our Experts</GradientCtaButton>
        </div>
      </div>
    </section>
  );
}
