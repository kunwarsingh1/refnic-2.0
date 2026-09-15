"use client";

import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LineBreakField } from "@/components/admin/LineBreakField";
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
      <LineBreakField name="title" label="Title" defaultValue={card?.title} required />

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
