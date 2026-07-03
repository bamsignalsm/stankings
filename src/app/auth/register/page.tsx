import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a member account to access Stankings Group institutional documents.",
};

export default function AuthRegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[80vh] items-center justify-center pt-24">
          <p className="text-cream-muted">Loading...</p>
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}

function RegisterContent() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6 pt-24 pb-16">
      <div className="w-full max-w-md">
        <p className="mb-2 text-center text-xs uppercase tracking-[0.3em] text-gold">
          Member Access
        </p>
        <h1 className="mb-4 text-center font-serif text-3xl font-semibold text-cream">
          Create account
        </h1>
        <p className="mb-8 text-center text-sm text-cream-muted">
          Sign up with your email, verify your address, then await super admin
          approval to access institutional documents.
        </p>
        <div className="rounded-lg border border-gold-subtle bg-ink-muted p-8">
          <Suspense fallback={<p className="text-cream-muted">Loading form...</p>}>
            <AuthForm mode="signup" />
          </Suspense>
        </div>
        <p className="mt-8 text-center text-xs text-cream-muted/70">
          <Link href="/members" className="text-gold hover:text-gold-light">
            Learn about member access
          </Link>
          {" · "}
          <Link href={USER_LOGIN_PATH} className="text-gold hover:text-gold-light">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
