import { OAuth2Client } from "google-auth-library";

function getRedirectUri(): string {
  if (process.env.GOOGLE_OAUTH_REDIRECT_URI) return process.env.GOOGLE_OAUTH_REDIRECT_URI;
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  return `${appUrl.replace(/\/+$/, "")}/api/auth/google/callback`;
}

function getClient(): OAuth2Client {
  return new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: getRedirectUri(),
  });
}

export function buildGoogleAuthUrl(state: string): string {
  const client = getClient();
  const allowedDomain = process.env.ALLOWED_GOOGLE_DOMAIN;
  return client.generateAuthUrl({
    access_type: "online",
    scope: ["openid", "email", "profile"],
    state,
    prompt: "select_account",
    // hd is only a UI hint that pre-filters/suggests the Workspace domain on
    // Google's consent screen — it is NOT a security control. The real check
    // happens server-side in isAllowedDomain() after the ID token is verified.
    ...(allowedDomain ? { hd: allowedDomain } : {}),
  });
}

export type VerifiedGoogleUser = {
  email: string;
  hd?: string;
  emailVerified: boolean;
};

export async function exchangeCodeAndVerify(code: string): Promise<VerifiedGoogleUser | null> {
  try {
    const client = getClient();
    const { tokens } = await client.getToken(code);
    if (!tokens.id_token) return null;

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload || !payload.email) return null;

    return {
      email: payload.email,
      hd: typeof payload.hd === "string" ? payload.hd : undefined,
      emailVerified: payload.email_verified === true,
    };
  } catch {
    return null;
  }
}

export function isAllowedDomain(user: VerifiedGoogleUser): boolean {
  const allowedDomain = process.env.ALLOWED_GOOGLE_DOMAIN;
  if (!allowedDomain) return false;
  if (!user.emailVerified) return false;

  const domain = allowedDomain.toLowerCase();
  if (user.hd && user.hd.toLowerCase() === domain) return true;

  // Fallback for Workspace configurations where the `hd` claim may be absent.
  return user.email.toLowerCase().endsWith(`@${domain}`);
}
