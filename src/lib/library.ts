export const FOUNDERS_DECLARATION = `The Stankings Library exists to preserve the philosophy, governance, architecture, standards and accumulated wisdom of Stankings Group.

It is the permanent body of knowledge through which the institution records its principles, develops its leaders, governs its enterprises and prepares future generations for responsible stewardship.

Unlike technology, markets and products, the Library exists to preserve the ideas that give those things purpose.

Every volume within the Library shall therefore pursue one objective:

To ensure that every generation inherits not merely wealth or companies, but understanding.

The Library shall continually evolve through disciplined revision while remaining faithful to the enduring principles established by the Constitution.

Knowledge recorded within the Library shall be treated as an institutional asset worthy of careful preservation, thoughtful improvement and responsible transmission to future generations.`;

export const FOUNDERS_RESOLUTION_001 = `No document shall be accepted into The Stankings Library unless it meets the standard of timelessness, clarity, internal consistency, and practical usefulness for future generations.`;

export const LIBRARY_DNA = [
  {
    title: "Timeless",
    description:
      "No sentence should depend on today's technology. A child in 2126 should understand it.",
  },
  {
    title: "Constitutional",
    description:
      "The Constitution establishes principles. It does not explain implementation.",
  },
  {
    title: "Actionable",
    description:
      "Every principle should influence real decisions. If it cannot influence a decision, it probably should not exist.",
  },
  {
    title: "Beautiful",
    description:
      "Not decorative. Elegant. Simple. Clear. Readable.",
  },
  {
    title: "Technically Sound",
    description:
      "Everything we write should eventually be implementable — whether by software, governance, operations, or policy.",
  },
  {
    title: "African",
    description:
      "Institutions must grow from the soil they are planted in. We adopt global best practices where they fit, without pretending Lagos is London.",
  },
  {
    title: "Ethical",
    description:
      "The Constitution should demand integrity without pretending people are perfect. It should reward good conduct and allow correction.",
  },
  {
    title: "Generational",
    description:
      'Every paragraph should answer: "Will this still help someone who has not been born yet?"',
  },
] as const;

export const EDITORIAL_RULE = `We will never write because we need another chapter. We will write only when we have something worthy of becoming permanent.`;

export const RULE_OF_ORIGINAL_THOUGHT = `We will study the world's greatest institutions — learn, adapt, and improve — but we will never become a copy of them. We will write in our own voice. When someone reads the Stankings Library, they should say: "This sounds like Stankings."`;

export interface LibraryVolumeMeta {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  question: string;
  purpose: string;
  openingQuote?: string;
  contains: string[];
  status: "published" | "in-progress" | "planned" | "archived";
  targetPages?: string;
}

