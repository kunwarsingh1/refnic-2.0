import { ProductCategoryForm } from "@/components/admin/ProductCategoryForm";
import { createProductCategoryAction } from "@/app/actions/product-categories";

export default function NewProductCategoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add product category</h1>
      <div className="mt-6">
        <ProductCategoryForm action={createProductCategoryAction} />
      </div>
    </div>
  );
}
