"use client";

import { useRouter } from "next/navigation";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import type { Pillar } from "@/lib/content/pillars";

export function PillarForm({
  pillar,
  action,
}: {
  pillar?: Pillar;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push("/admin/pillars");
      }}
      className="max-w-xl space-y-5"
    >
      <div>
        <label htmlFor="titleLine1" className={labelClass}>
          Heading line 1
        </label>
        <input
          id="titleLine1"
          name="titleLine1"
          type="text"
          required
          defaultValue={pillar?.title[0]}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="titleLine2" className={labelClass}>
          Heading line 2
        </label>
        <input
          id="titleLine2"
          name="titleLine2"
          type="text"
          required
          defaultValue={pillar?.title[1]}
          className={inputClass}
        />
      </div>

      <LineBreakField name="body" label="Body" defaultValue={pillar?.body} rows={3} required />

      <div className="flex gap-3">
        <button type="submit" className={buttonClass}>
          Save
        </button>
        <button type="button" onClick={() => router.push("/admin/pillars")} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
}
