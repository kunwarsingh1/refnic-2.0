"use client";

import { useState } from "react";
import { inputClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { NarrativeLayout, NarrativeSection } from "@/lib/content/solutionsPage";

const EMPTY: NarrativeSection = { heading: "", body: "", layout: "banner", imageUrl: "" };
const LAYOUTS: NarrativeLayout[] = ["banner", "side-right", "plain"];

export function NarrativeSectionsField({ label, defaultItems }: { label: string; defaultItems: NarrativeSection[] }) {
  const [items, setItems] = useState(defaultItems.length > 0 ? defaultItems : [EMPTY]);

  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-white/70">{label}</p>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-md border border-white/10 p-3">
            <input
              name="narrativeHeading"
              type="text"
              defaultValue={item.heading}
              placeholder="Heading (e.g. The Problem)"
              className={`${inputClass} mb-2`}
            />
            <select name="narrativeLayout" defaultValue={item.layout} className={`${inputClass} mb-2`}>
              {LAYOUTS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <textarea
              name="narrativeBody"
              rows={4}
              defaultValue={item.body}
              placeholder="Body"
              className={inputClass}
            />
            <div className="mt-2">
              <ImageUploadField
                name="narrativeImageUrl"
                label="Image (optional — used by banner and side-right layouts)"
                defaultValue={item.imageUrl}
              />
            </div>
            <button
              type="button"
              onClick={() => setItems((cur) => cur.filter((_, idx) => idx !== i))}
              className="mt-2 text-xs font-medium text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setItems((cur) => [...cur, EMPTY])}
        className="mt-2 text-sm font-medium text-accent-blue hover:underline"
      >
        + Add section
      </button>
    </div>
  );
}
