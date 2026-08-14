"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/actions/admin";

const initialState: LoginState = {};

const inputClass =
  "w-full rounded-md border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/30";
const buttonClass =
  "w-full rounded-md bg-accent-blue px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-accent-blue-dark disabled:opacity-50";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="username" className="mb-1 block text-sm font-medium text-white/70">
          Username
        </label>
        <input id="username" name="username" type="text" required autoComplete="username" className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-white/70">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>
      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
