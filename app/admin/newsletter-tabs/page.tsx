import Link from "next/link";
import { getNewsletterTabs } from "@/lib/content/newsletterTabs";
import { deleteNewsletterTabAction, reorderNewsletterTabAction } from "@/app/actions/newsletter-tabs";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/formStyles";

export default async function AdminNewsletterTabsPage() {
  const items = await getNewsletterTabs();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Newsletter Tabs</h1>
          <p className="mt-1 text-sm text-white/50">
            The category tabs shown on the newsletter page, and the tagline next to each one. Set a post's
            "Category" to one of these names to place it under that tab.
          </p>
        </div>
        <Link href="/admin/newsletter-tabs/new" className={buttonClass}>
          Add tab
        </Link>
      </div>

      <div className="mt-8">
        {items.length === 0 ? (
          <p className="text-sm text-white/40">No newsletter tabs yet.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10">
            {items.map((t, i) => (
              <div key={t.id} className="flex items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{t.name}</p>
                  <p className="truncate text-xs text-white/40">{t.tagline}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <form action={reorderNewsletterTabAction.bind(null, t.id, "up")}>
                      <button
                        type="submit"
                        disabled={i === 0}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↑
                      </button>
                    </form>
                    <form action={reorderNewsletterTabAction.bind(null, t.id, "down")}>
                      <button
                        type="submit"
                        disabled={i === items.length - 1}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↓
                      </button>
                    </form>
                  </div>
                  <Link href={`/admin/newsletter-tabs/${t.id}/edit`} className="text-xs font-medium text-accent-blue hover:underline">
                    Edit
                  </Link>
                  <DeleteButton action={deleteNewsletterTabAction.bind(null, t.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
