import { GradientCtaButton, CmsImagePlaceholder } from "@/components/ui/primitives";
import type { SolutionsPageConfig } from "@/lib/content/solutionsPage";

export default function SolutionsCtaSection({
  config: c,
  showClosingImage = true,
}: {
  config: SolutionsPageConfig;
  showClosingImage?: boolean;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-16 md:pb-24 md:pt-24">
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-display font-bold text-3xl leading-tight text-[#F8F8F8] md:text-5xl">
          {c.closingHeading}
        </h2>
        {c.closingImageUrl ? (
          <img
            src={c.closingImageUrl}
            alt=""
            className="mx-auto mt-8 aspect-[495/488] w-48 rounded-2xl object-cover md:w-72"
          />
        ) : (
          <CmsImagePlaceholder className="mx-auto mt-8 aspect-[495/488] w-48 rounded-2xl md:w-72" />
        )}
        <p className="mx-auto mt-8 max-w-[928px] text-center text-base font-normal leading-relaxed text-[#F8F8F8] md:text-[21.64px] md:leading-[32.46px]">
          {c.closingBody}
        </p>
        <div className="mt-10 flex justify-center">
          <GradientCtaButton href={c.closingCtaHref}>
            {c.closingCtaLabel}
          </GradientCtaButton>
        </div>
      </div>

      {showClosingImage && (
        <div className="relative z-10 mx-auto mt-20 max-w-6xl px-6">
          <CmsImagePlaceholder className="aspect-[1738/1041] w-full rounded-2xl" />
        </div>
      )}
    </section>
  );
}
