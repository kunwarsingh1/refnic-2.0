import { CmsImagePlaceholder } from "@/components/ui/primitives";

export default function IndianMarketNarrativeSection({
  heading,
  body,
  align,
  imageUrl,
  imageClassName = "h-56 w-56 rounded-2xl object-contain md:h-72 md:w-72",
  placeholderClassName,
  headingClassName = "whitespace-pre-line font-display text-[40px] font-bold leading-tight text-[#EBEBEB]",
}: {
  heading: string;
  body: string;
  align: "left" | "right";
  imageUrl?: string;
  imageClassName?: string;
  placeholderClassName?: string;
  headingClassName?: string;
}) {
  const imageFirst = align === "right";
  const textRight = align === "right";
  const paragraphs = body.split("\n\n");

  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className={`flex flex-col gap-10 md:flex-row md:items-center ${imageFirst ? "" : "md:flex-row-reverse"}`}>
          <div className="flex justify-center md:shrink-0">
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt="" className={imageClassName} />
            ) : (
              <CmsImagePlaceholder className={placeholderClassName ?? imageClassName} />
            )}
          </div>
          <div className={textRight ? "text-center md:text-right" : "text-center md:text-left"}>
            <h2 className={headingClassName}>{heading}</h2>
            <div className="mt-6 space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-[18px] font-light leading-relaxed text-white">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
