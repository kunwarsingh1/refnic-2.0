import { notFound } from "next/navigation";
import { ProductCatalogItemForm } from "@/components/admin/ProductCatalogItemForm";
import { getProductCatalogItemById } from "@/lib/content/productCatalog";
import { updateProductCatalogItemAction } from "@/app/actions/product-catalog";
import { getProductCategories } from "@/lib/content/productCategories";

export default async function EditProductCatalogItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getProductCatalogItemById(id);
  if (!item) notFound();
  const categories = await getProductCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit product</h1>
      <div className="mt-6">
        <ProductCatalogItemForm item={item} categories={categories} action={updateProductCatalogItemAction.bind(null, id)} />
      </div>
    </div>
  );
}
