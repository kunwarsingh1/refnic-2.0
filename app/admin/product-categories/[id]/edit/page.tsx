import { notFound } from "next/navigation";
import { ProductCategoryForm } from "@/components/admin/ProductCategoryForm";
import { getProductCategoryById } from "@/lib/content/productCategories";
import { updateProductCategoryAction } from "@/app/actions/product-categories";

export default async function EditProductCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await getProductCategoryById(id);
  if (!category) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit product category</h1>
      <div className="mt-6">
        <ProductCategoryForm category={category} action={updateProductCategoryAction.bind(null, id)} />
      </div>
    </div>
  );
}
