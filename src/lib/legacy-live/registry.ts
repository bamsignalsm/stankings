/**
 * LEGACY_LIVE_REGISTRY — single source of truth for Stankings Legacy Live.
 *
 * NOT a subsidiary. NOT a legal entity. NOT a COMPANY_REGISTRY entry.
 * Owned by Stankings Legacy Ltd. Architecture and governance only —
 * no BamSignal product integration, ticketing, or public exposure yet.
 *
 * Canonical hierarchy:
 *   Legacy Live → Series/Programme → Edition → Event → Session
 *   Awards: Award Institution → Annual Edition → Ceremony (+ categories, nominees, archive)
 */

import type { RegistryManifest } from "@/lib/shared/registry/convention";

export const LEGACY_LIVE_REGISTRY_MANIFEST: RegistryManifest = {
  registryId: "legacy-live-registry",
  name: "Legacy Live Registry",
  owner: "Stankings Legacy Ltd",
  status: "active",
  version: "1.1.0",
  docsPath: "docs/community/STANKINGS_LEGACY_LIVE.md",
  entryKind: "live_programme_or_umbrella",
  audience: ["hq", "library", "ecosystem", "internal"],
  governanceRefs: ["CANON-005", "CANON-003", "Art. IX"],
  consumers: [
    "Stankings HQ",
    "BamSignal",
    "Stankings Times",
    "Stankings Hotel & Suites",
    "The Stankings Institute",
    "BayRight",
  ],
  isSingleSourceOfTruth: true,
  notes: "Umbrella brand + programmes. Not a COMPANY_REGISTRY entry.",
};

/** Classification for reports — not a company sector assignment in COMPANY_REGISTRY. */
export const LEGACY_LIVE_BUSINESS_SECTOR = "community_live_experiences" as const;
export const LEGACY_LIVE_BUSINESS_SECTOR_LABEL = "Community & Live Experiences" as const;

export type LegacyLiveProgrammeStatus =
  | "flagship_planned"
  | "future_programme"
  | "reserved";

export type LegacyLiveProgrammeCategory =
  | "singles-development-conference"
  | "marriage-family-success-conference"
  | "corporate-awards-institution"
  | "executive-leadership-conference"
  | "business-trade-forum"
  | "signature-experience";

export type LegacyLiveFrequency =
  | "annual"
  | "periodic"
  | "per_edition"
  | "as_scheduled";

export type LegacyLiveInstitutionKind =
  | "flagship_programme"
  | "award_institution"
  | "future_programme"
  | "signature_reserve";

/**
 * Institutional depth under each programme.
 * Series ≈ enduring programme identity; Edition ≈ year (e.g. Singles Synergy 2027);
 * Event ≈ day/block; Session ≈ individual segment.
 */
export const LEGACY_LIVE_HIERARCHY_LAYERS = [
  "umbrella_brand",
  "series_or_programme",
  "edition",
  "event",
  "session",
] as const;

export type LegacyLiveHierarchyLayer = (typeof LEGACY_LIVE_HIERARCHY_LAYERS)[number];

export interface LegacyLiveEcosystemRole {
  institutionId: string;
  institutionName: string;
  role: string;
  provides: string[];
}

/** Default event standard — programmes may specialize but inherit this framework. */
export const LEGACY_LIVE_EVENT_STANDARDS = [
  "Registration",
  "VIP Reception",
  "Red Carpet Interviews",
  "Media Coverage",
  "Welcome Ceremony",
  "Keynote Addresses",
  "Panel Discussions",
  "Fireside Chats",
  "Talk Shows",
  "Interactive Q&A",
  "Workshops",
  "Product Showcases",
  "Networking",
  "Award Presentations (where applicable)",
  "Comedy Performances",
  "Musical Entertainment",
  "Closing Ceremony",
] as const;

/** Award institution layers (Stankings Times Awards). */
export const AWARD_INSTITUTION_LAYERS = [
  "award_institution",
  "annual_edition",
  "award_categories",
  "nominees",
  "winners_archive",
  "hall_of_fame",
  "judging_criteria",
  "jury",
  "annual_reports",
  "award_ceremony",
] as const;

