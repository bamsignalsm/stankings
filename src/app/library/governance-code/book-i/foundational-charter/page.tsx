import type { Metadata } from "next";
import Link from "next/link";
import { GovernanceFoundationalCharterPanel } from "@/components/governance-code/GovernanceBookCharterPanel";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Book I — Foundational Charter",
  description:
    "Foundational Charter v1.0 RC1 — Governance Bodies. The governing introduction to Book I: purpose, scope, authority, map, and reading guide.",
  robots: { index: false, follow: false },
};

export default function BookIFoundationalCharterPage() {
  return (
    <div className="pt-20 print:pt-0">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-8 print:hidden">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Link
            href="/library/governance-code/book-i"
            className="text-sm text-cream-muted hover:text-gold"
          >
            ← Book I — Governance Bodies
          </Link>
        </div>
      </section>
      <GovernanceFoundationalCharterPanel />
    </div>
  );
}