export const LIBRARY_VOLUMES: LibraryVolumeMeta[] = [
  {
    number: 0,
    slug: "first-principles",
    title: "The First Principles",
    subtitle: "Volume 0",
    question: "What do we believe?",
    purpose:
      "Philosophy — not law. Never talks about companies, technology, or money. Everything else is built upon it.",
    contains: [
      "The Opening",
      "The First Principle",
      "Foundational beliefs",
      "Institutional philosophy",
      "Twenty-five Canons",
    ],
    status: "published",
  },
  {
    number: 1,
    slug: "constitution",
    title: "The Constitution",
    subtitle: "Volume I",
    question: "Who are we?",
    openingQuote:
      "May every generation prove worthy of the trust it receives.",
    purpose: "Supreme internal governing law — implements the Canons as enforceable obligation.",
    contains: [
      "Preamble",
      "Article I — Identity",
      "Article II — Purpose & Objectives",
      "Article III — Stewardship",
      "Article IV — Constitutional Governance",
      "Article V — Leadership Standards",
      "Article VI — Decision-Making",
      "Article VII — Institutional Assets",
      "Article VIII — Ownership & Custody",
      "Articles",
      "Definitions",
      "Amendment History",
      "Canon Cross-References",
    ],
    status: "in-progress",
    targetPages: "150–250 pages",
  },
  {
    number: 2,
    slug: "governance-code",
    title: "The Governance Code",
    subtitle: "Volume II",
    question: "How is governance practiced?",
    openingQuote:
      "Good governance protects good intentions from becoming bad decisions.",
    purpose:
      "Operational governance — implements the Constitution through daily practice. Subordinate to Volume I.",
    contains: [
      "Book I — Governance Bodies",
      "Book II — Board Operations",
      "Book III — Executive Leadership",
      "Book IV — Committees",
      "Book V — Decision Governance",
      "Book VI — Risk & Assurance",
      "Book VII — Finance & Capital Stewardship",
      "Book VIII — Technology Governance",
      "Book IX — People & Culture",
      "Book X — Innovation Governance",
      "Book XI — Knowledge Governance",
      "Book XII — Institutional Reporting",
    ],
    status: "in-progress",
  },
  {
    number: 3,
    slug: "operating-system",
    title: "The Stankings Operating System",
    subtitle: "Volume III",
    question: "How do we operate?",
    openingQuote: "How we operate reveals what we truly believe.",
    purpose: "Operating philosophy — decision frameworks, culture, and operational excellence.",
    contains: [
      "Decision Frameworks",
      "Meeting Standards",
      "Hiring Philosophy",
      "Culture",
      "Leadership",
      "Customer Journey",
      "Innovation",
      "Quality",
      "Operational Excellence",
    ],
    status: "planned",
  },
  {
    number: 4,
    slug: "custodian-programme",
    title: "The Custodian Programme",
    subtitle: "Volume IV",
    question: "How do we prepare leaders?",
    openingQuote: "Leadership is stewardship practiced over time.",
    purpose: "The complete leadership curriculum from age 8 to Legacy Council.",
    contains: [
      "Age 8 curriculum",
      "Age 15 curriculum",
      "Age 20 curriculum",
      "Age 30 curriculum",
      "Board preparation",
      "CEO preparation",
      "Founder Emeritus",
      "Legacy Council",
    ],
    status: "planned",
  },
  {
    number: 5,
    slug: "trust-blueprint",
    title: "The Trust Blueprint",
    subtitle: "Volume V",
    question: "How is trust architected?",
    openingQuote:
      "Technology must earn the trust it asks people to place in it.",
    purpose: "Trust architecture — identity, verification, passport, escrow, and trust graph.",
    contains: [
      "Identity",
      "Passport",
      "Trust Graph",
      "Verification",
      "Escrow",
      "Privacy",
      "Consent",
    ],
    status: "planned",
  },
  {
    number: 6,
    slug: "ai-constitution",
    title: "The AI Constitution",
    subtitle: "Volume VI",
    question: "How is AI governed?",
    purpose: "Institutional AI governance — models, data, deployment, and accountability.",
    contains: [
      "AI Principles",
      "Model Governance",
      "Data Ethics",
      "Deployment Standards",
      "Human Oversight",
    ],
    status: "planned",
  },
  {
    number: 7,
    slug: "engineering-standards",
    title: "Engineering Standards",
    subtitle: "Volume VII",
    question: "How do we build software?",
    openingQuote:
      "What we build in code must meet the standard we proclaim in principle.",
    purpose: "Coding, testing, CI/CD, security, infrastructure, observability.",
    contains: [
      "Cursor workflows",
      "Coding standards",
      "Testing",
      "CI/CD",
      "Security",
      "Infrastructure",
      "AI development",
      "Deployment",
      "Observability",
      "Documentation",
    ],
    status: "planned",
  },
  {
    number: 8,
    slug: "house-of-stankings",
    title: "The House of Stankings",
    subtitle: "Volume VIII",
    question: "Who is the family?",
    openingQuote:
      "A family that shares values can preserve an institution across generations.",
    purpose: "Family constitution — values, marriage, stewardship, succession, legacy.",
    contains: [
      "Family Constitution",
      "Values",
      "Marriage",
      "Stewardship",
      "Education",
      "Succession",
      "Family Traditions",
      "Founder Stories",
      "Children",
      "Grandchildren",
      "Legacy",
    ],
    status: "planned",
  },
  {
    number: 9,
    slug: "founder-letters",
    title: "Founder Letters",
    subtitle: "Volume IX",
    question: "What should future generations never forget?",
    openingQuote:
      "Some truths cannot be delegated. They must be spoken directly.",
    purpose: "Stanley Ukeje speaking directly to people not yet born.",
    contains: [
      "Philosophy",
      "Lessons",
      "Principles",
      "Failures",
      "Successes",
      "Vision",
      "Letters to future custodians",
    ],
    status: "planned",
  },
];

export const DRAFT_ZERO_NOTE = `Everything written before the Library restructuring is preserved as Draft Zero — archived, not discarded. Draft Zero helped us discover the institution. Draft One defines it.`;

export function getVolumeBySlug(slug: string): LibraryVolumeMeta | undefined {
  return LIBRARY_VOLUMES.find((v) => v.slug === slug);
}

export function getVolumeHref(slug: string): string {
  if (slug === "constitution") return "/library/constitution";
  if (slug === "first-principles") return "/library/first-principles";
  if (slug === "governance-code") return "/library/governance-code";
  if (slug === "custodian-programme") return "/library/custodian-programme";
  return `/library/volumes/${slug}`;
}
