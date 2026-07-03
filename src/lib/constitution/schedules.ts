/**
 * Constitutional Schedules — evolving operational detail attached to Volume I
 */

export interface ConstitutionSchedule {
  id: string;
  letter: string;
  title: string;
  description: string;
  status: "active" | "forming";
  href?: string;
  items: string[];
}

export const CONSTITUTION_SCHEDULES: ConstitutionSchedule[] = [
  {
    id: "schedule-a",
    letter: "A",
    title: "Current Institutions of Stankings Group",
    description: "Operating and forming institutions within the constitutional ecosystem.",
    status: "active",
    href: "/library/ecosystem-architecture",
    items: [
      "Yike — Marketplace Excellence",
      "BamSignal — Relationship Excellence",
      "BayRight — Financial Excellence",
      "Stanhan Real Estate — Property Excellence",
      "Stankings Auto Hub — Automotive Excellence",
      "Stankings Logistics — Logistics Excellence",
      "Hannahkings Gadgets — Technology Procurement Excellence",
      "Hannahkings Education — Educational Excellence",
      "The Stankings Institute — Leadership Excellence",
      "Stankings Foundation — Social Impact Excellence",
      "The Stankings Venture Studio — Innovation Excellence (forming)",
    ],
  },
  {
    id: "schedule-b",
    letter: "B",
    title: "Shared Platforms",
    description: "Institutional nervous system — shared before duplicated.",
    status: "active",
    href: "/library/platforms",
    items: [
      "YIKE Passport & Identity",
      "Trust & Verification",
      "Trust Graph",
      "Institutional AI",
      "Knowledge Library",
      "BayRight Escrow & Payments",
      "Notifications",
      "Authentication",
      "Analytics & Intelligence",
      "Cybersecurity",
      "Developer APIs",
    ],
  },
  {
    id: "schedule-c",
    letter: "C",
    title: "Governance Committees",
    description: "Constitutional and operating governance bodies.",
    status: "forming",
    href: "/library/governance",
    items: [
      "Board of Directors",
      "Library Council",
      "Audit & Risk Committee (planned)",
      "Innovation & Venture Committee (planned)",
      "Constitutional Review Committee (planned)",
    ],
  },
  {
    id: "schedule-d",
    letter: "D",
    title: "Reserved Powers Register",
    description: "Decisions reserved to the Board per Article IV.",
    status: "active",
    href: "/library/governance",
    items: [
      "Constitutional amendments",
      "Admission of new institutions",
      "Material acquisitions and divestitures",
      "Appointment of constitutional officers",
      "Reserved powers per FRAMEWORK-CGOV-001",
    ],
  },
  {
    id: "schedule-e",
    letter: "E",
    title: "Constitutional Definitions",
    description: "Authoritative terms for Volume I interpretation.",
    status: "active",
    href: "/library/constitution#definitions",
    items: ["Custodian", "Stewardship", "Institution", "Canon", "Endurance"],
  },
  {
    id: "schedule-f",
    letter: "F",
    title: "Required Institutional Registers",
    description: "Registers mandated by the Constitution and Executive Decisions.",
    status: "active",
    items: [
      "Institutional Identity Statements (ED 29)",
      "Institutional Decision Register (ED 34)",
      "Constitutional Asset Register (ED 35)",
      "Governance Architecture Register (ED 36)",
      "Institutional Ecosystem Register (ED 37)",
      "Register of Constitutional Institutions (ED 38)",
      "Annual Integrity Declarations (ED 39)",
      "Constitutional Information Governance Framework (ED 40)",
      "Knowledge Governance Framework (ED 41)",
      "Annual Constitutional Stewardship Report (ED 42)",
      "Constitution Register (ED 43)",
      "Leadership Continuity Framework (ED 44)",
      "Constitutional Register of Office Holders (ED 45)",
      "Reserved Powers Register (ED 32)",
    ],
  },
  {
    id: "schedule-g",
    letter: "G",
    title: "Constitutional Review Calendar",
    description: "Periodic reviews mandated by the Constitution.",
    status: "forming",
    items: [
      "Annual stewardship declarations (Art. III)",
      "Annual constitutional leadership reviews (Art. V)",
      "Annual asset stewardship review (Art. VII)",
      "Annual ecosystem register review (Art. IX / ED 37)",
      "Periodic institutional constitutional review (Art. X)",
      "Generational review for major initiatives (CANON-006)",
    ],
  },
  {
    id: "schedule-h",
    letter: "H",
    title: "Innovation & Venture Development Framework",
    description: "Operational framework for institutional innovation per Article X — evolves without constitutional amendment.",
    status: "forming",
    href: "/library/innovation-portal",
    items: [
      "The Stankings Venture Studio",
      "Family Innovation Programme",
      "Employee Innovation Programme",
      "University & Research Partnerships (planned)",
      "Prototype Funding Framework",
      "Innovation Evaluation Criteria",
      "Venture Review Committee (planned)",
      "Intellectual Property Principles",
      "Commercialization Process",
      "Spin-out and New Institution Process",
    ],
  },
];

export function getConstitutionSchedule(id: string): ConstitutionSchedule | undefined {
  return CONSTITUTION_SCHEDULES.find((s) => s.id === id);
}
