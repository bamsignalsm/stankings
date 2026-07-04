import type { AuthorityArticle, AuthoritySection } from "./types";
import {
  TRUST_ORIGIN_NOTICE,
  TRUST_REGISTRY,
} from "@/lib/shared/trust/registry";
import { CONTACTS } from "@/lib/shared/config/contacts";

export { TRUST_ORIGIN_NOTICE };

export const TRUST_SECTIONS: AuthoritySection[] = TRUST_REGISTRY.map((t) => ({
  slug: t.id,
  title: t.title,
  summary: t.summary,
  href: t.href,
}));

function article(
  slug: string,
  title: string,
  sections: { heading: string; body: string }[],
): AuthorityArticle {
  return { slug, title, lastUpdated: "2026-07-04", sections };
}

export const TRUST_ARTICLES: Record<string, AuthorityArticle> = {
  "trust-principles": article("trust-principles", "Trust Principles", [
    { heading: "Trust is institutional capital", body: "Every material decision is evaluated for its effect on trust. Short-term growth that destroys trust is rejected." },
    { heading: "One authority, many products", body: "Trust principles originate at Stankings HQ. BamSignal, Yike, BayRight, the Foundation, and the Institute implement them; they do not invent conflicting institutional standards." },
    { heading: "Operational independence", body: "Products keep separate runtimes, databases, authentication, and payments. Shared trust policy does not mean shared infrastructure." },
    { heading: "Evidence over claims", body: "Trust claims require evidence. Status pages, disclosures, and verification processes must not invent metrics." },
  ]),
  privacy: article("privacy", "Privacy", [
    { heading: "HQ policy origin", body: "Institutional privacy commitments are published in the Legal Center and Trust Center. Product-specific processing is described on product domains and must align with HQ principles." },
    { heading: "No silent data pooling", body: "HQ does not pool product user databases. Cross-product data use requires lawful basis and explicit consent where required." },
    { heading: "Requests", body: `Institutional data requests: ${CONTACTS.privacy}. Product data requests are routed through Support to the correct product queue.` },
  ]),
  security: article("security", "Security", [
    { heading: "Security Center", body: "Operational security guidance, disclosure, and infrastructure overview live in the Security Center at /security." },
    { heading: "Contact", body: `${CONTACTS.security} — primary channel for vulnerability reports and security coordination.` },
  ]),
  "responsible-ai": article("responsible-ai", "Responsible AI", [
    { heading: "Human accountability", body: "AI may assist explanation and operations. Material institutional decisions remain human responsibilities under the Constitution and Canons." },
    { heading: "No autonomous constitutional authority", body: "AI systems do not amend the Constitution, approve leadership appointments, or close incidents without human review." },
    { heading: "Transparency", body: "Where AI materially affects users, products should disclose use in plain language and provide human escalation paths." },
  ]),
  transparency: article("transparency", "Transparency", [
    { heading: "What we publish", body: "Trust Center, Security Center, Legal Center, Support Center, Compliance Center, and System Status are public HQ resources." },
    { heading: "What we do not invent", body: "We do not publish fabricated uptime percentages, awards, customer counts, or incident histories." },
    { heading: "Reports", body: "Formal transparency summaries are published when reporting periods close. Interim status appears on the Status page when material." },
  ]),
  "identity-verification": article("identity-verification", "Identity Verification", [
    { heading: "Purpose", body: "Verification exists to increase safety and reduce fraud — not to create surveillance without lawful basis." },
    { heading: "Product implementation", body: "Each product implements verification appropriate to its risk. HQ sets principles; products operate controls." },
    { heading: "Member access", body: "Stankings HQ member access requires verified email and approval for institutional documents." },
  ]),
  "verification-standards": article("verification-standards", "Verification Standards", [
    { heading: "Evidence", body: "Verification claims must be backed by documented checks appropriate to the claim (identity, asset, payment, or reputation)." },
    { heading: "No false assurance", body: "Products must not imply HQ guarantees outcomes it does not control." },
    { heading: "Appeals", body: `Users may challenge verification outcomes through product support, with escalation to ${CONTACTS.trust} for institutional matters.` },
  ]),
  "community-standards": article("community-standards", "Community Standards", [
    { heading: "Respect", body: "Harassment, discrimination, and impersonation of Stankings institutions or leaders are prohibited." },
    { heading: "Integrity", body: "Do not misrepresent affiliation with Stankings Group or its companies." },
    { heading: "Enforcement", body: "Products enforce community standards on their platforms. HQ may revoke institutional membership for serious violations." },
  ]),
  safety: article("safety", "Safety", [
    { heading: "User safety", body: `Users should verify official domains, report harm through product channels first, and escalate urgent institutional matters to ${CONTACTS.trust}.` },
    { heading: "Platform safety", body: "Operating companies maintain abuse reporting and escalation. HQ publishes shared principles here." },
    { heading: "Financial safety", body: "Payments are handled by BayRight and product billing systems — never by unsolicited email requests for credentials." },
  ]),
  "incident-reports": article("incident-reports", "Incident Reports", [
    { heading: "Material incidents", body: "Material incidents require review, root cause analysis, lessons learned, preventive plans, and Library updates before closure under institutional standards." },
    { heading: "Public status", body: "When an incident affects public services, Status reflects known impact without inventing timelines or metrics." },
    { heading: "Reporting", body: `Security incidents: ${CONTACTS.security}. Product outages: product support via /support.` },
  ]),
  "data-requests": article("data-requests", "Data Requests", [
    { heading: "Institutional data", body: `Requests for stankings.com member or careers data: ${CONTACTS.privacy} with identity verification.` },
    { heading: "Product routing", body: "BamSignal, Yike, BayRight, Foundation, and Institute product data are not held in HQ product databases. Use Support to reach the correct queue." },
    { heading: "What to include", body: "Full name, contact email, request type (access, correction, deletion, portability), and account identifiers you control." },
  ]),
  "law-enforcement": article("law-enforcement", "Law Enforcement Requests", [
    { heading: "Legal process", body: `Valid legal process from competent authorities: ${CONTACTS.legal}.` },
    { heading: "Product data", body: "Requests for product-held data must identify the product. Each company maintains independent stores." },
    { heading: "Emergency", body: `Imminent harm: ${CONTACTS.legal} with URGENT in the subject line.` },
  ]),
  "user-rights": article("user-rights", "User Rights", [
    { heading: "Rights", body: "Depending on applicable law, individuals may request access, correction, deletion, portability, and restriction of processing for data HQ controls." },
    { heading: "How to exercise", body: "Use Data Requests for HQ-held data. Use product Support for product-held data." },
    { heading: "No retaliation", body: "Exercising lawful rights does not result in punitive treatment by HQ." },
  ]),
};

export function getTrustArticle(slug: string): AuthorityArticle | undefined {
  return TRUST_ARTICLES[slug];
}
