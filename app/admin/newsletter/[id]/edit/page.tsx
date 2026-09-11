import { notFound } from "next/navigation";
import { NewsletterPostForm } from "@/components/admin/NewsletterPostForm";
import { getNewsletterPostById } from "@/lib/content/newsletter";
import { updateNewsletterPostAction } from "@/app/actions/newsletter";
import { getNewsletterTabs } from "@/lib/content/newsletterTabs";

export default async function EditNewsletterPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getNewsletterPostById(id);
  if (!post) notFound();
  const tabs = await getNewsletterTabs();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit newsletter post</h1>
      <div className="mt-6">
        <NewsletterPostForm post={post} tabs={tabs} action={updateNewsletterPostAction.bind(null, id)} />
      </div>
    </div>
  );
}
