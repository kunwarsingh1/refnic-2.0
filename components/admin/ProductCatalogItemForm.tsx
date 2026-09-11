"use client";

import { useRouter } from "next/navigation";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { NewsletterContentField } from "@/components/admin/NewsletterContentField";
import type { ProductCatalogItem } from "@/lib/content/productCatalog";
import type { ProductCategory } from "@/lib/content/productCategories";

export function ProductCatalogItemForm({
  item,
  categories,
  action,
}: {
  item?: ProductCatalogItem;
  categories: ProductCategory[];
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();
  const categoryNames = categories.map((c) => c.name);
  const options = item?.category && !categoryNames.includes(item.category) ? [item.category, ...categoryNames] : categoryNames;

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push("/admin/product-catalog");
      }}
      className="max-w-xl space-y-5"
    >
      <div>
        <label htmlFor="category" className={labelClass}>
          Category
        </label>
        {options.length > 0 ? (
          <select id="category" name="category" required defaultValue={item?.category} className={inputClass}>
            {!item?.category && <option value="">Select a category…</option>}
            {options.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        ) : (
          <>
            <input id="category" name="category" type="text" required defaultValue={item?.category} className={inputClass} />
            <p className="mt-1 text-xs text-white/40">
              No product categories yet —{" "}
              <a href="/admin/product-categories/new" className="text-accent-blue hover:underline">
                create one first
              </a>{" "}
              so it appears here as a dropdown option.
            </p>
          </>
        )}
      </div>

      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input id="title" name="title" type="text" required defaultValue={item?.title} className={inputClass} />
      </div>

      <div>
        <label htmlFor="excerpt" className={labelClass}>
          Short description <span className="text-white/40">(shown on the card)</span>
        </label>
        <textarea id="excerpt" name="excerpt" required rows={3} defaultValue={item?.excerpt} className={inputClass} />
      </div>

      <ImageUploadField name="imageUrl" label="Card image" defaultValue={item?.imageUrl} />

      <NewsletterContentField name="content" defaultValue={item?.content} />

      <div className="flex gap-3">
        <button type="submit" className={buttonClass}>
          Save
        </button>
        <button type="button" onClick={() => router.push("/admin/product-catalog")} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
}
