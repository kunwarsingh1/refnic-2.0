import { createHmac, timingSafeEqual } from "node:crypto";

function secret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

export function createApprovalToken(row: number, slug: string): string {
  const payload = `${row}:${slug}`;
  const sig = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export function verifyApprovalToken(
  token: string | undefined,
): { row: number; slug: string } | null {
  if (!token) return null;
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;

  let payload: string;
  try {
    payload = Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expected = createHmac("sha256", secret()).update(payload).digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(sig, "utf8");
  if (a.length !== b.length) return null;
  if (!timingSafeEqual(a, b)) return null;

  const [rawRow, slug] = payload.split(":");
  const row = Number(rawRow);
  if (!Number.isInteger(row) || row < 2 || !slug) return null;

  return { row, slug };
}