/** Signature Experiences — operating company assigned by purpose, not fixed at architecture time. */
export const SIGNATURE_EXPERIENCE_OPERATOR_MAP = [
  { purpose: "Technology", operatingCompanyId: "stankings-institute", operatingCompany: "The Stankings Institute" },
  { purpose: "Real Estate", operatingCompanyId: "stanhan", operatingCompany: "Stanhan Real Estate Ltd" },
  { purpose: "Media", operatingCompanyId: "stankings-times", operatingCompany: "Stankings Times Ltd" },
  { purpose: "Hospitality", operatingCompanyId: "stankings-hotel-and-suites", operatingCompany: "Stankings Hotel & Suites Ltd" },
  { purpose: "Manufacturing", operatingCompanyId: "shodis-industries", operatingCompany: "Shodis Industries Ltd" },
  { purpose: "Finance", operatingCompanyId: "bayright", operatingCompany: "BayRight Ltd" },
  { purpose: "Community", operatingCompanyId: "bamsignal", operatingCompany: "BamSignal Ltd" },
  { purpose: "Education / Leadership", operatingCompanyId: "stankings-institute", operatingCompany: "The Stankings Institute" },
] as const;

export interface LegacyLiveProgrammeRecord {
  id: string;
  name: string;
  description: string;
  institutionKind: LegacyLiveInstitutionKind;
  status: LegacyLiveProgrammeStatus;
  category: LegacyLiveProgrammeCategory;
  categoryLabel: string;
  /** Always Stankings Legacy Ltd */
  owner: "Stankings Legacy Ltd";
  /** Host brand / company (may differ from operating company) */
  host: string;
  hostId: string;
  /**
   * Day-to-day operating company for the programme series.
   * For Signature Experiences this is "assigned_per_edition".
   */
  operatingCompany: string;
  operatingCompanyId: string | "assigned_per_edition";
  frequency: LegacyLiveFrequency;
  targetAudience: string[];
  venueStrategy: string;
  primaryVenueId: string;
  mediaPartner: string;
  mediaPartnerId: string;
  registrationStrategy: string;
  ticketingSupport: "none_yet" | "planned_bayright";
  passportIntegration: "none_yet" | "planned";
  speakerManagement: "none_yet" | "planned";
  firstEdition: string | null;
  website: string | null;
  futureRoadmap: string[];
  purpose: string;
  programmeComponents: string[];
  eventExperience: string[];
  strategicRole: string;
  /** Hierarchy children this programme exposes architecturally */
  hierarchy: {
    annualEditions: boolean;
    individualEvents: boolean;
    eventSessions: boolean;
    /** Award-institution extras */
    awardInstitution?: boolean;
    awardCategories?: boolean;
    nominees?: boolean;
    winnersArchive?: boolean;
    hallOfFame?: boolean;
    judgingCriteria?: boolean;
    jury?: boolean;
    annualReports?: boolean;
    awardCeremony?: boolean;
  };
  relationshipToBamSignal?: string;
  docsPath: string;
}

export interface LegacyLiveMasterBrand {
  id: "stankings-legacy-live";
  name: "Stankings Legacy Live";
  entityType: "umbrella_brand";
  ownedBy: "Stankings Legacy Ltd";
  category: "Corporate Live Experiences";
  businessSector: typeof LEGACY_LIVE_BUSINESS_SECTOR;
  businessSectorLabel: typeof LEGACY_LIVE_BUSINESS_SECTOR_LABEL;
  constitutionalObjective: string;
  vision: string;
  mission: string;
  purpose: string;
  strategicPurpose: string;
  coreValues: string[];
  governance: string[];
  hierarchyLayers: readonly LegacyLiveHierarchyLayer[];
  docsPath: string;
}

