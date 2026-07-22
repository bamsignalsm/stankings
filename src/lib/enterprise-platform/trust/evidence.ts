/**
 * Trust evidence ingestion — references only; never duplicates product payloads.
 */

import type {
  IngestTrustEvidenceInput,
  TrustEvidenceProvider,
  TrustEvidenceRef,
} from "./types";

function newId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export function createTrustEvidenceRef(
  input: IngestTrustEvidenceInput,
): TrustEvidenceRef {
  const now = input.now ?? new Date().toISOString();
  return {
    evidenceId: input.evidenceId ?? newId("tev"),
    assessmentId: input.assessmentId,
    provider: input.provider,
    assertionType: input.assertionType,
    assertionRef: input.assertionRef,
    passportEvidenceId: input.passportEvidenceId,
    status: input.status ?? "asserted",
    dimension: input.dimension,
    verifiedAt: input.verifiedAt,
    expiresAt: input.expiresAt,
    createdAt: now,
    updatedAt: now,
    metadata: input.metadata,
  };
}

/** Default ingestion templates for ecosystem providers. */
export function defaultTrustEvidenceSources(): Array<{
  provider: TrustEvidenceProvider;
  assertionType: string;
  dimension: NonNullable<TrustEvidenceRef["dimension"]>;
  description: string;
}> {
  return [
    {
      provider: "identity",
      assertionType: "identity.subject.active",
      dimension: "identity",
      description: "Active Shared Identity subject",
    },
    {
      provider: "consent",
      assertionType: "consent.passport.cross_platform",
      dimension: "consent",
      description: "Cross-platform consent for trust-relevant presentation",
    },
    {
      provider: "passport",
      assertionType: "passport.active",
      dimension: "passport",
      description: "Active Passport record reference",
    },
    {
      provider: "bayright",
      assertionType: "bayright.financial.evidence",
      dimension: "financial",
      description: "Financial evidence reference from BayRight",
    },
    {
      provider: "yike",
      assertionType: "yike.marketplace.verification",
      dimension: "marketplace",
      description: "Marketplace verification reference from Yike",
    },
    {
      provider: "bamsignal",
      assertionType: "bamsignal.relationship.verification",
      dimension: "relationship",
      description: "Relationship verification reference from BamSignal",
    },
  ];
}
