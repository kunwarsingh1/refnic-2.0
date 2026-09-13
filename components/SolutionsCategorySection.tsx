import { CmsImagePlaceholder, GradientCtaButton } from "@/components/ui/primitives";

export type SolutionItem = { title: string; description: string; href?: string; imageUrl?: string };

export default function SolutionsCategorySection({
  heading,
  tagline,
  align,
  imageUrl,
  items,
  taglineMaxWidth = "320px",
}: {
  heading: string;
  tagline: string;
  align: "left" | "right";
  imageUrl?: string;
  items: SolutionItem[];
  taglineMaxWidth?: string;
}) {
  const textAlign = align === "right" ? "text-right" : "text-left";
  const imageFirst = align === "right";

  return (
    <section className="relative overflow-hidden bg-[#161518] py-20 md:py-28">
      <div className="absolute inset-0 bg-grid-dark" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className={`flex flex-col gap-8 md:items-center md:justify-between md:gap-10 ${imageFirst ? "md:flex-row-reverse" : "md:flex-row"}`}>
          <div className={textAlign}>
            <h2 className="whitespace-pre-line font-display text-3xl md:text-5xl font-bold leading-tight text-[#EBEBEB]">
              {heading}
            </h2>
            <p
              style={{ maxWidth: taglineMaxWidth }}
              className={`mt-4 whitespace-pre-line text-[21.64px] leading-[32.46px] text-white ${align === "right" ? "ml-auto" : ""}`}
            >
              {tagline}
            </p>
          </div>

          {imageUrl ? (
            <img src={imageUrl} alt="" className="aspect-[4/3] w-full shrink-0 rounded-2xl object-cover md:w-[420px]" />
          ) : (
            <CmsImagePlaceholder className="aspect-[4/3] w-full shrink-0 rounded-2xl md:w-[420px]" />
          )}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="relative">
              <div
                style={{ borderImage: "linear-gradient(to top right, #1f1313, #737373, #191717) 1" }}
                className="pointer-events-none absolute inset-0 border border-transparent bg-white/[0.03]"
                aria-hidden
              />
              <div className="relative flex h-full flex-col p-5">
                <h3 className="min-h-12 font-display text-lg font-bold leading-tight text-[#EBEBEB] md:min-h-16 md:text-xl">
                  {item.title}
                </h3>

                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="mt-4 aspect-[4/3] w-full rounded-xl object-cover" />
                ) : (
                  <CmsImagePlaceholder className="mt-4 aspect-[4/3] w-full rounded-xl" />
                )}

                <p className="mt-2 flex-1 text-[21.64px] leading-[32.46px] text-white">{item.description}</p>
                <div className="mt-6">
                  <GradientCtaButton href={item.href ?? "/products"}>View</GradientCtaButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
