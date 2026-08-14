"use server";

import { appendLead } from "@/lib/sheets";

export type LeadResult = {
  ok: boolean;
  error?: string;
};

export async function requestPdfDownload(input: {
  email: string;
  postSlug: string;
  pdfUrl: string;
}): Promise<LeadResult> {
  const email = input.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  try {
    await appendLead({
      email,
      postSlug: input.postSlug,
      pdfUrl: input.pdfUrl,
    });
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Could not save your email. Please try again.",
    };
  }
}
