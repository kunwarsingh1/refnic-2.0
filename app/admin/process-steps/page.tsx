import Link from "next/link";
import { getProcessSteps } from "@/lib/content/processSteps";
import { reorderProcessStepAction } from "@/app/actions/process-steps";

export default async function AdminProcessStepsPage() {
  const steps = await getProcessSteps();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Process Steps</h1>
      <p className="mt-1 text-sm text-white/50">
        The Process section has a fixed 6-step layout — steps can be edited and reordered but not added or removed.
      </p>

      <div className="mt-8 overflow-hidden rounded-lg border border-white/10">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0">
            <span className="w-8 shrink-0 text-sm font-bold text-white/30">{String(i + 1).padStart(2, "0")}</span>
            {s.imageUrl ? (
              <img src={s.imageUrl} alt="" className="h-10 w-10 rounded bg-white object-contain" />
            ) : (
              <div className="h-10 w-10 rounded bg-white/10" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{s.title}</p>
              <p className="truncate text-xs text-white/40">Icon: {s.icon}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <form action={reorderProcessStepAction.bind(null, s.id, "up")}>
                  <button
                    type="submit"
                    disabled={i === 0}
                    className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                  >
                    ↑
                  </button>
                </form>
                <form action={reorderProcessStepAction.bind(null, s.id, "down")}>
                  <button
                    type="submit"
                    disabled={i === steps.length - 1}
                    className="rounded px-1.5 py-0.5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-20"
                  >
                    ↓
                  </button>
                </form>
              </div>
              <Link href={`/admin/process-steps/${s.id}/edit`} className="text-xs font-medium text-accent-blue hover:underline">
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
