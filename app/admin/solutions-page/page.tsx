import { getSolutionsPageConfig } from "@/lib/content/solutionsPage";
import { updateSolutionsPageConfigAction } from "@/app/actions/solutions-page";
import { NarrativeSectionsField } from "@/components/admin/NarrativeSectionsField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminSolutionsPagePage() {
  const c = await getSolutionsPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Solution Page</h1>
      <p className="mt-1 text-sm text-white/50">
        Controls the /solutions page — hero, narrative sections (Problem, Solution, What Recycling Solves, Refnic
        Approach, Outcome) and the closing CTA.
      </p>

      <form action={updateSolutionsPageConfigAction} className="mt-6 max-w-2xl space-y-8">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Hero</p>
          <div>
            <label htmlFor="heroWatermark" className={labelClass}>
              Background watermark text
            </label>
            <input
              id="heroWatermark"
              name="heroWatermark"
              type="text"
              defaultValue={c.heroWatermark}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="heroHeading" className={labelClass}>
              Heading
            </label>
            <input id="heroHeading" name="heroHeading" type="text" defaultValue={c.heroHeading} className={inputClass} />
          </div>
          <div>
            <label htmlFor="heroBody" className={labelClass}>
              Body
            </label>
            <textarea id="heroBody" name="heroBody" rows={3} defaultValue={c.heroBody} className={inputClass} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="heroCtaLabel" className={labelClass}>
                CTA label
              </label>
              <input
                id="heroCtaLabel"
                name="heroCtaLabel"
                type="text"
                defaultValue={c.heroCtaLabel}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="heroCtaHref" className={labelClass}>
                CTA link
              </label>
              <input
                id="heroCtaHref"
                name="heroCtaHref"
                type="text"
                defaultValue={c.heroCtaHref}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Narrative sections</p>
          <NarrativeSectionsField label="Sections" defaultItems={c.narrativeSections} />
        </div>

        <div className="space-y-5 border-t border-white/10 pt-8">
          <p className="text-xs font-bold uppercase tracking-wide text-white/40">Closing CTA</p>
          <div>
            <label htmlFor="closingHeading" className={labelClass}>
              Heading
            </label>
            <input
              id="closingHeading"
              name="closingHeading"
              type="text"
              defaultValue={c.closingHeading}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="closingBody" className={labelClass}>
              Body
            </label>
            <textarea
              id="closingBody"
              name="closingBody"
              rows={3}
              defaultValue={c.closingBody}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="closingCtaLabel" className={labelClass}>
                Button label
              </label>
              <input
                id="closingCtaLabel"
                name="closingCtaLabel"
                type="text"
                defaultValue={c.closingCtaLabel}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="closingCtaHref" className={labelClass}>
                Button link
              </label>
              <input
                id="closingCtaHref"
                name="closingCtaHref"
                type="text"
                defaultValue={c.closingCtaHref}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
