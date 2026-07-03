import type { CanonExtendedMetadata, CanonSection } from "@/lib/canon/types";
import { DEFAULT_INSTITUTIONAL_APPLICATIONS } from "@/lib/canon/types";

export const CANON_001_META = {
  identifier: "CANON-001",
  title: "Institutions Exist to Serve",
  version: "1.0",
  status: "approved" as const,
  importance: 5,
} as const;

export const CANON_001_SECTIONS: CanonSection[] = [
  {
    id: "the-first-principle",
    title: "The First Principle",
    paragraphs: [
      "Institutions exist to serve.",
      "When they cease to serve, they begin to decay.",
      "Commerce exists to create value. Leadership exists to accept responsibility. Knowledge exists to be shared. Trust exists to be earned.",
      "Every institution established under Stankings Group shall therefore seek first to serve faithfully, knowing that enduring prosperity follows enduring usefulness.",
      "Everything else shall be built upon this principle.",
    ],
  },
];

export const CANON_001_EXTENDED: CanonExtendedMetadata = {
  identifier: "CANON-001",
  sections: CANON_001_SECTIONS,
  institutionalApplications: [...DEFAULT_INSTITUTIONAL_APPLICATIONS],
  dependencyUpstream: [
    { identifier: "LS-001", title: "Knowledge Object Standard", href: "/library/standards/ls-001", relationship: "depends_on" },
    { identifier: "LS-002", title: "The Stankings Lexicon", href: "/library/standards/ls-002", relationship: "depends_on" },
  ],
  dependencyDownstream: [
    { identifier: "CANON-002", title: "Trust Is Institutional Capital", href: "/library/canon/CANON-002", relationship: "supports" },
    { identifier: "CANON-003", title: "Purpose Precedes Profit", href: "/library/canon/CANON-003", relationship: "supports" },
    { identifier: "CANON-004", title: "Leadership Is Stewardship", href: "/library/canon/CANON-004", relationship: "supports" },
    { identifier: "constitution", title: "The Constitution", href: "/library/constitution", relationship: "supports" },
  ],
  decisionExamples: {
    good: [
      "Customer-first product design",
      "Transparent pricing",
      "Succession planning for custodians",
      "Community investment programmes",
      "Open knowledge sharing",
    ],
    poor: [
      "Extractive fees without value",
      "Leadership for status alone",
      "Hoarding institutional knowledge",
      "Ignoring customer harm",
      "Short-term profit over service",
    ],
  },
  historicalLessons: {
    lostTrust: [
      "Institutions that forgot whom they serve",
      "Leaders who treated institutions as personal property",
      "Companies that prioritized extraction over usefulness",
    ],
    strengthenedTrust: [
      "Enduring institutions with clear service missions",
      "Leaders who accepted responsibility without claiming ownership",
      "Organizations that outlived founders through principle",
    ],
  },
  aiSummaries: {
    oneParagraph:
      "CANON-001 establishes that institutions exist to serve — when they cease to serve, they decay. Every Stankings institution must seek faithful service before prosperity.",
    fiveMinute:
      "The foundational canon of Stankings Group: institutions, commerce, leadership, knowledge, trust, wealth, power, innovation, technology, education, justice, and success each exist to serve. This is philosophy, not law — but everything else is built upon it. Custodians inherit responsibility, not privilege. Enduring prosperity follows enduring usefulness.",
    fifteenMinute:
      "Volume 0 opens with the First Principle — institutions exist to serve. When service ends, decay begins. The canon maps each domain (commerce, leadership, knowledge, trust, wealth, power, innovation, technology, education, justice, success) to its service purpose. Stankings Group institutions must seek faithful service first. This canon supports CANON-002 (trust as capital) and CANON-003 (purpose before profit), and informs the Constitution without replacing it.",
  },
};
