import { AdminLoginForm } from "@/components/admin-login-form";

const ERROR_MESSAGES: Record<string, string> = {
  domain: "That Google account isn't part of this company's domain. Sign in with your company account instead.",
  oauth: "Google sign-in failed. Please try again.",
  state: "Your sign-in session expired. Please try again.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const errorMessage = error ? ERROR_MESSAGES[error] : undefined;
  const passwordLoginEnabled = Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD);

  return (
    <div className="flex min-h-screen flex-1 items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Admin sign in</h1>
          <p className="mt-1 text-sm text-white/50">Sign in to manage site content.</p>
        </div>

        {errorMessage && (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {errorMessage}
          </p>
        )}

        <a
          href="/api/auth/google"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-white/90"
        >
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
            <path
              fill="#4285F4"
              d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.57-5.17 3.57-8.81Z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.1C3.24 21.3 7.28 24 12 24Z"
            />
            <path
              fill="#FBBC05"
              d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.26A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.26 5.38l4.01-3.1Z"
            />
            <path
              fill="#EA4335"
              d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.26 6.62l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77Z"
            />
          </svg>
          Sign in with Google
        </a>

        {passwordLoginEnabled && (
          <>
            <div className="flex items-center gap-3 text-xs text-white/30">
              <div className="h-px flex-1 bg-white/10" />
              or
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <AdminLoginForm />
          </>
        )}
      </div>
    </div>
  );
}
