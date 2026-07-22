/**
 * Shared Platform Contract — interfaces and ownership only.
 * No runtime services in this module.
 *
 * Spec: docs/platform/SHARED_PLATFORM_CONTRACT.md
 */

export type SharedCapabilityId =
  | "passport"
  | "identity"
  | "trust"
  | "consent"
  | "explainability"
  | "registry_access"
  | "platform_status"
  | "capability_discovery";

export type ContractMaturity =
  | "draft"
  | "approved"
  | "implemented"
  | "deprecated";

export type RuntimeReadiness =
  | "not_started"
  | "contract_only"
  | "prototype"
  | "production";

export interface SharedCapabilityContract {
  id: SharedCapabilityId;
  name: string;
  owner: "Stankings Legacy Ltd";
  maturity: ContractMaturity;
  runtimeReadiness: RuntimeReadiness;
  responsibility: string;
  nonGoals: string[];
  consumers: string[];
  dependsOn: SharedCapabilityId[];
  docsPath: string;
}

/** Cross-cutting contract for ecosystem platforms. Passport is one capability within this. */
export const SHARED_PLATFORM_CONTRACT = {
  id: "shared-platform-contract",
  name: "Stankings Shared Platform Contract",
  version: "0.1.0",
  owner: "Stankings Legacy Ltd" as const,
  status: "approved" as const,
  principle:
    "Build shared capabilities once in Stankings. Consume them in BamSignal, Yike, BayRight, and future platforms. Do not fork Passport, Trust, Consent, or Registry services per product.",
  docsPath: "docs/platform/SHARED_PLATFORM_CONTRACT.md",
} as const;

export const SHARED_CAPABILITY_CONTRACTS: SharedCapabilityContract[] = [
  {
    id: "passport",
    name: "Stankings Passport",
    owner: "Stankings Legacy Ltd",
    maturity: "approved",
    runtimeReadiness: "production",
    responsibility:
      "Portable enterprise identity and verification record that aggregates verified evidence references across the ecosystem — not a user profile. Eight-Gate complete foundation runtime.",
    nonGoals: [
      "Not a user profile or social network",
      "Not BamSignal matchmaking / product verification logic",
      "Not a payments wallet or financial scoring",
      "Not Trust Engine or Explainability Runtime",
    ],
    consumers: ["BamSignal", "Yike", "BayRight", "Legacy Live", "Hotel & Suites", "Times"],
    dependsOn: ["identity"],
    docsPath: "docs/platform/PASSPORT_RUNTIME.md",
  },
  {
    id: "identity",
    name: "Shared Identity",
    owner: "Stankings Legacy Ltd",
    maturity: "approved",
    runtimeReadiness: "production",
    responsibility:
      "Canonical identity subjects, memberships, role claims, and federation mappings shared across products. First Eight-Gate complete shared capability (no OAuth in this capability).",
    nonGoals: [
      "Not product-specific profile UX",
      "Not replacing local session stores without federation design",
      "Not OAuth / authentication protocol implementation in foundation sprint",
    ],
    consumers: ["BamSignal", "Yike", "BayRight", "Stankings HQ", "Future subsidiaries"],
    dependsOn: [],
    docsPath: "docs/platform/runtime/SHARED_IDENTITY_RUNTIME.md",
  },
  {
    id: "trust",
    name: "Shared Trust",
    owner: "Stankings Legacy Ltd",
    maturity: "approved",
    runtimeReadiness: "contract_only",
    responsibility:
      "Trust signals, verification outcomes, reputation portability, and fraud intelligence interfaces for high-value decisions.",
    nonGoals: ["Not a substitute for product compliance programmes"],
    consumers: ["Yike", "BayRight", "BamSignal", "Stanhan", "Auto Hub"],
    dependsOn: ["identity", "passport"],
    docsPath: "docs/platform/runtime/TRUST.md",
  },
  {
    id: "consent",
    name: "Consent",
    owner: "Stankings Legacy Ltd",
    maturity: "approved",
    runtimeReadiness: "production",
    responsibility:
      "Purpose-bound consent records, withdrawal, history, evidence, and auditability across platforms (Article XII). Eight-Gate complete foundation runtime.",
    nonGoals: ["Not marketing preference centres alone"],
    consumers: ["BamSignal", "Yike", "BayRight", "Stankings HQ"],
    dependsOn: ["identity"],
    docsPath: "docs/platform/runtime/CONSENT.md",
  },
  {
    id: "explainability",
    name: "Explainability",
    owner: "Stankings Legacy Ltd",
    maturity: "approved",
    runtimeReadiness: "contract_only",
    responsibility:
      "Human-readable explanations for automated or institutional decisions that affect trust, access, or outcomes.",
    nonGoals: ["Not a generic logging dump"],
    consumers: ["Yike", "BayRight", "BamSignal", "Library / IKI"],
    dependsOn: ["identity", "trust"],
    docsPath: "docs/platform/runtime/EXPLAINABILITY.md",
  },
  {
    id: "registry_access",
    name: "Registry Access",
    owner: "Stankings Legacy Ltd",
    maturity: "approved",
    runtimeReadiness: "contract_only",
    responsibility:
      "Read access patterns for institutional registries (companies, platforms, Legacy Live) for downstream alignment.",
    nonGoals: ["Not write access for product repos to mutate HQ constitutional registries"],
    consumers: ["BamSignal", "Yike", "BayRight", "Future subsidiaries"],
    dependsOn: [],
    docsPath: "docs/engineering/REGISTRY_CONVENTION.md",
  },
  {
    id: "platform_status",
    name: "Platform Status",
    owner: "Stankings Legacy Ltd",
    maturity: "approved",
    runtimeReadiness: "contract_only",
    responsibility:
      "Honest reporting of inventory status vs runtime readiness for shared capabilities.",
    nonGoals: ["Not marketing uptime pages for product apps"],
    consumers: ["Stankings HQ", "BamSignal", "Yike", "BayRight"],
    dependsOn: ["capability_discovery"],
    docsPath: "docs/platform/SHARED_PLATFORM_CONTRACT.md",
  },
  {
    id: "capability_discovery",
    name: "Capability Discovery",
    owner: "Stankings Legacy Ltd",
    maturity: "approved",
    runtimeReadiness: "production",
    responsibility:
      "Machine-readable catalogue of which shared capabilities exist, their contract version, and readiness — Enterprise Discovery Runtime.",
    nonGoals: ["Not a general service mesh"],
    consumers: ["BamSignal", "Yike", "BayRight", "Future subsidiaries"],
    dependsOn: [],
    docsPath: "docs/platform/SHARED_PLATFORM_CONTRACT.md",
  },
];

export function getSharedCapability(id: SharedCapabilityId): SharedCapabilityContract | undefined {
  return SHARED_CAPABILITY_CONTRACTS.find((c) => c.id === id);
}

export function getCapabilitiesByReadiness(
  readiness: RuntimeReadiness,
): SharedCapabilityContract[] {
  return SHARED_CAPABILITY_CONTRACTS.filter((c) => c.runtimeReadiness === readiness);
}
