"use client";

import { useState } from "react";
import { inputClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export function TextImageListField({
  label,
  textName,
  imageName,
  defaultItems,
}: {
  label: string;
  textName: string;
  imageName: string;
  defaultItems: { text: string; imageUrl?: string }[];
}) {
  const [items, setItems] = useState(defaultItems.length > 0 ? defaultItems : [{ text: "", imageUrl: "" }]);

  return (
    <div>
      <p className="mb-1 block text-sm font-medium text-white/70">{label}</p>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="space-y-2 rounded-md border border-white/10 p-3">
            <textarea name={textName} rows={2} defaultValue={item.text} className={inputClass} />
            <ImageUploadField name={imageName} label="Image" defaultValue={item.imageUrl} />
            <button
              type="button"
              onClick={() => setItems((cur) => cur.filter((_, idx) => idx !== i))}
              className="text-xs font-medium text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setItems((cur) => [...cur, { text: "", imageUrl: "" }])}
        className="mt-2 text-sm font-medium text-accent-blue hover:underline"
      >
        + Add
      </button>
    </div>
  );
}
