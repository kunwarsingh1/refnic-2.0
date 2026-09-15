import { getSustainabilityPageConfig } from "@/lib/content/sustainabilityPage";
import { updateSustainabilityPageConfigAction } from "@/app/actions/sustainability-page";
import { StringListField } from "@/components/admin/StringListField";
import { TitleBodyCtaListField } from "@/components/admin/TitleBodyCtaListField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminSustainabilityPagePage() {
  const c = await getSustainabilityPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Sustainability Page</h1>

      <form action={updateSustainabilityPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <div>
          <label htmlFor="heroLabel" className={labelClass}>
            Hero label
          </label>
          <input id="heroLabel" name="heroLabel" type="text" defaultValue={c.heroLabel} className={inputClass} />
        </div>
        <LineBreakField name="heroHeading" label="Hero heading" defaultValue={c.heroHeading} />
        <LineBreakField name="heroBody" label="Hero body" defaultValue={c.heroBody} rows={3} />
        <ImageUploadField name="heroImageUrl" label="Hero image" defaultValue={c.heroImageUrl} />
        <div>
          <label htmlFor="heroCtaLabel" className={labelClass}>
            Hero CTA label
          </label>
          <input
            id="heroCtaLabel"
            name="heroCtaLabel"
            type="text"
            defaultValue={c.heroCtaLabel}
            className={inputClass}
          />
        </div>

        <LineBreakField name="impactSectionHeading" label="Impact section heading" defaultValue={c.impactSectionHeading} />
        <TitleBodyCtaListField
          label="Impact cards"
          titleName="impactTitle"
          bodyName="impactBody"
          ctaName="impactCta"
          defaultItems={c.impactCards}
        />

        <StringListField name="processStep" label="Process steps" defaultItems={c.processSteps} />

        <LineBreakField name="approachHeading" label="Approach heading" defaultValue={c.approachHeading} />
        <LineBreakField name="approachBody" label="Approach body" defaultValue={c.approachBody} rows={3} />
        <TitleBodyCtaListField
          label="Approach cards"
          titleName="approachTitle"
          bodyName="approachBody2"
          ctaName="approachCta"
          defaultItems={c.approachCards}
        />

        <LineBreakField name="closingHeading" label="Closing heading" defaultValue={c.closingHeading} />
        <LineBreakField name="closingBody" label="Closing body" defaultValue={c.closingBody} />
        <ImageUploadField name="closingImageUrl" label="Closing image" defaultValue={c.closingImageUrl} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="closingCtaLabel" className={labelClass}>
              Closing CTA label
            </label>
            <input
              id="closingCtaLabel"
              name="closingCtaLabel"
              type="text"
              defaultValue={c.closingCtaLabel}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="closingCtaHref" className={labelClass}>
              Closing CTA link
            </label>
            <input
              id="closingCtaHref"
              name="closingCtaHref"
              type="text"
              defaultValue={c.closingCtaHref}
              className={inputClass}
            />
          </div>
        </div>

        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
