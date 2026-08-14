"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/upload";

export function ImageGalleryField({
  name,
  label,
  defaultUrls,
}: {
  name: string;
  label: string;
  defaultUrls: string[];
}) {
  const [urls, setUrls] = useState(defaultUrls);
  const [uploading, setUploading] = useState(false);

  async function onAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { url } = await uploadImage(file);
    setUploading(false);
    if (url) setUrls((cur) => [...cur, url]);
    e.target.value = "";
  }

  return (
    <div>
      <p className="mb-1 block text-sm font-medium text-white/70">{label}</p>
      <div className="flex flex-wrap gap-3">
        {urls.map((url, i) => (
          <div key={i} className="relative">
            <input type="hidden" name={name} value={url} />
            <img src={url} alt="" className="h-20 w-20 rounded-md border border-white/10 object-cover" />
            <button
              type="button"
              onClick={() => setUrls((cur) => cur.filter((_, idx) => idx !== i))}
              className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
            >
              ×
            </button>
          </div>
        ))}
        <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-md border border-dashed border-white/20 text-xs text-white/50 hover:border-accent-blue hover:text-white">
          {uploading ? "…" : "+ Add"}
          <input type="file" accept="image/*" onChange={onAdd} className="hidden" />
        </label>
      </div>
    </div>
  );
}
