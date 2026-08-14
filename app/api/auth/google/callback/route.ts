import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, createSessionToken } from "@/lib/admin-auth";
import { exchangeCodeAndVerify, isAllowedDomain } from "@/lib/google-oauth";

const STATE_COOKIE = "google_oauth_state";

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const store = await cookies();
  const expectedState = store.get(STATE_COOKIE)?.value;
  store.delete(STATE_COOKIE);

  if (!code || !state || !expectedState || !safeEqual(state, expectedState)) {
    return NextResponse.redirect(new URL("/login?error=state", url));
  }

  const user = await exchangeCodeAndVerify(code);
  if (!user) {
    return NextResponse.redirect(new URL("/login?error=oauth", url));
  }

  if (!isAllowedDomain(user)) {
    return NextResponse.redirect(new URL("/login?error=domain", url));
  }

  store.set(COOKIE_NAME, createSessionToken(user.email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.redirect(new URL("/admin", url));
}
