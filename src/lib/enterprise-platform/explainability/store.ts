/**
 * In-memory + file Explainability stores.
 */

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ExplanationHistoryEntry, ExplanationRecord } from "./types";
import { EXPLAINABILITY_SCHEMA_VERSION } from "./types";
import { validateExplanationRecord } from "./validation";

export interface ExplainabilityStore {
  readonly providerId: string;
  get(explanationId: string): Promise<ExplanationRecord | null>;
  listBySubject(subjectId: string): Promise<ExplanationRecord[]>;
  listByDecision(decisionRef: string): Promise<ExplanationRecord[]>;
  put(
    record: ExplanationRecord,
  ): Promise<{ ok: boolean; errors: string[]; record?: ExplanationRecord }>;
  appendHistory(entry: ExplanationHistoryEntry): Promise<void>;
  listHistory(explanationId: string): Promise<ExplanationHistoryEntry[]>;
}

export class MemoryExplainabilityStore implements ExplainabilityStore {
  readonly providerId = "memory";
  private readonly byId = new Map<string, ExplanationRecord>();
  private readonly history = new Map<string, ExplanationHistoryEntry[]>();

  async get(explanationId: string) {
    return this.byId.get(explanationId) ?? null;
  }

  async listBySubject(subjectId: string) {
    return [...this.byId.values()].filter((r) => r.subjectId === subjectId);
  }

  async listByDecision(decisionRef: string) {
    return [...this.byId.values()].filter((r) => r.decision.decisionRef === decisionRef);
  }

  async put(record: ExplanationRecord) {
    const check = validateExplanationRecord(record);
    if (!check.valid) return { ok: false, errors: check.errors };
    const existing = this.byId.get(record.explanationId);
    if (existing && existing.version > record.version) {
      return {
        ok: false,
        errors: [`version conflict: store v${existing.version} > write v${record.version}`],
      };
    }
    const clone: ExplanationRecord = {
      ...record,
      decision: { ...record.decision },
      evidenceRefs: record.evidenceRefs.map((e) => ({ ...e })),
      policyRefs: record.policyRefs.map((p) => ({ ...p })),
      machineExplanation: {
        ...record.machineExplanation,
        factors: record.machineExplanation.factors.map((f) => ({ ...f })),
        riskIndicators: record.machineExplanation.riskIndicators
          ? [...record.machineExplanation.riskIndicators]
          : undefined,
        rationaleKeys: [...record.machineExplanation.rationaleKeys],
      },
      confidence: record.confidence ? { ...record.confidence } : undefined,
      metadata: record.metadata ? { ...record.metadata } : undefined,
    };
    this.byId.set(clone.explanationId, clone);
    return { ok: true, errors: [], record: { ...clone } };
  }

  async appendHistory(entry: ExplanationHistoryEntry) {
    const list = this.history.get(entry.explanationId) ?? [];
    list.push(entry);
    this.history.set(entry.explanationId, list);
  }

  async listHistory(explanationId: string) {
    return [...(this.history.get(explanationId) ?? [])];
  }
}

export function createMemoryExplainabilityStore(): ExplainabilityStore {
  return new MemoryExplainabilityStore();
}

interface FilePayload {
  schemaVersion: number;
  records: Record<string, ExplanationRecord>;
  history: Record<string, ExplanationHistoryEntry[]>;
}

export class FileExplainabilityStore implements ExplainabilityStore {
  readonly providerId = "file";

  constructor(
    private readonly filePath: string,
    private readonly schemaVersion = EXPLAINABILITY_SCHEMA_VERSION,
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

  async get(explanationId: string) {
    const data = await this.load();
    return data.records[explanationId] ?? null;
  }

  async listBySubject(subjectId: string) {
    const data = await this.load();
    return Object.values(data.records).filter((r) => r.subjectId === subjectId);
  }

  async listByDecision(decisionRef: string) {
    const data = await this.load();
    return Object.values(data.records).filter((r) => r.decision.decisionRef === decisionRef);
  }

  async put(record: ExplanationRecord) {
    const check = validateExplanationRecord(record);
    if (!check.valid) return { ok: false, errors: check.errors };
    const data = await this.load();
    const existing = data.records[record.explanationId];
    if (existing && existing.version > record.version) {
      return {
        ok: false,
        errors: [`version conflict: store v${existing.version} > write v${record.version}`],
      };
    }
    data.records[record.explanationId] = { ...record };
    data.schemaVersion = this.schemaVersion;
    await this.save(data);
    return { ok: true, errors: [], record: { ...record } };
  }

  async appendHistory(entry: ExplanationHistoryEntry) {
    const data = await this.load();
    const list = data.history[entry.explanationId] ?? [];
    list.push(entry);
    data.history[entry.explanationId] = list;
    await this.save(data);
  }

  async listHistory(explanationId: string) {
    const data = await this.load();
    return [...(data.history[explanationId] ?? [])];
  }
}

export function createFileExplainabilityStore(filePath: string): ExplainabilityStore {
  return new FileExplainabilityStore(filePath);
}
