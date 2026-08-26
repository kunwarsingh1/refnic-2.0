"use client";

import { useState } from "react";
import { inputClass } from "@/components/admin/formStyles";
import type { PlantStep } from "@/lib/content/productsPage";

const EMPTY: PlantStep = { title: "", subheading: "", keyEquipment: "", description: "" };

export function PlantStepsField({ label, defaultItems }: { label: string; defaultItems: PlantStep[] }) {
  const [items, setItems] = useState(defaultItems.length > 0 ? defaultItems : [EMPTY]);

  return (
    <div>
      <p className="mb-2 block text-sm font-medium text-white/70">{label}</p>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="rounded-md border border-white/10 p-3">
            <span className="mb-2 block text-xs font-bold text-white/30">{String(i + 1).padStart(2, "0")}</span>
            <input
              name="plantStepTitle"
              type="text"
              defaultValue={item.title}
              placeholder="Title (e.g. RECEIVE & INSPECT)"
              className={`${inputClass} mb-2`}
            />
            <input
              name="plantStepSubheading"
              type="text"
              defaultValue={item.subheading}
              placeholder="Subheading"
              className={`${inputClass} mb-2`}
            />
            <input
              name="plantStepKeyEquipment"
              type="text"
              defaultValue={item.keyEquipment}
              placeholder="Key equipment / outputs line"
              className={`${inputClass} mb-2`}
            />
            <textarea
              name="plantStepDescription"
              rows={2}
              defaultValue={item.description}
              placeholder="Description"
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
        onClick={() => setItems((cur) => [...cur, EMPTY])}
        className="mt-2 text-sm font-medium text-accent-blue hover:underline"
      >
        + Add step
      </button>
    </div>
  );
}
