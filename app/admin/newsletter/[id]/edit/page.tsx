import { notFound } from "next/navigation";
import { NewsletterPostForm } from "@/components/admin/NewsletterPostForm";
import { getNewsletterPostById } from "@/lib/content/newsletter";
import { updateNewsletterPostAction } from "@/app/actions/newsletter";

export default async function EditNewsletterPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getNewsletterPostById(id);
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit newsletter post</h1>
      <div className="mt-6">
        <NewsletterPostForm post={post} action={updateNewsletterPostAction.bind(null, id)} />
      </div>
    </div>
  );
}
