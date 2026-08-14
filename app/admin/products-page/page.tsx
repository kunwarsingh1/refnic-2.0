import { getProductsPageConfig } from "@/lib/content/productsPage";
import { updateProductsPageConfigAction } from "@/app/actions/products-page";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminProductsPagePage() {
  const c = await getProductsPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Products Page</h1>
      <p className="mt-1 text-sm text-white/50">
        The product cards themselves come from the shared Products/Solutions/Services list — edit those on the{" "}
        <a href="/admin/cards" className="text-accent-blue hover:underline">
          Cards
        </a>{" "}
        page.
      </p>

      <form action={updateProductsPageConfigAction} className="mt-6 max-w-xl space-y-5">
        <div>
          <label htmlFor="heading" className={labelClass}>
            Heading
          </label>
          <input id="heading" name="heading" type="text" defaultValue={c.heading} className={inputClass} />
        </div>
        <div>
          <label htmlFor="subtitle" className={labelClass}>
            Subtitle
          </label>
          <textarea id="subtitle" name="subtitle" rows={2} defaultValue={c.subtitle} className={inputClass} />
        </div>

        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
