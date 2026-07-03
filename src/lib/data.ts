export interface Company {
  slug: string;
  name: string;
  tagline: string;
  excellence: string;
  description: string;
  mission: string;
  services: string[];
  website?: string;
  isLive?: boolean;
  color: string;
  icon: string;
}

export const SITE = {
  name: "Stankings Group",
  domain: "stankings.com",
  founder: "Stanley Ukeje",
  coFounder: "Hannah Ugonma Ukeje",
  motto:
    "We are not building businesses to enrich one generation. We are building institutions that empower generations.",
  brandPromise:
    "When you see the Stankings name, you should feel safer making an important decision.",
  mission:
    "To build trusted institutions that solve meaningful problems, create sustainable prosperity, develop exceptional leaders, and improve society for generations to come.",
  vision:
    "To become one of Africa's most trusted institutional groups, recognized for building enduring businesses, transformative technologies, respected educational institutions, ethical leadership, and lasting social impact.",
  philosophy: [
    "To solve meaningful problems.",
    "To create opportunity.",
    "To increase trust.",
    "To improve human capability.",
    "To strengthen communities.",
    "To leave a legacy worthy of future generations.",
  ],
};

export const LIVE_PLATFORMS = [
  {
    name: "Yike",
    url: "https://yike.ng",
    domain: "yike.ng",
    description: "Nigeria's trusted marketplace for properties, vehicles, and equipment.",
    color: "#0EA5E9",
  },
  {
    name: "BamSignal",
    url: "https://bamsignal.com",
    domain: "bamsignal.com",
    description: "Trusted relationships, verified identity, and community.",
    color: "#EC4899",
  },
  {
    name: "BayRight",
    url: "https://bayright.com",
    domain: "bayright.com",
    description: "Financial infrastructure — escrow, bills, and institutional payments.",
    color: "#10B981",
  },
] as const;

