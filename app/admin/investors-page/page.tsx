import { getInvestorsPageConfig } from "@/lib/content/investorsPage";
import { updateInvestorsPageConfigAction } from "@/app/actions/investors-page";
import { StringListField } from "@/components/admin/StringListField";
import { NumberedSectionListField } from "@/components/admin/NumberedSectionListField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminInvestorsPagePage() {
  const c = await getInvestorsPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Investors Page</h1>

      <form action={updateInvestorsPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <div>
          <label htmlFor="heroHeading" className={labelClass}>
            Hero heading
          </label>
          <input id="heroHeading" name="heroHeading" type="text" defaultValue={c.heroHeading} className={inputClass} />
        </div>
        <div>
          <label htmlFor="heroSubheading" className={labelClass}>
            Hero subheading
          </label>
          <textarea
            id="heroSubheading"
            name="heroSubheading"
            rows={2}
            defaultValue={c.heroSubheading}
            className={inputClass}
          />
        </div>

        <NumberedSectionListField defaultItems={c.numberedSections} />

        <div>
          <label htmlFor="whyNowHeading" className={labelClass}>
            "Why Now" heading
          </label>
          <input
            id="whyNowHeading"
            name="whyNowHeading"
            type="text"
            defaultValue={c.whyNowHeading}
            className={inputClass}
          />
        </div>
        <StringListField name="whyNowReason" label="Reasons" defaultItems={c.whyNowReasons} />

        <div>
          <label htmlFor="visionLabel" className={labelClass}>
            Vision label
          </label>
          <input id="visionLabel" name="visionLabel" type="text" defaultValue={c.visionLabel} className={inputClass} />
        </div>
        <div>
          <label htmlFor="visionHeading" className={labelClass}>
            Vision heading
          </label>
          <input
            id="visionHeading"
            name="visionHeading"
            type="text"
            defaultValue={c.visionHeading}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="visionBody" className={labelClass}>
            Vision body
          </label>
          <textarea id="visionBody" name="visionBody" rows={3} defaultValue={c.visionBody} className={inputClass} />
        </div>

        <div>
          <label htmlFor="closingHeading" className={labelClass}>
            Closing heading
          </label>
          <input
            id="closingHeading"
            name="closingHeading"
            type="text"
            defaultValue={c.closingHeading}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="ctaLabel" className={labelClass}>
            CTA button label
          </label>
          <input id="ctaLabel" name="ctaLabel" type="text" defaultValue={c.ctaLabel} className={inputClass} />
        </div>

        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
