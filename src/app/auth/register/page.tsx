import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { AuthPageShell } from "@/components/AuthPageShell";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a member account to access Stankings Legacy Ltd institutional documents.",
};

export default function AuthRegisterPage() {
  return (
    <Suspense fallback={<AuthPageShell title="Create account" />}>
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  return (
    <AuthPageShell title="Create account">
      <p className="mb-8 text-sm leading-relaxed text-cream-muted">
        Sign up with your email, verify your address, then await super admin approval to access
        institutional documents.
      </p>
      <Suspense fallback={<p className="text-cream-muted">Loading form...</p>}>
        <AuthForm mode="signup" />
      </Suspense>
      <p className="mt-8 text-center text-xs text-cream-muted/70">
        <Link href="/members" className="text-gold hover:text-gold-light">
          Learn about member access
        </Link>
        {" · "}
        <Link href={USER_LOGIN_PATH} className="text-gold hover:text-gold-light">
          Sign in
        </Link>
      </p>
    </AuthPageShell>
  );
}
