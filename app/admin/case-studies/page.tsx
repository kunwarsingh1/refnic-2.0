import Link from "next/link";
import { getCaseStudies } from "@/lib/content/caseStudies";
import { deleteCaseStudyAction, reorderCaseStudyAction } from "@/app/actions/case-studies";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { buttonClass } from "@/components/admin/formStyles";

export default async function AdminCaseStudiesPage() {
  const items = await getCaseStudies();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Case Studies</h1>
          <p className="mt-1 text-sm text-white/50">
            Powers the homepage carousel and the "01/02/03…" project cards on the Case Study page.
          </p>
        </div>
        <Link href="/admin/case-studies/new" className={buttonClass}>
          Add case study
        </Link>
      </div>

      <div className="mt-8">
        {items.length === 0 ? (
          <p className="text-sm text-white/40">No case studies yet.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/10">
            {items.map((cs, i) => (
              <div key={cs.id} className="flex items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0">
                {cs.imageUrl ? (
                  <img src={cs.imageUrl} alt="" className="h-10 w-10 rounded object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded bg-white/10" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">
                    {String(i + 1).padStart(2, "0")} — {cs.city}
                  </p>
                  <p className="truncate text-xs text-white/40">{cs.label}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <form action={reorderCaseStudyAction.bind(null, cs.id, "up")}>
                      <button
                        type="submit"
                        disabled={i === 0}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↑
                      </button>
                    </form>
                    <form action={reorderCaseStudyAction.bind(null, cs.id, "down")}>
                      <button
                        type="submit"
                        disabled={i === items.length - 1}
                        className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                      >
                        ↓
                      </button>
                    </form>
                  </div>
                  <Link href={`/admin/case-studies/${cs.id}/edit`} className="text-xs font-medium text-accent-blue hover:underline">
                    Edit
                  </Link>
                  <DeleteButton action={deleteCaseStudyAction.bind(null, cs.id)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
