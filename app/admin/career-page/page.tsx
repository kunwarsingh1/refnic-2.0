import { getCareerPageConfig } from "@/lib/content/careerPage";
import { updateCareerPageConfigAction } from "@/app/actions/career-page";
import { HeadingBodyListField } from "@/components/admin/HeadingBodyListField";
import { StringListField } from "@/components/admin/StringListField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminCareerPagePage() {
  const c = await getCareerPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Career Page</h1>

      <form action={updateCareerPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <div>
          <label htmlFor="heroHeading" className={labelClass}>
            Hero heading
          </label>
          <textarea id="heroHeading" name="heroHeading" rows={2} defaultValue={c.heroHeading} className={inputClass} />
        </div>
        <div>
          <label htmlFor="heroSubheading" className={labelClass}>
            Hero subheading
          </label>
          <textarea
            id="heroSubheading"
            name="heroSubheading"
            rows={3}
            defaultValue={c.heroSubheading}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="heroCtaLabel" className={labelClass}>
            Hero button label
          </label>
          <input id="heroCtaLabel" name="heroCtaLabel" type="text" defaultValue={c.heroCtaLabel} className={inputClass} />
        </div>

        <div>
          <label htmlFor="missionHeading" className={labelClass}>
            Mission heading
          </label>
          <input
            id="missionHeading"
            name="missionHeading"
            type="text"
            defaultValue={c.missionHeading}
            className={inputClass}
          />
        </div>
        <ImageUploadField
          name="missionImageUrl"
          label="Mission section image (optional — shows a decorative placeholder until set)"
          defaultValue={c.missionImageUrl}
        />
        <div>
          <label htmlFor="missionBody" className={labelClass}>
            Mission body
          </label>
          <textarea id="missionBody" name="missionBody" rows={4} defaultValue={c.missionBody} className={inputClass} />
        </div>

        <div>
          <label htmlFor="lookingForHeading" className={labelClass}>
            &quot;Who we&apos;re looking for&quot; heading
          </label>
          <input
            id="lookingForHeading"
            name="lookingForHeading"
            type="text"
            defaultValue={c.lookingForHeading}
            className={inputClass}
          />
        </div>
        <HeadingBodyListField
          label="Traits (3 numbered cards below the heading)"
          headingName="traitTitle"
          bodyName="traitBody"
          defaultItems={c.traits}
          headingLabel="Title"
        />

        <div>
          <label htmlFor="openPositionsHeading" className={labelClass}>
            Open positions heading
          </label>
          <input
            id="openPositionsHeading"
            name="openPositionsHeading"
            type="text"
            defaultValue={c.openPositionsHeading}
            className={inputClass}
          />
        </div>
        <HeadingBodyListField
          label="Open positions"
          headingName="positionTitle"
          bodyName="positionBody"
          defaultItems={c.positions}
          headingLabel="Title"
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

        <div>
          <label htmlFor="lifeHeading" className={labelClass}>
            &quot;Life at Refnic&quot; heading
          </label>
          <input id="lifeHeading" name="lifeHeading" type="text" defaultValue={c.lifeHeading} className={inputClass} />
        </div>
        <StringListField
          name="photoCaption"
          label="Gallery captions (photos are placeholders until real images are uploaded)"
          defaultItems={c.photos.map((p) => p.caption)}
        />

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
          <label htmlFor="closingBody" className={labelClass}>
            Closing body
          </label>
          <textarea id="closingBody" name="closingBody" rows={3} defaultValue={c.closingBody} className={inputClass} />
        </div>
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
