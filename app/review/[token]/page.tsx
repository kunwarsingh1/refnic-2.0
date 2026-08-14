import Link from "next/link";
import { getChangeByToken } from "@/lib/pendingChanges";
import { ChangeReviewActions } from "@/components/ChangeReviewActions";
import { ChangeDiff } from "@/components/ChangeDiff";

export const dynamic = "force-dynamic";

const OPERATION_LABEL: Record<string, string> = {
  create: "New",
  update: "Edit",
  delete: "Delete",
  reorder: "Reorder",
};

export default async function ReviewChangePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const change = await getChangeByToken(token);

  if (!change) {
    return (
      <ResultShell
        title="Invalid review link"
        message="This review link is invalid or has been tampered with."
      />
    );
  }

  if (change.status !== "pending") {
    return (
      <ResultShell
        title={`Already ${change.status}`}
        message={`This change was already ${change.status} and can't be reviewed again.`}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="mb-8 rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <h1 className="text-lg font-semibold tracking-tight text-white">Review this change</h1>
          <p className="mt-1 text-sm text-white/50">
            The site stays as it is until you approve or reject this change.
          </p>
          <div className="mt-3 space-y-1 text-sm text-white/70">
            <p>
              <span className="font-medium text-white">Change:</span> {change.label}
            </p>
            <p>
              <span className="font-medium text-white">Type:</span> {OPERATION_LABEL[change.operation]} —{" "}
              {change.contentType}
            </p>
            {change.submittedBy && (
              <p>
                <span className="font-medium text-white">Submitted by:</span> {change.submittedBy}
              </p>
            )}
            <p>
              <span className="font-medium text-white">Submitted:</span>{" "}
              {new Date(change.submittedAt).toLocaleString()}
            </p>
          </div>
          <div className="mt-4 border-t border-white/10 pt-4">
            <ChangeReviewActions token={token} />
          </div>
        </div>

        <ChangeDiff operation={change.operation} args={change.args} previousArgs={change.previousArgs} />
      </div>
    </div>
  );
}

function ResultShell({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black px-4">
      <div className="w-full max-w-md rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="mt-2 text-white/60">{message}</p>
        <Link href="/" className="mt-6 inline-block text-sm font-medium text-white underline underline-offset-4">
          ← Back to the site
        </Link>
      </div>
    </div>
  );
}
