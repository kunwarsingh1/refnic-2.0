"use client";

export default function NewsletterSignupForm({ ctaLabel }: { ctaLabel: string }) {
  return (
    <form className="mt-5 flex flex-wrap items-center gap-3" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Your email"
        className="w-72 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-blue"
      />
      <button type="submit" className="rounded-lg bg-accent-blue px-6 py-3 text-sm font-bold text-white hover:bg-accent-blue-dark">
        {ctaLabel}
      </button>
    </form>
  );
}
