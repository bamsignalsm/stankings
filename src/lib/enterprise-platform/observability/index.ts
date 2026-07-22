/**
 * Observability hooks — health + structured correlation helpers (no APM vendor).
 */

import { assessDiscoveryHealth } from "@/lib/enterprise-platform/discovery/query";
import { buildLogLine, type EnterpriseLogFields } from "@/lib/enterprise-platform/quality/logging";
import type { EnterpriseEvent } from "@/lib/enterprise-platform/events";

export interface PlatformHealthReport {
  overall: "healthy" | "degraded" | "unavailable";
  checkedAt: string;
  components: Array<{
    id: string;
    status: "healthy" | "degraded" | "unavailable" | "interface_only";
    detail?: string;
  }>;
}

export function buildPlatformHealthReport(): PlatformHealthReport {
  const discovery = assessDiscoveryHealth();
  const components: PlatformHealthReport["components"] = [
    { id: "identity", status: "healthy", detail: "Eight-Gate complete" },
    {
      id: "discovery",
      status:
        discovery === "healthy"
          ? "healthy"
          : discovery === "unknown"
            ? "degraded"
            : discovery,
    },
    {
      id: "consent",
      status: "healthy",
      detail: "Eight-Gate complete (migration apply pending review)",
    },
    { id: "passport", status: "interface_only" },
    { id: "trust", status: "interface_only" },
    { id: "explainability", status: "interface_only" },
    { id: "notifications", status: "healthy", detail: "foundation abstraction" },
  ];
  const overall =
    discovery === "unavailable"
      ? "unavailable"
      : components.some((c) => c.status === "degraded")
        ? "degraded"
        : "healthy";
  return { overall, checkedAt: new Date().toISOString(), components };
}

export function correlateEventLog(
  event: EnterpriseEvent,
  level: EnterpriseLogFields["level"] = "info",
): string {
  return buildLogLine({
    level,
    message: event.eventType,
    capability: event.capabilityId ?? event.domain,
    correlationId: event.correlationId,
    subjectId: event.subjectId,
    platformId: event.platformId,
    eventType: event.eventType,
    meta: {
      eventId: event.eventId,
      eventVersion: event.eventVersion,
      causationId: event.causationId ?? null,
    },
  });
}

export const OBSERVABILITY_FOUNDATION = {
  id: "enterprise-observability-foundation",
  version: "1.0.0",
  docsPath: "docs/platform/OBSERVABILITY.md",
} as const;
