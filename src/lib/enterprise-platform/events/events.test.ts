import { describe, expect, it } from "vitest";
import {
  createEnterpriseEvent,
  validateEnterpriseEvent,
  MemoryEventCollector,
  ENTERPRISE_EVENT_TYPES,
} from "@/lib/enterprise-platform/events";

describe("enterprise events", () => {
  it("creates and validates envelope", () => {
    const event = createEnterpriseEvent({
      eventType: ENTERPRISE_EVENT_TYPES.IDENTITY_CREATED,
      domain: "identity",
      sourceRuntime: "shared-identity",
      subjectId: "sid_testsubject01",
      payload: { subjectId: "sid_testsubject01", version: 1 },
    });
    const check = validateEnterpriseEvent(event);
    expect(check.valid).toBe(true);
    expect(event.eventVersion).toBe(1);
  });

  it("collects events in memory without a broker", () => {
    const bus = new MemoryEventCollector();
    const event = createEnterpriseEvent({
      eventType: ENTERPRISE_EVENT_TYPES.PLATFORM_REGISTERED,
      domain: "platform",
      sourceRuntime: "platform-registration",
      platformId: "stankings-hq",
      payload: { platformId: "stankings-hq" },
    });
    expect(bus.publish(event).valid).toBe(true);
    expect(bus.ofType(ENTERPRISE_EVENT_TYPES.PLATFORM_REGISTERED)).toHaveLength(1);
  });

  it("rejects invalid events", () => {
    const check = validateEnterpriseEvent({
      eventId: "",
      eventType: "",
      eventVersion: 0,
      domain: "identity",
      sourceRuntime: "",
      occurredAt: "",
      payload: {},
    });
    expect(check.valid).toBe(false);
    expect(check.errors.length).toBeGreaterThan(0);
  });
});
