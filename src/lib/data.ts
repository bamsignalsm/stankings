import {
  getLegacyCompanies,
  getLiveCompanies,
} from "@/lib/shared/company/registry";
import { HQ_SITE } from "@/lib/shared/config";

export interface Company {
  slug: string;
  name: string;
  legalName: string;
  businessSector: string;
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
  name: HQ_SITE.name,
  domain: HQ_SITE.domain,
  founder: HQ_SITE.founder,
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

/** Live product platforms — derived from company registry */
export const LIVE_PLATFORMS = getLiveCompanies().map((c) => ({
  name: c.name,
  url: c.url,
  domain: c.domain,
  description: c.description,
  color: c.brandColors.primary,
}));

/** Centers of Excellence — derived from company registry */
export const COMPANIES: Company[] = getLegacyCompanies();

export const PILLARS = [
  {
    title: "Commerce",
    subtitle: "Generate wealth",
    description:
      "Operating companies that solve real problems, create employment, and fund the institution's broader mission.",
    companies: [
      "yike",
      "bamsignal",
      "bayright",
      "stanhan",
      "stankings-auto-hub",
      "hannahkings-gadgets",
      "stankings-logistics",
      "stankings-times",
      "stankings-hotel-and-suites",
      "shodis-industries",
    ],
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
