import { getSustainabilityPageConfig } from "@/lib/content/sustainabilityPage";
import { updateSustainabilityPageConfigAction } from "@/app/actions/sustainability-page";
import { StringListField } from "@/components/admin/StringListField";
import { TitleBodyCtaListField } from "@/components/admin/TitleBodyCtaListField";
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
        <div>
          <label htmlFor="heroHeading" className={labelClass}>
            Hero heading
          </label>
          <input id="heroHeading" name="heroHeading" type="text" defaultValue={c.heroHeading} className={inputClass} />
        </div>
        <div>
          <label htmlFor="heroBody" className={labelClass}>
            Hero body
          </label>
          <textarea id="heroBody" name="heroBody" rows={3} defaultValue={c.heroBody} className={inputClass} />
        </div>
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

        <div>
          <label htmlFor="impactSectionHeading" className={labelClass}>
            Impact section heading
          </label>
          <input
            id="impactSectionHeading"
            name="impactSectionHeading"
            type="text"
            defaultValue={c.impactSectionHeading}
            className={inputClass}
          />
        </div>
        <TitleBodyCtaListField
          label="Impact cards"
          titleName="impactTitle"
          bodyName="impactBody"
          ctaName="impactCta"
          defaultItems={c.impactCards}
        />

        <StringListField name="processStep" label="Process steps" defaultItems={c.processSteps} />

        <div>
          <label htmlFor="approachHeading" className={labelClass}>
            Approach heading
          </label>
          <input
            id="approachHeading"
            name="approachHeading"
            type="text"
            defaultValue={c.approachHeading}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="approachBody" className={labelClass}>
            Approach body
          </label>
          <textarea id="approachBody" name="approachBody" rows={3} defaultValue={c.approachBody} className={inputClass} />
        </div>
        <TitleBodyCtaListField
          label="Approach cards"
          titleName="approachTitle"
          bodyName="approachBody2"
          ctaName="approachCta"
          defaultItems={c.approachCards}
        />

        <div>
          <label htmlFor="closingBody" className={labelClass}>
            Closing body
          </label>
          <textarea id="closingBody" name="closingBody" rows={2} defaultValue={c.closingBody} className={inputClass} />
        </div>
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

        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
