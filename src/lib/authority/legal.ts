import type { AuthorityArticle, AuthoritySection } from "./types";

export const LEGAL_ORIGIN_NOTICE =
  "Legal policies for institutional properties originate at Stankings HQ. Product companies may publish product-specific terms on their domains; those terms must not contradict HQ institutional standards.";

export const LEGAL_SECTIONS: AuthoritySection[] = [
  { slug: "terms", title: "Terms of Use", summary: "Terms governing use of stankings.com.", href: "/legal/terms" },
  { slug: "privacy", title: "Privacy Policy", summary: "Institutional privacy policy.", href: "/legal/privacy" },
  { slug: "cookies", title: "Cookie Policy", summary: "Cookies and similar technologies.", href: "/legal/cookies" },
  { slug: "acceptable-use", title: "Acceptable Use", summary: "Prohibited uses of institutional properties.", href: "/legal/acceptable-use" },
  { slug: "trademark", title: "Trademark", summary: "Stankings names and marks.", href: "/legal/trademark" },
  { slug: "copyright", title: "Copyright", summary: "Ownership of institutional content.", href: "/legal/copyright" },
  { slug: "licensing", title: "Licensing", summary: "Licensing of institutional materials.", href: "/legal/licensing" },
  { slug: "dmca", title: "DMCA", summary: "Copyright infringement notices.", href: "/legal/dmca" },
  { slug: "compliance", title: "Compliance", summary: "Compliance Center overview.", href: "/compliance" },
  { slug: "accessibility", title: "Accessibility", summary: "Accessibility statement.", href: "/legal/accessibility" },
  { slug: "community-guidelines", title: "Community Guidelines", summary: "Expected conduct.", href: "/legal/community-guidelines" },
  { slug: "data-retention", title: "Data Retention", summary: "Retention schedules.", href: "/legal/data-retention" },
  { slug: "refunds", title: "Refund Policy", summary: "Institutional refund posture.", href: "/legal/refunds" },
];

function article(
  slug: string,
  title: string,
  sections: { heading: string; body: string }[],
): AuthorityArticle {
  return { slug, title, lastUpdated: "2026-07-04", sections };
}

/** Extends / replaces prior legal content with HQ-origin policies */
export const LEGAL_ARTICLES: Record<string, AuthorityArticle> = {
  privacy: article("privacy", "Privacy Policy", [
    { heading: "Who we are", body: "Stankings Group Ltd operates stankings.com as institutional headquarters. This policy covers institutional properties. Product user data is governed by product policies that must align with HQ trust principles." },
    { heading: "Data we collect", body: "Member registration, careers applications, support and contact submissions, and technical logs required for security and reliability." },
    { heading: "How we use data", body: "To provide member access, respond to enquiries, operate careers, maintain governance records, and secure institutional systems." },
    { heading: "Sharing", body: "We do not sell personal data. Processors such as authentication and hosting providers act under contract. Products do not receive HQ member data without separate consent." },
    { heading: "Contact", body: "privacy@stankings.com" },
  ]),
  terms: article("terms", "Terms of Use", [
    { heading: "Acceptance", body: "By using stankings.com you agree to these terms and Acceptable Use." },
    { heading: "Institutional content", body: "Constitutional text, library materials, and governance documents are protected. Member access does not confer redistribution rights." },
    { heading: "No product services", body: "stankings.com does not provide marketplace, social, or payment services. Those are offered by independent companies under their own terms." },
    { heading: "Limitation of liability", body: "Institutional content is informational. To the extent permitted by law, Stankings Group is not liable for indirect or consequential damages arising from use of this site." },
  ]),
  cookies: article("cookies", "Cookie Policy", [
    { heading: "Essential cookies", body: "Authentication session cookies for member sign-in. Required for library access." },
    { heading: "Analytics", body: "We minimize third-party tracking. Any analytics enabled in production will be disclosed here." },
    { heading: "Control", body: "Clear cookies via browser settings. Essential cookies are required for authenticated features." },
  ]),
  "acceptable-use": article("acceptable-use", "Acceptable Use Policy", [
    { heading: "Prohibited conduct", body: "Unauthorized access, scraping of member-only content, malware, spam, and attempts to disrupt institutional systems." },
    { heading: "Enforcement", body: "Violations may result in account suspension, legal action, or referral to authorities." },
  ]),
  trademark: article("trademark", "Trademark", [
    { heading: "Marks", body: "Stankings, Stankings Group, and related logos are trademarks or trade names of Stankings Group Ltd or its companies." },
    { heading: "Use", body: "Do not use marks in a way that implies endorsement without written permission. Press may use marks for accurate reporting." },
    { heading: "Contact", body: "legal@stankings.com" },
  ]),
  copyright: article("copyright", "Copyright", [
    { heading: "Ownership", body: "Content on stankings.com is owned by Stankings Group Ltd or licensed to it, unless otherwise stated." },
    { heading: "Member materials", body: "Access to Library materials does not transfer copyright." },
  ]),
  licensing: article("licensing", "Licensing", [
    { heading: "Institutional materials", body: "Licensing of brand assets or documents requires written permission from HQ." },
    { heading: "Press kit", body: "Accredited media may use press kit assets for accurate reporting per Press guidelines." },
    { heading: "Contact", body: "press@stankings.com for brand; legal@stankings.com for licensing." },
  ]),
  dmca: article("dmca", "DMCA / Copyright Notices", [
    { heading: "Notices", body: "Copyright infringement notices regarding institutional content: legal@stankings.com with sufficient detail to identify the work and location." },
    { heading: "Product content", body: "Notices regarding product-hosted content should be directed to the product company via Support." },
    { heading: "Counter-notices", body: "If applicable law provides counter-notice procedures, include them in correspondence to legal@stankings.com." },
  ]),
  compliance: article("compliance", "Compliance", [
    { heading: "Compliance Center", body: "Shared compliance resources are published at /compliance. Legal documents remain in the Legal Center." },
  ]),
  accessibility: article("accessibility", "Accessibility Statement", [
    { heading: "Commitment", body: "We aim to meet WCAG 2.1 Level AA for public institutional pages." },
    { heading: "Feedback", body: "accessibility@stankings.com — include page URL and description of the barrier." },
    { heading: "Known limitations", body: "Some member library documents may predate current accessibility standards; remediation is ongoing." },
  ]),
  "community-guidelines": article("community-guidelines", "Community Guidelines", [
    { heading: "Respect", body: "Treat members, candidates, and institutional representatives with dignity." },
    { heading: "Integrity", body: "Do not impersonate leadership or misrepresent affiliation." },
  ]),
  "data-retention": article("data-retention", "Data Retention", [
    { heading: "Member accounts", body: "Retained while active and for a reasonable period after closure for governance and legal compliance." },
    { heading: "Careers applications", body: "Typically retained up to 24 months unless law or consent requires longer." },
    { heading: "Logs", body: "Security and access logs retained up to 12 months unless needed for investigation." },
  ]),
  refunds: article("refunds", "Refund Policy", [
    { heading: "Institutional services", body: "stankings.com does not charge for public access or institutional membership." },
    { heading: "Product billing", body: "Product refunds are governed by each product’s policy via Support." },
  ]),
};

export function getLegalArticle(slug: string): AuthorityArticle | undefined {
  return LEGAL_ARTICLES[slug];
}
