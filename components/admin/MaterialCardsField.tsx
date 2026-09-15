"use client";

import { useRef, useState } from "react";
import { inputClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LineBreakButton } from "@/components/admin/LineBreakField";
import type { MaterialCard } from "@/lib/content/productsPage";

const EMPTY: MaterialCard = { title: "", description: "", imageUrl: "" };

export function MaterialCardsField({ label, defaultItems }: { label: string; defaultItems: MaterialCard[] }) {
  const [items, setItems] = useState(defaultItems.length > 0 ? defaultItems : [EMPTY]);
  const descRefs = useRef<Array<React.RefObject<HTMLTextAreaElement | null>>>([]);

  function refFor(i: number) {
    if (!descRefs.current[i]) descRefs.current[i] = { current: null };
    return descRefs.current[i];
  }

  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-white/70">{label}</p>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-md border border-white/10 p-3">
            <input
              name="materialCardTitle"
              type="text"
              defaultValue={item.title}
              placeholder="Title (e.g. Black Mass)"
              className={`${inputClass} mb-2`}
            />
            <div className="mb-1 flex justify-end">
              <LineBreakButton textareaRef={refFor(i)} />
            </div>
            <textarea
              ref={refFor(i)}
              name="materialCardDescription"
              rows={2}
              defaultValue={item.description}
              placeholder="Description"
              className={inputClass}
            />
            <div className="mt-2">
              <ImageUploadField name="materialCardImageUrl" label="Icon (optional)" defaultValue={item.imageUrl} />
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
        + Add material
      </button>
    </div>
  );
}
