import { getOurStoryPageConfig } from "@/lib/content/ourStoryPage";
import { updateOurStoryPageConfigAction } from "@/app/actions/our-story-page";
import { NumberedSectionListField } from "@/components/admin/NumberedSectionListField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminOurStoryPagePage() {
  const c = await getOurStoryPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Our Story Page</h1>

      <form action={updateOurStoryPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <div>
          <label htmlFor="heroLabel" className={labelClass}>
            Hero label (each word wraps to its own line automatically)
          </label>
          <input id="heroLabel" name="heroLabel" type="text" defaultValue={c.heroLabel} className={inputClass} />
        </div>
        <LineBreakField name="heroSubheading" label="Hero subheading" defaultValue={c.heroSubheading} />

        <NumberedSectionListField defaultItems={c.numberedSections} />

        <LineBreakField name="closingTagline" label="Closing tagline" defaultValue={c.closingTagline} rows={3} />
        <ImageUploadField name="closingImageUrl" label="Closing image" defaultValue={c.closingImageUrl} />

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
