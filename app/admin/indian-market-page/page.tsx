import { getIndianMarketPageConfig } from "@/lib/content/indianMarketPage";
import { updateIndianMarketPageConfigAction } from "@/app/actions/indian-market-page";
import { StringListField } from "@/components/admin/StringListField";
import { HeadingBodyListField } from "@/components/admin/HeadingBodyListField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminIndianMarketPagePage() {
  const c = await getIndianMarketPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Indian Market Page</h1>

      <form action={updateIndianMarketPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <LineBreakField name="heroHeading" label="Hero heading" defaultValue={c.heroHeading} />
        <LineBreakField name="heroSubheading" label="Hero subheading" defaultValue={c.heroSubheading} />

        <StringListField name="statHighlight" label="Stat highlight cards" defaultItems={c.statHighlights} />

        <LineBreakField name="driversHeading" label="Drivers heading" defaultValue={c.driversHeading} />
        <StringListField name="driverBadge" label="Driver badges" defaultItems={c.driverBadges} />
        <StringListField
          name="driverParagraph"
          label="Driver paragraphs (same order as badges)"
          defaultItems={c.driverParagraphs}
        />

        <LineBreakField name="industriesHeading" label="Industries heading" defaultValue={c.industriesHeading} />
        <StringListField name="industry" label="Industries" defaultItems={c.industries} />

        <HeadingBodyListField
          label="Narrative sections"
          headingName="sectionHeading"
          bodyName="sectionBody"
          defaultItems={c.narrativeSections}
          imageName="sectionImageUrl"
          imageLabel="Section image"
        />

        <LineBreakField name="closingTagline" label="Closing tagline" defaultValue={c.closingTagline} />
        <LineBreakField name="closingHeading" label="Closing heading" defaultValue={c.closingHeading} />

        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
