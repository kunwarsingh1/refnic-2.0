"use client";

import { useState, type ChangeEvent } from "react";
import { uploadPdf } from "@/lib/upload";

export function PdfUploadField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    const { url: uploadedUrl, error: uploadError } = await uploadPdf(file);
    setUploading(false);
    if (uploadError) {
      setError(uploadError);
      return;
    }
    if (uploadedUrl) setUrl(uploadedUrl);
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-white/70">{label}</label>
      <input type="hidden" name={name} value={url} />
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mb-2 block truncate text-xs font-medium text-accent-blue hover:underline"
        >
          {url}
        </a>
      )}
      <input
        type="file"
        accept="application/pdf"
        onChange={onChange}
        className="block w-full text-sm text-white/60 file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white file:transition-colors hover:file:bg-white/20"
      />
      {uploading && <p className="mt-1 text-xs text-white/40">Uploading…</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
