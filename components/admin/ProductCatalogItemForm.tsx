"use client";

import { useRouter } from "next/navigation";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ShowcaseContentFields } from "@/components/admin/ShowcaseContentFields";
import { NewsletterContentField } from "@/components/admin/NewsletterContentField";
import { NarrativeSectionsField } from "@/components/admin/NarrativeSectionsField";
import { HeadingBodyListField } from "@/components/admin/HeadingBodyListField";
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

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-semibold text-white">Detail page — hero</p>
        <div className="space-y-5">
          <div>
            <label htmlFor="heroCtaLabel" className={labelClass}>
              Hero button label
            </label>
            <input
              id="heroCtaLabel"
              name="heroCtaLabel"
              type="text"
              defaultValue={item?.heroCtaLabel}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="heroCtaHref" className={labelClass}>
              Hero button link
            </label>
            <input
              id="heroCtaHref"
              name="heroCtaHref"
              type="text"
              defaultValue={item?.heroCtaHref ?? "/contact"}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-5">
        <NarrativeSectionsField label="Detail page — narrative sections" defaultItems={item?.narrativeSections ?? []} />
      </div>

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-semibold text-white">Detail page — recovered materials</p>
        <div className="space-y-5">
          <div>
            <label htmlFor="materialsHeading" className={labelClass}>
              Section heading <span className="text-white/40">(e.g. &quot;Material Recovery&quot;)</span>
            </label>
            <input
              id="materialsHeading"
              name="materialsHeading"
              type="text"
              defaultValue={item?.materialsHeading}
              className={inputClass}
            />
          </div>
          <HeadingBodyListField
            label="Materials"
            headingName="materialTitle"
            bodyName="materialBody"
            headingLabel="Material title (e.g. Copper)"
            bodyLabel="Description"
            defaultItems={item?.materials ?? []}
          />
        </div>
      </div>

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-semibold text-white">Detail page — showcase content</p>
        <ShowcaseContentFields
          contentType={item?.contentType}
          pdfUrl={item?.pdfUrl}
          showcaseImageUrl={item?.showcaseImageUrl}
          showcaseText={item?.showcaseText}
          caption={item?.pdfCaption}
        />
      </div>

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-semibold text-white">Detail page — closing</p>
        <div className="space-y-5">
          <div>
            <label htmlFor="closingHeading" className={labelClass}>
              Closing heading
            </label>
            <input
              id="closingHeading"
              name="closingHeading"
              type="text"
              defaultValue={item?.closingHeading}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="closingTagline" className={labelClass}>
              Closing tagline
            </label>
            <textarea
              id="closingTagline"
              name="closingTagline"
              rows={3}
              defaultValue={item?.closingTagline}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="closingCtaLabel" className={labelClass}>
              Closing button label
            </label>
            <input
              id="closingCtaLabel"
              name="closingCtaLabel"
              type="text"
              defaultValue={item?.closingCtaLabel}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="closingCtaHref" className={labelClass}>
              Closing button link
            </label>
            <input
              id="closingCtaHref"
              name="closingCtaHref"
              type="text"
              defaultValue={item?.closingCtaHref ?? "/contact"}
              className={inputClass}
            />
          </div>
          <ImageUploadField name="closingImageUrl" label="Closing image" defaultValue={item?.closingImageUrl} />
        </div>
      </div>

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