export const COMPANIES: Company[] = [
  {
    slug: "yike",
    name: "Yike",
    tagline: "Nigeria's trusted marketplace infrastructure",
    excellence: "Marketplace Excellence",
    description:
      "Yike operates Africa's most trusted digital marketplace for high-value assets — properties, vehicles, and equipment. As a neutral marketplace platform, Yike never competes with vendors. It provides trust infrastructure, vendor operations, analytics, and marketplace intelligence.",
    mission:
      "To become Nigeria's trusted marketplace infrastructure for high-value assets.",
    services: [
      "Property marketplace",
      "Vehicle marketplace",
      "Equipment & machinery listings",
      "Trust engine & verification",
      "Vendor storefronts",
      "Marketplace intelligence",
      "Enterprise organizations",
    ],
    website: "yike.ng",
    isLive: true,
    color: "#0EA5E9",
    icon: "◆",
  },
  {
    slug: "bamsignal",
    name: "BamSignal",
    tagline: "Trusted relationships & community",
    excellence: "Relationship & Community Excellence",
    description:
      "BamSignal builds trust in human connection — verified identity, reputation, and meaningful relationships. Trust earned on BamSignal flows across the Stankings ecosystem, strengthening every interaction.",
    mission:
      "To provide trusted relationships and social discovery for a generation that values authenticity.",
    services: [
      "Verified matchmaking",
      "Identity & reputation",
      "Community building",
      "Trust network integration",
      "Cross-platform reputation",
    ],
    website: "bamsignal.com",
    isLive: true,
    color: "#EC4899",
    icon: "♥",
  },
  {
    slug: "bayright",
    name: "BayRight",
    tagline: "Financial infrastructure you can trust",
    excellence: "Financial Excellence",
    description:
      "BayRight provides the financial backbone of the Stankings ecosystem — escrow, bill payments, subscriptions, and institutional payment infrastructure. Every high-value transaction across the Group flows through BayRight.",
    mission:
      "To provide trusted financial infrastructure for individuals, businesses, and institutions.",
    services: [
      "Escrow services",
      "Utility bill payments",
      "Institutional payments",
      "Subscription billing",
      "Payment infrastructure",
      "Financial verification",
    ],
    website: "bayright.com",
    isLive: true,
    color: "#10B981",
    icon: "₦",
  },
  {
    slug: "stanhan",
    name: "Stanhan",
    tagline: "Property development & verification",
    excellence: "Property Excellence",
    description:
      "Stanhan is the property development and investment arm of Stankings Group. While Yike operates the marketplace, Stanhan acquires, develops, manages, and verifies real estate — providing professional property verification services that strengthen buyer confidence.",
    mission:
      "To become Africa's most trusted property development and verification company.",
    services: [
      "Property development",
      "Commercial leasing",
      "Residential sales",
      "Property management",
      "Construction & project management",
      "Property verification & due diligence",
      "Valuation & document verification",
    ],
    color: "#8B5CF6",
    icon: "⌂",
  },
  {
    slug: "stankings-auto-hub",
    name: "Stankings Auto Hub",
    tagline: "Africa's most trusted automotive company",
    excellence: "Automotive Excellence",
    description:
      "Stankings Auto Hub is the automotive operating arm of the Group. As a flagship enterprise vendor on Yike, it provides vehicle sales, inspection, verification, fleet services, and import advisory — building the brand trust Stanley Ukeje established as Stankings Autos.",
    mission:
      "To become Africa's most trusted automotive company.",
    services: [
      "Vehicle sales & certified pre-owned",
      "100+ point vehicle inspection",
      "Vehicle verification & history",
      "Fleet & corporate leasing",
      "Import advisory",
      "Vehicle maintenance",
      "Parts import & distribution",
      "Haulage & logistics fleet",
    ],
    color: "#F59E0B",
    icon: "⚙",
  },
  {
    slug: "hannahkings-gadgets",
    name: "Hannahkings Gadgets",
    tagline: "Technology procurement & devices",
    excellence: "Technology Procurement & Device Excellence",
    description:
      "Hannahkings Gadgets supplies every device used across the Stankings ecosystem — from inspection tablets and body cameras to school equipment and office technology. Internal procurement excellence that ensures quality, warranty, and asset tracking.",
    mission:
      "To provide trusted technology procurement for the Group and the public.",
    services: [
      "Consumer electronics",
      "Mobile devices & accessories",
      "Inspection kits & field equipment",
      "School & office technology",
      "Repairs & warranty services",
      "Asset tracking & inventory",
    ],
    color: "#06B6D4",
    icon: "▣",
  },
  {
    slug: "stankings-institute",
    name: "The Stankings Institute",
    tagline: "Leadership & knowledge development",
    excellence: "Leadership & Knowledge Excellence",
    description:
      "The Stankings Institute develops the custodians who will lead the Group for generations. Through the Custodian Programme, leadership curriculum, and institutional knowledge, it ensures every generation is prepared before succession becomes necessary.",
    mission:
      "To develop ethical leaders and preserve institutional knowledge across generations.",
    services: [
      "Custodian Programme",
      "Leadership curriculum",
      "Institutional research",
      "Governance training",
      "Succession planning",
      "Legacy Council stewardship",
    ],
    color: "#6366F1",
    icon: "✦",
  },
  {
    slug: "hannahkings-education",
    name: "Hannahkings Education",
    tagline: "Educational excellence from cradle to career",
    excellence: "Educational Excellence",
    description:
      "Hannahkings Education encompasses the Group's educational institutions — from creche and primary school through technical college to a future university. Education transforms generations and is a permanent pillar of the Stankings mission.",
    mission:
      "To provide world-class education that shapes future leaders and citizens.",
    services: [
      "Hannahkings Academy (Creche–Primary)",
      "Hannahkings College (Technical Secondary)",
      "Hannahkings University (Future)",
      "Professional training",
      "Curriculum development",
    ],
    color: "#14B8A6",
    icon: "✎",
  },
  {
    slug: "stankings-foundation",
    name: "Stankings Foundation",
    tagline: "Community & social impact",
    excellence: "Community & Social Impact Excellence",
    description:
      "The Stankings Foundation exists because serving people is part of the institution's purpose — not for marketing, but for measurable, lasting impact. A minimum of 20% of Group resources are directed toward community and social impact.",
    mission:
      "To create measurable, lasting social impact in the communities we serve.",
    services: [
      "Community development",
      "Charitable initiatives",
      "Social impact programmes",
      "Youth empowerment",
      "Scholarship programmes",
    ],
    color: "#F43F5E",
    icon: "❋",
  },
  {
    slug: "stankings-logistics",
    name: "Stankings Logistics",
    tagline: "Trusted movement of goods",
    excellence: "Logistics Excellence",
    description:
      "Stankings Logistics provides trusted movement across the ecosystem — hauling vehicles from ports, distributing construction materials, moving gadgets and equipment, and offering corporate fleet leasing to Nigeria's leading enterprises.",
    mission:
      "To provide trusted logistics and haulage services across Nigeria and beyond.",
    services: [
      "Corporate fleet leasing",
      "Haulage services",
      "Container logistics",
      "Import & port handling",
      "Construction material distribution",
      "Cross-company supply chain",
    ],
    color: "#78716C",
    icon: "→",
  },
];

export const PILLARS = [
  {
    title: "Commerce",
    subtitle: "Generate wealth",
    description:
      "Operating companies that solve real problems, create employment, and fund the institution's broader mission.",
    companies: ["yike", "bamsignal", "bayright", "stanhan", "stankings-auto-hub", "hannahkings-gadgets", "stankings-logistics"],
  },
  {
    title: "Education",
    subtitle: "Develop people",
    description:
      "Institutions that shape minds, develop leaders, and prepare custodians for generations to come.",
    companies: ["hannahkings-education", "stankings-institute"],
  },
  {
    title: "Society",
    subtitle: "Give back",
    description:
      "Philanthropy and community impact that strengthens the society from which the Group draws its strength.",
    companies: ["stankings-foundation"],
  },
];

export const SUCCESS_DIMENSIONS = [
  {
    title: "Institutional Strength",
    description: "Can the institution survive without depending upon one individual?",
  },
  {
    title: "Human Impact",
    description: "How many lives have genuinely improved because this institution exists?",
  },
  {
    title: "Economic Contribution",
    description: "How much sustainable value has been created for society?",
  },
  {
    title: "Leadership Development",
    description: "How many ethical leaders have been developed?",
  },
  {
    title: "Legacy",
    description: "Will future generations be proud to inherit this institution?",
  },
];

export const CORE_PLATFORM = [
  "Identity & Stankings Passport",
  "Trust & Verification",
  "Consent Management",
  "Security & Audit",
  "Payments Infrastructure",
  "Analytics & Intelligence",
  "AI Services",
  "Developer APIs",
  "Organization Management",
  "Notifications",
];

export function getCompanyBySlug(slug: string): Company | undefined {
  return COMPANIES.find((c) => c.slug === slug);
}
