/**
 * Subject Registry — query/persist façade over IdentityStore.
 * No authentication. Storage-provider agnostic.
 */

import type { IdentityStore, PersistentIdentityBundle } from "../persistence/types";
import { validateMappingIntegrity } from "../validation/runtime";
import type { MemoryEventCollector } from "@/lib/enterprise-platform/events";
import {
  createEnterpriseEvent,
  ENTERPRISE_EVENT_TYPES,
  type EnterpriseEvent,
} from "@/lib/enterprise-platform/events";
import { createAuditRecord } from "@/lib/enterprise-platform/quality/audit";
import {
  createEnterpriseError,
  ENTERPRISE_ERROR_CODES,
} from "@/lib/enterprise-platform/quality/errors";
import { IDENTITY_SCHEMA_VERSION } from "./versions";

export { IDENTITY_RUNTIME_VERSION, IDENTITY_SCHEMA_VERSION } from "./versions";

export interface SubjectRegistryWriteOptions {
  correlationId?: string;
  events?: MemoryEventCollector;
  /** When true, skip emitting events */
  silent?: boolean;
}

export interface SubjectRegistryWriteResult {
  ok: boolean;
  bundle?: PersistentIdentityBundle;
  errors: string[];
  events: EnterpriseEvent[];
}

export class SubjectRegistry {
  constructor(private readonly store: IdentityStore) {}

  async get(subjectId: string): Promise<PersistentIdentityBundle | null> {
    return this.store.getSubject(subjectId);
  }

  async findByExternalRef(
    system: string,
    externalId: string,
  ): Promise<PersistentIdentityBundle | null> {
    return this.store.findByExternalRef(system, externalId);
  }

  async list(limit = 100): Promise<PersistentIdentityBundle[]> {
    return this.store.listSubjects(limit);
  }

  async put(
    bundle: PersistentIdentityBundle,
    options: SubjectRegistryWriteOptions = {},
  ): Promise<SubjectRegistryWriteResult> {
    const integrity = validateMappingIntegrity(bundle);
    if (!integrity.valid) {
      return { ok: false, errors: integrity.errors, events: [] };
    }

    const existing = await this.store.getSubject(bundle.subject.subjectId);
    const write = await this.store.putSubject(bundle);
    if (!write.ok || !write.bundle) {
      return { ok: false, errors: write.errors, events: [] };
    }

    const events: EnterpriseEvent[] = [];
    if (!options.silent) {
      const isCreate = !existing;
      const event = createEnterpriseEvent({
        eventType: isCreate
          ? ENTERPRISE_EVENT_TYPES.IDENTITY_CREATED
          : ENTERPRISE_EVENT_TYPES.IDENTITY_UPDATED,
        domain: "identity",
        sourceRuntime: "shared-identity",
        capabilityId: "identity",
        subjectId: write.bundle.subject.subjectId,
        correlationId: options.correlationId,
        payload: {
          subjectId: write.bundle.subject.subjectId,
          version: write.bundle.subject.version,
          state: write.bundle.subject.state,
          schemaVersion: IDENTITY_SCHEMA_VERSION,
          previousVersion: existing?.subject.version ?? null,
        },
      });
      events.push(event);
      options.events?.publish(event);

      createAuditRecord({
        capability: "identity",
        action: isCreate ? "subject.create" : "subject.update",
        entityType: "identity_subject",
        entityId: write.bundle.subject.subjectId,
        actorSystem: "shared-identity",
        beforeVersion: existing?.subject.version,
        afterVersion: write.bundle.subject.version,
        correlationId: options.correlationId,
      });
    }

    return { ok: true, errors: [], bundle: write.bundle, events };
  }
}

export function subjectNotFoundError(subjectId: string) {
  return createEnterpriseError({
    code: ENTERPRISE_ERROR_CODES.IDENTITY_NOT_FOUND,
    message: `Identity subject not found: ${subjectId}`,
    capability: "identity",
  });
}
