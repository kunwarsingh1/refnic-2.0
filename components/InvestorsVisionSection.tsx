import { CmsImagePlaceholder } from "@/components/ui/primitives";

export default function InvestorsVisionSection({
  label,
  imageUrl,
  heading,
  body,
}: {
  label: string;
  imageUrl?: string;
  heading: string;
  body: string;
}) {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-32">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3152DF] opacity-30 blur-[180px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <p
          aria-hidden
          className="pointer-events-none select-none bg-clip-text text-center font-display text-[80px] font-bold leading-none text-transparent md:text-[206.86px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #F8F8F8 0%, #d8d8d8 35%, #bdbdbd 50%, #d8d8d8 65%, #F8F8F8 100%)",
          }}
        >
          {label}
        </p>

        <div className="relative z-10 mx-auto mt-4 flex flex-col items-center justify-center gap-8 md:mt-8 lg:min-h-[540px]">
          {/* Heading — top right of the image on large screens, with clear space from the image */}
          <div className="max-w-sm lg:absolute lg:right-0 lg:top-8 lg:max-w-[280px] lg:-translate-y-[40%] lg:text-right">
            <p className="whitespace-pre-line text-center text-[18px] font-light leading-relaxed text-white lg:text-right">
              {heading}
            </p>
          </div>

          {/* Image — centered */}
          <div className="flex justify-center -translate-y-[20%]">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt=""
                className="aspect-[3/2] w-64 rounded-2xl object-contain md:w-[420px]"
              />
            ) : (
              <CmsImagePlaceholder className="aspect-[3/2] w-64 rounded-2xl md:w-[420px]" />
            )}
          </div>

          {/* Body — bottom left of the image on large screens, with clear space from the image */}
          <div className="max-w-md -translate-y-[40%] lg:absolute lg:bottom-0 lg:left-0 lg:max-w-[500px] lg:-translate-x-[25%]">
            <p className="whitespace-pre-line text-center text-[18px] font-light leading-relaxed text-white lg:text-left">
              {body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
