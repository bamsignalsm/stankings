"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";
import { createClient } from "@/lib/supabase/client";

export default function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/library";

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function resendEmail() {
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      setError("No account found. Please sign up first.");
      setLoading(false);
      return;
    }

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email: user.email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    setLoading(false);

    if (resendError) {
      setError(resendError.message);
      return;
    }

    setMessage("Verification email sent. Please check your inbox.");
  }

  async function checkVerification() {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    await supabase.auth.refreshSession();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setLoading(false);

    if (user?.email_confirmed_at) {
      router.push(next);
      router.refresh();
      return;
    }

    setError("Email not verified yet. Please check your inbox and click the link.");
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 pt-24 pb-16">
      <div className="w-full max-w-md text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">
          Verification Required
        </p>
        <h1 className="mb-4 font-serif text-3xl font-semibold text-cream">
          Verify your email
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-cream-muted">
          We sent a verification link to your email. Click it to activate your
          member account and access institutional documents.
        </p>

        <div className="rounded-lg border border-gold-subtle bg-ink-muted p-8 text-left">
          <div className="space-y-4">
            <button
              type="button"
              onClick={checkVerification}
              disabled={loading}
              className="w-full rounded-sm border border-gold bg-gold py-3 text-sm font-semibold text-ink transition hover:bg-gold-light disabled:opacity-60"
            >
              I&apos;ve verified my email
            </button>
            <button
              type="button"
              onClick={resendEmail}
              disabled={loading}
              className="w-full rounded-sm border border-gold-subtle py-3 text-sm text-cream-muted transition hover:border-gold/40 hover:text-gold disabled:opacity-60"
            >
              Resend verification email
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}
          {message && (
            <p className="mt-4 rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
              {message}
            </p>
          )}
        </div>

        <p className="mt-8 text-sm text-cream-muted">
          <Link href={USER_LOGIN_PATH} className="text-gold hover:text-gold-light">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
