"use client";

import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ModelUploadField } from "@/components/admin/ModelUploadField";
import { buttonClass, inputClass, labelClass, secondaryButtonClass } from "@/components/admin/formStyles";
import type { ProcessStep } from "@/lib/content/processSteps";
import { PROCESS_ICON_KEYS } from "@/lib/processIcons";

export function ProcessStepForm({
  step,
  action,
}: {
  step: ProcessStep;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  return (
    <form
      action={async (formData) => {
        await action(formData);
        router.push("/admin/process-steps");
      }}
      className="max-w-xl space-y-5"
    >
      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input id="title" name="title" type="text" required defaultValue={step.title} className={inputClass} />
      </div>

      <div>
        <label htmlFor="icon" className={labelClass}>
          Icon
        </label>
        <select id="icon" name="icon" defaultValue={step.icon} className={inputClass}>
          {PROCESS_ICON_KEYS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="extra" className={labelClass}>
          Extra note <span className="text-white/40">(optional — shown as a highlighted callout)</span>
        </label>
        <textarea id="extra" name="extra" rows={2} defaultValue={step.extra} className={inputClass} />
      </div>

      <ImageUploadField name="imageUrl" label="Image (optional)" defaultValue={step.imageUrl} />

      <ModelUploadField name="modelUrl" label="3D model (.glb)" defaultValue={step.modelUrl} />

      <div className="flex gap-3">
        <button type="submit" className={buttonClass}>
          Save
        </button>
        <button type="button" onClick={() => router.push("/admin/process-steps")} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  );
}
