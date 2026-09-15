"use client";

import { useRouter } from "next/navigation";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import type { NewsletterTab } from "@/lib/content/newsletterTabs";

export function NewsletterTabForm({
  tab,
  action,
}: {
  tab?: NewsletterTab;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push("/admin/newsletter-tabs");
      }}
      className="max-w-xl space-y-5"
    >
      <div>
        <label htmlFor="name" className={labelClass}>
          Tab name <span className="text-white/40">(e.g. "Industry Reports")</span>
        </label>
        <input id="name" name="name" type="text" required defaultValue={tab?.name} className={inputClass} />
      </div>

      <LineBreakField
        name="tagline"
        label="Tagline (shown next to the heading on the newsletter page)"
        defaultValue={tab?.tagline}
        rows={3}
      />

      <div className="flex gap-3">
        <button type="submit" className={buttonClass}>
          Save
        </button>
        <button type="button" onClick={() => router.push("/admin/newsletter-tabs")} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
}
