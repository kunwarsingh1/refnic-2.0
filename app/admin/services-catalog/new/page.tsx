import { ServiceCatalogItemForm } from "@/components/admin/ServiceCatalogItemForm";
import { createServiceCatalogItemAction } from "@/app/actions/services-catalog";

export default function NewServiceCatalogItemPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add service</h1>
      <div className="mt-6">
        <ServiceCatalogItemForm action={createServiceCatalogItemAction} />
      </div>
    </div>
  );
}