export const STANKINGS_LEGACY_LIVE: LegacyLiveMasterBrand = {
  id: "stankings-legacy-live",
  name: "Stankings Legacy Live",
  entityType: "umbrella_brand",
  ownedBy: "Stankings Legacy Ltd",
  category: "Corporate Live Experiences",
  businessSector: LEGACY_LIVE_BUSINESS_SECTOR,
  businessSectorLabel: LEGACY_LIVE_BUSINESS_SECTOR_LABEL,
  constitutionalObjective:
    "To educate, connect, inspire and celebrate individuals, families, professionals, entrepreneurs and communities through transformational live experiences that advance the constitutional mission and legacy of Stankings Legacy Ltd.",
  vision:
    "One recognizable live-experiences brand for every Stankings Legacy physical programme — awards, conferences, summits, signature experiences, and community education — without turning operating companies into events businesses.",
  mission:
    "Own and operate flagship live programmes that strengthen relationships, leadership, corporate authority and community impact across the Stankings ecosystem.",
  purpose:
    "Serve as the official events, conferences and live engagement division of Stankings Legacy Ltd. Unify every physical programme under one recognizable identity while allowing each programme to retain independent branding.",
  strategicPurpose:
    "Advance the constitutional mission of Stankings Legacy Ltd by creating recurring, institutional live experiences — not one-off campaigns — that educate, connect, inspire and celebrate.",
  coreValues: [
    "Constitutional purpose before spectacle",
    "Programme ownership stays with Stankings Legacy Ltd",
    "Hosts do not become events companies",
    "Independent programme identity under one umbrella",
    "Generational continuity — editions and archives, not disposable events",
    "Trust, dignity and excellence in every live experience",
  ],
  governance: [
    "Owned exclusively by Stankings Legacy Ltd",
    "Not registered as a subsidiary or legal entity — not in COMPANY_REGISTRY",
    "LEGACY_LIVE_REGISTRY is the single source of truth for programmes",
    "Canonical hierarchy: Umbrella → Programme/Series → Edition → Event → Session",
    "Awards follow: Award Institution → Annual Edition → Ceremony (+ categories, jury, archive)",
    "Hosting companies do not own programmes",
    "Signature Experiences assign operating company per purpose/edition",
    "No BamSignal product integration, ticketing, or public exposure until official launch",
  ],
  hierarchyLayers: LEGACY_LIVE_HIERARCHY_LAYERS,
  docsPath: "docs/community/STANKINGS_LEGACY_LIVE.md",
};

const DEFAULT_VENUE =
  "Primarily Stankings Hotel & Suites Ltd; external venues until company venues are operational.";
const DEFAULT_MEDIA = "Stankings Times Ltd";
const DEFAULT_REGISTRATION = "Planned — central Legacy Live registration when programmes launch";
const DEFAULT_TICKETING = "planned_bayright" as const;
const DEFAULT_PASSPORT = "planned" as const;

/** @deprecated Prefer LEGACY_LIVE_REGISTRY.programmes — retained alias for callers. */
export type LegacyLiveProgramme = LegacyLiveProgrammeRecord;

