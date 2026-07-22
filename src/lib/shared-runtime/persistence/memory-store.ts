/**
 * In-memory IdentityStore — executable without database coupling.
 */

import type {
  IdentityStore,
  IdentityStoreWriteResult,
  PersistentIdentityBundle,
} from "./types";

export class MemoryIdentityStore implements IdentityStore {
  readonly providerId = "memory";
  private readonly byId = new Map<string, PersistentIdentityBundle>();
  private readonly byExternal = new Map<string, string>();

  private externalKey(system: string, externalId: string): string {
    return `${system}::${externalId}`;
  }

  async getSubject(subjectId: string): Promise<PersistentIdentityBundle | null> {
    return this.byId.get(subjectId) ?? null;
  }

  async findByExternalRef(
    system: string,
    externalId: string,
  ): Promise<PersistentIdentityBundle | null> {
    const subjectId = this.byExternal.get(this.externalKey(system, externalId));
    if (!subjectId) return null;
    return this.getSubject(subjectId);
  }

  async putSubject(bundle: PersistentIdentityBundle): Promise<IdentityStoreWriteResult> {
    const existing = this.byId.get(bundle.subject.subjectId);
    if (existing && existing.subject.version > bundle.subject.version) {
      return {
        ok: false,
        errors: [
          `version conflict: store has v${existing.subject.version}, write has v${bundle.subject.version}`,
        ],
      };
    }

    // Clear old external index entries for this subject
    if (existing) {
      for (const ref of existing.subject.externalRefs) {
        this.byExternal.delete(this.externalKey(ref.system, ref.externalId));
      }
    }

    for (const ref of bundle.subject.externalRefs) {
      const key = this.externalKey(ref.system, ref.externalId);
      const owner = this.byExternal.get(key);
      if (owner && owner !== bundle.subject.subjectId) {
        return {
          ok: false,
          errors: [`external ref ${key} already mapped to ${owner}`],
        };
      }
    }

    const clone: PersistentIdentityBundle = {
      subject: {
        ...bundle.subject,
        externalRefs: [...bundle.subject.externalRefs],
        metadata: bundle.subject.metadata ? { ...bundle.subject.metadata } : undefined,
      },
      memberships: [...bundle.memberships],
      roleClaims: [...bundle.roleClaims],
      platformParticipation: [...bundle.platformParticipation],
    };

    this.byId.set(clone.subject.subjectId, clone);
    for (const ref of clone.subject.externalRefs) {
      this.byExternal.set(this.externalKey(ref.system, ref.externalId), clone.subject.subjectId);
    }

    return { ok: true, errors: [], bundle: clone };
  }

  async listSubjects(limit = 100): Promise<PersistentIdentityBundle[]> {
    return [...this.byId.values()].slice(0, limit);
  }
}

export function createMemoryIdentityStore(): IdentityStore {
  return new MemoryIdentityStore();
}
