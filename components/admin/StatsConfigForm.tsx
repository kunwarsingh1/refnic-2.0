"use client";

import { useState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";
import type { StatsConfig } from "@/lib/content/stats";

export function StatsConfigForm({
  config,
  action,
}: {
  config: StatsConfig;
  action: (formData: FormData) => Promise<void>;
}) {
  const [rows, setRows] = useState(config.stats.length > 0 ? config.stats : [{ value: "", label: "" }]);

  return (
    <form action={action} className="max-w-xl space-y-6">
      <div>
        <p className={labelClass}>Stats</p>
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="flex items-start gap-2 rounded-md border border-white/10 p-3">
              <div className="flex-1 space-y-2">
                <input
                  name="statValue"
                  type="text"
                  placeholder="Value, e.g. 20,000+"
                  defaultValue={row.value}
                  className={inputClass}
                />
                <input
                  name="statLabel"
                  type="text"
                  placeholder="Label"
                  defaultValue={row.label}
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                onClick={() => setRows((r) => r.filter((_, idx) => idx !== i))}
                className="mt-1 text-xs font-medium text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setRows((r) => [...r, { value: "", label: "" }])}
          className="mt-3 text-sm font-medium text-accent-blue hover:underline"
        >
          + Add stat
        </button>
      </div>

      <ImageUploadField name="batteryImageUrl" label="Battery image" defaultValue={config.batteryImageUrl} />
      <ImageUploadField name="plantImageUrl" label="Plant image" defaultValue={config.plantImageUrl} />

      <button type="submit" className={buttonClass}>
        Save
      </button>
    </form>
  );
}
