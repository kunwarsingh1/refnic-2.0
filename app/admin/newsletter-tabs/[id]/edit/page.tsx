import { notFound } from "next/navigation";
import { NewsletterTabForm } from "@/components/admin/NewsletterTabForm";
import { getNewsletterTabById } from "@/lib/content/newsletterTabs";
import { updateNewsletterTabAction } from "@/app/actions/newsletter-tabs";

export default async function EditNewsletterTabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tab = await getNewsletterTabById(id);
  if (!tab) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit newsletter tab</h1>
      <div className="mt-6">
        <NewsletterTabForm tab={tab} action={updateNewsletterTabAction.bind(null, id)} />
      </div>
    </div>
  );
}
