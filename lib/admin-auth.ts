import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

type SessionPayload = {
  ts: number;
  email: string;
};

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

export function createSessionToken(email: string): string {
  const payload: SessionPayload = { ts: Date.now(), email };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", secret()).update(encoded).digest("hex");
  return `${encoded}.${sig}`;
}

export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;

  const expected = createHmac("sha256", secret()).update(encoded).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(sig, "utf8");
  if (a.length !== b.length) return null;
  if (!timingSafeEqual(a, b)) return null;

  let payload: SessionPayload;
  try {
    payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (!payload || typeof payload.ts !== "number" || typeof payload.email !== "string") return null;

  const age = Date.now() - payload.ts;
  if (age < 0 || age >= SESSION_TTL_MS) return null;

  return payload;
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE_NAME)?.value) !== null;
}

export async function getAdminEmail(): Promise<string> {
  const store = await cookies();
  const payload = verifySessionToken(store.get(COOKIE_NAME)?.value);
  return payload?.email ?? "";
}

export { COOKIE_NAME, SESSION_TTL_MS };
