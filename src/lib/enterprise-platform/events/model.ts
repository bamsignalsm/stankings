/**
 * Enterprise Event Foundation (M2A) — reusable event model.
 * No message brokers. No transport. Contracts + validation only.
 */

import { validationFail, validationOk, type EnterpriseValidationResult } from "../quality/validation";

export type EnterpriseEventDomain =
  | "identity"
  | "membership"
  | "platform"
  | "capability"
  | "consent"
  | "passport"
  | "trust"
  | "governance"
  | "audit"
  | "registry";

export interface EnterpriseEvent<TPayload extends Record<string, unknown> = Record<string, unknown>> {
  /** Unique event id */
  eventId: string;
  /** Stable type, e.g. identity.subject.created */
  eventType: string;
  /** Envelope schema version */
  eventVersion: number;
  domain: EnterpriseEventDomain;
  /** Runtime that produced the event */
  sourceRuntime: string;
  /** Capability id when applicable */
  capabilityId?: string;
  occurredAt: string;
  correlationId?: string;
  causationId?: string;
  /** Subject / entity focus */
  subjectId?: string;
  platformId?: string;
  payload: TPayload;
  metadata?: Record<string, string>;
}

export const ENTERPRISE_EVENT_ENVELOPE_VERSION = 1 as const;

/** Canonical event type catalogue — runtimes must use these names when emitting. */
export const ENTERPRISE_EVENT_TYPES = {
  IDENTITY_CREATED: "identity.subject.created",
  IDENTITY_UPDATED: "identity.subject.updated",
  IDENTITY_STATE_CHANGED: "identity.subject.state_changed",
  MEMBERSHIP_GRANTED: "identity.membership.granted",
  MEMBERSHIP_ENDED: "identity.membership.ended",
  PLATFORM_REGISTERED: "platform.registered",
  CAPABILITY_REGISTERED: "capability.registered",
  CONSENT_GRANTED: "consent.granted",
  CONSENT_REVOKED: "consent.revoked",
  CONSENT_EXPIRED: "consent.expired",
  NOTIFICATION_QUEUED: "notification.queued",
  NOTIFICATION_DELIVERED: "notification.delivered",
  NOTIFICATION_FAILED: "notification.failed",
  PASSPORT_ISSUED: "passport.issued",
  PASSPORT_SUSPENDED: "passport.suspended",
  PASSPORT_REVOKED: "passport.revoked",
  PASSPORT_EXPIRED: "passport.expired",
  PASSPORT_RENEWAL_PREPARED: "passport.renewal_prepared",
  PASSPORT_EVIDENCE_ATTACHED: "passport.evidence.attached",
  TRUST_CHANGED: "trust.changed",
  TRUST_ASSESSED: "trust.assessed",
  TRUST_EVIDENCE_INGESTED: "trust.evidence.ingested",
  TRUST_POLICY_UPDATED: "trust.policy.updated",
  TRUST_INVALIDATED: "trust.invalidated",
  AUDIT_CREATED: "audit.created",
  GOVERNANCE_POLICY_EVALUATED: "governance.policy.evaluated",
} as const;

export type EnterpriseEventType =
  (typeof ENTERPRISE_EVENT_TYPES)[keyof typeof ENTERPRISE_EVENT_TYPES];

export interface CreateEnterpriseEventInput<
  TPayload extends Record<string, unknown> = Record<string, unknown>,
> {
  eventType: string;
  domain: EnterpriseEventDomain;
  sourceRuntime: string;
  payload: TPayload;
  capabilityId?: string;
  subjectId?: string;
  platformId?: string;
  correlationId?: string;
  causationId?: string;
  metadata?: Record<string, string>;
  occurredAt?: string;
  eventId?: string;
  eventVersion?: number;
}

function newEventId(): string {
  return `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
}

export function createEnterpriseEvent<TPayload extends Record<string, unknown>>(
  input: CreateEnterpriseEventInput<TPayload>,
): EnterpriseEvent<TPayload> {
  return {
    eventId: input.eventId ?? newEventId(),
    eventType: input.eventType,
    eventVersion: input.eventVersion ?? ENTERPRISE_EVENT_ENVELOPE_VERSION,
    domain: input.domain,
    sourceRuntime: input.sourceRuntime,
    capabilityId: input.capabilityId,
    occurredAt: input.occurredAt ?? new Date().toISOString(),
    correlationId: input.correlationId,
    causationId: input.causationId,
    subjectId: input.subjectId,
    platformId: input.platformId,
    payload: input.payload,
    metadata: input.metadata,
  };
}

export function validateEnterpriseEvent(
  event: EnterpriseEvent,
): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!event.eventId?.trim()) errors.push("eventId is required");
  if (!event.eventType?.trim()) errors.push("eventType is required");
  if (!event.domain) errors.push("domain is required");
  if (!event.sourceRuntime?.trim()) errors.push("sourceRuntime is required");
  if (!event.occurredAt?.trim()) errors.push("occurredAt is required");
  if (!Number.isInteger(event.eventVersion) || event.eventVersion < 1) {
    errors.push("eventVersion must be integer >= 1");
  }
  if (!event.payload || typeof event.payload !== "object") {
    errors.push("payload must be an object");
  }
  return errors.length ? validationFail(errors) : validationOk();
}

/** In-memory event collector for tests / local composition (not a broker). */
export class MemoryEventCollector {
  readonly events: EnterpriseEvent[] = [];

  publish(event: EnterpriseEvent): EnterpriseValidationResult {
    const check = validateEnterpriseEvent(event);
    if (!check.valid) return check;
    this.events.push(event);
    return validationOk();
  }

  clear(): void {
    this.events.length = 0;
  }

  ofType(eventType: string): EnterpriseEvent[] {
    return this.events.filter((e) => e.eventType === eventType);
  }
}
