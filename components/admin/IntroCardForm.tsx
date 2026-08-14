"use client";

import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import type { IntroCard } from "@/lib/content/introCards";

export function IntroCardForm({
  card,
  action,
}: {
  card?: IntroCard;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push("/admin/intro-cards");
      }}
      className="max-w-xl space-y-5"
    >
      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input id="title" name="title" type="text" required defaultValue={card?.title} className={inputClass} />
      </div>

      <ImageUploadField name="imageUrl" label="Image" defaultValue={card?.imageUrl} />

      <div className="flex gap-3">
        <button type="submit" className={buttonClass}>
          Save
        </button>
        <button type="button" onClick={() => router.push("/admin/intro-cards")} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
}
