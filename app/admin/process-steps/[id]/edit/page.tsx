import { notFound } from "next/navigation";
import { ProcessStepForm } from "@/components/admin/ProcessStepForm";
import { getProcessStepById } from "@/lib/content/processSteps";
import { updateProcessStepAction } from "@/app/actions/process-steps";

export default async function EditProcessStepPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const step = await getProcessStepById(id);
  if (!step) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit process step</h1>
      <div className="mt-6">
        <ProcessStepForm step={step} action={updateProcessStepAction.bind(null, id)} />
      </div>
    </div>
  );
}
