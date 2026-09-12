import Link from "next/link";
import { getSustainabilityCatalogItems } from "@/lib/content/sustainabilityCatalog";
import {
  deleteSustainabilityCatalogItemAction,
  reorderSustainabilityCatalogItemAction,
} from "@/app/actions/sustainability-catalog";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/formStyles";

export default async function AdminSustainabilityCatalogPage() {
  const items = await getSustainabilityCatalogItems();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sustainability Catalog</h1>
          <p className="mt-1 text-sm text-white/50">
            The cards shown on the /sustainability page — each one has its own detail page, shown when a visitor
            clicks &quot;View&quot;.
          </p>
        </div>
        <Link href="/admin/sustainability-catalog/new" className={buttonClass}>
          Add pillar
        </Link>
      </div>

      <div className="mt-8">
        {items.length === 0 ? (
          <p className="text-sm text-white/40">No pillars yet.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10">
            {items.map((s, i) => (
              <div key={s.id} className="flex items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{s.title}</p>
                  <p className="truncate text-xs text-white/40">/sustainability/{s.slug}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <form action={reorderSustainabilityCatalogItemAction.bind(null, s.id, "up")}>
                      <button
                        type="submit"
                        disabled={i === 0}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↑
                      </button>
                    </form>
                    <form action={reorderSustainabilityCatalogItemAction.bind(null, s.id, "down")}>
                      <button
                        type="submit"
                        disabled={i === items.length - 1}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↓
                      </button>
                    </form>
                  </div>
                  <Link
                    href={`/admin/sustainability-catalog/${s.id}/edit`}
                    className="text-xs font-medium text-accent-blue hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton action={deleteSustainabilityCatalogItemAction.bind(null, s.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
