import Link from "next/link";
import { getProductCategories } from "@/lib/content/productCategories";
import { deleteProductCategoryAction, reorderProductCategoryAction } from "@/app/actions/product-categories";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/formStyles";

export default async function AdminProductCategoriesPage() {
  const items = await getProductCategories();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Categories</h1>
          <p className="mt-1 text-sm text-white/50">
            The category sections shown on the /products page. Set a product's "Category" to one of these names to
            place it under that section.
          </p>
        </div>
        <Link href="/admin/product-categories/new" className={buttonClass}>
          Add category
        </Link>
      </div>

      <div className="mt-8">
        {items.length === 0 ? (
          <p className="text-sm text-white/40">No product categories yet.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10">
            {items.map((c, i) => (
              <div key={c.id} className="flex items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{c.name}</p>
                  <p className="truncate text-xs text-white/40">{c.tagline}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <form action={reorderProductCategoryAction.bind(null, c.id, "up")}>
                      <button
                        type="submit"
                        disabled={i === 0}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↑
                      </button>
                    </form>
                    <form action={reorderProductCategoryAction.bind(null, c.id, "down")}>
                      <button
                        type="submit"
                        disabled={i === items.length - 1}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↓
                      </button>
                    </form>
                  </div>
                  <Link href={`/admin/product-categories/${c.id}/edit`} className="text-xs font-medium text-accent-blue hover:underline">
                    Edit
                  </Link>
                  <DeleteButton action={deleteProductCategoryAction.bind(null, c.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
