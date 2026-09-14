"use client";

import { useRef, useState } from "react";
import { inputClass } from "@/components/admin/formStyles";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { LineBreakButton } from "@/components/admin/LineBreakField";

export function NumberedSectionListField({
  defaultItems,
}: {
  defaultItems: { number: string; heading: string; body: string; imageUrl?: string }[];
}) {
  const [items, setItems] = useState(
    defaultItems.length > 0 ? defaultItems : [{ number: "01", heading: "", body: "", imageUrl: "" }],
  );
  const bodyRefs = useRef<Array<React.RefObject<HTMLTextAreaElement | null>>>([]);

  function refFor(i: number) {
    if (!bodyRefs.current[i]) bodyRefs.current[i] = { current: null };
    return bodyRefs.current[i];
  }

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
                className={`${inputClass} !w-20`}
                placeholder="01"
              />
              <input
                name="sectionHeading"
                type="text"
                defaultValue={item.heading}
                className={`${inputClass} min-w-0 flex-1`}
                placeholder="Heading"
              />
            </div>
            <div className="mb-1 flex justify-end">
              <LineBreakButton textareaRef={refFor(i)} />
            </div>
            <textarea
              ref={refFor(i)}
              name="sectionBody"
              rows={3}
              defaultValue={item.body}
              className={inputClass}
              placeholder="Body"
            />
            <div className="mt-2">
              <ImageUploadField name="sectionImageUrl" label="Image (optional)" defaultValue={item.imageUrl} />
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
        onClick={() => setItems((cur) => [...cur, { number: "", heading: "", body: "", imageUrl: "" }])}
        className="mt-2 text-sm font-medium text-accent-blue hover:underline"
      >
        + Add
      </button>
    </div>
  );
}
