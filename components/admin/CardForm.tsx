"use client";

import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ModelUploadField } from "@/components/admin/ModelUploadField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import type { Card } from "@/lib/content/cards";

export function CardForm({
  card,
  action,
}: {
  card?: Card;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push("/admin/cards");
      }}
      className="max-w-xl space-y-5"
    >
      <div>
        <label htmlFor="variant" className={labelClass}>
          Section
        </label>
        <select id="variant" name="variant" defaultValue={card?.variant ?? "products"} className={inputClass}>
          <option value="products">Products</option>
          <option value="solutions">Solutions</option>
          <option value="services">Services</option>
        </select>
      </div>

      <LineBreakField name="title" label="Title" defaultValue={card?.title} required />

      <LineBreakField name="body" label="Body" defaultValue={card?.body} rows={3} required />

      <ImageUploadField name="imageUrl" label="Image" defaultValue={card?.imageUrl} />

      <ModelUploadField name="modelUrl" label="3D model (.glb)" defaultValue={card?.modelUrl} />

      <div className="flex gap-3">
        <button type="submit" className={buttonClass}>
          Save
        </button>
        <button type="button" onClick={() => router.push("/admin/cards")} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
}
