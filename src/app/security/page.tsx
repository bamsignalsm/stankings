import type { Metadata } from "next";
import { AuthorityHub } from "@/components/authority/AuthorityHub";
import { SECURITY_SECTIONS } from "@/lib/authority/security";
import { CONTACTS } from "@/lib/shared/config/contacts";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Security Center",
  description:
    "Security portal for Stankings Group — responsible disclosure, infrastructure principles, and incident response.",
  path: "/security",
});

export default function SecurityCenterPage() {
  return (
    <AuthorityHub
      eyebrow="Security Center"
      title="Security for the ecosystem"
      description={`Professional security coordination for Stankings HQ and routing for product vulnerabilities. Primary contact: ${CONTACTS.security}.`}
      originNotice={`Security standards originate at HQ. Product companies implement controls on their own infrastructure. Report vulnerabilities to ${CONTACTS.security} — see also /.well-known/security.txt.`}
      sections={SECURITY_SECTIONS}
      contactEmail={CONTACTS.security}
      contactLabel="Security"
    />
  );
}
