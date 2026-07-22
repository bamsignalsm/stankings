/**
 * In-memory + file Trust stores — Passport/Consent pattern.
 */

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  TrustAssessment,
  TrustEvidenceRef,
  TrustHistoryEntry,
  TrustPolicyDefinition,
} from "./types";
import { TRUST_SCHEMA_VERSION } from "./types";
import { validateTrustAssessment, validateTrustPolicy } from "./validation";

export interface TrustStore {
  readonly providerId: string;
  get(assessmentId: string): Promise<TrustAssessment | null>;
  listBySubject(subjectId: string): Promise<TrustAssessment[]>;
  listByPassport(passportId: string): Promise<TrustAssessment[]>;
  put(
    assessment: TrustAssessment,
  ): Promise<{ ok: boolean; errors: string[]; assessment?: TrustAssessment }>;
  putEvidence(evidence: TrustEvidenceRef): Promise<{ ok: boolean; errors: string[] }>;
  listEvidence(assessmentId: string): Promise<TrustEvidenceRef[]>;
  appendHistory(entry: TrustHistoryEntry): Promise<void>;
  listHistory(assessmentId: string): Promise<TrustHistoryEntry[]>;
  putPolicy(policy: TrustPolicyDefinition): Promise<{ ok: boolean; errors: string[] }>;
  getPolicy(policyId: string, version?: string): Promise<TrustPolicyDefinition | null>;
  listPolicies(): Promise<TrustPolicyDefinition[]>;
}

export class MemoryTrustStore implements TrustStore {
  readonly providerId = "memory";
  private readonly byId = new Map<string, TrustAssessment>();
  private readonly evidence = new Map<string, TrustEvidenceRef[]>();
  private readonly history = new Map<string, TrustHistoryEntry[]>();
  private readonly policies = new Map<string, TrustPolicyDefinition>();

  private policyKey(policyId: string, version: string) {
    return `${policyId}@${version}`;
  }

  async get(assessmentId: string) {
    return this.byId.get(assessmentId) ?? null;
  }

  async listBySubject(subjectId: string) {
    return [...this.byId.values()].filter((a) => a.subjectId === subjectId);
  }

  async listByPassport(passportId: string) {
    return [...this.byId.values()].filter((a) => a.passportId === passportId);
  }

  async put(assessment: TrustAssessment) {
    const check = validateTrustAssessment(assessment);
    if (!check.valid) return { ok: false, errors: check.errors };
    const existing = this.byId.get(assessment.assessmentId);
    if (existing && existing.version > assessment.version) {
      return {
        ok: false,
        errors: [`version conflict: store v${existing.version} > write v${assessment.version}`],
      };
    }
    const clone: TrustAssessment = {
      ...assessment,
      evidenceRefs: assessment.evidenceRefs.map((e) => ({ ...e })),
      dimensions: assessment.dimensions.map((d) => ({ ...d, evidenceIds: [...d.evidenceIds] })),
      riskIndicators: [...assessment.riskIndicators],
      confidence: assessment.confidence ? { ...assessment.confidence } : undefined,
      policy: { ...assessment.policy },
      metadata: assessment.metadata ? { ...assessment.metadata } : undefined,
    };
    this.byId.set(clone.assessmentId, clone);
    this.evidence.set(clone.assessmentId, clone.evidenceRefs.map((e) => ({ ...e })));
    return { ok: true, errors: [], assessment: { ...clone } };
  }

  async putEvidence(evidence: TrustEvidenceRef) {
    const list = this.evidence.get(evidence.assessmentId) ?? [];
    const idx = list.findIndex((e) => e.evidenceId === evidence.evidenceId);
    if (idx >= 0) list[idx] = { ...evidence };
    else list.push({ ...evidence });
    this.evidence.set(evidence.assessmentId, list);
    const assessment = this.byId.get(evidence.assessmentId);
    if (assessment) {
      assessment.evidenceRefs = [...list];
      this.byId.set(assessment.assessmentId, { ...assessment });
    }
    return { ok: true, errors: [] };
  }

  async listEvidence(assessmentId: string) {
    return [...(this.evidence.get(assessmentId) ?? [])];
  }

  async appendHistory(entry: TrustHistoryEntry) {
    const list = this.history.get(entry.assessmentId) ?? [];
    list.push(entry);
    this.history.set(entry.assessmentId, list);
  }

  async listHistory(assessmentId: string) {
    return [...(this.history.get(assessmentId) ?? [])];
  }

  async putPolicy(policy: TrustPolicyDefinition) {
    const check = validateTrustPolicy(policy);
    if (!check.valid) return { ok: false, errors: check.errors };
    this.policies.set(this.policyKey(policy.policyId, policy.version), { ...policy, rules: [...policy.rules] });
    return { ok: true, errors: [] };
  }

