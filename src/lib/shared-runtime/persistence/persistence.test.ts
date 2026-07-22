import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  createFileIdentityStore,
  createIdentityBundle,
  createIdentitySubject,
  activateIdentitySubject,
  createSupabaseIdentityStore,
  type IdentitySupabaseClient,
  assessIdentityEightGates,
} from "@/lib/shared-runtime";

describe("durable identity persistence", () => {
  let dir: string;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(tmpdir(), "identity-store-"));
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it("file store survives reload", async () => {
    const file = path.join(dir, "subjects.json");
    const storeA = createFileIdentityStore(file);
    let subject = createIdentitySubject({
      kind: "person",
      subjectId: "sid_filedurability00001",
      now: "2026-07-22T00:00:00.000Z",
    });
    subject = activateIdentitySubject(subject, "2026-07-22T00:00:01.000Z");
    const bundle = createIdentityBundle(subject, {
      originPlatformId: "stankings-hq",
    });
    const write = await storeA.putSubject(bundle);
    expect(write.ok).toBe(true);

    const storeB = createFileIdentityStore(file);
    const loaded = await storeB.getSubject("sid_filedurability00001");
    expect(loaded?.subject.version).toBe(subject.version);
    expect(loaded?.subject.state).toBe("active");
  });

  it("supabase adapter upserts via client interface", async () => {
    const rows = new Map<string, Record<string, unknown>>();
    const refs = new Map<string, Record<string, unknown>>();

    const client: IdentitySupabaseClient = {
      from(table: string) {
        return {
          select() {
            return {
              eq(column: string, value: string) {
                return {
                  async maybeSingle() {
                    if (table === "shared_identity_subjects" && column === "subject_id") {
                      return { data: rows.get(value) ?? null, error: null };
                    }
                    if (table === "shared_identity_external_refs" && column === "ref_key") {
                      return { data: refs.get(value) ?? null, error: null };
                    }
                    return { data: null, error: null };
                  },
                  async limit() {
                    return { data: [...rows.values()], error: null };
                  },
                };
              },
              async limit() {
                return { data: [...rows.values()], error: null };
              },
            };
          },
          async upsert(row: Record<string, unknown>) {
            if (table === "shared_identity_subjects") {
              rows.set(String(row.subject_id), row);
            } else if (table === "shared_identity_external_refs") {
              refs.set(String(row.ref_key), row);
            }
            return { error: null };
          },
          delete() {
            return {
              async eq(column: string, value: string) {
                if (table === "shared_identity_external_refs" && column === "subject_id") {
                  for (const [k, v] of refs) {
                    if (String(v.subject_id) === value) refs.delete(k);
                  }
                }
                return { error: null };
              },
            };
          },
        };
      },
    };

    const store = createSupabaseIdentityStore(client);
    let subject = createIdentitySubject({
      kind: "person",
      subjectId: "sid_supabaseadapter0001",
      now: "2026-07-22T00:00:00.000Z",
      externalRefs: [{ system: "stankings-hq", externalId: "m1", linked: true }],
    });
    subject = activateIdentitySubject(subject, "2026-07-22T00:00:01.000Z");
    const bundle = createIdentityBundle(subject);
    const result = await store.putSubject(bundle);
    expect(result.ok).toBe(true);
    const found = await store.findByExternalRef("stankings-hq", "m1");
    expect(found?.subject.subjectId).toBe("sid_supabaseadapter0001");
  });
});

describe("identity eight gates", () => {
  it("reports complete after clearance sprint", () => {
    const report = assessIdentityEightGates("2026-07-22T18:00:00.000Z");
    expect(report.complete).toBe(true);
    expect(report.gates.every((g) => g.status === "satisfied" || g.status === "na")).toBe(
      true,
    );
  });
});
