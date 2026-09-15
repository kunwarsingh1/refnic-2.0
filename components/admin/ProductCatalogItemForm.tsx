"use client";

import { useRouter } from "next/navigation";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ShowcaseContentFields } from "@/components/admin/ShowcaseContentFields";
import { NewsletterContentField } from "@/components/admin/NewsletterContentField";
import { NarrativeSectionsField } from "@/components/admin/NarrativeSectionsField";
import { HeadingBodyListField } from "@/components/admin/HeadingBodyListField";
import { LineBreakField } from "@/components/admin/LineBreakField";
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

      <LineBreakField name="title" label="Title" defaultValue={item?.title} required />

      <LineBreakField
        name="excerpt"
        label="Short description (shown on the card)"
        defaultValue={item?.excerpt}
        rows={3}
        required
      />

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
          <LineBreakField
            name="materialsHeading"
            label={'Section heading (e.g. "Material Recovery")'}
            defaultValue={item?.materialsHeading}
          />
          <HeadingBodyListField
            label="Materials"
            headingName="materialTitle"
            bodyName="materialBody"
            headingLabel="Material title (e.g. Copper)"
            bodyLabel="Description"
            defaultItems={item?.materials ?? []}
            imageName="materialImageUrl"
            imageLabel="Material image"
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
          <LineBreakField name="closingHeading" label="Closing heading" defaultValue={item?.closingHeading} />
          <LineBreakField name="closingTagline" label="Closing tagline" defaultValue={item?.closingTagline} rows={3} />
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
