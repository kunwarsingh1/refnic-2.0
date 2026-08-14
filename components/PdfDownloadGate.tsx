"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { Download } from "lucide-react";
import { requestPdfDownload } from "@/app/actions/leads";

const btnClass =
  "inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:bg-white/[0.08] disabled:opacity-50";
const primaryBtnClass =
  "inline-flex items-center gap-1.5 rounded-md bg-accent-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-blue-dark disabled:opacity-50";
const inputClass =
  "w-full rounded-md border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30";

const UNLOCK_EVENT = "refnic:pdf-unlock";

function unlockKey(postSlug: string): string {
  return `refnic_pdf_unlocked_${postSlug}`;
}

function subscribe(callback: () => void) {
  window.addEventListener(UNLOCK_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(UNLOCK_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function sanitizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function downloadFileName(postSlug: string, label?: string): string {
  const parts = ["refnic", sanitizeName(postSlug), label ? sanitizeName(label) : ""].filter(Boolean);
  return `${parts.join("-")}.pdf`;
}

async function triggerDownload(url: string, filename: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Could not download the file.");
  const blob = await res.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
}

export function PdfDownloadGate({
  postSlug,
  url,
  label,
}: {
  postSlug: string;
  url: string;
  label?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unlocked = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(unlockKey(postSlug)) === "1",
    () => false,
  );

  function openDialog() {
    setEmail("");
    setError(null);
    dialogRef.current?.showModal();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await requestPdfDownload({ email, postSlug, pdfUrl: url });
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error ?? "Could not save your email.");
      return;
    }
    localStorage.setItem(unlockKey(postSlug), "1");
    window.dispatchEvent(new Event(UNLOCK_EVENT));
    dialogRef.current?.close();
    try {
      await triggerDownload(url, downloadFileName(postSlug, label));
    } catch {
      setError("Download failed. The file may have moved.");
    }
  }

  const buttonText = label ? `Download ${label}` : "Download PDF";

  return (
    <>
      {unlocked ? (
        <button type="button" onClick={() => triggerDownload(url, downloadFileName(postSlug, label))} className={btnClass}>
          <Download className="h-4 w-4" />
          {buttonText}
        </button>
      ) : (
        <button type="button" onClick={openDialog} className={btnClass}>
          <Download className="h-4 w-4" />
          {buttonText}
        </button>
      )}

      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-auto h-fit w-full max-w-sm rounded-xl border border-white/10 bg-neutral-950 p-0 text-white backdrop:bg-black/60"
      >
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Download this document</h3>
            <p className="mt-1 text-sm text-white/50">Enter your email and we&apos;ll start the download.</p>
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <div className="flex items-center justify-end gap-2">
            <button type="button" onClick={() => dialogRef.current?.close()} className="text-sm text-white/50 hover:text-white">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className={primaryBtnClass}>
              <Download className="h-4 w-4" />
              {submitting ? "Saving…" : "Download"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
