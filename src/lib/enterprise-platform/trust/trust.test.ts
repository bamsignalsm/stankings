import { describe, expect, it } from "vitest";
import {
  createMemoryTrustStore,
  TrustRegistry,
  assessTrustEightGates,
  defaultTrustPolicies,
  evaluateTrustPolicy,
  createSupabaseTrustStore,
  type TrustSupabaseClient,
  MemoryEventCollector,
  ENTERPRISE_EVENT_TYPES,
} from "@/lib/enterprise-platform";

describe("trust eight-gate completion", () => {
  it("reports complete", () => {
    expect(assessTrustEightGates().complete).toBe(true);
  });

  it("evaluates baseline policy to eligible with identity+passport evidence", () => {
    const policy = defaultTrustPolicies()[0];
    const result = evaluateTrustPolicy(policy, [
      {
        evidenceId: "tev_1",
        assessmentId: "tas_1",
        provider: "identity",
        assertionType: "identity.subject.active",
        assertionRef: "sid_trustsubject0000001",
        status: "verified",
        createdAt: "2026-07-22T00:00:00.000Z",
        updatedAt: "2026-07-22T00:00:00.000Z",
      },
      {
        evidenceId: "tev_2",
        assessmentId: "tas_1",
        provider: "passport",
        assertionType: "passport.active",
        assertionRef: "ppt_1",
        status: "verified",
        createdAt: "2026-07-22T00:00:00.000Z",
        updatedAt: "2026-07-22T00:00:00.000Z",
      },
    ]);
    expect(result.outcome).toBe("eligible");
    expect(result.confidence.band).toBe("high");
  });

  it("assesses, reassesses, and invalidates with events", async () => {
    const store = createMemoryTrustStore();
    const registry = new TrustRegistry(store);
    const events = new MemoryEventCollector();
    const assessed = await registry.assess(
      {
        subjectId: "sid_trustcomplete000001",
        passportId: "ppt_trust_001",
        platformId: "stankings-hq",
        now: "2026-07-22T00:00:00.000Z",
        evidence: [
          {
            provider: "identity",
            assertionType: "identity.subject.active",
            assertionRef: "sid_trustcomplete000001",
            status: "verified",
          },
          {
            provider: "passport",
            assertionType: "passport.active",
            assertionRef: "ppt_trust_001",
            status: "verified",
          },
        ],
      },
      events,
    );
    expect(assessed.ok).toBe(true);
    expect(assessed.assessment?.outcome).toBe("eligible");

    const reassessed = await registry.reassess(
      assessed.assessment!.assessmentId,
      [
        {
          provider: "yike",
          assertionType: "yike.marketplace.verification",
          assertionRef: "yike:opaque",
          status: "verified",
          dimension: "marketplace",
        },
      ],
      events,
    );
    expect(reassessed.ok).toBe(true);
    expect(reassessed.assessment?.supersedesAssessmentId).toBe(
      assessed.assessment!.assessmentId,
    );

    const invalidated = await registry.invalidate(
      reassessed.assessment!.assessmentId,
      "manual_review",
      events,
    );
    expect(invalidated.ok).toBe(true);
    expect(invalidated.assessment?.state).toBe("invalidated");
    expect(events.ofType(ENTERPRISE_EVENT_TYPES.TRUST_ASSESSED).length).toBeGreaterThanOrEqual(2);
    expect(events.ofType(ENTERPRISE_EVENT_TYPES.TRUST_INVALIDATED)).toHaveLength(1);
  });

  it("supabase adapter persists assessments via client interface", async () => {
    const rows = new Map<string, Record<string, unknown>>();
    const evidenceRows = new Map<string, Record<string, unknown>>();
    const policyRows = new Map<string, Record<string, unknown>>();
    const history: Record<string, unknown>[] = [];

    const client: TrustSupabaseClient = {
      from(table: string) {
        return {
          select() {
            const all =
              table === "shared_trust_assessments"
                ? [...rows.values()]
                : table === "shared_trust_evidence"
                  ? [...evidenceRows.values()]
                  : table === "shared_trust_policies"
                    ? [...policyRows.values()]
                    : history;
            const base = Object.assign(Promise.resolve({ data: all, error: null }), {
              eq(column: string, value: string) {
                const filtered = all.filter((r) => String(r[column]) === value);
                return Object.assign(Promise.resolve({ data: filtered, error: null }), {
                  async maybeSingle() {
                    if (table === "shared_trust_assessments" && column === "assessment_id") {
                      return { data: rows.get(value) ?? null, error: null };
                    }
                    return { data: filtered[0] ?? null, error: null };
                  },
                });
              },
            });
            return base;
          },
          async upsert(row: Record<string, unknown>) {
            if (table === "shared_trust_assessments") {
              rows.set(String(row.assessment_id), row);
            } else if (table === "shared_trust_evidence") {
              evidenceRows.set(String(row.evidence_id), row);
            } else if (table === "shared_trust_policies") {
              policyRows.set(`${row.policy_id}@${row.policy_version}`, row);
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

    const store = createSupabaseTrustStore(client);
    const registry = new TrustRegistry(store);
    const result = await registry.assess({
      subjectId: "sid_trustsupabase000001",
      passportId: "ppt_supabase_001",
      assessmentId: "tas_supabase_test_001",
      now: "2026-07-22T00:00:00.000Z",
      evidence: [
        {
          provider: "identity",
          assertionType: "identity.subject.active",
          assertionRef: "sid_trustsupabase000001",
          status: "verified",
        },
        {
          provider: "passport",
          assertionType: "passport.active",
          assertionRef: "ppt_supabase_001",
          status: "verified",
        },
      ],
    });
    expect(result.ok).toBe(true);
    const loaded = await store.get("tas_supabase_test_001");
    expect(loaded?.subjectId).toBe("sid_trustsupabase000001");
    expect(loaded?.outcome).toBe("eligible");
  });
});
