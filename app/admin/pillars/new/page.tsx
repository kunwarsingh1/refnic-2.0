import { PillarForm } from "@/components/admin/PillarForm";
import { createPillarAction } from "@/app/actions/pillars";

export default function NewPillarPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add pillar</h1>
      <div className="mt-6">
        <PillarForm action={createPillarAction} />
      </div>
    </div>
  );
}
