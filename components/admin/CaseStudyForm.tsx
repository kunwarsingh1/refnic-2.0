"use client";

import { useRouter } from "next/navigation";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ModelUploadField } from "@/components/admin/ModelUploadField";
import { StringListField } from "@/components/admin/StringListField";
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

      <div>
        <label htmlFor="label" className={labelClass}>
          Label / Title
        </label>
        <input id="label" name="label" type="text" required defaultValue={caseStudy?.label} className={inputClass} />
      </div>

      <div>
        <label htmlFor="body" className={labelClass}>
          Body <span className="text-white/40">(intro paragraph on the detail page)</span>
        </label>
        <textarea id="body" name="body" required rows={4} defaultValue={caseStudy?.body} className={inputClass} />
      </div>

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
          <div>
            <label htmlFor="overviewSubheading" className={labelClass}>
              Overview subheading
            </label>
            <input
              id="overviewSubheading"
              name="overviewSubheading"
              type="text"
              defaultValue={caseStudy?.overviewSubheading}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="overviewBody" className={labelClass}>
              Overview body
            </label>
            <textarea
              id="overviewBody"
              name="overviewBody"
              rows={4}
              defaultValue={caseStudy?.overviewBody}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-semibold text-white">Detail page — the challenge</p>
        <div className="space-y-5">
          <div>
            <label htmlFor="challengeSubheading" className={labelClass}>
              Challenge subheading
            </label>
            <input
              id="challengeSubheading"
              name="challengeSubheading"
              type="text"
              defaultValue={caseStudy?.challengeSubheading}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="challengeBody" className={labelClass}>
              Challenge body
            </label>
            <textarea
              id="challengeBody"
              name="challengeBody"
              rows={4}
              defaultValue={caseStudy?.challengeBody}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-5">
        <p className="mb-3 text-sm font-semibold text-white">Detail page — our approach</p>
        <div className="space-y-5">
          <div>
            <label htmlFor="approachSubheading" className={labelClass}>
              Approach subheading
            </label>
            <input
              id="approachSubheading"
              name="approachSubheading"
              type="text"
              defaultValue={caseStudy?.approachSubheading}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="approachBody" className={labelClass}>
              Approach body
            </label>
            <textarea
              id="approachBody"
              name="approachBody"
              rows={5}
              defaultValue={caseStudy?.approachBody}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="approachSecondaryHeading" className={labelClass}>
              Secondary heading <span className="text-white/40">(e.g. &quot;Engineering First. Manufacturing Second.&quot;)</span>
            </label>
            <input
              id="approachSecondaryHeading"
              name="approachSecondaryHeading"
              type="text"
              defaultValue={caseStudy?.approachSecondaryHeading}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="approachIntro" className={labelClass}>
              Delivered-list intro line
            </label>
            <input
              id="approachIntro"
              name="approachIntro"
              type="text"
              defaultValue={caseStudy?.approachIntro}
              className={inputClass}
            />
          </div>
          <StringListField name="approachBullet" label="What we delivered (bullets)" defaultItems={caseStudy?.approachBullets ?? []} />
        </div>
      </div>

      <div className="border-t border-white/10 pt-5">
        <label htmlFor="tagline" className={labelClass}>
          Closing tagline <span className="text-white/40">(e.g. &quot;From engineering drawings to a fully operational recycling facility.&quot;)</span>
        </label>
        <input id="tagline" name="tagline" type="text" defaultValue={caseStudy?.tagline} className={inputClass} />
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