  async getPolicy(policyId: string, version?: string) {
    if (version) return this.policies.get(this.policyKey(policyId, version)) ?? null;
    const matches = [...this.policies.values()].filter((p) => p.policyId === policyId);
    return matches.sort((a, b) => b.version.localeCompare(a.version))[0] ?? null;
  }

  async listPolicies() {
    return [...this.policies.values()];
  }
}

export function createMemoryTrustStore(): TrustStore {
  return new MemoryTrustStore();
}

interface FilePayload {
  schemaVersion: number;
  assessments: Record<string, TrustAssessment>;
  evidence: Record<string, TrustEvidenceRef[]>;
  history: Record<string, TrustHistoryEntry[]>;
  policies: Record<string, TrustPolicyDefinition>;
}

export class FileTrustStore implements TrustStore {
  readonly providerId = "file";

  constructor(
    private readonly filePath: string,
    private readonly schemaVersion = TRUST_SCHEMA_VERSION,
  ) {}

  private async load(): Promise<FilePayload> {
    try {
      const raw = await readFile(this.filePath, "utf8");
      return JSON.parse(raw) as FilePayload;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        return {
          schemaVersion: this.schemaVersion,
          assessments: {},
          evidence: {},
          history: {},
          policies: {},
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

  private policyKey(policyId: string, version: string) {
    return `${policyId}@${version}`;
  }

  async get(assessmentId: string) {
    const data = await this.load();
    return data.assessments[assessmentId] ?? null;
  }

  async listBySubject(subjectId: string) {
    const data = await this.load();
    return Object.values(data.assessments).filter((a) => a.subjectId === subjectId);
  }

  async listByPassport(passportId: string) {
    const data = await this.load();
    return Object.values(data.assessments).filter((a) => a.passportId === passportId);
  }

  async put(assessment: TrustAssessment) {
    const check = validateTrustAssessment(assessment);
    if (!check.valid) return { ok: false, errors: check.errors };
    const data = await this.load();
    const existing = data.assessments[assessment.assessmentId];
    if (existing && existing.version > assessment.version) {
      return {
        ok: false,
        errors: [`version conflict: store v${existing.version} > write v${assessment.version}`],
      };
    }
    data.assessments[assessment.assessmentId] = { ...assessment };
    data.evidence[assessment.assessmentId] = assessment.evidenceRefs.map((e) => ({ ...e }));
    data.schemaVersion = this.schemaVersion;
    await this.save(data);
    return { ok: true, errors: [], assessment: { ...assessment } };
  }

  async putEvidence(evidence: TrustEvidenceRef) {
    const data = await this.load();
    const list = data.evidence[evidence.assessmentId] ?? [];
    const idx = list.findIndex((e) => e.evidenceId === evidence.evidenceId);
    if (idx >= 0) list[idx] = { ...evidence };
    else list.push({ ...evidence });
    data.evidence[evidence.assessmentId] = list;
    const assessment = data.assessments[evidence.assessmentId];
    if (assessment) {
      assessment.evidenceRefs = [...list];
      data.assessments[evidence.assessmentId] = assessment;
    }
    await this.save(data);
    return { ok: true, errors: [] };
  }

  async listEvidence(assessmentId: string) {
    const data = await this.load();
    return [...(data.evidence[assessmentId] ?? [])];
  }

  async appendHistory(entry: TrustHistoryEntry) {
    const data = await this.load();
    const list = data.history[entry.assessmentId] ?? [];
    list.push(entry);
    data.history[entry.assessmentId] = list;
    await this.save(data);
  }

  async listHistory(assessmentId: string) {
    const data = await this.load();
    return [...(data.history[assessmentId] ?? [])];
  }

  async putPolicy(policy: TrustPolicyDefinition) {
    const check = validateTrustPolicy(policy);
    if (!check.valid) return { ok: false, errors: check.errors };
    const data = await this.load();
    data.policies[this.policyKey(policy.policyId, policy.version)] = { ...policy };
    await this.save(data);
    return { ok: true, errors: [] };
  }

  async getPolicy(policyId: string, version?: string) {
    const data = await this.load();
    if (version) return data.policies[this.policyKey(policyId, version)] ?? null;
    const matches = Object.values(data.policies).filter((p) => p.policyId === policyId);
    return matches.sort((a, b) => b.version.localeCompare(a.version))[0] ?? null;
  }

  async listPolicies() {
    const data = await this.load();
    return Object.values(data.policies);
  }
}

export function createFileTrustStore(filePath: string): TrustStore {
  return new FileTrustStore(filePath);
}
