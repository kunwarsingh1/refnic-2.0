"use client";

import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ModelUploadField } from "@/components/admin/ModelUploadField";
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

      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input id="title" name="title" type="text" required defaultValue={card?.title} className={inputClass} />
      </div>

      <div>
        <label htmlFor="body" className={labelClass}>
          Body
        </label>
        <textarea id="body" name="body" required rows={3} defaultValue={card?.body} className={inputClass} />
      </div>

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
