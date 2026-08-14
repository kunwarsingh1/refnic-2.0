import { notFound } from "next/navigation";
import { PillarForm } from "@/components/admin/PillarForm";
import { getPillarById } from "@/lib/content/pillars";
import { updatePillarAction } from "@/app/actions/pillars";

export default async function EditPillarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pillar = await getPillarById(id);
  if (!pillar) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit pillar</h1>
      <div className="mt-6">
        <PillarForm pillar={pillar} action={updatePillarAction.bind(null, id)} />
      </div>
    </div>
  );
}
