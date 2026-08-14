import Link from "next/link";
import { listPendingChanges } from "@/lib/pendingChanges";

const OPERATION_LABEL: Record<string, string> = {
  create: "New",
  update: "Edit",
  delete: "Delete",
  reorder: "Reorder",
};

export default async function AdminPendingChangesPage() {
  const changes = await listPendingChanges();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Pending changes</h1>
      <p className="mt-1 text-sm text-white/50">
        Every edit across the site waits here until the CEO approves it by email. Approve/reject only happens via
        the link sent to the CEO — this list is read-only.
      </p>

      <div className="mt-8 overflow-hidden rounded-lg border border-white/10">
        {changes.length === 0 ? (
          <p className="px-4 py-6 text-sm text-white/40">Nothing pending right now.</p>
        ) : (
          changes.map((change) => (
            <div key={change.id} className="flex items-center gap-4 border-b border-white/10 px-4 py-3 last:border-b-0">
              <span className="w-16 shrink-0 rounded-full bg-white/10 px-2 py-1 text-center text-xs font-medium text-white/70">
                {OPERATION_LABEL[change.operation]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{change.label}</p>
                <p className="truncate text-xs text-white/40">
                  {change.contentType} · {change.submittedBy || "—"} ·{" "}
                  {new Date(change.submittedAt).toLocaleString()}
                  {!change.emailSent && " · email not sent"}
                </p>
              </div>
              <Link
                href={`/review/${encodeURIComponent(change.token)}`}
                target="_blank"
                className="shrink-0 text-xs font-medium text-accent-blue hover:underline"
              >
                Review
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
