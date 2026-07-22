/**
 * In-memory + file Passport stores — Consent/IdentityStore pattern.
 */

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { PassportEvidenceRef, PassportHistoryEntry, PassportRecord } from "./types";
import { PASSPORT_SCHEMA_VERSION } from "./types";
import { validatePassportRecord } from "./validation";

export interface PassportStore {
  readonly providerId: string;
  get(passportId: string): Promise<PassportRecord | null>;
  listBySubject(subjectId: string): Promise<PassportRecord[]>;
  put(record: PassportRecord): Promise<{ ok: boolean; errors: string[]; record?: PassportRecord }>;
  putEvidence(evidence: PassportEvidenceRef): Promise<{ ok: boolean; errors: string[] }>;
  listEvidence(passportId: string): Promise<PassportEvidenceRef[]>;
  appendHistory(entry: PassportHistoryEntry): Promise<void>;
  listHistory(passportId: string): Promise<PassportHistoryEntry[]>;
}

export class MemoryPassportStore implements PassportStore {
  readonly providerId = "memory";
  private readonly byId = new Map<string, PassportRecord>();
  private readonly evidence = new Map<string, PassportEvidenceRef[]>();
  private readonly history = new Map<string, PassportHistoryEntry[]>();

  async get(passportId: string) {
    return this.byId.get(passportId) ?? null;
  }

  async listBySubject(subjectId: string) {
    return [...this.byId.values()].filter((r) => r.subjectId === subjectId);
  }

  async put(record: PassportRecord) {
    const check = validatePassportRecord(record);
    if (!check.valid) return { ok: false, errors: check.errors };
    const existing = this.byId.get(record.passportId);
    if (existing && existing.version > record.version) {
      return {
        ok: false,
        errors: [`version conflict: store v${existing.version} > write v${record.version}`],
      };
    }
    const clone: PassportRecord = {
      ...record,
      evidenceRefs: record.evidenceRefs.map((e) => ({ ...e })),
      metadata: record.metadata ? { ...record.metadata } : undefined,
      issuance: record.issuance ? { ...record.issuance } : undefined,
    };
    this.byId.set(clone.passportId, clone);
    this.evidence.set(
      clone.passportId,
      clone.evidenceRefs.map((e) => ({ ...e })),
    );
    return { ok: true, errors: [], record: { ...clone, evidenceRefs: [...clone.evidenceRefs] } };
  }

  async putEvidence(evidence: PassportEvidenceRef) {
    const list = this.evidence.get(evidence.passportId) ?? [];
    const idx = list.findIndex((e) => e.evidenceId === evidence.evidenceId);
    if (idx >= 0) list[idx] = { ...evidence };
    else list.push({ ...evidence });
    this.evidence.set(evidence.passportId, list);
    const record = this.byId.get(evidence.passportId);
    if (record) {
      record.evidenceRefs = [...list];
      this.byId.set(record.passportId, { ...record });
    }
    return { ok: true, errors: [] };
  }

  async listEvidence(passportId: string) {
    return [...(this.evidence.get(passportId) ?? [])];
  }

  async appendHistory(entry: PassportHistoryEntry) {
    const list = this.history.get(entry.passportId) ?? [];
    list.push(entry);
    this.history.set(entry.passportId, list);
  }

  async listHistory(passportId: string) {
    return [...(this.history.get(passportId) ?? [])];
  }
}

export function createMemoryPassportStore(): PassportStore {
  return new MemoryPassportStore();
}

interface FilePayload {
  schemaVersion: number;
  records: Record<string, PassportRecord>;
  evidence: Record<string, PassportEvidenceRef[]>;
  history: Record<string, PassportHistoryEntry[]>;
}

export class FilePassportStore implements PassportStore {
  readonly providerId = "file";

  constructor(
    private readonly filePath: string,
    private readonly schemaVersion = PASSPORT_SCHEMA_VERSION,
  ) {}

  private async load(): Promise<FilePayload> {
    try {
      const raw = await readFile(this.filePath, "utf8");
      return JSON.parse(raw) as FilePayload;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        return {
          schemaVersion: this.schemaVersion,
          records: {},
          evidence: {},
          history: {},
        };
      }
      throw err;
    }
  }

  private async save(payload: FilePayload) {
    await mkdir(path.dirname(this.filePath), { recursive: true });
    const tmp = `${this.filePath}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(payload, null, 2), "utf8");
    await rename(tmp, this.filePath);
  }

  async get(passportId: string) {
    const data = await this.load();
    return data.records[passportId] ?? null;
  }

  async listBySubject(subjectId: string) {
    const data = await this.load();
    return Object.values(data.records).filter((r) => r.subjectId === subjectId);
  }

  async put(record: PassportRecord) {
    const check = validatePassportRecord(record);
    if (!check.valid) return { ok: false, errors: check.errors };
    const data = await this.load();
    const existing = data.records[record.passportId];
    if (existing && existing.version > record.version) {
      return {
        ok: false,
        errors: [`version conflict: store v${existing.version} > write v${record.version}`],
      };
    }
    data.records[record.passportId] = { ...record, evidenceRefs: [...record.evidenceRefs] };
    data.evidence[record.passportId] = record.evidenceRefs.map((e) => ({ ...e }));
    data.schemaVersion = this.schemaVersion;
    await this.save(data);
    return { ok: true, errors: [], record: { ...record } };
  }

  async putEvidence(evidence: PassportEvidenceRef) {
    const data = await this.load();
    const list = data.evidence[evidence.passportId] ?? [];
    const idx = list.findIndex((e) => e.evidenceId === evidence.evidenceId);
    if (idx >= 0) list[idx] = { ...evidence };
    else list.push({ ...evidence });
    data.evidence[evidence.passportId] = list;
    const record = data.records[evidence.passportId];
    if (record) {
      record.evidenceRefs = [...list];
      data.records[evidence.passportId] = record;
    }
    await this.save(data);
    return { ok: true, errors: [] };
  }

  async listEvidence(passportId: string) {
    const data = await this.load();
    return [...(data.evidence[passportId] ?? [])];
  }

  async appendHistory(entry: PassportHistoryEntry) {
    const data = await this.load();
    const list = data.history[entry.passportId] ?? [];
    list.push(entry);
    data.history[entry.passportId] = list;
    await this.save(data);
  }

  async listHistory(passportId: string) {
    const data = await this.load();
    return [...(data.history[passportId] ?? [])];
  }
}

export function createFilePassportStore(filePath: string): PassportStore {
  return new FilePassportStore(filePath);
}
