import { NewsletterTabForm } from "@/components/admin/NewsletterTabForm";
import { createNewsletterTabAction } from "@/app/actions/newsletter-tabs";

export default function NewNewsletterTabPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add newsletter tab</h1>
      <div className="mt-6">
        <NewsletterTabForm action={createNewsletterTabAction} />
      </div>
    </div>
  );
}
