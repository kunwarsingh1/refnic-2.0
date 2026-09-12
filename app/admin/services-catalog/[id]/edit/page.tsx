import { notFound } from "next/navigation";
import { ServiceCatalogItemForm } from "@/components/admin/ServiceCatalogItemForm";
import { getServiceCatalogItemById } from "@/lib/content/servicesCatalog";
import { updateServiceCatalogItemAction } from "@/app/actions/services-catalog";

export default async function EditServiceCatalogItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getServiceCatalogItemById(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit service</h1>
      <div className="mt-6">
        <ServiceCatalogItemForm item={item} action={updateServiceCatalogItemAction.bind(null, id)} />
      </div>
    </div>
  );
}
