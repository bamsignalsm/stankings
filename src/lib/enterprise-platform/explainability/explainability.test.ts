import { describe, expect, it } from "vitest";
import {
  createMemoryExplainabilityStore,
  ExplainabilityRegistry,
  assessExplainabilityEightGates,
  generateTrustExplanation,
  createSupabaseExplainabilityStore,
  type ExplainabilitySupabaseClient,
  MemoryEventCollector,
  ENTERPRISE_EVENT_TYPES,
  createMemoryTrustStore,
  TrustRegistry,
} from "@/lib/enterprise-platform";

describe("explainability eight-gate completion", () => {
  it("reports complete", () => {
    expect(assessExplainabilityEightGates().complete).toBe(true);
  });

  it("explains a trust assessment without re-scoring", async () => {
    const trust = new TrustRegistry(createMemoryTrustStore());
    const assessed = await trust.assess({
      subjectId: "sid_explaintrust0000001",
      passportId: "ppt_explain_001",
      now: "2026-07-22T00:00:00.000Z",
      evidence: [
        {
          provider: "identity",
          assertionType: "identity.subject.active",
          assertionRef: "sid_explaintrust0000001",
          status: "verified",
        },
        {
          provider: "passport",
          assertionType: "passport.active",
          assertionRef: "ppt_explain_001",
          status: "verified",
        },
      ],
    });
    expect(assessed.ok).toBe(true);

    const generated = generateTrustExplanation(assessed.assessment!);
    expect(generated.humanSummary).toContain("outcome");
    expect(generated.machineExplanation.rationaleKeys).toContain("trust.policy_applied");

    const store = createMemoryExplainabilityStore();
    const registry = new ExplainabilityRegistry(store);
    const events = new MemoryEventCollector();
    const recorded = await registry.explainTrust(assessed.assessment!, "stankings-hq", events);
    expect(recorded.ok).toBe(true);
    expect(recorded.record?.decision.capabilityId).toBe("trust");
    expect(recorded.record?.assessmentRef).toBe(assessed.assessment!.assessmentId);
    expect(events.ofType(ENTERPRISE_EVENT_TYPES.EXPLAINABILITY_RECORDED)).toHaveLength(1);
  });

  it("supabase adapter persists explanations", async () => {
    const rows = new Map<string, Record<string, unknown>>();
    const history: Record<string, unknown>[] = [];
    const client: ExplainabilitySupabaseClient = {
      from(table: string) {
        return {
          select() {
            return {
              eq(column: string, value: string) {
                const filtered = [...rows.values()].filter((r) => String(r[column]) === value);
                const promise = Promise.resolve({
                  data: table === "shared_explainability_records" ? filtered : history.filter((h) => String(h[column]) === value),
                  error: null,
                });
                return Object.assign(promise, {
                  async maybeSingle() {
                    if (column === "explanation_id") {
                      return { data: rows.get(value) ?? null, error: null };
                    }
                    return { data: null, error: null };
                  },
                });
              },
            };
          },
          async upsert(row: Record<string, unknown>) {
            rows.set(String(row.explanation_id), row);
            return { error: null };
          },
          async insert(row: Record<string, unknown>) {
            history.push(row);
            return { error: null };
          },
        };
      },
    };

    const store = createSupabaseExplainabilityStore(client);
    const registry = new ExplainabilityRegistry(store);
    const result = await registry.record({
      subjectId: "sid_explainsupabase0001",
      decision: {
        capabilityId: "consent",
        decisionType: "consent.decision",
        decisionRef: "cns_1",
      },
      consentRef: "cns_1",
      humanSummary: "Consent granted for purpose identity.federation.share.",
      machineExplanation: {
        factors: [{ key: "consent.state", detail: "granted", satisfied: true }],
        outcome: "granted",
        rationaleKeys: ["consent.state_reported"],
      },
      explanationId: "exp_supabase_001",
      now: "2026-07-22T00:00:00.000Z",
    });
    expect(result.ok).toBe(true);
    const loaded = await store.get("exp_supabase_001");
    expect(loaded?.subjectId).toBe("sid_explainsupabase0001");
  });
});
