import { CmsImagePlaceholder } from "@/components/ui/primitives";
import type { ProductsPageConfig } from "@/lib/content/productsPage";

export default function PlantProcessOverview({ config: c }: { config: ProductsPageConfig }) {
  return (
    <section className="relative bg-black px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-[90rem] overflow-hidden rounded-xl bg-[#F8F8F8] px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display font-bold text-3xl leading-tight text-[#151417] md:text-[64px] md:leading-none">
            {c.processHeading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#151417] md:text-[21.64px] md:leading-[32.46px]">
            {c.processIntro}
          </p>
        </div>

        <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
          {c.plantSteps.map((step, i) => (
            <div key={i} className="flex flex-col gap-5 md:flex-row md:items-start md:gap-8">
              <div className="flex items-start gap-5 md:contents">
                <span className="w-16 shrink-0 font-display text-5xl font-bold text-[#929292]/20 sm:w-20 md:w-[150px] md:text-[120px] md:leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {step.imageUrl ? (
                  <img
                    src={step.imageUrl}
                    alt={step.title}
                    className="aspect-square w-24 shrink-0 rounded-lg object-cover sm:w-32 md:w-44"
                  />
                ) : (
                  <CmsImagePlaceholder className="aspect-square w-24 shrink-0 rounded-lg sm:w-32 md:w-44" />
                )}
              </div>

              <div className="min-w-0 max-w-4xl flex-1">
                <h3 className="font-display text-2xl font-bold leading-tight text-[#151417] md:text-[44px] md:leading-none">
                  {step.title}
                </h3>
                <p className="mt-2 text-base font-medium leading-snug text-[#151417] md:text-[21.64px] md:leading-[32.46px]">
                  {step.subheading}
                </p>
                <p className="mt-2 text-base font-medium leading-snug text-[#151417] md:text-[21.64px] md:leading-[32.46px]">
                  {step.keyEquipment}
                </p>
                <p className="mt-6 text-base leading-relaxed text-[#151417] md:mt-8 md:text-[21.64px] md:leading-[32.46px]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
