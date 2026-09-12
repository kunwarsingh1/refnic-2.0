"use client";

import { useRouter } from "next/navigation";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { NarrativeSectionsField } from "@/components/admin/NarrativeSectionsField";
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

      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input id="title" name="title" type="text" required defaultValue={item?.title} className={inputClass} />
      </div>

      <div>
        <label htmlFor="excerpt" className={labelClass}>
          Short description <span className="text-white/40">(shown on the /solutions grid card)</span>
        </label>
        <textarea id="excerpt" name="excerpt" required rows={3} defaultValue={item?.excerpt} className={inputClass} />
      </div>

      <ImageUploadField name="cardImageUrl" label="Card image (shown on the /solutions grid card)" defaultValue={item?.cardImageUrl} />

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-semibold text-white">Detail page — hero</p>
        <div className="space-y-5">
          <div>
            <label htmlFor="heroBody" className={labelClass}>
              Hero body
            </label>
            <textarea id="heroBody" name="heroBody" rows={3} defaultValue={item?.heroBody} className={inputClass} />
          </div>
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
            <label htmlFor="closingBody" className={labelClass}>
              Closing body
            </label>
            <textarea
              id="closingBody"
              name="closingBody"
              rows={3}
              defaultValue={item?.closingBody}
              className={inputClass}
            />
          </div>
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