export const LEGACY_LIVE_PROGRAMMES: LegacyLiveProgrammeRecord[] = [
  {
    id: "singles-synergy",
    name: "Singles Synergy",
    description:
      "Flagship singles development conference preparing singles for relationships, marriage, leadership, finance, career and purposeful living.",
    institutionKind: "flagship_programme",
    status: "flagship_planned",
    category: "singles-development-conference",
    categoryLabel: "Singles Development Conference",
    owner: "Stankings Legacy Ltd",
    host: "BamSignal",
    hostId: "bamsignal",
    operatingCompany: "Stankings Legacy Ltd",
    operatingCompanyId: "hq",
    frequency: "annual",
    targetAudience: [
      "Singles seeking healthy relationships and marriage readiness",
      "BamSignal members (when programmes launch)",
      "Young professionals and emerging leaders",
    ],
    venueStrategy: DEFAULT_VENUE,
    primaryVenueId: "stankings-hotel-and-suites",
    mediaPartner: DEFAULT_MEDIA,
    mediaPartnerId: "stankings-times",
    registrationStrategy: DEFAULT_REGISTRATION,
    ticketingSupport: DEFAULT_TICKETING,
    passportIntegration: DEFAULT_PASSPORT,
    speakerManagement: "planned",
    firstEdition: null,
    website: null,
    futureRoadmap: [
      "First annual edition planning",
      "Speaker and curriculum framework",
      "Registration and BayRight ticketing",
      "Passport guest accreditation",
      "Edition archive and session catalogue",
    ],
    purpose:
      "Equip singles with practical knowledge for successful relationships, marriage, career development, leadership, financial responsibility and purposeful living.",
    programmeComponents: [
      "Relationship education",
      "Premarital success",
      "Personal development",
      "Emotional intelligence",
      "Financial literacy",
      "Entrepreneurship",
      "Leadership",
      "Career development",
      "Family values",
      "Networking",
    ],
    eventExperience: [
      "Opening ceremony",
      "Red carpet interviews",
      "Executive keynote speeches",
      "VIP guest speakers",
      "Expert panel discussions",
      "Talk shows",
      "Live audience interaction",
      "Comedy performances",
      "Musical performances",
      "Entertainment",
      "Closing networking session",
    ],
    strategicRole:
      "Support BamSignal's mission by preparing members for healthy and lasting relationships through education and community engagement — without making BamSignal an events company.",
    hierarchy: {
      annualEditions: true,
      individualEvents: true,
      eventSessions: true,
    },
    relationshipToBamSignal:
      "BamSignal hosts. Stankings Legacy Ltd owns and operates. BamSignal remains the matchmaking and relationship platform.",
    docsPath: "docs/community/SINGLES_SYNERGY.md",
  },
  {
    id: "the-shared-path",
    name: "The Shared Path",
    description:
      "Flagship marriage and family success conference strengthening long-term relationships through education and mentorship.",
    institutionKind: "flagship_programme",
    status: "flagship_planned",
    category: "marriage-family-success-conference",
    categoryLabel: "Marriage & Family Success Conference",
    owner: "Stankings Legacy Ltd",
    host: "BamSignal",
    hostId: "bamsignal",
    operatingCompany: "Stankings Legacy Ltd",
    operatingCompanyId: "hq",
    frequency: "annual",
    targetAudience: [
      "Married couples and long-term partners",
      "BamSignal members in lasting relationships (when programmes launch)",
      "Families seeking practical mentorship",
    ],
    venueStrategy: DEFAULT_VENUE,
    primaryVenueId: "stankings-hotel-and-suites",
    mediaPartner: DEFAULT_MEDIA,
    mediaPartnerId: "stankings-times",
    registrationStrategy: DEFAULT_REGISTRATION,
    ticketingSupport: DEFAULT_TICKETING,
    passportIntegration: DEFAULT_PASSPORT,
    speakerManagement: "planned",
    firstEdition: null,
    website: null,
    futureRoadmap: [
      "First annual edition planning",
      "Couple mentorship curriculum",
      "Registration and BayRight ticketing",
      "Passport accreditation",
      "Edition archive",
    ],
    purpose:
      "Strengthen marriages and long-term relationships through practical education, mentorship and community.",
    programmeComponents: [
      "Marriage education",
      "Communication",
      "Conflict resolution",
      "Parenting",
      "Family finance",
      "Leadership within the home",
      "Couple mentorship",
      "Healthy relationships",
      "Family wellbeing",
    ],
    eventExperience: [
      "Red carpet interviews",
      "Executive keynote speeches",
      "VIP guest speakers",
      "Marriage success stories",
      "Couple interviews",
      "Expert panels",
      "Talk shows",
      "Comedy performances",
      "Musical entertainment",
      "Audience Q&A",
      "Networking",
    ],
    strategicRole:
      "Improve long-term relationship outcomes for BamSignal members while expanding the educational and community impact of Stankings Legacy Ltd.",
    hierarchy: {
      annualEditions: true,
      individualEvents: true,
      eventSessions: true,
    },
    relationshipToBamSignal:
      "BamSignal hosts. Stankings Legacy Ltd owns and operates. Recurring flagship — not a one-off campaign.",
    docsPath: "docs/community/THE_SHARED_PATH.md",
  },
  {
    id: "stankings-times-awards",
    name: "Stankings Times Awards",
    description:
      "Award institution recognizing excellence across business, entrepreneurship, real estate, technology, manufacturing, leadership and public service — not merely a single ceremony.",
    institutionKind: "award_institution",
    status: "flagship_planned",
    category: "corporate-awards-institution",
    categoryLabel: "Corporate Awards Institution",
    owner: "Stankings Legacy Ltd",
    host: "Stankings Times Ltd",
    hostId: "stankings-times",
    operatingCompany: "Stankings Legacy Ltd",
    operatingCompanyId: "hq",
    frequency: "annual",
    targetAudience: [
      "Business leaders and entrepreneurs",
      "Ecosystem partners and customers",
      "Public-service and industry leaders",
    ],
    venueStrategy: DEFAULT_VENUE,
    primaryVenueId: "stankings-hotel-and-suites",
    mediaPartner: DEFAULT_MEDIA,
    mediaPartnerId: "stankings-times",
    registrationStrategy: DEFAULT_REGISTRATION,
    ticketingSupport: DEFAULT_TICKETING,
    passportIntegration: DEFAULT_PASSPORT,
    speakerManagement: "planned",
    firstEdition: null,
    website: null,
    futureRoadmap: [
      "Award categories and judging criteria",
      "Jury and nominations process",
      "First annual edition and ceremony",
      "Winners archive and hall of fame",
      "Annual awards report",
    ],
    purpose:
      "Recognize and celebrate excellence across business, entrepreneurship, real estate, technology, manufacturing, leadership and public service.",
    programmeComponents: [
      "Nominations",
      "Jury and judging criteria",
      "Award categories",
      "Winners archive",
      "Hall of fame",
      "Annual reports",
      "Award ceremony",
    ],
    eventExperience: [
      "Registration",
      "VIP Reception",
      "Red Carpet Interviews",
      "Media Coverage",
      "Welcome Ceremony",
      "Keynote Addresses",
      "Award Presentations",
      "Musical Entertainment",
      "Closing Ceremony",
    ],
    strategicRole:
      "Institutional awards programme under Legacy Live — Award Institution → Annual Edition → Ceremony. Hosted by Stankings Times; owned by Stankings Legacy Ltd.",
    hierarchy: {
      annualEditions: true,
      individualEvents: true,
      eventSessions: true,
      awardInstitution: true,
      awardCategories: true,
      nominees: true,
      winnersArchive: true,
      hallOfFame: true,
      judgingCriteria: true,
      jury: true,
      annualReports: true,
      awardCeremony: true,
    },
    docsPath: "docs/community/STANKINGS_TIMES_AWARDS.md",
  },
  {
    id: "leadership-summits",
    name: "Leadership Summits",
    description: "Executive leadership conferences and stewardship forums.",
    institutionKind: "future_programme",
    status: "future_programme",
    category: "executive-leadership-conference",
    categoryLabel: "Executive Leadership Conference",
    owner: "Stankings Legacy Ltd",
    host: "The Stankings Institute",
    hostId: "stankings-institute",
    operatingCompany: "Stankings Legacy Ltd",
    operatingCompanyId: "hq",
    frequency: "periodic",
    targetAudience: ["Executives", "Institutional leaders", "Custodians"],
    venueStrategy: DEFAULT_VENUE,
    primaryVenueId: "stankings-hotel-and-suites",
    mediaPartner: DEFAULT_MEDIA,
    mediaPartnerId: "stankings-times",
    registrationStrategy: DEFAULT_REGISTRATION,
    ticketingSupport: DEFAULT_TICKETING,
    passportIntegration: DEFAULT_PASSPORT,
    speakerManagement: "planned",
    firstEdition: null,
    website: null,
    futureRoadmap: ["Curriculum with Institute", "First summit edition", "Session archive"],
    purpose: "Executive leadership conferences and business stewardship forums.",
    programmeComponents: ["Leadership education", "Executive forums", "Stewardship sessions"],
    eventExperience: [...LEGACY_LIVE_EVENT_STANDARDS],
    strategicRole:
      "Future flagship under Legacy Live — hosted by The Stankings Institute; owned by Stankings Legacy Ltd.",
    hierarchy: {
      annualEditions: true,
      individualEvents: true,
      eventSessions: true,
    },
    docsPath: "docs/community/STANKINGS_LEGACY_LIVE.md",
  },
  {
    id: "business-forums",
    name: "Business Forums",
    description: "Trade, investment, innovation and entrepreneurship conferences.",
    institutionKind: "future_programme",
    status: "future_programme",
    category: "business-trade-forum",
    categoryLabel: "Trade, Investment & Innovation Forum",
    owner: "Stankings Legacy Ltd",
    host: "The Stankings Institute",
    hostId: "stankings-institute",
    operatingCompany: "Stankings Legacy Ltd",
    operatingCompanyId: "hq",
    frequency: "periodic",
    targetAudience: ["Investors", "Entrepreneurs", "Trade partners"],
    venueStrategy: DEFAULT_VENUE,
    primaryVenueId: "stankings-hotel-and-suites",
    mediaPartner: DEFAULT_MEDIA,
    mediaPartnerId: "stankings-times",
    registrationStrategy: DEFAULT_REGISTRATION,
    ticketingSupport: DEFAULT_TICKETING,
    passportIntegration: DEFAULT_PASSPORT,
    speakerManagement: "planned",
    firstEdition: null,
    website: null,
    futureRoadmap: ["Forum themes with Institute", "First forum edition", "Partner track"],
    purpose: "Trade, investment, innovation and entrepreneurship conferences.",
    programmeComponents: ["Trade forums", "Investment sessions", "Innovation showcases"],
    eventExperience: [...LEGACY_LIVE_EVENT_STANDARDS],
    strategicRole:
      "Future flagship under Legacy Live — hosted by The Stankings Institute; owned by Stankings Legacy Ltd.",
    hierarchy: {
      annualEditions: true,
      individualEvents: true,
      eventSessions: true,
    },
    docsPath: "docs/community/STANKINGS_LEGACY_LIVE.md",
  },
  {
    id: "signature-experiences",
    name: "Signature Experiences",
    description:
      "Reserved architecture for conferences, exhibitions, expos, retreats, gala dinners, trade fairs and investment forums — operating company assigned per purpose.",
    institutionKind: "signature_reserve",
    status: "reserved",
    category: "signature-experience",
    categoryLabel: "Signature Experience (Reserved)",
    owner: "Stankings Legacy Ltd",
    host: "Assigned per experience",
    hostId: "assigned_per_edition",
    operatingCompany: "Assigned per purpose / edition",
    operatingCompanyId: "assigned_per_edition",
    frequency: "as_scheduled",
    targetAudience: ["Defined per experience"],
    venueStrategy: DEFAULT_VENUE,
    primaryVenueId: "stankings-hotel-and-suites",
    mediaPartner: DEFAULT_MEDIA,
    mediaPartnerId: "stankings-times",
    registrationStrategy: DEFAULT_REGISTRATION,
    ticketingSupport: DEFAULT_TICKETING,
    passportIntegration: DEFAULT_PASSPORT,
    speakerManagement: "planned",
    firstEdition: null,
    website: null,
    futureRoadmap: [
      "Register each signature experience as an edition under this reserve",
      "Assign operating company from SIGNATURE_EXPERIENCE_OPERATOR_MAP",
      "No structural redesign of Legacy Live required",
    ],
    purpose:
      "Reserve broader live-experience architecture — conferences, exhibitions, expos, retreats, galas, trade fairs, investment forums — without forcing a fixed subsidiary operator.",
    programmeComponents: [
      "Conferences",
      "Exhibitions",
      "Expos",
      "Retreats",
      "Gala dinners",
      "Trade fairs",
      "Investment forums",
    ],
    eventExperience: [...LEGACY_LIVE_EVENT_STANDARDS],
    strategicRole:
      "Extensibility slot under Legacy Live. Operating company determined by purpose (e.g. technology → Institute, real estate → Stanhan).",
    hierarchy: {
      annualEditions: true,
      individualEvents: true,
      eventSessions: true,
    },
    docsPath: "docs/community/SIGNATURE_EXPERIENCES.md",
  },
];

