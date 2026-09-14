import { getGlobalMarketPageConfig } from "@/lib/content/globalMarketPage";
import { updateGlobalMarketPageConfigAction } from "@/app/actions/global-market-page";
import { StringListField } from "@/components/admin/StringListField";
import { HeadingBodyListField } from "@/components/admin/HeadingBodyListField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminGlobalMarketPagePage() {
  const c = await getGlobalMarketPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Global Market Page</h1>

      <form action={updateGlobalMarketPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <div>
          <label htmlFor="heroHeading" className={labelClass}>
            Hero heading
          </label>
          <textarea id="heroHeading" name="heroHeading" rows={2} defaultValue={c.heroHeading} className={inputClass} />
        </div>

        <StringListField name="heroBadge" label="Hero badges" defaultItems={c.heroBadges} />
        <StringListField
          name="heroParagraph"
          label="Hero paragraphs (same order as badges)"
          defaultItems={c.heroParagraphs}
        />

        <HeadingBodyListField
          label="Narrative sections"
          headingName="sectionHeading"
          bodyName="sectionBody"
          defaultItems={c.narrativeSections}
          imageName="sectionImageUrl"
          imageLabel="Section image"
        />

        <StringListField name="marketCard" label="Market cards" defaultItems={c.marketCards} />

        <HeadingBodyListField
          label="Advantage cards"
          headingName="advTitle"
          bodyName="advBody"
          defaultItems={c.advantageCards}
          headingLabel="Title"
          imageName="advImageUrl"
          imageLabel="Card image"
        />

        <div>
          <label htmlFor="closingLabel" className={labelClass}>
            Closing label
          </label>
          <input id="closingLabel" name="closingLabel" type="text" defaultValue={c.closingLabel} className={inputClass} />
        </div>
        <div>
          <label htmlFor="closingHeading" className={labelClass}>
            Closing heading
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
            Closing body
          </label>
          <textarea id="closingBody" name="closingBody" rows={3} defaultValue={c.closingBody} className={inputClass} />
        </div>
        <div>
          <label htmlFor="ctaLabel" className={labelClass}>
            CTA button label
          </label>
          <input id="ctaLabel" name="ctaLabel" type="text" defaultValue={c.ctaLabel} className={inputClass} />
        </div>

        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
