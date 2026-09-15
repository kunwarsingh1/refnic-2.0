"use client";

import { useId, useRef } from "react";
import { inputClass, labelClass } from "@/components/admin/formStyles";

function insertBreakAt(el: HTMLTextAreaElement) {
  const start = el.selectionStart ?? el.value.length;
  const end = el.selectionEnd ?? el.value.length;
  el.value = el.value.slice(0, start) + "\n" + el.value.slice(end);
  const cursor = start + 1;
  el.focus();
  el.setSelectionRange(cursor, cursor);
}

/** Just the "+ Add line break" button, for wiring next to a textarea you already render (e.g. inside a repeated list field where `name` isn't unique). Pass the same ref to the textarea's `ref` prop. */
export function LineBreakButton({ textareaRef }: { textareaRef: React.RefObject<HTMLTextAreaElement | null> }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (textareaRef.current) insertBreakAt(textareaRef.current);
      }}
      className="shrink-0 text-xs font-medium text-accent-blue hover:underline"
    >
      + Add line break
    </button>
  );
}

/** A labeled textarea with a button that inserts a line break at the cursor, for text the site renders with whitespace-pre-line. */
export function LineBreakField({
  name,
  label,
  defaultValue,
  rows = 2,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const id = useId();

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-3">
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        <LineBreakButton textareaRef={ref} />
      </div>
      <textarea
        ref={ref}
        id={id}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        required={required}
        className={inputClass}
      />
    </div>
  );
}
