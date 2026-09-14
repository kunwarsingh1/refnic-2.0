"use client";

import { useRouter } from "next/navigation";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { NarrativeSectionsField } from "@/components/admin/NarrativeSectionsField";
import { ShowcaseContentFields } from "@/components/admin/ShowcaseContentFields";
import { LineBreakField } from "@/components/admin/LineBreakField";
import type { SolutionCatalogItem } from "@/lib/content/solutionsCatalog";

const CATEGORIES = ["Mechanical Solutions", "Chemical Solution"];

export function SolutionCatalogItemForm({
  item,
  action,
}: {
  item?: SolutionCatalogItem;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();
  const options = item?.category && !CATEGORIES.includes(item.category) ? [item.category, ...CATEGORIES] : CATEGORIES;

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push("/admin/solutions-catalog");
      }}
      className="max-w-xl space-y-5"
    >
      <div>
        <label htmlFor="category" className={labelClass}>
          Category
        </label>
        <select id="category" name="category" required defaultValue={item?.category} className={inputClass}>
          {!item?.category && <option value="">Select a category…</option>}
          {options.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <LineBreakField name="title" label="Title" defaultValue={item?.title} required />

      <LineBreakField
        name="excerpt"
        label="Short description (shown on the /solutions grid card)"
        defaultValue={item?.excerpt}
        rows={3}
        required
      />

      <ImageUploadField name="cardImageUrl" label="Card image (shown on the /solutions grid card)" defaultValue={item?.cardImageUrl} />

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-semibold text-white">Detail page — hero</p>
        <div className="space-y-5">
          <LineBreakField name="heroBody" label="Hero body" defaultValue={item?.heroBody} rows={3} />
          <ImageUploadField name="heroImageUrl" label="Hero image (optional)" defaultValue={item?.heroImageUrl} />
          <div>
            <label htmlFor="heroCtaLabel" className={labelClass}>
              Hero button label
            </label>
            <input
              id="heroCtaLabel"
              name="heroCtaLabel"
              type="text"
              defaultValue={item?.heroCtaLabel ?? "Get in Touch →"}
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
          <LineBreakField name="closingBody" label="Closing body" defaultValue={item?.closingBody} rows={3} />
          <ImageUploadField
            name="closingImageUrl"
            label="Closing image (optional)"
            defaultValue={item?.closingImageUrl}
          />
          <div>
            <label htmlFor="closingCtaLabel" className={labelClass}>
              Closing button label
            </label>
            <input
              id="closingCtaLabel"
              name="closingCtaLabel"
              type="text"
              defaultValue={item?.closingCtaLabel ?? "Talk to an Engineer →"}
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
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" className={buttonClass}>
          Save
        </button>
        <button type="button" onClick={() => router.push("/admin/solutions-catalog")} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
}
