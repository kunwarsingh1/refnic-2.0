import { getInvestorsPageConfig } from "@/lib/content/investorsPage";
import { updateInvestorsPageConfigAction } from "@/app/actions/investors-page";
import { NumberedSectionListField } from "@/components/admin/NumberedSectionListField";
import { TextImageListField } from "@/components/admin/TextImageListField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminInvestorsPagePage() {
  const c = await getInvestorsPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Investors Page</h1>

      <form action={updateInvestorsPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <LineBreakField name="heroHeading" label="Hero heading" defaultValue={c.heroHeading} />
        <LineBreakField name="heroSubheading" label="Hero subheading" defaultValue={c.heroSubheading} />

        <NumberedSectionListField defaultItems={c.numberedSections} />

        <LineBreakField name="whyNowHeading" label={'"Why Now" heading'} defaultValue={c.whyNowHeading} />
        <TextImageListField
          label="Reasons"
          textName="whyNowReasonText"
          imageName="whyNowReasonImageUrl"
          defaultItems={c.whyNowReasons}
        />

        <div>
          <label htmlFor="visionLabel" className={labelClass}>
            Vision label
          </label>
          <input id="visionLabel" name="visionLabel" type="text" defaultValue={c.visionLabel} className={inputClass} />
        </div>
        <LineBreakField name="visionHeading" label="Vision heading" defaultValue={c.visionHeading} />
        <LineBreakField name="visionBody" label="Vision body" defaultValue={c.visionBody} rows={3} />

        <LineBreakField name="closingHeading" label="Closing heading" defaultValue={c.closingHeading} />
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
