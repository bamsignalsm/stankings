"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { USER_LOGIN_PATH, USER_REGISTER_PATH } from "@/lib/auth-paths";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "login" | "signup";

interface AuthFormProps {
  mode: AuthMode;
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/library";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();

    if (isSignup) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });

      setLoading(false);

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      setMessage(
        "Account created. Verify your email, then wait for a super admin to approve your membership."
      );
      router.push(`/auth/verify-email?next=${encodeURIComponent(next)}`);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email_confirmed_at) {
      router.push(`/auth/verify-email?next=${encodeURIComponent(next)}`);
      return;
    }

    const { data: member } = await supabase
      .from("stankings_members")
      .select("status, role")
      .eq("id", user.id)
      .single();

    if (member?.status !== "approved") {
      router.push("/auth/pending-approval");
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isSignup && (
        <div>
          <label
            htmlFor="fullName"
            className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-cream-muted"
          >
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream outline-none transition focus:border-gold/50"
            placeholder="Your name"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-cream-muted"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream outline-none transition focus:border-gold/50"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-cream-muted"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-sm border border-gold-subtle bg-ink px-4 py-3 text-cream outline-none transition focus:border-gold/50"
          placeholder="At least 8 characters"
        />
      </div>

      {error && (
        <p className="rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {message && (
        <p className="rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-sm border border-gold bg-gold py-3 text-sm font-semibold text-ink transition hover:bg-gold-light disabled:opacity-60"
      >
        {loading
          ? "Please wait..."
          : isSignup
            ? "Create account"
            : "Sign in"}
      </button>

      <p className="text-center text-sm text-cream-muted">
        {isSignup ? "Already have an account?" : "Need member access?"}{" "}
        <Link
          href={
            isSignup
              ? `${USER_LOGIN_PATH}?next=${encodeURIComponent(next)}`
              : `${USER_REGISTER_PATH}?next=${encodeURIComponent(next)}`
          }
          className="text-gold hover:text-gold-light"
        >
          {isSignup ? "Sign in" : "Create account"}
        </Link>
      </p>
    </form>
  );
}
