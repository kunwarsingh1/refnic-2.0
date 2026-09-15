"use client";

import { useRouter } from "next/navigation";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import type { ProductCategory } from "@/lib/content/productCategories";

export function ProductCategoryForm({
  category,
  action,
}: {
  category?: ProductCategory;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push("/admin/product-categories");
      }}
      className="max-w-xl space-y-5"
    >
      <LineBreakField name="name" label={'Category name (e.g. "Mechanical Products")'} defaultValue={category?.name} required />

      <LineBreakField
        name="tagline"
        label="Tagline (shown under the heading on the products page)"
        defaultValue={category?.tagline}
      />

      <ImageUploadField name="imageUrl" label="Category icon (optional)" defaultValue={category?.imageUrl} />

      <label className="flex w-fit cursor-pointer items-center gap-2 text-sm text-white/70">
        <input
          type="checkbox"
          name="invertLayout"
          defaultChecked={category?.invertLayout ?? false}
          className="h-4 w-4 accent-accent-blue"
        />
        Invert layout — image on the left, heading on the right (always shows an image, even a
        placeholder)
      </label>

      <div className="flex gap-3">
        <button type="submit" className={buttonClass}>
          Save
        </button>
        <button type="button" onClick={() => router.push("/admin/product-categories")} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
}
