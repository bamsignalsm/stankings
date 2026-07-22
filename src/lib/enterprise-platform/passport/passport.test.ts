import { describe, expect, it } from "vitest";
import {
  createMemoryPassportStore,
  PassportRegistry,
  assessPassportEightGates,
  createSupabasePassportStore,
  defaultEvidenceAssertionTypes,
  type PassportSupabaseClient,
  MemoryEventCollector,
  ENTERPRISE_EVENT_TYPES,
} from "@/lib/enterprise-platform";

describe("passport eight-gate completion", () => {
  it("reports complete", () => {
    const report = assessPassportEightGates();
    expect(report.complete).toBe(true);
  });

  it("issues, attaches evidence, suspends, and revokes with events", async () => {
    const store = createMemoryPassportStore();
    const registry = new PassportRegistry(store);
    const events = new MemoryEventCollector();
    const issued = await registry.issue(
      {
        subjectId: "sid_passportcomplete001",
        platformId: "stankings-hq",
        now: "2026-07-22T00:00:00.000Z",
        evidence: [
          {
            provider: "identity",
            assertionType: "identity.subject.active",
            assertionRef: "sid_passportcomplete001",
            status: "verified",
            verifiedAt: "2026-07-22T00:00:00.000Z",
          },
        ],
      },
      events,
    );
    expect(issued.ok).toBe(true);
    expect(issued.record?.state).toBe("active");
    expect(issued.record?.verificationStatus).toBe("verified");
    expect(issued.record?.auditRef).toBeTruthy();

    const attached = await registry.attachEvidence(
      {
        passportId: issued.record!.passportId,
        provider: "consent",
        assertionType: "consent.passport.cross_platform",
        assertionRef: "cns_example_001",
        status: "verified",
        verifiedAt: "2026-07-22T00:01:00.000Z",
        now: "2026-07-22T00:01:00.000Z",
      },
      events,
    );
    expect(attached.ok).toBe(true);
    expect(attached.record?.evidenceRefs).toHaveLength(2);

    const suspended = await registry.suspend(issued.record!.passportId, "review", events);
    expect(suspended.ok).toBe(true);
    expect(suspended.record?.state).toBe("suspended");

    const revoked = await registry.revoke(issued.record!.passportId, "fraud", events);
    expect(revoked.ok).toBe(true);
    expect(revoked.record?.state).toBe("revoked");

    expect(events.ofType(ENTERPRISE_EVENT_TYPES.PASSPORT_ISSUED)).toHaveLength(1);
    expect(events.ofType(ENTERPRISE_EVENT_TYPES.PASSPORT_EVIDENCE_ATTACHED)).toHaveLength(1);
    expect(events.ofType(ENTERPRISE_EVENT_TYPES.PASSPORT_SUSPENDED)).toHaveLength(1);
    expect(events.ofType(ENTERPRISE_EVENT_TYPES.PASSPORT_REVOKED)).toHaveLength(1);
  });

  it("prepares renewal as draft successor", async () => {
    const store = createMemoryPassportStore();
    const registry = new PassportRegistry(store);
    const issued = await registry.issue({
      subjectId: "sid_passportrenew000001",
      now: "2026-07-22T00:00:00.000Z",
      evidence: [
        {
          provider: "identity",
          assertionType: "identity.subject.active",
          assertionRef: "sid_passportrenew000001",
          status: "verified",
        },
      ],
    });
    const renewal = await registry.prepareRenewal(issued.record!.passportId);
    expect(renewal.ok).toBe(true);
    expect(renewal.record?.state).toBe("draft");
    expect(renewal.record?.renewsPassportId).toBe(issued.record!.passportId);
  });

  it("exposes reusable evidence assertion catalogue", () => {
    const types = defaultEvidenceAssertionTypes();
    expect(types.some((t) => t.provider === "bayright")).toBe(true);
    expect(types.some((t) => t.provider === "yike")).toBe(true);
    expect(types.some((t) => t.provider === "bamsignal")).toBe(true);
  });

  it("supabase adapter persists records via client interface", async () => {
    const rows = new Map<string, Record<string, unknown>>();
    const evidenceRows = new Map<string, Record<string, unknown>>();
    const history: Record<string, unknown>[] = [];

    const client: PassportSupabaseClient = {
      from(table: string) {
        return {
          select() {
            return {
              eq(column: string, value: string) {
                if (table === "shared_passport_records") {
                  const filtered = [...rows.values()].filter((r) => String(r[column]) === value);
                  const promise = Promise.resolve({ data: filtered, error: null });
                  return Object.assign(promise, {
                    async maybeSingle() {
                      if (column === "passport_id") {
                        return { data: rows.get(value) ?? null, error: null };
                      }
                      return { data: null, error: null };
                    },
                  });
                }
                if (table === "shared_passport_evidence") {
                  const filtered = [...evidenceRows.values()].filter(
                    (r) => String(r[column]) === value,
                  );
                  return Object.assign(Promise.resolve({ data: filtered, error: null }), {
                    async maybeSingle() {
                      return { data: null, error: null };
                    },
                  });
                }
                const filtered = history.filter((h) => String(h[column]) === value);
                return Object.assign(Promise.resolve({ data: filtered, error: null }), {
                  async maybeSingle() {
                    return { data: null, error: null };
                  },
                });
              },
            };
          },
          async upsert(row: Record<string, unknown>) {
            if (table === "shared_passport_records") {
              rows.set(String(row.passport_id), row);
            } else if (table === "shared_passport_evidence") {
              evidenceRows.set(String(row.evidence_id), row);
            }
            return { error: null };
          },
          async insert(row: Record<string, unknown>) {
            history.push(row);
            return { error: null };
          },
        };
      },
    };

    const store = createSupabasePassportStore(client);
    const registry = new PassportRegistry(store);
    const result = await registry.issue({
      subjectId: "sid_passportsupabase001",
      passportId: "ppt_supabase_test_001",
      now: "2026-07-22T00:00:00.000Z",
      evidence: [
        {
          provider: "identity",
          assertionType: "identity.subject.active",
          assertionRef: "sid_passportsupabase001",
          status: "verified",
        },
      ],
    });
    expect(result.ok).toBe(true);
    const loaded = await store.get("ppt_supabase_test_001");
    expect(loaded?.subjectId).toBe("sid_passportsupabase001");
    expect(loaded?.evidenceRefs.length).toBeGreaterThanOrEqual(1);
  });
});