/** Single source of truth object — prefer this over loose programme arrays. */
export const LEGACY_LIVE_REGISTRY = {
  umbrella: STANKINGS_LEGACY_LIVE,
  businessSector: LEGACY_LIVE_BUSINESS_SECTOR,
  businessSectorLabel: LEGACY_LIVE_BUSINESS_SECTOR_LABEL,
  eventStandards: LEGACY_LIVE_EVENT_STANDARDS,
  hierarchyLayers: LEGACY_LIVE_HIERARCHY_LAYERS,
  awardInstitutionLayers: AWARD_INSTITUTION_LAYERS,
  signatureOperatorMap: SIGNATURE_EXPERIENCE_OPERATOR_MAP,
  programmes: LEGACY_LIVE_PROGRAMMES,
} as const;

/** Ecosystem roles supporting Stankings Legacy Live — not ownership of the brand. */
export const LEGACY_LIVE_ECOSYSTEM_ROLES: LegacyLiveEcosystemRole[] = [
  {
    institutionId: "hq",
    institutionName: "Stankings Legacy Ltd",
    role: "Owner & operator",
    provides: [
      "Ownership of Stankings Legacy Live",
      "Programme governance",
      "Operating authority for all flagship programmes",
    ],
  },
  {
    institutionId: "bamsignal",
    institutionName: "BamSignal",
    role: "Host (Singles Synergy, The Shared Path)",
    provides: [
      "Hosting platform identity for relationship programmes",
      "Community alignment when programmes launch",
      "Does not own programmes; remains matchmaking platform",
      "May operate Signature Experiences with Community purpose",
    ],
  },
  {
    institutionId: "stankings-institute",
    institutionName: "The Stankings Institute",
    role: "Host (Leadership Summits, Business Forums)",
    provides: [
      "Leadership and stewardship hosting",
      "Business forum hosting",
      "May operate Signature Experiences with Technology / Education purpose",
    ],
  },
  {
    institutionId: "stankings-times",
    institutionName: "Stankings Times Ltd",
    role: "Media partner & awards host",
    provides: [
      "Media coverage",
      "News and press",
      "Interviews",
      "Award publicity",
      "Corporate communications",
      "Hosts Stankings Times Awards institution",
    ],
  },
  {
    institutionId: "stankings-hotel-and-suites",
    institutionName: "Stankings Hotel & Suites Ltd",
    role: "Primary venue & hospitality",
    provides: [
      "Conference facilities",
      "Event venues",
      "Executive accommodation",
      "VIP hospitality",
      "Corporate hosting",
    ],
  },
  {
    institutionId: "bayright",
    institutionName: "BayRight Ltd",
    role: "Payments (future)",
    provides: [
      "Ticket payments",
      "Event billing",
      "Financial processing",
      "Future digital ticketing",
    ],
  },
  {
    institutionId: "yike",
    institutionName: "Yike Ltd",
    role: "Marketplace support (future)",
    provides: [
      "Venue listings",
      "Commercial property promotion",
      "Corporate partnerships",
      "Future event marketplace integration",
    ],
  },
  {
    institutionId: "passport",
    institutionName: "Stankings Passport",
    role: "Identity & credentials (future)",
    provides: [
      "Identity verification",
      "Guest accreditation",
      "VIP verification",
      "Speaker verification",
      "Future event credentials",
    ],
  },
];

