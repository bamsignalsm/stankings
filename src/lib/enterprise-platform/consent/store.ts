/**
 * In-memory + file consent stores — IdentityStore pattern.
 */

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ConsentHistoryEntry, ConsentRecord } from "./types";
import { validateConsentRecord } from "./validation";

export interface ConsentStore {
  readonly providerId: string;
  get(consentId: string): Promise<ConsentRecord | null>;
  listBySubject(subjectId: string): Promise<ConsentRecord[]>;
  put(record: ConsentRecord): Promise<{ ok: boolean; errors: string[]; record?: ConsentRecord }>;
  appendHistory(entry: ConsentHistoryEntry): Promise<void>;
  listHistory(consentId: string): Promise<ConsentHistoryEntry[]>;
}

export class MemoryConsentStore implements ConsentStore {
  readonly providerId = "memory";
  private readonly byId = new Map<string, ConsentRecord>();
  private readonly history = new Map<string, ConsentHistoryEntry[]>();

  async get(consentId: string) {
    return this.byId.get(consentId) ?? null;
  }

  async listBySubject(subjectId: string) {
    return [...this.byId.values()].filter((r) => r.subjectId === subjectId);
  }

  async put(record: ConsentRecord) {
    const check = validateConsentRecord(record);
    if (!check.valid) return { ok: false, errors: check.errors };
    const existing = this.byId.get(record.consentId);
    if (existing && existing.version > record.version) {
      return {
        ok: false,
        errors: [`version conflict: store v${existing.version} > write v${record.version}`],
      };
    }
    const clone = { ...record, metadata: record.metadata ? { ...record.metadata } : undefined };
    this.byId.set(clone.consentId, clone);
    return { ok: true, errors: [], record: { ...clone } };
  }

  async appendHistory(entry: ConsentHistoryEntry) {
    const list = this.history.get(entry.consentId) ?? [];
    list.push(entry);
    this.history.set(entry.consentId, list);
  }

  async listHistory(consentId: string) {
    return [...(this.history.get(consentId) ?? [])];
  }
}

export function createMemoryConsentStore(): ConsentStore {
  return new MemoryConsentStore();
}

interface FilePayload {
  schemaVersion: number;
  records: Record<string, ConsentRecord>;
  history: Record<string, ConsentHistoryEntry[]>;
}

export class FileConsentStore implements ConsentStore {
  readonly providerId = "file";

  constructor(
    private readonly filePath: string,
    private readonly schemaVersion = 1,
  ) {}

  private async load(): Promise<FilePayload> {
    try {
      const raw = await readFile(this.filePath, "utf8");
      return JSON.parse(raw) as FilePayload;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        return { schemaVersion: this.schemaVersion, records: {}, history: {} };
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

  async get(consentId: string) {
    const data = await this.load();
    return data.records[consentId] ?? null;
  }

  async listBySubject(subjectId: string) {
    const data = await this.load();
    return Object.values(data.records).filter((r) => r.subjectId === subjectId);
  }

  async put(record: ConsentRecord) {
    const check = validateConsentRecord(record);
    if (!check.valid) return { ok: false, errors: check.errors };
    const data = await this.load();
    const existing = data.records[record.consentId];
    if (existing && existing.version > record.version) {
      return {
        ok: false,
        errors: [`version conflict: store v${existing.version} > write v${record.version}`],
      };
    }
    data.records[record.consentId] = { ...record };
    data.schemaVersion = this.schemaVersion;
    await this.save(data);
    return { ok: true, errors: [], record: { ...record } };
  }

  async appendHistory(entry: ConsentHistoryEntry) {
    const data = await this.load();
    const list = data.history[entry.consentId] ?? [];
    list.push(entry);
    data.history[entry.consentId] = list;
    await this.save(data);
  }

  async listHistory(consentId: string) {
    const data = await this.load();
    return [...(data.history[consentId] ?? [])];
  }
}

export function createFileConsentStore(filePath: string): ConsentStore {
  return new FileConsentStore(filePath);
}
