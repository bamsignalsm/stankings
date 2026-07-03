/**
 * Legal Center body content — public institutional copy
 */

export interface LegalContent {
  slug: string;
  title: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
}

export const LEGAL_CONTENT: Record<string, LegalContent> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Who we are",
        body: "Stankings Group Ltd operates stankings.com as the institutional headquarters of the Stankings ecosystem. This policy covers institutional properties only — not BamSignal, Yike, or BayRight user data.",
      },
      {
        heading: "Data we collect",
        body: "Member registration (name, email), careers applications, contact form submissions, and technical logs (IP, browser, pages visited) for security and performance.",
      },
      {
        heading: "How we use data",
        body: "To provide member access, respond to enquiries, publish careers, maintain governance records, and secure institutional systems.",
      },
      {
        heading: "Sharing",
        body: "We do not sell personal data. We use Supabase for authentication and database services. Product platforms do not receive institutional member data without separate consent.",
      },
      {
        heading: "Contact",
        body: "privacy@stankings.com",
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of Use",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Acceptance",
        body: "By using stankings.com you agree to these terms and our Acceptable Use Policy.",
      },
      {
        heading: "Institutional content",
        body: "Constitutional text, library materials, and governance documents are protected intellectual property. Member access does not confer redistribution rights.",
      },
      {
        heading: "No product services",
        body: "stankings.com does not provide marketplace, social, or payment services. Those are offered by independent platforms under their own terms.",
      },
      {
        heading: "Limitation of liability",
        body: "Institutional content is provided for informational purposes. To the extent permitted by law, Stankings Group is not liable for indirect or consequential damages arising from use of this site.",
      },
    ],
  },
  "community-guidelines": {
    slug: "community-guidelines",
    title: "Community Guidelines",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Respect",
        body: "Treat members, candidates, and institutional representatives with dignity. Harassment and discrimination are prohibited.",
      },
      {
        heading: "Integrity",
        body: "Do not misrepresent affiliation with Stankings Group or its companies. Do not impersonate leadership or members.",
      },
      {
        heading: "Governance",
        body: "Institutional discussions — especially in member spaces — should reflect the Stankings Canons: truth, stewardship, and long-term thinking.",
      },
    ],
  },
  "acceptable-use": {
    slug: "acceptable-use",
    title: "Acceptable Use Policy",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Prohibited conduct",
        body: "Unauthorized access, scraping of member-only content, malware distribution, spam, and attempts to disrupt institutional systems.",
      },
      {
        heading: "Enforcement",
        body: "Violations may result in account suspension, legal action, or referral to authorities where appropriate.",
      },
    ],
  },
  cookies: {
    slug: "cookies",
    title: "Cookie Policy",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Essential cookies",
        body: "Authentication session cookies for member sign-in. Required for library and constitution access.",
      },
      {
        heading: "Analytics",
        body: "We minimize third-party tracking on institutional properties. Any analytics in use will be disclosed here when enabled in production.",
      },
      {
        heading: "Control",
        body: "You may clear cookies via browser settings. Essential cookies are required for authenticated features.",
      },
    ],
  },
  "data-retention": {
    slug: "data-retention",
    title: "Data Retention",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Member accounts",
        body: "Retained while active and for a reasonable period after closure for governance and legal compliance.",
      },
      {
        heading: "Careers applications",
        body: "Retained per recruitment policy — typically 24 months unless a longer period is required by law or candidate consent.",
      },
      {
        heading: "Logs",
        body: "Security and access logs retained up to 12 months unless needed for incident investigation.",
      },
    ],
  },
  refunds: {
    slug: "refunds",
    title: "Refund Policy",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Institutional services",
        body: "stankings.com does not charge for public access or institutional membership. No institutional refunds apply.",
      },
      {
        heading: "Product billing",
        body: "Payments for BamSignal, Yike, or BayRight services are governed by each product's refund policy. Contact the relevant product support team.",
      },
    ],
  },
  accessibility: {
    slug: "accessibility",
    title: "Accessibility Statement",
    lastUpdated: "2026-07-03",
    sections: [
      {
        heading: "Commitment",
        body: "Stankings Group aims to meet WCAG 2.1 Level AA for public institutional pages. We continuously improve semantic structure, contrast, keyboard navigation, and screen reader compatibility.",
      },
      {
        heading: "Feedback",
        body: "Report accessibility barriers to accessibility@stankings.com. Include the page URL and description of the issue.",
      },
      {
        heading: "Known limitations",
        body: "Some legacy library documents may predate current accessibility standards. Member-facing remediation is ongoing.",
      },
    ],
  },
};

export function getLegalContent(slug: string): LegalContent | undefined {
  return LEGAL_CONTENT[slug];
}
