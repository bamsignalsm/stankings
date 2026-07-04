export interface SupportQueue {
  slug: string;
  name: string;
  description: string;
  email: string;
  topics: string[];
  /** Product domain when applicable */
  domain?: string;
  url?: string;
}

/** One support platform — HQ routes to the correct queue. Policies originate at HQ. */
export const SUPPORT_QUEUES: SupportQueue[] = [
  {
    slug: "general",
    name: "General",
    description: "Institutional partnerships, media routing, and non-product enquiries.",
    email: "hello@stankings.com",
    topics: ["Partnerships", "Institutional membership", "Governance", "Press routing"],
  },
  {
    slug: "hq",
    name: "Stankings HQ",
    description: "stankings.com, member access, careers, and institutional portals.",
    email: "support@stankings.com",
    topics: ["Member access", "Library access", "Careers applications", "Website issues"],
    domain: "stankings.com",
    url: "https://stankings.com",
  },
  {
    slug: "bamsignal",
    name: "BamSignal",
    description: "Relationships, identity, and community product support.",
    email: "support@bamsignal.com",
    topics: ["Account access", "Verification", "Safety reports", "App issues"],
    domain: "bamsignal.com",
    url: "https://bamsignal.com",
  },
  {
    slug: "yike",
    name: "Yike",
    description: "Marketplace listings, vendors, and trust operations.",
    email: "support@yike.ng",
    topics: ["Listings", "Vendor accounts", "Verification", "Disputes"],
    domain: "yike.ng",
    url: "https://yike.ng",
  },
  {
    slug: "bayright",
    name: "BayRight",
    description: "Payments, escrow, bills, and wallet support.",
    email: "support@bayright.com",
    topics: ["Transactions", "Escrow", "Bill payments", "KYC & compliance"],
    domain: "bayright.com",
    url: "https://bayright.com",
  },
  {
    slug: "foundation",
    name: "Foundation",
    description: "Community and social impact programme enquiries.",
    email: "hello@stankings.com",
    topics: ["Programmes", "Partnerships", "Community initiatives"],
  },
  {
    slug: "institute",
    name: "Institute",
    description: "Custodian Programme and leadership development enquiries.",
    email: "hello@stankings.com",
    topics: ["Custodian Programme", "Curriculum", "Leadership development"],
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
    answer:
      "Email security@stankings.com or see the Security Center. Do not use public social channels for sensitive reports.",
  },
  {
    question: "How do I request my data?",
    answer:
      "HQ-held data: privacy@stankings.com. Product-held data: select the product queue in Support.",
  },
  {
    question: "Where is system status?",
    answer:
      "https://stankings.com/status — we do not publish fabricated uptime percentages.",
  },
];

export const SUPPORT_KNOWLEDGE_BASE = [
  { title: "Trust Center", href: "/trust", summary: "Privacy, safety, verification, and user rights." },
  { title: "Security Center", href: "/security", summary: "Disclosure, encryption, and incident response." },
  { title: "Legal Center", href: "/legal", summary: "Terms, privacy, cookies, and compliance documents." },
  { title: "Compliance Center", href: "/compliance", summary: "Regulatory and institutional compliance orientation." },
  { title: "Status", href: "/status", summary: "Service health without invented metrics." },
  { title: "Constitution", href: "/constitution", summary: "Institutional governing structure." },
];

export function getSupportQueue(slug: string): SupportQueue | undefined {
  return SUPPORT_QUEUES.find((q) => q.slug === slug);
}
