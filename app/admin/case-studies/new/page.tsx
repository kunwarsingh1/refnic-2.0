import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { createCaseStudyAction } from "@/app/actions/case-studies";

export default function NewCaseStudyPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Add case study</h1>
      <div className="mt-6">
        <CaseStudyForm action={createCaseStudyAction} />
      </div>
    </div>
  );
}
