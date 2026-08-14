"use client";

import { useState } from "react";
import { inputClass } from "@/components/admin/formStyles";

export function TitleBodyCtaListField({
  label,
  titleName,
  bodyName,
  ctaName,
  defaultItems,
}: {
  label: string;
  titleName: string;
  bodyName: string;
  ctaName: string;
  defaultItems: { title: string; body: string; ctaLabel: string }[];
}) {
  const [items, setItems] = useState(
    defaultItems.length > 0 ? defaultItems : [{ title: "", body: "", ctaLabel: "" }],
  );

  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-white/70">{label}</p>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-md border border-white/10 p-3">
            <input
              name={titleName}
              type="text"
              defaultValue={item.title}
              placeholder="Title"
              className={`${inputClass} mb-2`}
            />
            <textarea
              name={bodyName}
              rows={2}
              defaultValue={item.body}
              placeholder="Body"
              className={`${inputClass} mb-2`}
            />
            <input
              name={ctaName}
              type="text"
              defaultValue={item.ctaLabel}
              placeholder="Button label"
              className={inputClass}
            />
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
        onClick={() => setItems((cur) => [...cur, { title: "", body: "", ctaLabel: "" }])}
        className="mt-2 text-sm font-medium text-accent-blue hover:underline"
      >
        + Add
      </button>
    </div>
  );
}
