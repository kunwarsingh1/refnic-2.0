"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { approveByToken, rejectByToken } from "@/app/actions/blog";

type DoneState = "approved" | "rejected" | null;

export function ApprovalActions({ token }: { token: string }) {
  const router = useRouter();
  const [pending, setPending] = useState<null | "approve" | "reject">(null);
  const [done, setDone] = useState<DoneState>(null);
  const [error, setError] = useState<string | null>(null);

  async function run(action: "approve" | "reject") {
    setPending(action);
    setError(null);
    const res = action === "approve" ? await approveByToken(token) : await rejectByToken(token);
    setPending(null);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong.");
      return;
    }
    setDone(action === "approve" ? "approved" : "rejected");
    router.refresh();
  }

  if (done) {
    return (
      <div className="rounded-md bg-green-500/10 px-4 py-3 text-sm font-medium text-green-300">
        {done === "approved"
          ? "Post approved — it's now live on the blog for everyone to see."
          : "Post rejected — it stays private and will not go public."}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {error && <p className="w-full text-sm text-red-400">{error}</p>}
      <button
        type="button"
        onClick={() => run("approve")}
        disabled={pending !== null}
        className="rounded-md bg-accent-blue px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-blue-dark disabled:opacity-50"
      >
        {pending === "approve" ? "Approving…" : "Approve"}
      </button>
      <button
        type="button"
        onClick={() => run("reject")}
        disabled={pending !== null}
        className="rounded-md border border-red-500/30 bg-transparent px-5 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10 disabled:opacity-50"
      >
        {pending === "reject" ? "Rejecting…" : "Reject"}
      </button>
    </div>
  );
}
