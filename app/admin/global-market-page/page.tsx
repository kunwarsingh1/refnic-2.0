import { getGlobalMarketPageConfig } from "@/lib/content/globalMarketPage";
import { updateGlobalMarketPageConfigAction } from "@/app/actions/global-market-page";
import { StringListField } from "@/components/admin/StringListField";
import { HeadingBodyListField } from "@/components/admin/HeadingBodyListField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminGlobalMarketPagePage() {
  const c = await getGlobalMarketPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Global Market Page</h1>

      <form action={updateGlobalMarketPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <LineBreakField name="heroHeading" label="Hero heading" defaultValue={c.heroHeading} />

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

        <LineBreakField name="closingLabel" label="Closing label" defaultValue={c.closingLabel} />
        <LineBreakField name="closingHeading" label="Closing heading" defaultValue={c.closingHeading} />
        <LineBreakField name="closingBody" label="Closing body" defaultValue={c.closingBody} rows={3} />
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
