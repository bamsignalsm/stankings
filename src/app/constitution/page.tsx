import type { Metadata } from "next";
import Link from "next/link";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";
import { InstitutionalPageShell } from "@/components/institutional/InstitutionalPageShell";

export const metadata: Metadata = {
  title: "Constitution",
  description:
    "The Group Constitution — Volume I of Stankings Group. Public overview with member access to full text.",
};

export default function ConstitutionPublicPage() {
  return (
    <InstitutionalPageShell
      eyebrow="The Group Constitution"
      title="Volume I — Institutional law"
      description="The Constitution is the highest governing document of Stankings Group. It defines purpose, governance, leadership, platforms, and succession for generations."
    >
      <div className="space-y-8">
        <div className="rounded-lg border border-gold-subtle bg-ink-muted p-6">
          <h2 className="mb-3 font-serif text-xl text-cream">Structure</h2>
          <ul className="space-y-2 text-cream-muted">
            <li>
              <strong className="text-cream">Volume 0</strong> — The Stankings Canons (25 founding principles)
            </li>
            <li>
              <strong className="text-cream">Volume I</strong> — The Group Constitution (Articles I–XVII)
            </li>
            <li>
              <strong className="text-cream">Schedules</strong> — Registers, definitions, and review calendars
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-serif text-xl text-cream">Public access</h2>
          <p className="text-cream-muted">
            This page provides an institutional overview. The authoritative constitutional text,
            frameworks, and governance records are preserved in The Stankings Library for verified
            members — protecting integrity while maintaining transparency of our governance model.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href={USER_LOGIN_PATH}
            className="rounded-sm border border-gold bg-gold px-6 py-3 text-center text-sm font-semibold text-ink transition hover:bg-gold-light"
          >
            Sign in to read
          </Link>
          <Link
            href="/members"
            className="rounded-sm border border-gold-subtle px-6 py-3 text-center text-sm font-medium text-cream transition hover:border-gold/40"
          >
            About member access
          </Link>
        </div>

        <p className="text-sm text-cream-muted">
          Trust and information governance:{" "}
          <Link href="/trust" className="text-gold">
            Trust Center
          </Link>
        </p>
      </div>
    </InstitutionalPageShell>
  );
}
