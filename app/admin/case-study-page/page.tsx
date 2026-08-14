import { getCaseStudyPageConfig } from "@/lib/content/caseStudyPage";
import { updateCaseStudyPageConfigAction } from "@/app/actions/case-study-page";
import { StringListField } from "@/components/admin/StringListField";
import { ImageGalleryField } from "@/components/admin/ImageGalleryField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminCaseStudyPagePage() {
  const config = await getCaseStudyPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Case Study Page</h1>
      <p className="mt-1 text-sm text-white/50">
        The project cards on this page come from the shared Case Studies list — edit those on the{" "}
        <a href="/admin/case-studies" className="text-accent-blue hover:underline">
          Case Studies
        </a>{" "}
        page.
      </p>

      <form action={updateCaseStudyPageConfigAction} className="mt-6 max-w-xl space-y-6">
        <div>
          <label htmlFor="heroHeading" className={labelClass}>
            Hero heading
          </label>
          <textarea id="heroHeading" name="heroHeading" rows={3} defaultValue={config.heroHeading} className={inputClass} />
        </div>

        <div>
          <label htmlFor="resultsHeading" className={labelClass}>
            Results heading
          </label>
          <input
            id="resultsHeading"
            name="resultsHeading"
            type="text"
            defaultValue={config.resultsHeading}
            className={inputClass}
          />
        </div>

        <StringListField name="resultHighlight" label="Result highlights" defaultItems={config.resultHighlights} />

        <ImageGalleryField name="galleryImageUrl" label="Gallery images" defaultUrls={config.galleryImageUrls} />

        <div>
          <label htmlFor="brandLine" className={labelClass}>
            Brand line
          </label>
          <input id="brandLine" name="brandLine" type="text" defaultValue={config.brandLine} className={inputClass} />
        </div>

        <div>
          <label htmlFor="ctaLabel" className={labelClass}>
            CTA button label
          </label>
          <input id="ctaLabel" name="ctaLabel" type="text" defaultValue={config.ctaLabel} className={inputClass} />
        </div>

        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
