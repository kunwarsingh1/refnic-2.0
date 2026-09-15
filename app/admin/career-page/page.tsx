import { getCareerPageConfig } from "@/lib/content/careerPage";
import { updateCareerPageConfigAction } from "@/app/actions/career-page";
import { HeadingBodyListField } from "@/components/admin/HeadingBodyListField";
import { CareerPhotosField } from "@/components/admin/CareerPhotosField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminCareerPagePage() {
  const c = await getCareerPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Career Page</h1>

      <form action={updateCareerPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <LineBreakField name="heroHeading" label="Hero heading" defaultValue={c.heroHeading} />
        <LineBreakField name="heroSubheading" label="Hero subheading" defaultValue={c.heroSubheading} rows={3} />
        <div>
          <label htmlFor="heroCtaLabel" className={labelClass}>
            Hero button label
          </label>
          <input id="heroCtaLabel" name="heroCtaLabel" type="text" defaultValue={c.heroCtaLabel} className={inputClass} />
        </div>

        <LineBreakField name="missionHeading" label="Mission heading" defaultValue={c.missionHeading} />
        <ImageUploadField
          name="missionImageUrl"
          label="Mission section image (optional — shows a decorative placeholder until set)"
          defaultValue={c.missionImageUrl}
        />
        <LineBreakField name="missionBody" label="Mission body" defaultValue={c.missionBody} rows={4} />

        <LineBreakField
          name="lookingForHeading"
          label={'"Who we\'re looking for" heading'}
          defaultValue={c.lookingForHeading}
        />
        <HeadingBodyListField
          label="Traits (3 numbered cards below the heading)"
          headingName="traitTitle"
          bodyName="traitBody"
          defaultItems={c.traits}
          headingLabel="Title"
        />

        <LineBreakField name="openPositionsHeading" label="Open positions heading" defaultValue={c.openPositionsHeading} />
        <HeadingBodyListField
          label="Open positions"
          headingName="positionTitle"
          bodyName="positionBody"
          defaultItems={c.positions}
          headingLabel="Title"
          imageName="positionImageUrl"
          imageLabel="Position image (optional)"
        />
        <div>
          <label htmlFor="applyButtonLabel" className={labelClass}>
            Apply button label
          </label>
          <input
            id="applyButtonLabel"
            name="applyButtonLabel"
            type="text"
            defaultValue={c.applyButtonLabel}
            className={inputClass}
          />
        </div>

        <LineBreakField name="lifeHeading" label={'"Life at Refnic" heading'} defaultValue={c.lifeHeading} />
        <CareerPhotosField label="Gallery photos" defaultItems={c.photos} />

        <LineBreakField name="closingHeading" label="Closing heading" defaultValue={c.closingHeading} />
        <LineBreakField name="closingBody" label="Closing body" defaultValue={c.closingBody} rows={3} />
        <div>
          <label htmlFor="closingCtaLabel" className={labelClass}>
            Closing button label
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
