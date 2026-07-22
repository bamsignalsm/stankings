import { describe, expect, it } from "vitest";
import {
  MemoryEventCollector,
  ENTERPRISE_EVENT_TYPES,
} from "@/lib/enterprise-platform/events";
import {
  createMemoryIdentityStore,
  mapHqMemberToSubject,
  SubjectRegistry,
  assessIdentityEightGates,
  createIdentityBundle,
  createIdentitySubject,
  activateIdentitySubject,
} from "@/lib/shared-runtime";

describe("identity eight-gate foundation", () => {
  it("maps HQ member idempotently", async () => {
    const store = createMemoryIdentityStore();
    const a = await mapHqMemberToSubject(store, {
      hqMemberId: "member_abc",
      displayLabel: "Member A",
      now: "2026-07-22T00:00:00.000Z",
    });
    const b = await mapHqMemberToSubject(store, {
      hqMemberId: "member_abc",
      displayLabel: "Member A",
      now: "2026-07-22T00:00:00.000Z",
    });
    expect(a.ok).toBe(true);
    expect(b.ok).toBe(true);
    expect(a.globalSubjectId).toBe(b.globalSubjectId);
  });

  it("SubjectRegistry emits identity.created", async () => {
    const store = createMemoryIdentityStore();
    const registry = new SubjectRegistry(store);
    const events = new MemoryEventCollector();
    let subject = createIdentitySubject({
      kind: "person",
      displayLabel: "Test",
      now: "2026-07-22T00:00:00.000Z",
      subjectId: "sid_testhostsubject001",
    });
    subject = activateIdentitySubject(subject, "2026-07-22T00:00:01.000Z");
    const bundle = createIdentityBundle(subject, { originPlatformId: "stankings-hq" });
    const result = await registry.put(bundle, { events });
    expect(result.ok).toBe(true);
    expect(events.ofType(ENTERPRISE_EVENT_TYPES.IDENTITY_CREATED)).toHaveLength(1);
  });

  it("reports eight-gate complete", () => {
    const report = assessIdentityEightGates("2026-07-22T12:00:00.000Z");
    expect(report.complete).toBe(true);
    expect(report.gates).toHaveLength(8);
    const g1 = report.gates.find((g) => g.gateId === "G1_executable_runtime");
    expect(g1?.status).toBe("satisfied");
  });
});
