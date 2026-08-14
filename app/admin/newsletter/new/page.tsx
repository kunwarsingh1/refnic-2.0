import { NewsletterPostForm } from "@/components/admin/NewsletterPostForm";
import { createNewsletterPostAction } from "@/app/actions/newsletter";

export default function NewNewsletterPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add newsletter post</h1>
      <div className="mt-6">
        <NewsletterPostForm action={createNewsletterPostAction} />
      </div>
    </div>
  );
}
