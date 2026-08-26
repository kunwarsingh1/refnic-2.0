import { getProductsPageConfig } from "@/lib/content/productsPage";
import { updateProductsPageConfigAction } from "@/app/actions/products-page";
import { PlantStepsField } from "@/components/admin/PlantStepsField";
import { MaterialCardsField } from "@/components/admin/MaterialCardsField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminProductsPagePage() {
  const c = await getProductsPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Products Page</h1>
      <p className="mt-1 text-sm text-white/50">
        Controls the lithium-ion battery recycling plant page at /products — hero, plant process overview, material
        recovery cards and the closing CTA.
      </p>

      <form action={updateProductsPageConfigAction} className="mt-6 max-w-2xl space-y-8">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Hero</p>
          <div>
            <label htmlFor="heroWatermark" className={labelClass}>
              Background watermark text
            </label>
            <input
              id="heroWatermark"
              name="heroWatermark"
              type="text"
              defaultValue={c.heroWatermark}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="heroHeading" className={labelClass}>
              Heading
            </label>
            <input id="heroHeading" name="heroHeading" type="text" defaultValue={c.heroHeading} className={inputClass} />
          </div>
          <div>
            <label htmlFor="heroIntro" className={labelClass}>
              Intro copy
            </label>
            <textarea id="heroIntro" name="heroIntro" rows={4} defaultValue={c.heroIntro} className={inputClass} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="heroCtaLabel" className={labelClass}>
                CTA label
              </label>
              <input
                id="heroCtaLabel"
                name="heroCtaLabel"
                type="text"
                defaultValue={c.heroCtaLabel}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="heroCtaHref" className={labelClass}>
                CTA link
              </label>
              <input
                id="heroCtaHref"
                name="heroCtaHref"
                type="text"
                defaultValue={c.heroCtaHref}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="crushingBlurb" className={labelClass}>
              Crushing systems blurb
            </label>
            <textarea
              id="crushingBlurb"
              name="crushingBlurb"
              rows={3}
              defaultValue={c.crushingBlurb}
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Process & Machinery Overview</p>
          <div>
            <label htmlFor="processHeading" className={labelClass}>
              Heading
            </label>
            <input
              id="processHeading"
              name="processHeading"
              type="text"
              defaultValue={c.processHeading}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="processIntro" className={labelClass}>
              Intro copy
            </label>
            <textarea
              id="processIntro"
              name="processIntro"
              rows={3}
              defaultValue={c.processIntro}
              className={inputClass}
            />
          </div>
          <PlantStepsField label="Plant process steps" defaultItems={c.plantSteps} />
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Material Recovery</p>
          <div>
            <label htmlFor="materialRecoveryHeading" className={labelClass}>
              Heading
            </label>
            <input
              id="materialRecoveryHeading"
              name="materialRecoveryHeading"
              type="text"
              defaultValue={c.materialRecoveryHeading}
              className={inputClass}
            />
          </div>
          <MaterialCardsField label="Recovered material cards" defaultItems={c.materialCards} />
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Closing CTA</p>
          <div>
            <label htmlFor="ctaHeading" className={labelClass}>
              Heading
            </label>
            <input id="ctaHeading" name="ctaHeading" type="text" defaultValue={c.ctaHeading} className={inputClass} />
          </div>
          <div>
            <label htmlFor="ctaBlurb" className={labelClass}>
              Blurb
            </label>
            <textarea id="ctaBlurb" name="ctaBlurb" rows={2} defaultValue={c.ctaBlurb} className={inputClass} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="ctaButtonLabel" className={labelClass}>
                Button label
              </label>
              <input
                id="ctaButtonLabel"
                name="ctaButtonLabel"
                type="text"
                defaultValue={c.ctaButtonLabel}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="ctaButtonHref" className={labelClass}>
                Button link
              </label>
              <input
                id="ctaButtonHref"
                name="ctaButtonHref"
                type="text"
                defaultValue={c.ctaButtonHref}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
