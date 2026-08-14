import { isAdmin } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { sendApprovalEmail } from "@/lib/email";

export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const to = process.env.CEO_EMAIL ?? "";
  const from = process.env.SUPPORT_EMAIL ?? "";
  if (!to || !from) {
    return NextResponse.json(
      { error: "CEO_EMAIL and SUPPORT_EMAIL must be set in .env.local." },
      { status: 500 },
    );
  }

  const baseUrl = (process.env.APP_URL ?? "").replace(/\/$/, "");
  try {
    await sendApprovalEmail({
      to,
      from,
      postTitle: "Test email",
      author: "Test",
      approveUrl: `${baseUrl}/`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not send the email." },
      { status: 500 },
    );
  }
}
