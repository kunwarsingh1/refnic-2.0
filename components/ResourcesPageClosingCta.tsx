import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

export default function ResourcesPageClosingCta() {
  return (
    <section className="relative overflow-hidden bg-black py-24 md:py-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight text-[#EBEBEB]">
          Need More Technical Information?
        </h2>
        <CmsImagePlaceholder className="mx-auto mt-8 aspect-[495/488] w-48 rounded-2xl md:w-72" />
        <p className="mx-auto mt-8 max-w-2xl text-[20px] leading-[32.46px] text-white">
          Whether you are exploring a new refining process, evaluating equipment, or planning a recycling
          project, our team is here to help. Access our technical resources or speak with our engineers to find
          the right solution for your application.
        </p>

        <div className="mt-10 flex justify-center">
          <GradientCtaButton href="/contact">Talk To Our Experts</GradientCtaButton>
        </div>
      </div>
    </section>
  );
}
