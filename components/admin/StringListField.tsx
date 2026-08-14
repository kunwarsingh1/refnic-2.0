"use client";

import { useState } from "react";
import { inputClass } from "@/components/admin/formStyles";

export function StringListField({
  name,
  label,
  defaultItems,
}: {
  name: string;
  label: string;
  defaultItems: string[];
}) {
  const [items, setItems] = useState(defaultItems.length > 0 ? defaultItems : [""]);

  return (
    <div>
      <p className="mb-1 block text-sm font-medium text-white/70">{label}</p>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              name={name}
              type="text"
              defaultValue={item}
              className={`${inputClass} flex-1`}
            />
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
        onClick={() => setItems((cur) => [...cur, ""])}
        className="mt-2 text-sm font-medium text-accent-blue hover:underline"
      >
        + Add
      </button>
    </div>
  );
}
