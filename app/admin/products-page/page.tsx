import { getProductsPageConfig } from "@/lib/content/productsPage";
import { updateProductsPageConfigAction } from "@/app/actions/products-page";
import { PlantStepsField } from "@/components/admin/PlantStepsField";
import { MaterialCardsField } from "@/components/admin/MaterialCardsField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LineBreakField } from "@/components/admin/LineBreakField";
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
          <LineBreakField name="heroHeading" label="Heading" defaultValue={c.heroHeading} />
          <LineBreakField name="heroIntro" label="Intro copy" defaultValue={c.heroIntro} rows={4} />
          <ImageUploadField name="heroImageUrl" label="Hero image" defaultValue={c.heroImageUrl} />
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
          <LineBreakField name="crushingBlurb" label="Crushing systems blurb" defaultValue={c.crushingBlurb} rows={3} />
          <ImageUploadField name="crushingImageUrl" label="Crushing systems image" defaultValue={c.crushingImageUrl} />
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Process & Machinery Overview</p>
          <LineBreakField name="processHeading" label="Heading" defaultValue={c.processHeading} />
          <LineBreakField name="processIntro" label="Intro copy" defaultValue={c.processIntro} rows={3} />
          <PlantStepsField label="Plant process steps" defaultItems={c.plantSteps} />
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Material Recovery</p>
          <LineBreakField name="materialRecoveryHeading" label="Heading" defaultValue={c.materialRecoveryHeading} />
          <MaterialCardsField label="Recovered material cards" defaultItems={c.materialCards} />
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Closing CTA</p>
          <LineBreakField name="ctaHeading" label="Heading" defaultValue={c.ctaHeading} />
          <LineBreakField name="ctaBlurb" label="Blurb" defaultValue={c.ctaBlurb} />
          <ImageUploadField name="ctaImageUrl" label="CTA image" defaultValue={c.ctaImageUrl} />
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
