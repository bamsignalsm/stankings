import type { AuthorityArticle, AuthoritySection } from "./types";
import { CONTACTS } from "@/lib/shared/config/contacts";

export const COMPLIANCE_SECTIONS: AuthoritySection[] = [
  { slug: "overview", title: "Overview", summary: "How compliance is governed at HQ.", href: "/compliance/overview" },
  { slug: "data-protection", title: "Data Protection", summary: "Alignment with privacy and trust principles.", href: "/compliance/data-protection" },
  { slug: "financial", title: "Financial Services", summary: "Product companies hold payment licences and provider obligations.", href: "/compliance/financial" },
  { slug: "records", title: "Records & Retention", summary: "Institutional record-keeping expectations.", href: "/compliance/records" },
  { slug: "reporting", title: "Reporting", summary: "Stewardship and incident reporting discipline.", href: "/compliance/reporting" },
];

function article(
  slug: string,
  title: string,
  sections: { heading: string; body: string }[],
): AuthorityArticle {
  return { slug, title, lastUpdated: "2026-07-04", sections };
}

export const COMPLIANCE_ARTICLES: Record<string, AuthorityArticle> = {
  overview: article("overview", "Compliance Overview", [
    { heading: "HQ origin", body: "Compliance orientation for the ecosystem originates at Stankings HQ. Operating companies implement sector-specific obligations (for example payments) under their own licences and providers." },
    { heading: "No policy forks", body: "Products must not publish institutional compliance statements that contradict HQ Trust, Legal, or Security Centers." },
    { heading: "Contact", body: `${CONTACTS.legal} for institutional compliance questions.` },
  ]),
  "data-protection": article("data-protection", "Data Protection", [
    { heading: "Principles", body: "See Trust Center Privacy and Legal Center Privacy Policy. HQ does not pool product user databases." },
    { heading: "Requests", body: `${CONTACTS.privacy} for HQ-held data; Support for product-held data.` },
  ]),
  financial: article("financial", "Financial Services", [
    { heading: "BayRight", body: "Payment and escrow operations are BayRight’s responsibility, including provider certifications and customer funds handling." },
    { heading: "HQ role", body: "HQ does not process product payments and does not hold customer wallets." },
  ]),
  records: article("records", "Records & Retention", [
    { heading: "Institutional records", body: "Governance records, member accounts, and careers data follow Legal Center retention schedules." },
    { heading: "Product records", body: "Products maintain their own retention schedules consistent with HQ principles and applicable law." },
  ]),
  reporting: article("reporting", "Reporting", [
    { heading: "Stewardship", body: "Annual stewardship reporting measures institutional health beyond financial performance." },
    { heading: "Incidents", body: "Material incidents require review and closure discipline per Trust Center Incident Reports." },
  ]),
};

export function getComplianceArticle(slug: string): AuthorityArticle | undefined {
  return COMPLIANCE_ARTICLES[slug];
}
