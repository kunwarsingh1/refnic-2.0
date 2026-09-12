import { notFound } from "next/navigation";
import { SustainabilityCatalogItemForm } from "@/components/admin/SustainabilityCatalogItemForm";
import { getSustainabilityCatalogItemById } from "@/lib/content/sustainabilityCatalog";
import { updateSustainabilityCatalogItemAction } from "@/app/actions/sustainability-catalog";

export default async function EditSustainabilityCatalogItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getSustainabilityCatalogItemById(id);
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit pillar</h1>
      <div className="mt-6">
        <SustainabilityCatalogItemForm item={item} action={updateSustainabilityCatalogItemAction.bind(null, id)} />
      </div>
    </div>
  );
}
