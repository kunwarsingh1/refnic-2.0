import Link from "next/link";
import { getIntroCards } from "@/lib/content/introCards";
import { deleteIntroCardAction, reorderIntroCardAction } from "@/app/actions/intro-cards";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/formStyles";

export default async function AdminIntroCardsPage() {
  const items = await getIntroCards();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Intro Cards</h1>
          <p className="mt-1 text-sm text-white/50">The auto-scrolling marquee near the top of the homepage.</p>
        </div>
        <Link href="/admin/intro-cards/new" className={buttonClass}>
          Add card
        </Link>
      </div>

      <div className="mt-8">
        {items.length === 0 ? (
          <p className="text-sm text-white/40">No intro cards yet.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10">
            {items.map((c, i) => (
              <div key={c.id} className="flex items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0">
                {c.imageUrl ? (
                  <img src={c.imageUrl} alt="" className="h-10 w-10 rounded bg-white/10 object-contain" />
                ) : (
                  <div className="h-10 w-10 rounded bg-white/10" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{c.title}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <form action={reorderIntroCardAction.bind(null, c.id, "up")}>
                      <button
                        type="submit"
                        disabled={i === 0}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↑
                      </button>
                    </form>
                    <form action={reorderIntroCardAction.bind(null, c.id, "down")}>
                      <button
                        type="submit"
                        disabled={i === items.length - 1}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↓
                      </button>
                    </form>
                  </div>
                  <Link href={`/admin/intro-cards/${c.id}/edit`} className="text-xs font-medium text-accent-blue hover:underline">
                    Edit
                  </Link>
                  <DeleteButton action={deleteIntroCardAction.bind(null, c.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
