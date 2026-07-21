import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { AuthPageShell } from "@/components/AuthPageShell";
import { USER_REGISTER_PATH } from "@/lib/auth-paths";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to access Stankings Legacy Ltd institutional documents.",
};

export default function AuthLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  return (
    <Suspense fallback={<AuthPageShell title="Sign in" />}>
      <LoginContent searchParams={searchParams} />
    </Suspense>
  );
}

async function LoginContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthPageShell title="Sign in">
      <p className="mb-8 text-sm leading-relaxed text-cream-muted">
        Sign in with your verified member account to access The Stankings Library, the Group
        Constitution, and other institutional documents.
      </p>

      {params.error === "auth" && (
        <p className="mb-6 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Authentication failed. Please try again.
        </p>
      )}

      <Suspense fallback={<p className="text-cream-muted">Loading form...</p>}>
        <AuthForm mode="login" />
      </Suspense>

      <p className="mt-8 text-center text-xs text-cream-muted/70">
        <Link href="/members" className="text-gold hover:text-gold-light">
          Learn about member access
        </Link>
        {" · "}
        <Link href={USER_REGISTER_PATH} className="text-gold hover:text-gold-light">
          Create account
        </Link>
      </p>
    </AuthPageShell>
  );
}
