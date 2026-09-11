import { NewsletterPostForm } from "@/components/admin/NewsletterPostForm";
import { createNewsletterPostAction } from "@/app/actions/newsletter";
import { getNewsletterTabs } from "@/lib/content/newsletterTabs";

export default async function NewNewsletterPostPage() {
  const tabs = await getNewsletterTabs();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add newsletter post</h1>
      <div className="mt-6">
        <NewsletterPostForm tabs={tabs} action={createNewsletterPostAction} />
      </div>
    </div>
  );
}
