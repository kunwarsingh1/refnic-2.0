import { getContactPageConfig } from "@/lib/content/contactPage";
import { updateContactPageConfigAction } from "@/app/actions/contact-page";
import { StringListField } from "@/components/admin/StringListField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
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
          <label htmlFor="contactInfoHeading" className={labelClass}>
            Contact info heading
          </label>
          <input
            id="contactInfoHeading"
            name="contactInfoHeading"
            type="text"
            defaultValue={c.contactInfoHeading}
            className={inputClass}
          />
        </div>

        <StringListField name="subject" label="Enquiry subjects" defaultItems={c.subjects} />

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
        <ImageUploadField
          name="closingImageUrl"
          label="Closing section image (optional — shows a placeholder until set)"
          defaultValue={c.closingImageUrl}
        />

        <div>
          <label htmlFor="closingTagline" className={labelClass}>
            Closing tagline
          </label>
          <input
            id="closingTagline"
            name="closingTagline"
            type="text"
            defaultValue={c.closingTagline}
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
