import type { Metadata } from "next";
import Link from "next/link";
import {
  InstitutionalCardGrid,
  InstitutionalPageShell,
} from "@/components/institutional/InstitutionalPageShell";
import { SUPPORT_PRODUCTS } from "@/lib/institutional/public-site";

export const metadata: Metadata = {
  title: "Support Center",
  description: "Get help with BamSignal, Yike, BayRight, or general Stankings enquiries.",
};

export default function SupportCenterPage() {
  return (
    <InstitutionalPageShell
      eyebrow="Support Center"
      title="How can we help?"
      description="Support is separated by product. Each platform operates independently — route your enquiry to the correct team for the fastest resolution."
    >
      <InstitutionalCardGrid
        items={SUPPORT_PRODUCTS.map((p) => ({
          href: `/support/${p.slug}`,
          title: p.name,
          summary: p.description,
        }))}
      />
      <div className="mt-12 rounded-lg border border-gold/30 bg-gold-subtle p-6">
        <h2 className="mb-2 font-serif text-xl text-cream">Trust & safety</h2>
        <p className="text-sm text-cream-muted">
          For security vulnerabilities see{" "}
          <Link href="/trust/responsible-disclosure" className="text-gold">
            Responsible Disclosure
          </Link>
          . For privacy requests see{" "}
          <Link href="/trust/data-requests" className="text-gold">
            Data Requests
          </Link>
          .
        </p>
      </div>
    </InstitutionalPageShell>
  );
}
