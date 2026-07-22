/**
 * File-backed IdentityStore — durable persistence without database coupling.
 * Suitable for dogfood, CI durability proofs, and local adapters.
 */

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  IdentityStore,
  IdentityStoreWriteResult,
  PersistentIdentityBundle,
} from "./types";
import { checkVersionConflict, cloneBundle, externalKey } from "./helpers";

interface FileStorePayload {
  schemaVersion: number;
  subjects: Record<string, PersistentIdentityBundle>;
  externalIndex: Record<string, string>;
}

export class FileIdentityStore implements IdentityStore {
  readonly providerId = "file";

  constructor(
    private readonly filePath: string,
    private readonly schemaVersion = 1,
  ) {}

  private async ensureLoaded(): Promise<FileStorePayload> {
    try {
      const raw = await readFile(this.filePath, "utf8");
      const parsed = JSON.parse(raw) as FileStorePayload;
      if (!parsed.subjects) parsed.subjects = {};
      if (!parsed.externalIndex) parsed.externalIndex = {};
      return parsed;
    } catch (err) {
      const code = (err as NodeJS.ErrnoException).code;
      if (code === "ENOENT") {
        return { schemaVersion: this.schemaVersion, subjects: {}, externalIndex: {} };
      }
      throw err;
    }
  }

  private async persist(payload: FileStorePayload): Promise<void> {
    await mkdir(path.dirname(this.filePath), { recursive: true });
    const tmp = `${this.filePath}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(payload, null, 2), "utf8");
    await rename(tmp, this.filePath);
  }

  async getSubject(subjectId: string): Promise<PersistentIdentityBundle | null> {
    const data = await this.ensureLoaded();
    const bundle = data.subjects[subjectId];
    return bundle ? cloneBundle(bundle) : null;
  }

  async findByExternalRef(
    system: string,
    externalId: string,
  ): Promise<PersistentIdentityBundle | null> {
    const data = await this.ensureLoaded();
    const subjectId = data.externalIndex[externalKey(system, externalId)];
    if (!subjectId) return null;
    return this.getSubject(subjectId);
  }

  async putSubject(bundle: PersistentIdentityBundle): Promise<IdentityStoreWriteResult> {
    const data = await this.ensureLoaded();
    const existing = data.subjects[bundle.subject.subjectId];
    const conflict = checkVersionConflict(existing, bundle);
    if (conflict) return conflict;

    if (existing) {
      for (const ref of existing.subject.externalRefs) {
        delete data.externalIndex[externalKey(ref.system, ref.externalId)];
      }
    }

    for (const ref of bundle.subject.externalRefs) {
      const key = externalKey(ref.system, ref.externalId);
      const owner = data.externalIndex[key];
      if (owner && owner !== bundle.subject.subjectId) {
        return { ok: false, errors: [`external ref ${key} already mapped to ${owner}`] };
      }
    }

    const clone = cloneBundle(bundle);
    data.subjects[clone.subject.subjectId] = clone;
    for (const ref of clone.subject.externalRefs) {
      data.externalIndex[externalKey(ref.system, ref.externalId)] = clone.subject.subjectId;
    }
    data.schemaVersion = this.schemaVersion;
    await this.persist(data);
    return { ok: true, errors: [], bundle: cloneBundle(clone) };
  }

  async listSubjects(limit = 100): Promise<PersistentIdentityBundle[]> {
    const data = await this.ensureLoaded();
    return Object.values(data.subjects)
      .slice(0, limit)
      .map((b) => cloneBundle(b));
  }
}

export function createFileIdentityStore(filePath: string): IdentityStore {
  return new FileIdentityStore(filePath);
}
