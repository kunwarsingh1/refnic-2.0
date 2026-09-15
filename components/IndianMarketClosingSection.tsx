import { GradientCtaButton } from "@/components/ui/primitives";

export default function IndianMarketClosingSection({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h2 className="whitespace-pre-line font-display text-[40px] font-normal leading-tight text-[#EBEBEB]">
          {heading}
        </h2>
        <p className="mx-auto mt-8 max-w-2xl whitespace-pre-line text-[18px] font-light leading-relaxed text-white">
          {body}
        </p>
        <div className="mt-10 flex justify-center">
          <GradientCtaButton href="/contact">Contact Us</GradientCtaButton>
        </div>
      </div>
    </section>
  );
}
