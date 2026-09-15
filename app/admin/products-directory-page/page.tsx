import { getProductsDirectoryPageConfig } from "@/lib/content/productsDirectoryPage";
import { updateProductsDirectoryPageConfigAction } from "@/app/actions/products-directory-page";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminProductsDirectoryPagePage() {
  const c = await getProductsDirectoryPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Products Directory Page</h1>
      <p className="mt-1 text-sm text-white/50">
        Controls the main /products page hero body and closing CTA. (Category grid content lives under Product
        Catalog / Product Categories.)
      </p>

      <form action={updateProductsDirectoryPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Hero</p>
          <LineBreakField name="heroBody" label="Body" defaultValue={c.heroBody} rows={3} />
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Closing CTA</p>
          <LineBreakField name="closingHeading" label="Heading" defaultValue={c.closingHeading} />
          <ImageUploadField name="closingImageUrl" label="Closing image" defaultValue={c.closingImageUrl} />
          <LineBreakField name="closingBody" label="Body" defaultValue={c.closingBody} rows={3} />
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
