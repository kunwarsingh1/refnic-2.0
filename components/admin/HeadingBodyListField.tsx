"use client";

import { useState } from "react";
import { inputClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export function HeadingBodyListField({
  label,
  headingName,
  bodyName,
  defaultItems,
  headingLabel = "Heading",
  bodyLabel = "Body",
  imageName,
  imageLabel = "Image (optional)",
}: {
  label: string;
  headingName: string;
  bodyName: string;
  defaultItems: { heading?: string; title?: string; body: string; imageUrl?: string }[];
  headingLabel?: string;
  bodyLabel?: string;
  /** When provided, each item also gets an image upload field posted under this form field name. */
  imageName?: string;
  imageLabel?: string;
}) {
  const [items, setItems] = useState(
    defaultItems.length > 0 ? defaultItems : [{ heading: "", body: "", imageUrl: "" }],
  );

  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-white/70">{label}</p>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-md border border-white/10 p-3">
            <label className="mb-1 block text-xs text-white/50">{headingLabel}</label>
            <input
              name={headingName}
              type="text"
              defaultValue={item.heading ?? item.title}
              className={`${inputClass} mb-2`}
            />
            <label className="mb-1 block text-xs text-white/50">{bodyLabel}</label>
            <textarea name={bodyName} rows={3} defaultValue={item.body} className={inputClass} />
            {imageName && (
              <div className="mt-2">
                <ImageUploadField name={imageName} label={imageLabel} defaultValue={item.imageUrl} />
              </div>
            )}
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
        onClick={() => setItems((cur) => [...cur, { heading: "", body: "", imageUrl: "" }])}
        className="mt-2 text-sm font-medium text-accent-blue hover:underline"
      >
        + Add
      </button>
    </div>
  );
}
