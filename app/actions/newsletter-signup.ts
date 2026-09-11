"use server";

import { appendSubscriber } from "@/lib/sheets";

export type NewsletterSignupResult = {
  ok: boolean;
  error?: string;
};

export async function subscribeToNewsletter(
  email: string,
  source: string,
): Promise<NewsletterSignupResult> {
  const trimmed = email.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  try {
    await appendSubscriber(trimmed, source);
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Could not subscribe. Please try again.",
    };
  }
}
