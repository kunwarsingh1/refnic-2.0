import { SustainabilityCatalogItemForm } from "@/components/admin/SustainabilityCatalogItemForm";
import { createSustainabilityCatalogItemAction } from "@/app/actions/sustainability-catalog";

export default function NewSustainabilityCatalogItemPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add pillar</h1>
      <div className="mt-6">
        <SustainabilityCatalogItemForm action={createSustainabilityCatalogItemAction} />
      </div>
    </div>
  );
}
