"use server";

import { appendEnquiry } from "@/lib/sheets";

export type EnquiryResult = {
  ok: boolean;
  error?: string;
};

export async function submitEnquiry(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<EnquiryResult> {
  const firstName = input.firstName.trim();
  const email = input.email.trim().toLowerCase();

  if (!firstName) {
    return { ok: false, error: "Please enter your first name." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  try {
    await appendEnquiry({
      firstName,
      lastName: input.lastName.trim(),
      email,
      phone: input.phone.trim(),
      subject: input.subject,
      message: input.message.trim(),
    });
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? err.message
          : "Could not submit your enquiry. Please try again.",
    };
  }
}
