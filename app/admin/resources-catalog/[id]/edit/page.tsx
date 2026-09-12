import { notFound } from "next/navigation";
import { ResourceCatalogItemForm } from "@/components/admin/ResourceCatalogItemForm";
import { getResourceCatalogItemById } from "@/lib/content/resourcesCatalog";
import { updateResourceCatalogItemAction } from "@/app/actions/resources-catalog";

export default async function EditResourceCatalogItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getResourceCatalogItemById(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit resource</h1>
      <div className="mt-6">
        <ResourceCatalogItemForm item={item} action={updateResourceCatalogItemAction.bind(null, id)} />
      </div>
    </div>
  );
}
