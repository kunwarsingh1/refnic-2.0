import { getIndianMarketPageConfig } from "@/lib/content/indianMarketPage";
import { updateIndianMarketPageConfigAction } from "@/app/actions/indian-market-page";
import { StringListField } from "@/components/admin/StringListField";
import { HeadingBodyListField } from "@/components/admin/HeadingBodyListField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminIndianMarketPagePage() {
  const c = await getIndianMarketPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Indian Market Page</h1>

      <form action={updateIndianMarketPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <div>
          <label htmlFor="heroHeading" className={labelClass}>
            Hero heading
          </label>
          <input id="heroHeading" name="heroHeading" type="text" defaultValue={c.heroHeading} className={inputClass} />
        </div>
        <div>
          <label htmlFor="heroSubheading" className={labelClass}>
            Hero subheading
          </label>
          <input
            id="heroSubheading"
            name="heroSubheading"
            type="text"
            defaultValue={c.heroSubheading}
            className={inputClass}
          />
        </div>

        <StringListField name="statHighlight" label="Stat highlight cards" defaultItems={c.statHighlights} />

        <div>
          <label htmlFor="driversHeading" className={labelClass}>
            Drivers heading
          </label>
          <input
            id="driversHeading"
            name="driversHeading"
            type="text"
            defaultValue={c.driversHeading}
            className={inputClass}
          />
        </div>
        <StringListField name="driverBadge" label="Driver badges" defaultItems={c.driverBadges} />
        <StringListField
          name="driverParagraph"
          label="Driver paragraphs (same order as badges)"
          defaultItems={c.driverParagraphs}
        />

        <div>
          <label htmlFor="industriesHeading" className={labelClass}>
            Industries heading
          </label>
          <input
            id="industriesHeading"
            name="industriesHeading"
            type="text"
            defaultValue={c.industriesHeading}
            className={inputClass}
          />
        </div>
        <StringListField name="industry" label="Industries" defaultItems={c.industries} />

        <HeadingBodyListField
          label="Narrative sections"
          headingName="sectionHeading"
          bodyName="sectionBody"
          defaultItems={c.narrativeSections}
          imageName="sectionImageUrl"
          imageLabel="Section image"
        />

        <div>
          <label htmlFor="closingTagline" className={labelClass}>
            Closing tagline
          </label>
          <textarea
            id="closingTagline"
            name="closingTagline"
            rows={2}
            defaultValue={c.closingTagline}
            className={inputClass}
          />
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

        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
