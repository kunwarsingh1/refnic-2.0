import { getTechnologiesPageConfig } from "@/lib/content/technologiesPage";
import { updateTechnologiesPageConfigAction } from "@/app/actions/technologies-page";
import { StringListField } from "@/components/admin/StringListField";
import { LineBreakField } from "@/components/admin/LineBreakField";
import { buttonClass, inputClass, labelClass } from "@/components/admin/formStyles";

export default async function AdminTechnologiesPagePage() {
  const c = await getTechnologiesPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Technologies Page</h1>
      <p className="mt-1 text-sm text-white/50">
        The article cards come from the shared Newsletter posts — edit those on the{" "}
        <a href="/admin/newsletter" className="text-accent-blue hover:underline">
          Newsletter
        </a>{" "}
        page. Filter tabs match against each post's category.
      </p>

      <form action={updateTechnologiesPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <div>
          <label htmlFor="intelligenceLabel" className={labelClass}>
            Eyebrow label
          </label>
          <input
            id="intelligenceLabel"
            name="intelligenceLabel"
            type="text"
            defaultValue={c.intelligenceLabel}
            className={inputClass}
          />
        </div>
        <LineBreakField name="heading" label="Heading" defaultValue={c.heading} />

        <StringListField name="bodyParagraph" label="Intro paragraphs" defaultItems={c.bodyParagraphs} />
        <StringListField name="topic" label="Filter topics" defaultItems={c.topics} />

        <LineBreakField name="newsletterHeading" label="Newsletter block heading" defaultValue={c.newsletterHeading} />
        <LineBreakField name="newsletterBody" label="Newsletter block body" defaultValue={c.newsletterBody} />
        <div>
          <label htmlFor="newsletterCtaLabel" className={labelClass}>
            Newsletter CTA label
          </label>
          <input
            id="newsletterCtaLabel"
            name="newsletterCtaLabel"
            type="text"
            defaultValue={c.newsletterCtaLabel}
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
