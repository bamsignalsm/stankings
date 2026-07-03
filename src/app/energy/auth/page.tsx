import type { Metadata } from "next";
import { Suspense } from "react";
import { EnergyAuthForm } from "@/components/EnergyAuthForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Stankings Group institutional access.",
  robots: { index: false, follow: false },
};

export default function EnergyAuthPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <Suspense fallback={<EnergyAuthShell />}>
      <EnergyAuthContent searchParams={searchParams} />
    </Suspense>
  );
}

async function EnergyAuthContent({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <EnergyAuthShell>
      {params.error === "auth" && (
        <p className="mb-6 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          Authentication failed. Please try again.
        </p>
      )}

      <Suspense fallback={<p className="text-cream-muted">Loading...</p>}>
        <EnergyAuthForm />
      </Suspense>
    </EnergyAuthShell>
  );
}

function EnergyAuthShell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-sm">
        <p className="mb-8 text-center font-serif text-xl text-cream">Stankings</p>
        <div className="rounded-lg border border-gold-subtle bg-ink-muted p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
