/**
 * Compatibility policy — matrix shape for Version Registry / discovery.
 */

export interface CompatibilityRange {
  capabilityId: string;
  /** Semver of the capability runtime */
  runtimeVersion: string;
  /** Shared platform contract versions accepted */
  acceptedContractVersions: string[];
  /** Peer capability versions required (optional) */
  requires?: Array<{ capabilityId: string; minVersion: string }>;
}

export const COMPATIBILITY_POLICY = {
  id: "enterprise-compatibility-policy",
  version: "1.0.0",
  rules: [
    "Same major of Shared Platform Contract required for production consumption.",
    "Consumers must not call production APIs when readiness is interface_only or prototype without explicit waiver.",
    "Authority version wins on identity federation conflicts.",
    "Additive changes preferred within a major version.",
  ],
} as const;
