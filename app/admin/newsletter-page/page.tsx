import { getNewsletterPageConfig } from "@/lib/content/newsletterPage";
import { updateNewsletterPageConfigAction } from "@/app/actions/newsletter-page";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { buttonClass } from "@/components/admin/formStyles";

export default async function AdminNewsletterPagePage() {
  const c = await getNewsletterPageConfig();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Newsletter Page</h1>
      <p className="mt-1 text-sm text-white/50">
        Controls the image in the &ldquo;Stay Ahead of the Industry&rdquo; block above the footer on /newsletter.
      </p>

      <form action={updateNewsletterPageConfigAction} className="mt-6 max-w-xl space-y-8">
        <ImageUploadField name="subscribeImageUrl" label="Subscribe block image" defaultValue={c.subscribeImageUrl} />

        <button type="submit" className={buttonClass}>
          Save
        </button>
      </form>
    </div>
  );
}
