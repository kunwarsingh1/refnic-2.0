import { ProductCatalogItemForm } from "@/components/admin/ProductCatalogItemForm";
import { createProductCatalogItemAction } from "@/app/actions/product-catalog";
import { getProductCategories } from "@/lib/content/productCategories";

export default async function NewProductCatalogItemPage() {
  const categories = await getProductCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add product</h1>
      <div className="mt-6">
        <ProductCatalogItemForm categories={categories} action={createProductCatalogItemAction} />
      </div>
    </div>
  );
}
