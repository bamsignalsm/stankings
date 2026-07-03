/**
 * Trust Center body content — public institutional copy
 */

export interface TrustContent {
  slug: string;
  title: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
}

export const TRUST_CONTENT: Record<string, TrustContent> = {
  "privacy-principles": {
    slug: "privacy-principles",
    title: "Privacy Principles",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Institutional independence",
        body: "Stankings Group operates stankings.com as an institutional headquarters. BamSignal, Yike, and BayRight maintain separate databases, authentication systems, and privacy policies. We reference one another; we do not commingle user data without explicit consent and lawful basis.",
      },
      {
        heading: "Purpose limitation",
        body: "We collect only what is necessary for institutional membership, governance communications, careers, and trust operations. Product platforms collect data under their own policies for product-specific purposes.",
      },
      {
        heading: "Transparency",
        body: "Privacy policies, cookie disclosures, and data retention schedules are published in the Legal Center. Product-specific policies remain on each product domain.",
      },
      {
        heading: "User rights",
        body: "Users may request access, correction, portability, or deletion of institutional data held by Stankings Group via the Data Requests process. Product data requests are routed to the relevant platform.",
      },
    ],
  },
  "security-practices": {
    slug: "security-practices",
    title: "Security Practices",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Baseline expectations",
        body: "Stankings Group applies defense-in-depth across institutional properties: TLS everywhere, least-privilege access, verified member authentication, and audit logging for governance surfaces.",
      },
      {
        heading: "Product separation",
        body: "Each live platform maintains its own security posture, incident response, and provider certifications. BayRight financial operations follow enhanced controls appropriate to payment infrastructure.",
      },
      {
        heading: "Monitoring",
        body: "Operational health is published on the public System Status page. Security-sensitive controls remain internal — this page is informational only.",
      },
      {
        heading: "Reporting",
        body: "Security researchers should follow our Responsible Disclosure process. Reports are triaged in good faith with safe harbor for good-faith research.",
      },
    ],
  },
  "responsible-disclosure": {
    slug: "responsible-disclosure",
    title: "Responsible Disclosure",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Scope",
        body: "We welcome good-faith reports affecting stankings.com and institutional properties. For BamSignal, Yike, or BayRight, include the product name in your report — we will route appropriately.",
      },
      {
        heading: "How to report",
        body: "Email security@stankings.com with a clear description, reproduction steps, and impact assessment. Encrypt sensitive details if needed — request a PGP key in your initial message.",
      },
      {
        heading: "Safe harbor",
        body: "We will not pursue legal action against researchers who act in good faith, avoid privacy violations, do not degrade service availability, and give us reasonable time to remediate before public disclosure.",
      },
      {
        heading: "Response timeline",
        body: "We aim to acknowledge reports within 3 business days and provide a substantive update within 15 business days for verified issues.",
      },
    ],
  },
  "data-requests": {
    slug: "data-requests",
    title: "Data Requests",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Institutional data",
        body: "Requests relating to stankings.com member accounts, careers applications, or institutional communications should be sent to privacy@stankings.com with sufficient identity verification.",
      },
      {
        heading: "Product routing",
        body: "BamSignal → support@bamsignal.com. Yike → support@yike.ng. BayRight → support@bayright.com. Stankings Group will not access product databases on your behalf without lawful process.",
      },
      {
        heading: "What to include",
        body: "Your full name, contact email, description of the request (access, correction, deletion, portability), and any account identifiers you control.",
      },
    ],
  },
  "law-enforcement": {
    slug: "law-enforcement",
    title: "Law Enforcement Requests",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Legal process",
        body: "Stankings Group responds to valid legal process from competent authorities. Requests must be specific, legally valid, and sent to legal@stankings.com.",
      },
      {
        heading: "Product routing",
        body: "Requests for user data held by BamSignal, Yike, or BayRight should identify the product. Each platform maintains independent data stores and may require direct service on that entity.",
      },
      {
        heading: "Emergency requests",
        body: "Imminent harm situations may be escalated via legal@stankings.com with 'URGENT' in the subject line. We evaluate emergency disclosures under applicable law.",
      },
      {
        heading: "Transparency",
        body: "Where permitted, aggregate request volumes appear in Transparency Reports.",
      },
    ],
  },
  "account-recovery": {
    slug: "account-recovery",
    title: "Account Recovery",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Stankings member accounts",
        body: "Institutional library access requires a verified email and super admin approval. Recovery: use Sign In → forgot password, or email support@stankings.com from your registered address.",
      },
      {
        heading: "Product accounts",
        body: "BamSignal, Yike, and BayRight each operate independent account systems. Use the product's sign-in recovery flow or contact that product's support team.",
      },
      {
        heading: "Cross-platform identity",
        body: "Trust relationships may span platforms, but credentials do not. Recover each account through its home product.",
      },
    ],
  },
  "transparency-reports": {
    slug: "transparency-reports",
    title: "Transparency Reports",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Publication cadence",
        body: "Stankings Group will publish annual transparency summaries covering law enforcement requests, trust actions, and significant incidents affecting institutional properties.",
      },
      {
        heading: "2026 inaugural report",
        body: "The first full transparency report is scheduled for Q1 2027, covering the inaugural public launch period. Interim incident summaries appear on the System Status page.",
      },
    ],
  },
  "platform-safety": {
    slug: "platform-safety",
    title: "Platform Safety",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Ecosystem posture",
        body: "Live platforms are expected to maintain abuse reporting, verification where appropriate, and escalation paths for safety-critical issues.",
      },
      {
        heading: "Institutional role",
        body: "Stankings Group sets constitutional standards and publishes trust resources. Day-to-day moderation and enforcement occur on each product.",
      },
      {
        heading: "Reporting harm",
        body: "Report urgent safety issues to the relevant product support channel first. Institutional escalation: trust@stankings.com.",
      },
    ],
  },
  "user-safety": {
    slug: "user-safety",
    title: "User Safety",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Verify before you trust",
        body: "Use official domains: stankings.com, bamsignal.com, yike.ng, bayright.com. Be cautious of impersonation — Stankings Group will never ask for your product password via email.",
      },
      {
        heading: "Financial safety",
        body: "BayRight handles payments. Confirm transaction details in-app before authorizing. Report suspected fraud to support@bayright.com immediately.",
      },
      {
        heading: "Community safety",
        body: "BamSignal and Yike provide in-product reporting. Block, report, and preserve evidence for serious incidents.",
      },
    ],
  },
};

export function getTrustContent(slug: string): TrustContent | undefined {
  return TRUST_CONTENT[slug];
}
