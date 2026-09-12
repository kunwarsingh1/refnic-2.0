import { notFound } from "next/navigation";
import { SolutionCatalogItemForm } from "@/components/admin/SolutionCatalogItemForm";
import { getSolutionCatalogItemById } from "@/lib/content/solutionsCatalog";
import { updateSolutionCatalogItemAction } from "@/app/actions/solutions-catalog";

export default async function EditSolutionCatalogItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getSolutionCatalogItemById(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit solution</h1>
      <div className="mt-6">
        <SolutionCatalogItemForm item={item} action={updateSolutionCatalogItemAction.bind(null, id)} />
      </div>
    </div>
  );
}
