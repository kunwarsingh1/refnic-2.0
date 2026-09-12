import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

export default function SolutionsPageClosingCta() {
  return (
    <section className="relative overflow-hidden bg-[#161518] py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-[clamp(2rem,6vw,4rem)] font-bold leading-tight text-[#EBEBEB]">
          Ready to Build Your Next Plant?
        </h2>

        <CmsImagePlaceholder className="mx-auto mt-8 aspect-[495/488] w-48 rounded-2xl md:w-72" />

        <p className="mx-auto mt-8 max-w-2xl text-[20px] leading-[32.46px] text-white">
          From concept to commissioning, Refnic delivers complete engineering solutions tailored to your
          process, capacity, and business goals.
        </p>

        <div className="mt-10 flex justify-center">
          <GradientCtaButton href="/contact">Start Your Project</GradientCtaButton>
        </div>
      </div>
    </section>
  );
}
