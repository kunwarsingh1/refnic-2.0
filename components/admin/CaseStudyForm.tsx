"use client";

import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ModelUploadField } from "@/components/admin/ModelUploadField";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import type { CaseStudy } from "@/lib/content/caseStudies";

export function CaseStudyForm({
  caseStudy,
  action,
}: {
  caseStudy?: CaseStudy;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push("/admin/case-studies");
      }}
      className="max-w-xl space-y-5"
    >
      <div>
        <label htmlFor="city" className={labelClass}>
          City
        </label>
        <input id="city" name="city" type="text" required defaultValue={caseStudy?.city} className={inputClass} />
      </div>

      <div>
        <label htmlFor="label" className={labelClass}>
          Label
        </label>
        <input id="label" name="label" type="text" required defaultValue={caseStudy?.label} className={inputClass} />
      </div>

      <div>
        <label htmlFor="body" className={labelClass}>
          Body
        </label>
        <textarea id="body" name="body" required rows={4} defaultValue={caseStudy?.body} className={inputClass} />
      </div>

      <div>
        <label htmlFor="subtitle" className={labelClass}>
          Subtitle <span className="text-white/40">(used on the Case Study page only)</span>
        </label>
        <input id="subtitle" name="subtitle" type="text" defaultValue={caseStudy?.subtitle} className={inputClass} />
      </div>

      <div>
        <label htmlFor="status" className={labelClass}>
          Status <span className="text-white/40">(used on the Case Study page only)</span>
        </label>
        <input id="status" name="status" type="text" defaultValue={caseStudy?.status} className={inputClass} />
      </div>

      <ImageUploadField name="imageUrl" label="Image" defaultValue={caseStudy?.imageUrl} />

      <ModelUploadField name="modelUrl" label="3D model (.glb)" defaultValue={caseStudy?.modelUrl} />

      <div className="flex gap-3">
        <button type="submit" className={buttonClass}>
          Save
        </button>
        <button type="button" onClick={() => router.push("/admin/case-studies")} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
}
