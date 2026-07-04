import type { AuthorityArticle, AuthoritySection } from "./types";
import { CONTACTS } from "@/lib/shared/config/contacts";

export const SECURITY_CONTACT = CONTACTS.security;

export const SECURITY_SECTIONS: AuthoritySection[] = [
  { slug: "responsible-disclosure", title: "Responsible Disclosure", summary: "Safe harbor for good-faith security research.", href: "/security/responsible-disclosure" },
  { slug: "vulnerability-reporting", title: "Vulnerability Reporting", summary: "How to report vulnerabilities to HQ.", href: "/security/vulnerability-reporting" },
  { slug: "bug-reporting", title: "Bug Reporting", summary: "Non-security defects and product bugs.", href: "/security/bug-reporting" },
  { slug: "infrastructure-overview", title: "Infrastructure Overview", summary: "High-level architecture principles — no sensitive internals.", href: "/security/infrastructure-overview" },
  { slug: "encryption", title: "Encryption", summary: "Transport and data protection expectations.", href: "/security/encryption" },
  { slug: "authentication", title: "Authentication", summary: "Identity and access standards.", href: "/security/authentication" },
  { slug: "infrastructure-security", title: "Infrastructure Security", summary: "Baseline controls for institutional systems.", href: "/security/infrastructure-security" },
  { slug: "cloud-architecture", title: "Cloud Architecture", summary: "Independence and separation principles.", href: "/security/cloud-architecture" },
  { slug: "incident-response", title: "Incident Response", summary: "How security incidents are handled.", href: "/security/incident-response" },
];

function article(
  slug: string,
  title: string,
  sections: { heading: string; body: string }[],
): AuthorityArticle {
  return { slug, title, lastUpdated: "2026-07-04", sections };
}

export const SECURITY_ARTICLES: Record<string, AuthorityArticle> = {
  "responsible-disclosure": article("responsible-disclosure", "Responsible Disclosure", [
    { heading: "Scope", body: "Good-faith reports affecting stankings.com and institutional properties. Include the product name for BamSignal, Yike, BayRight, Foundation, or Institute issues — HQ routes appropriately." },
    { heading: "How to report", body: `Email ${CONTACTS.security} with description, reproduction steps, and impact. Request a PGP key in your initial message if you need encrypted exchange.` },
    { heading: "Safe harbor", body: "We will not pursue legal action against researchers who act in good faith, avoid privacy violations, do not degrade availability, and give reasonable time to remediate before public disclosure." },
    { heading: "Timeline", body: "We aim to acknowledge within three business days and provide a substantive update within fifteen business days for verified issues." },
  ]),
  "vulnerability-reporting": article("vulnerability-reporting", "Vulnerability Reporting", [
    { heading: "Primary channel", body: CONTACTS.security },
    { heading: "security.txt", body: "Machine-readable contact is published at /.well-known/security.txt." },
    { heading: "Do not", body: "Do not access other users’ data, disrupt services, or demand payment as a condition of disclosure." },
  ]),
  "bug-reporting": article("bug-reporting", "Bug Reporting", [
    { heading: "Security vs product bugs", body: `Security vulnerabilities go to ${CONTACTS.security}. Functional product bugs go through Support to the correct product queue.` },
    { heading: "HQ website bugs", body: `Defects on stankings.com: ${CONTACTS.support} with steps to reproduce.` },
  ]),
  "infrastructure-overview": article("infrastructure-overview", "Infrastructure Overview", [
    { heading: "HQ", body: "stankings.com is a Next.js application deployed in containers behind TLS. Institutional membership uses Supabase authentication." },
    { heading: "Products", body: "BamSignal, Yike, and BayRight operate independent stacks. HQ does not host their production databases." },
    { heading: "No sensitive diagrams", body: "Detailed network maps and credentials are never published on this portal." },
  ]),
  encryption: article("encryption", "Encryption", [
    { heading: "In transit", body: "Public institutional properties require TLS. Clients should reject cleartext credentials." },
    { heading: "At rest", body: "Managed database and storage providers apply encryption at rest according to their platforms. Product companies apply their own controls." },
  ]),
  authentication: article("authentication", "Authentication", [
    { heading: "HQ members", body: "Library and constitution access require verified email and approved membership." },
    { heading: "Products", body: "Each product operates its own authentication. Credentials are not shared across products." },
    { heading: "Admin access", body: "Energy console access is limited to approved super administrators." },
  ]),
  "infrastructure-security": article("infrastructure-security", "Infrastructure Security", [
    { heading: "Baseline", body: "Least privilege, security headers, dependency hygiene, and audit logging for governance surfaces." },
    { heading: "Secrets", body: "Secrets are injected at deploy time — never committed to source control." },
  ]),
  "cloud-architecture": article("cloud-architecture", "Cloud Architecture", [
    { heading: "Separation", body: "No shared runtime, databases, authentication, or payments between HQ and products." },
    { heading: "Shared identity only", body: "HQ publishes trust, legal, support, compliance, and status. Products implement operations." },
  ]),
  "incident-response": article("incident-response", "Incident Response", [
    { heading: "Detection and triage", body: "Security reports are triaged by severity. Material incidents follow institutional accountability standards." },
    { heading: "Communication", body: "Affected users are notified as required by law and institutional policy. Status reflects known impact without fabricated metrics." },
    { heading: "Closure", body: "Material incidents require review, root cause, lessons learned, and preventive plans before closure." },
  ]),
};

export function getSecurityArticle(slug: string): AuthorityArticle | undefined {
  return SECURITY_ARTICLES[slug];
}
