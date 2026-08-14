import { notFound } from "next/navigation";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { getCaseStudyById } from "@/lib/content/caseStudies";
import { updateCaseStudyAction } from "@/app/actions/case-studies";

export default async function EditCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const caseStudy = await getCaseStudyById(id);
  if (!caseStudy) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Edit case study</h1>
      <div className="mt-6">
        <CaseStudyForm caseStudy={caseStudy} action={updateCaseStudyAction.bind(null, id)} />
      </div>
    </div>
  );
}
