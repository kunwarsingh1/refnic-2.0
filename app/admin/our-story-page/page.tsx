import { getOurStoryPageConfig } from "@/lib/content/ourStoryPage";
import { updateOurStoryPageConfigAction } from "@/app/actions/our-story-page";
import { NumberedSectionListField } from "@/components/admin/NumberedSectionListField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminOurStoryPagePage() {
  const c = await getOurStoryPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Our Story Page</h1>

      <form action={updateOurStoryPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <div>
          <label htmlFor="heroLabel" className={labelClass}>
            Hero label
          </label>
          <input id="heroLabel" name="heroLabel" type="text" defaultValue={c.heroLabel} className={inputClass} />
        </div>
        <div>
          <label htmlFor="heroSubheading" className={labelClass}>
            Hero subheading
          </label>
          <input
            id="heroSubheading"
            name="heroSubheading"
            type="text"
            defaultValue={c.heroSubheading}
            className={inputClass}
          />
        </div>

        <NumberedSectionListField defaultItems={c.numberedSections} />

        <div>
          <label htmlFor="closingTagline" className={labelClass}>
            Closing tagline
          </label>
          <textarea
            id="closingTagline"
            name="closingTagline"
            rows={3}
            defaultValue={c.closingTagline}
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
