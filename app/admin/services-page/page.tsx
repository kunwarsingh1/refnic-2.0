import { getServicesPageConfig } from "@/lib/content/servicesPage";
import { updateServicesPageConfigAction } from "@/app/actions/services-page";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminServicesPagePage() {
  const c = await getServicesPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Services Page</h1>
      <p className="mt-1 text-sm text-white/50">Controls the /services page hero and closing CTA.</p>

      <form action={updateServicesPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Hero</p>
          <LineBreakField name="heroHeading" label="Heading" defaultValue={c.heroHeading} />
          <LineBreakField name="heroBody" label="Body" defaultValue={c.heroBody} rows={3} />
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Project Services section</p>
          <LineBreakField
            name="categoryHeading"
            label="Heading (each line breaks to a new line on the page)"
            defaultValue={c.categoryHeading}
          />
          <LineBreakField
            name="categoryTagline"
            label="Tagline (each line breaks to a new line on the page)"
            defaultValue={c.categoryTagline}
            rows={3}
          />
          <ImageUploadField name="categoryImageUrl" label="Section image" defaultValue={c.categoryImageUrl} />
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Closing CTA</p>
          <LineBreakField name="closingHeading" label="Heading" defaultValue={c.closingHeading} />
          <LineBreakField name="closingBody" label="Body" defaultValue={c.closingBody} rows={3} />
          <ImageUploadField name="closingImageUrl" label="Closing image" defaultValue={c.closingImageUrl} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="closingCtaLabel" className={labelClass}>
                Button label
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
                Button link
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
        </div>

        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
