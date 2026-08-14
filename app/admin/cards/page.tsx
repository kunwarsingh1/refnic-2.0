import Link from "next/link";
import { getCards, type CardVariant } from "@/lib/content/cards";
import { deleteCardAction, reorderCardAction } from "@/app/actions/cards";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/formStyles";

const VARIANTS: { key: CardVariant; label: string }[] = [
  { key: "products", label: "Products" },
  { key: "solutions", label: "Solutions" },
  { key: "services", label: "Services" },
];

export default async function AdminCardsPage() {
  const allCards = await getCards();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Products / Solutions / Services</h1>
          <p className="mt-1 text-sm text-white/50">These feed the three homepage card grids.</p>
        </div>
        <Link href="/admin/cards/new" className={buttonClass}>
          Add card
        </Link>
      </div>

      <div className="mt-8 space-y-10">
        {VARIANTS.map(({ key, label }) => {
          const items = allCards.filter((c) => c.variant === key);
          return (
            <div key={key}>
              <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-white/40">{label}</h2>
              {items.length === 0 ? (
                <p className="text-sm text-white/40">No {label.toLowerCase()} cards yet.</p>
              ) : (
                <div className="overflow-hidden rounded-lg border border-white/10">
                  {items.map((c, i) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0"
                    >
                      {c.imageUrl ? (
                        <img src={c.imageUrl} alt="" className="h-10 w-10 rounded object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded bg-white/10" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{c.title}</p>
                        <p className="truncate text-xs text-white/40">{c.body}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          <form action={reorderCardAction.bind(null, c.id, "up")}>
                            <button
                              type="submit"
                              disabled={i === 0}
                              className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                            >
                              ↑
                            </button>
                          </form>
                          <form action={reorderCardAction.bind(null, c.id, "down")}>
                            <button
                              type="submit"
                              disabled={i === items.length - 1}
                              className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                            >
                              ↓
                            </button>
                          </form>
                        </div>
                        <Link href={`/admin/cards/${c.id}/edit`} className="text-xs font-medium text-accent-blue hover:underline">
                          Edit
                        </Link>
                        <DeleteButton action={deleteCardAction.bind(null, c.id)} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
