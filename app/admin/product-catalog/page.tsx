import Link from "next/link";
import { getProductCatalogItems } from "@/lib/content/productCatalog";
import { deleteProductCatalogItemAction, reorderProductCatalogItemAction } from "@/app/actions/product-catalog";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/formStyles";

export default async function AdminProductCatalogPage() {
  const items = await getProductCatalogItems();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Catalog</h1>
          <p className="mt-1 text-sm text-white/50">
            The individual product cards shown on the /products page, each with its own page.
          </p>
        </div>
        <Link href="/admin/product-catalog/new" className={buttonClass}>
          Add product
        </Link>
      </div>

      <div className="mt-8">
        {items.length === 0 ? (
          <p className="text-sm text-white/40">No products yet.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10">
            {items.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0">
                {p.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.imageUrl} alt="" className="h-10 w-10 shrink-0 rounded bg-white/5 object-cover" />
                ) : (
                  <div className="h-10 w-10 shrink-0 rounded bg-white/10" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{p.title}</p>
                  <p className="truncate text-xs text-white/40">
                    {p.category} · /{p.slug}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <form action={reorderProductCatalogItemAction.bind(null, p.id, "up")}>
                      <button
                        type="submit"
                        disabled={i === 0}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↑
                      </button>
                    </form>
                    <form action={reorderProductCatalogItemAction.bind(null, p.id, "down")}>
                      <button
                        type="submit"
                        disabled={i === items.length - 1}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↓
                      </button>
                    </form>
                  </div>
                  <Link href={`/admin/product-catalog/${p.id}/edit`} className="text-xs font-medium text-accent-blue hover:underline">
                    Edit
                  </Link>
                  <DeleteButton action={deleteProductCatalogItemAction.bind(null, p.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
