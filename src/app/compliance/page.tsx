import type { Metadata } from "next";
import { AuthorityHub } from "@/components/authority/AuthorityHub";
import { COMPLIANCE_SECTIONS } from "@/lib/authority/compliance";
import { CONTACTS } from "@/lib/shared/config/contacts";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Compliance Center",
  description:
    "Shared compliance orientation for Stankings Group — data protection, records, and reporting.",
  path: "/compliance",
});

export default function ComplianceCenterPage() {
  return (
    <AuthorityHub
      eyebrow="Compliance Center"
      title="Shared compliance"
      description="Compliance orientation for the ecosystem originates at HQ. Sector-specific obligations (such as payments) remain with the responsible operating company."
      originNotice="Do not publish product-level institutional compliance statements that contradict HQ Trust, Legal, or Security Centers."
      sections={COMPLIANCE_SECTIONS}
      contactEmail={CONTACTS.legal}
      contactLabel="Compliance"
    />
  );
}
