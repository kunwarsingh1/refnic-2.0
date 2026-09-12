import { ResourceCatalogItemForm } from "@/components/admin/ResourceCatalogItemForm";
import { createResourceCatalogItemAction } from "@/app/actions/resources-catalog";

export default function NewResourceCatalogItemPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add resource</h1>
      <div className="mt-6">
        <ResourceCatalogItemForm action={createResourceCatalogItemAction} />
      </div>
    </div>
  );
}
