"use client";

import { useRouter } from "next/navigation";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ShowcaseContentFields } from "@/components/admin/ShowcaseContentFields";
import { LineBreakField } from "@/components/admin/LineBreakField";
import type { SustainabilityCatalogItem } from "@/lib/content/sustainabilityCatalog";

export function SustainabilityCatalogItemForm({
  item,
  action,
}: {
  item?: SustainabilityCatalogItem;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push("/admin/sustainability-catalog");
      }}
      className="max-w-xl space-y-5"
    >
      <LineBreakField name="title" label="Title" defaultValue={item?.title} required />

      <LineBreakField
        name="excerpt"
        label="Short description (shown on the /sustainability grid card)"
        defaultValue={item?.excerpt}
        rows={3}
        required
      />

      <ImageUploadField name="cardImageUrl" label="Card image (shown on the /sustainability grid card)" defaultValue={item?.cardImageUrl} />

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-semibold text-white">Detail page — hero</p>
        <LineBreakField name="heroBody" label="Hero body" defaultValue={item?.heroBody} rows={3} />
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
          <div>
            <label htmlFor="closingCtaLabel" className={labelClass}>
              Closing button label
            </label>
            <input
              id="closingCtaLabel"
              name="closingCtaLabel"
              type="text"
              defaultValue={item?.closingCtaLabel ?? "Start Your Project"}
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
        <button
          type="button"
          onClick={() => router.push("/admin/sustainability-catalog")}
          className={secondaryButtonClass}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
