import { CmsImagePlaceholder } from "@/components/ui/primitives";

export default function SustainabilityPageHero({
  heading = "Sustainability",
  body = "We develop refining and recycling technologies that recover valuable metals, reduce resource consumption, and transform industrial waste into useful resources.",
  imageUrl,
}: {
  heading?: string;
  body?: string;
  imageUrl?: string;
} = {}) {
  return (
    <section className="relative overflow-hidden bg-black pb-8 pt-28 md:pb-10 md:pt-36">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] opacity-[0.78]"
        style={{ background: "linear-gradient(180deg, black 0%, rgba(0,0,0,0) 100%)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[8%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[180px] md:h-[632px] md:w-[626px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h1 className="whitespace-pre-line font-display text-[clamp(2.0625rem,9vw,7.5rem)] font-bold leading-tight text-[#F8F8F8]">
          {heading}
        </h1>
        <p className="mx-auto mt-8 max-w-2xl whitespace-pre-line text-[18px] font-light leading-relaxed text-white">{body}</p>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt=""
            className="mx-auto mt-0 block h-auto w-full max-w-[375px] rounded-2xl object-contain md:w-[561px] md:max-w-none"
          />
        ) : (
          <CmsImagePlaceholder className="mx-auto mt-0 aspect-square w-full max-w-[375px] rounded-2xl md:w-[561px] md:max-w-none" />
        )}
      </div>
    </section>
  );
}
