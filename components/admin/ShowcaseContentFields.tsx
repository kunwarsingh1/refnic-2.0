"use client";

import { inputClass, labelClass } from "@/components/admin/formStyles";
import { PdfUploadField } from "@/components/admin/PdfUploadField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export function ShowcaseContentFields({
  contentType,
  pdfUrl,
  showcaseImageUrl,
  showcaseText,
  caption,
  captionLabel = "Caption (shown below the content)",
}: {
  contentType?: "pdf" | "image" | "text";
  pdfUrl?: string;
  showcaseImageUrl?: string;
  showcaseText?: string;
  caption?: string;
  captionLabel?: string;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="contentType" className={labelClass}>
          Content type
        </label>
        <select id="contentType" name="contentType" defaultValue={contentType ?? "pdf"} className={inputClass}>
          <option value="pdf">PDF</option>
          <option value="image">Image</option>
          <option value="text">Text</option>
        </select>
        <p className="mt-1 text-xs text-white/40">
          This box isn&apos;t PDF-only — choose which field below is actually shown.
        </p>
      </div>

      <PdfUploadField name="pdfUrl" label="PDF (used when content type = PDF)" defaultValue={pdfUrl} />
      <ImageUploadField
        name="showcaseImageUrl"
        label="Image (used when content type = Image)"
        defaultValue={showcaseImageUrl}
      />
      <div>
        <label htmlFor="showcaseText" className={labelClass}>
          Text (used when content type = Text)
        </label>
        <textarea id="showcaseText" name="showcaseText" rows={5} defaultValue={showcaseText} className={inputClass} />
      </div>
      <div>
        <label htmlFor="pdfCaption" className={labelClass}>
          {captionLabel}
        </label>
        <textarea id="pdfCaption" name="pdfCaption" rows={3} defaultValue={caption} className={inputClass} />
      </div>
    </div>
  );
}
