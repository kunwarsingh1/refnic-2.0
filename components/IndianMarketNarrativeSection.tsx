import { CmsImagePlaceholder } from "@/components/ui/primitives";

export default function IndianMarketNarrativeSection({
  heading,
  body,
  align,
  imageUrl,
}: {
  heading: string;
  body: string;
  align: "left" | "right";
  imageUrl?: string;
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
              <img src={imageUrl} alt="" className="h-40 w-40 rounded-2xl object-cover md:h-48 md:w-48" />
            ) : (
              <CmsImagePlaceholder className="h-40 w-40 rounded-2xl md:h-48 md:w-48" />
            )}
          </div>
          <div className={textRight ? "text-center md:text-right" : "text-center md:text-left"}>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#EBEBEB] md:text-5xl">{heading}</h2>
            <div className="mt-6 space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-[20px] leading-[32.46px] text-white">
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
