import { createHmac, timingSafeEqual } from "node:crypto";

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

export function createChangeToken(changeId: string): string {
  const sig = createHmac("sha256", secret()).update(changeId).digest("hex");
  return `${Buffer.from(changeId).toString("base64url")}.${sig}`;
}

export function verifyChangeToken(token: string | undefined): string | null {
  if (!token) return null;
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;

  let changeId: string;
  try {
    changeId = Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expected = createHmac("sha256", secret()).update(changeId).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(sig, "utf8");
  if (a.length !== b.length) return null;
  if (!timingSafeEqual(a, b)) return null;

  if (!/^[0-9a-fA-F]{24}$/.test(changeId)) return null;

  return changeId;
}
