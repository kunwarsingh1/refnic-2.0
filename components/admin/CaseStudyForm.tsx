"use client";

import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ModelUploadField } from "@/components/admin/ModelUploadField";
import { StringListField } from "@/components/admin/StringListField";
import { LineBreakField } from "@/components/admin/LineBreakField";
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
        <label htmlFor="country" className={labelClass}>
          Country <span className="text-white/40">(shown next to the city on the detail page)</span>
        </label>
        <input id="country" name="country" type="text" defaultValue={caseStudy?.country} className={inputClass} />
      </div>

      <LineBreakField name="label" label="Label / Title" defaultValue={caseStudy?.label} required />

      <LineBreakField
        name="body"
        label="Body (intro paragraph on the detail page)"
        defaultValue={caseStudy?.body}
        rows={4}
        required
      />

      <div>
        <label htmlFor="subtitle" className={labelClass}>
          Subtitle <span className="text-white/40">(category tag, e.g. &quot;Turnkey Plant&quot;)</span>
        </label>
        <input id="subtitle" name="subtitle" type="text" defaultValue={caseStudy?.subtitle} className={inputClass} />
      </div>

      <div>
        <label htmlFor="status" className={labelClass}>
          Status <span className="text-white/40">(e.g. &quot;Operational&quot;)</span>
        </label>
        <input id="status" name="status" type="text" defaultValue={caseStudy?.status} className={inputClass} />
      </div>

      <ImageUploadField name="imageUrl" label="Image" defaultValue={caseStudy?.imageUrl} />
      <ImageUploadField name="imageUrl2" label="Second image (detail page, optional)" defaultValue={caseStudy?.imageUrl2} />
      <ModelUploadField name="modelUrl" label="3D model (.glb)" defaultValue={caseStudy?.modelUrl} />

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-semibold text-white">Detail page — project overview</p>
        <div className="space-y-5">
          <LineBreakField name="overviewSubheading" label="Overview subheading" defaultValue={caseStudy?.overviewSubheading} />
          <LineBreakField name="overviewBody" label="Overview body" defaultValue={caseStudy?.overviewBody} rows={4} />
        </div>
      </div>

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-semibold text-white">Detail page — the challenge</p>
        <div className="space-y-5">
          <LineBreakField name="challengeSubheading" label="Challenge subheading" defaultValue={caseStudy?.challengeSubheading} />
          <LineBreakField name="challengeBody" label="Challenge body" defaultValue={caseStudy?.challengeBody} rows={4} />
        </div>
      </div>

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-semibold text-white">Detail page — our approach</p>
        <div className="space-y-5">
          <LineBreakField name="approachSubheading" label="Approach subheading" defaultValue={caseStudy?.approachSubheading} />
          <LineBreakField name="approachBody" label="Approach body" defaultValue={caseStudy?.approachBody} rows={5} />
          <LineBreakField
            name="approachSecondaryHeading"
            label={'Secondary heading (e.g. "Engineering First. Manufacturing Second.")'}
            defaultValue={caseStudy?.approachSecondaryHeading}
          />
          <LineBreakField name="approachIntro" label="Delivered-list intro line" defaultValue={caseStudy?.approachIntro} />
          <StringListField name="approachBullet" label="What we delivered (bullets)" defaultItems={caseStudy?.approachBullets ?? []} />
        </div>
      </div>

      <div className="border-t border-white/10 pt-5">
        <LineBreakField
          name="tagline"
          label={'Closing tagline (e.g. "From engineering drawings to a fully operational recycling facility.")'}
          defaultValue={caseStudy?.tagline}
        />
      </div>

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
