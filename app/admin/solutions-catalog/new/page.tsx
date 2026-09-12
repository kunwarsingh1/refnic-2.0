import { SolutionCatalogItemForm } from "@/components/admin/SolutionCatalogItemForm";
import { createSolutionCatalogItemAction } from "@/app/actions/solutions-catalog";

export default function NewSolutionCatalogItemPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add solution</h1>
      <div className="mt-6">
        <SolutionCatalogItemForm action={createSolutionCatalogItemAction} />
      </div>
    </div>
  );
}
