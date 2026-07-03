import type { Metadata } from "next";
import Link from "next/link";
import { GovernanceChapter1ArchitecturePanel } from "@/components/governance-code/GovernanceChapter1ArchitecturePanel";
import { MemberBanner } from "@/components/MemberBanner";

export const metadata: Metadata = {
  title: "Chapter 1 Architecture — Constitutional Governance Structure",
  description:
    "Eight-section architecture for Chapter 1. Sources of authority, governance hierarchy, decision flow. No prose drafted.",
  robots: { index: false, follow: false },
};

export default function BookIChapter1ArchitecturePage() {
  return (
    <div className="pt-20 print:pt-0">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-8 print:hidden">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Link
            href="/library/governance-code/book-i/chapters/book-i-ch-01"
            className="text-sm text-cream-muted hover:text-gold"
          >
            ← Chapter 1 — Constitutional Governance Structure
          </Link>
        </div>
      </section>
      <GovernanceChapter1ArchitecturePanel />
    </div>
  );
}
