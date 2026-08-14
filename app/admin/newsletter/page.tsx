import Link from "next/link";
import { getNewsletterPosts } from "@/lib/content/newsletter";
import { deleteNewsletterPostAction, reorderNewsletterPostAction } from "@/app/actions/newsletter";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/formStyles";

export default async function AdminNewsletterPage() {
  const items = await getNewsletterPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Newsletter</h1>
          <p className="mt-1 text-sm text-white/50">Posts shown on the homepage strip and the /newsletter page.</p>
        </div>
        <Link href="/admin/newsletter/new" className={buttonClass}>
          Add post
        </Link>
      </div>

      <div className="mt-8">
        {items.length === 0 ? (
          <p className="text-sm text-white/40">No newsletter posts yet.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10">
            {items.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0">
                <div className={`h-10 w-10 shrink-0 rounded bg-gradient-to-br ${p.gradient}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{p.title}</p>
                  <p className="truncate text-xs text-white/40">
                    {p.category} · {p.author} · /{p.slug}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <form action={reorderNewsletterPostAction.bind(null, p.id, "up")}>
                      <button
                        type="submit"
                        disabled={i === 0}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↑
                      </button>
                    </form>
                    <form action={reorderNewsletterPostAction.bind(null, p.id, "down")}>
                      <button
                        type="submit"
                        disabled={i === items.length - 1}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↓
                      </button>
                    </form>
                  </div>
                  <Link href={`/admin/newsletter/${p.id}/edit`} className="text-xs font-medium text-accent-blue hover:underline">
                    Edit
                  </Link>
                  <DeleteButton action={deleteNewsletterPostAction.bind(null, p.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
