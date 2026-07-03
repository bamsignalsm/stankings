/**
 * Institutional Builder — hierarchy, identity, and Cursor prompt standard.
 */

export const INSTITUTIONAL_BUILDER_HIERARCHY = [
  "Canon",
  "Constitution",
  "Governance Code",
  "Policies",
  "Engineering Standards",
  "Operating System",
  "Architecture",
  "Implementation",
  "Testing",
  "Deployment",
  "Audit",
] as const;

export const CURSOR_ROLE = "The Institutional Builder";

export const STANKINGS_LIBRARY_IMPLEMENTATION_TEMPLATE = `STANKINGS LIBRARY IMPLEMENTATION

Objective:

Context:

Dependencies:

Requirements:

Acceptance Criteria:

Future Considerations:

Do Not:

Notes:`;

export const STANKINGS_IDENTITY_ROLES = [
  { id: "guest", label: "Guest", libraryAccess: "Public summaries only" },
  { id: "member", label: "Member", libraryAccess: "Approved volumes — employee visibility" },
  { id: "employee", label: "Employee", libraryAccess: "Operating & engineering standards" },
  { id: "manager", label: "Manager", libraryAccess: "Extended operational canon" },
  { id: "executive", label: "Executive", libraryAccess: "Executive visibility objects" },
  { id: "board", label: "Board", libraryAccess: "Governance & board materials" },
  { id: "trustee", label: "Trustee", libraryAccess: "Trustee-confidential canon" },
  { id: "custodian", label: "Custodian", libraryAccess: "Custodian programme & succession" },
  { id: "founder", label: "Founder", libraryAccess: "Full institutional archive" },
] as const;

export type StankingsIdentityRole = (typeof STANKINGS_IDENTITY_ROLES)[number]["id"];

export const LIBRARY_COUNCIL_MANDATE = {
  title: "The Library Council",
  status: "Constitutional — planned",
  responsibilities: [
    "Approving Canon",
    "Approving Constitution amendments",
    "Library integrity",
    "Historical preservation",
    "Publication",
    "Versioning",
    "AI Knowledge governance",
  ],
  note: "One of the most important governance bodies in the institution. Established in Volume II Book I — Knowledge & Library Council.",
} as const;

export const LIBRARY_SACRED_GATE = {
  title: "The Stankings Library",
  lines: [
    "Knowledge preserved.",
    "Wisdom cultivated.",
    "Stewardship entrusted.",
  ],
  version: "Version 1.0",
  enterLabel: "Enter Library",
} as const;

export const MUSEUM_HIERARCHY = [
  "Volumes",
  "Books",
  "Chapters",
  "Articles",
  "Canons",
] as const;

export const LEGACY_GOLD_PALETTE = {
  obsidian: "#070707",
  legacyGold: "#D4A64A",
  warmIvory: "#F4EFE6",
  deepBronze: "#6B4423",
  forestGreen: "#1B4D3E",
  burgundy: "#6B1F2A",
  royalBlue: "#1E3A8A",
} as const;