export function getLegacyLiveProgramme(id: string): LegacyLiveProgrammeRecord | undefined {
  return LEGACY_LIVE_REGISTRY.programmes.find((p) => p.id === id);
}

export function getFlagshipProgrammes(): LegacyLiveProgrammeRecord[] {
  return LEGACY_LIVE_REGISTRY.programmes.filter((p) => p.status === "flagship_planned");
}

export function getProgrammesHostedBy(institutionId: string): LegacyLiveProgrammeRecord[] {
  return LEGACY_LIVE_REGISTRY.programmes.filter((p) => p.hostId === institutionId);
}

export function getAwardInstitutions(): LegacyLiveProgrammeRecord[] {
  return LEGACY_LIVE_REGISTRY.programmes.filter((p) => p.institutionKind === "award_institution");
}

export function resolveSignatureOperator(purpose: string) {
  return SIGNATURE_EXPERIENCE_OPERATOR_MAP.find(
    (row) => row.purpose.toLowerCase() === purpose.toLowerCase(),
  );
}

/** Hierarchy summary for architecture docs and review. */
export function getLegacyLiveHierarchy() {
  return {
    owner: STANKINGS_LEGACY_LIVE.ownedBy,
    umbrella: STANKINGS_LEGACY_LIVE.name,
    entityType: STANKINGS_LEGACY_LIVE.entityType,
    constitutionalObjective: STANKINGS_LEGACY_LIVE.constitutionalObjective,
    businessSector: STANKINGS_LEGACY_LIVE.businessSectorLabel,
    layers: LEGACY_LIVE_HIERARCHY_LAYERS,
    programmes: LEGACY_LIVE_REGISTRY.programmes.map((p) => ({
      id: p.id,
      name: p.name,
      status: p.status,
      host: p.host,
      operatingCompany: p.operatingCompany,
      institutionKind: p.institutionKind,
      hierarchy: p.hierarchy,
    })),
  };
}

/** Compatibility aliases — older field names */
export const ownedAndOperatedBy = "Stankings Legacy Ltd" as const;
