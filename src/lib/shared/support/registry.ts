import { CONTACTS } from "@/lib/shared/config/contacts";
import { COMPANY_REGISTRY, getCompany } from "@/lib/shared/company/registry";

export interface SupportQueueRecord {
  id: string;
  name: string;
  description: string;
  email: string;
  topics: string[];
  domain?: string;
  url?: string;
  companyId?: string;
}

export const SUPPORT_REGISTRY: SupportQueueRecord[] = [
  {
    id: "general",
    name: "General",
    description: "Institutional partnerships, media routing, and non-product enquiries.",
    email: CONTACTS.hello,
    topics: ["Partnerships", "Institutional membership", "Governance", "Press routing"],
  },
  {
    id: "hq",
    name: "Stankings HQ",
    description: "stankings.com, member access, careers, and institutional portals.",
    email: CONTACTS.support,
    topics: ["Member access", "Library access", "Careers applications", "Website issues"],
    domain: "stankings.com",
    url: "https://stankings.com",
    companyId: "hq",
  },
  {
    id: "bamsignal",
    name: "BamSignal",
    description: "Relationships, identity, and community product support.",
    email: getCompany("bamsignal")!.supportEmail,
    topics: ["Account access", "Verification", "Safety reports", "App issues"],
    domain: "bamsignal.com",
    url: "https://bamsignal.com",
    companyId: "bamsignal",
  },
  {
    id: "yike",
    name: "Yike",
    description: "Marketplace listings, vendors, and trust operations.",
    email: getCompany("yike")!.supportEmail,
    topics: ["Listings", "Vendor accounts", "Verification", "Disputes"],
    domain: "yike.ng",
    url: "https://yike.ng",
    companyId: "yike",
  },
  {
    id: "bayright",
    name: "BayRight",
    description: "Payments, escrow, bills, and wallet support.",
    email: getCompany("bayright")!.supportEmail,
    topics: ["Transactions", "Escrow", "Bill payments", "KYC & compliance"],
    domain: "bayright.com",
    url: "https://bayright.com",
    companyId: "bayright",
  },
  {
    id: "foundation",
    name: "Foundation",
    description: "Community and social impact programme enquiries.",
    email: CONTACTS.foundation,
    topics: ["Programmes", "Partnerships", "Community initiatives"],
    companyId: "stankings-foundation",
  },
  {
    id: "institute",
    name: "Institute",
    description: "Custodian Programme and leadership development enquiries.",
    email: CONTACTS.hello,
    topics: ["Custodian Programme", "Curriculum", "Leadership development"],
    companyId: "stankings-institute",
  },
];

export const SUPPORT_FAQS = [
  {
    question: "Where do institutional policies live?",
    answer:
      "Trust, Security, Legal, Support, and Compliance policies originate at Stankings HQ (stankings.com). Products implement them; they do not publish conflicting institutional policies.",
  },
  {
    question: "How do I reach the right product team?",
    answer:
      "Use the product selector on the Support Center. Each queue has a dedicated email. HQ does not operate product databases.",
  },
  {
    question: "How do I report a security vulnerability?",
    answer: `Email ${CONTACTS.security} or see the Security Center. Do not use public social channels for sensitive reports.`,
  },
  {
    question: "How do I request my data?",
    answer: `HQ-held data: ${CONTACTS.privacy}. Product-held data: select the product queue in Support.`,
  },
  {
    question: "Where is system status?",
    answer:
      "https://stankings.com/status — we do not publish fabricated uptime percentages.",
  },
] as const;

export const SUPPORT_KNOWLEDGE_BASE = [
  { title: "Trust Center", href: "/trust", summary: "Privacy, safety, verification, and user rights." },
  { title: "Security Center", href: "/security", summary: "Disclosure, encryption, and incident response." },
  { title: "Legal Center", href: "/legal", summary: "Terms, privacy, cookies, and compliance documents." },
  { title: "Compliance Center", href: "/compliance", summary: "Regulatory and institutional compliance orientation." },
  { title: "Status", href: "/status", summary: "Service health without invented metrics." },
  { title: "Constitution", href: "/constitution", summary: "Institutional governing structure." },
] as const;

export function getSupportQueue(id: string): SupportQueueRecord | undefined {
  return SUPPORT_REGISTRY.find((q) => q.id === id);
}

export function getSupportEmailForCompany(companyId: string): string {
  const company = COMPANY_REGISTRY.find((c) => c.id === companyId);
  return company?.supportEmail ?? CONTACTS.support;
}

export function listSupportQueues(): SupportQueueRecord[] {
  return SUPPORT_REGISTRY;
}
