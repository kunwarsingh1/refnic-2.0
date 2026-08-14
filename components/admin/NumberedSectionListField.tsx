"use client";

import { useState } from "react";
import { inputClass } from "@/components/admin/formStyles";

export function NumberedSectionListField({
  defaultItems,
}: {
  defaultItems: { number: string; heading: string; body: string }[];
}) {
  const [items, setItems] = useState(
    defaultItems.length > 0 ? defaultItems : [{ number: "01", heading: "", body: "" }],
  );

  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-white/70">Numbered sections</p>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-md border border-white/10 p-3">
            <div className="mb-2 flex gap-2">
              <input
                name="sectionNumber"
                type="text"
                defaultValue={item.number}
                className={`${inputClass} w-20`}
                placeholder="01"
              />
              <input
                name="sectionHeading"
                type="text"
                defaultValue={item.heading}
                className={`${inputClass} flex-1`}
                placeholder="Heading"
              />
            </div>
            <textarea name="sectionBody" rows={3} defaultValue={item.body} className={inputClass} placeholder="Body" />
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
        onClick={() => setItems((cur) => [...cur, { number: "", heading: "", body: "" }])}
        className="mt-2 text-sm font-medium text-accent-blue hover:underline"
      >
        + Add
      </button>
    </div>
  );
}
