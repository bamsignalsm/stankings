/**
 * Enterprise Consent Runtime — reusable consent records (not product UX).
 */

export const CONSENT_RUNTIME_VERSION = "1.0.0";
export const CONSENT_SCHEMA_VERSION = 1;

export type ConsentLifecycleState =
  | "proposed"
  | "granted"
  | "revoked"
  | "expired"
  | "superseded";

export interface ConsentDefinition {
  definitionId: string;
  purpose: string;
  version: string;
  description: string;
  /** Capability or processing purpose key */
  purposeKey: string;
}

export interface ConsentRecord {
  consentId: string;
  subjectId: string;
  definitionId: string;
  purposeKey: string;
  state: ConsentLifecycleState;
  version: number;
  definitionVersion: string;
  grantedAt?: string;
  revokedAt?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  platformId?: string;
  metadata?: Record<string, string>;
  /** Prior consent ids this supersedes */
  supersedes?: string[];
  auditRef?: string;
}

export interface ConsentHistoryEntry {
  consentId: string;
  fromState: ConsentLifecycleState;
  toState: ConsentLifecycleState;
  at: string;
  reason?: string;
}

export interface CreateConsentInput {
  subjectId: string;
  definition: ConsentDefinition;
  platformId?: string;
  expiresAt?: string;
  metadata?: Record<string, string>;
  now?: string;
  consentId?: string;
  grant?: boolean;
}
