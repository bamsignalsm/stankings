import { describe, expect, it } from "vitest";
import {
  createMemoryConsentStore,
  ConsentRegistry,
  defaultConsentDefinitions,
  assessConsentEightGates,
  createSupabaseConsentStore,
  type ConsentSupabaseClient,
  MemoryEventCollector,
  ENTERPRISE_EVENT_TYPES,
} from "@/lib/enterprise-platform";

describe("consent eight-gate completion", () => {
  it("reports complete", () => {
    const report = assessConsentEightGates();
    expect(report.complete).toBe(true);
  });

  it("grants with audit evidence and expires", async () => {
    const store = createMemoryConsentStore();
    const registry = new ConsentRegistry(store);
    const events = new MemoryEventCollector();
    const granted = await registry.grant(
      {
        subjectId: "sid_consentcomplete0001",
        definition: defaultConsentDefinitions()[0],
        platformId: "stankings-hq",
        now: "2026-07-22T00:00:00.000Z",
      },
      events,
    );
    expect(granted.ok).toBe(true);
    expect(granted.record?.auditRef).toBeTruthy();
    const expired = await registry.expire(granted.record!.consentId, events);
    expect(expired.ok).toBe(true);
    expect(expired.record?.state).toBe("expired");
    expect(events.ofType(ENTERPRISE_EVENT_TYPES.CONSENT_EXPIRED)).toHaveLength(1);
  });

  it("supabase adapter persists records via client interface", async () => {
    const rows = new Map<string, Record<string, unknown>>();
    const history: Record<string, unknown>[] = [];

    const client: ConsentSupabaseClient = {
      from(table: string) {
        return {
          select() {
            return {
              eq(column: string, value: string) {
                const filtered = [...rows.values()].filter((r) => String(r[column]) === value);
                const promise = Promise.resolve({
                  data: table === "shared_consent_records" ? filtered : history.filter((h) => String(h[column]) === value),
                  error: null,
                });
                return Object.assign(promise, {
                  async maybeSingle() {
                    if (table === "shared_consent_records" && column === "consent_id") {
                      return { data: rows.get(value) ?? null, error: null };
                    }
                    return { data: null, error: null };
                  },
                });
              },
            };
          },
          async upsert(row: Record<string, unknown>) {
            rows.set(String(row.consent_id), row);
            return { error: null };
          },
          async insert(row: Record<string, unknown>) {
            history.push(row);
            return { error: null };
          },
        };
      },
    };

    const store = createSupabaseConsentStore(client);
    const registry = new ConsentRegistry(store);
    const result = await registry.grant({
      subjectId: "sid_consentsupabase0001",
      definition: defaultConsentDefinitions()[0],
      consentId: "cns_supabase_test_001",
      now: "2026-07-22T00:00:00.000Z",
    });
    expect(result.ok).toBe(true);
    const loaded = await store.get("cns_supabase_test_001");
    expect(loaded?.subjectId).toBe("sid_consentsupabase0001");
  });
});
