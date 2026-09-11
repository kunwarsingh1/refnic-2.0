"use client";

import { useState, type FormEvent } from "react";
import { subscribeToNewsletter } from "@/app/actions/newsletter-signup";

export default function NewsletterSignupForm({ ctaLabel }: { ctaLabel: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; error?: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");

    setSubmitting(true);
    setResult(null);
    const res = await subscribeToNewsletter(email, typeof window !== "undefined" ? window.location.pathname : "");
    setSubmitting(false);
    setResult(res);
    if (res.ok) form.reset();
  }

  return (
    <div className="mt-5">
      <form className="flex flex-wrap items-center gap-3" onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          className="w-72 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-blue"
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-accent-blue px-6 py-3 text-sm font-bold text-white hover:bg-accent-blue-dark disabled:opacity-60"
        >
          {submitting ? "Submitting…" : ctaLabel}
        </button>
      </form>
      {result && (
        <p className={`mt-2 text-sm ${result.ok ? "text-green-400" : "text-red-400"}`}>
          {result.ok ? "Thanks — you're subscribed!" : result.error}
        </p>
      )}
    </div>
  );
}
