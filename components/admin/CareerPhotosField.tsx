"use client";

import { useState } from "react";
import { inputClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { CareerPhoto } from "@/lib/content/careerPage";

const EMPTY: CareerPhoto = { caption: "", imageUrl: "" };

export function CareerPhotosField({ label, defaultItems }: { label: string; defaultItems: CareerPhoto[] }) {
  const [items, setItems] = useState(defaultItems.length > 0 ? defaultItems : [EMPTY]);

  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-white/70">{label}</p>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-md border border-white/10 p-3">
            <input
              name="photoCaption"
              type="text"
              defaultValue={item.caption}
              placeholder="Caption"
              className={inputClass}
            />
            <div className="mt-2">
              <ImageUploadField name="photoImageUrl" label="Photo" defaultValue={item.imageUrl} />
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
        + Add photo
      </button>
    </div>
  );
}
