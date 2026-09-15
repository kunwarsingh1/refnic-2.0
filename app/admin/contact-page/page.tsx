import { getContactPageConfig } from "@/lib/content/contactPage";
import { updateContactPageConfigAction } from "@/app/actions/contact-page";
import { StringListField } from "@/components/admin/StringListField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminContactPagePage() {
  const c = await getContactPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Contact Page</h1>
      <p className="mt-1 text-sm text-white/50">
        Contact email, phone, and address are managed on the Footer settings page.
      </p>

      <form action={updateContactPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <LineBreakField name="heroHeading" label="Hero heading" defaultValue={c.heroHeading} />
        <LineBreakField name="heroSubheading" label="Hero subheading" defaultValue={c.heroSubheading} rows={3} />

        <LineBreakField name="contactInfoHeading" label="Contact info heading" defaultValue={c.contactInfoHeading} />

        <ImageUploadField
          name="formImageUrl"
          label="Decorative image behind the contact form (optional — shows a placeholder until set)"
          defaultValue={c.formImageUrl}
        />

        <StringListField name="subject" label="Enquiry subjects" defaultItems={c.subjects} />

        <LineBreakField name="closingHeading" label="Closing heading" defaultValue={c.closingHeading} />
        <ImageUploadField
          name="closingImageUrl"
          label="Closing section image (optional — shows a placeholder until set)"
          defaultValue={c.closingImageUrl}
        />

        <LineBreakField name="closingTagline" label="Closing tagline" defaultValue={c.closingTagline} />
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
