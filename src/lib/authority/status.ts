/**
 * Status authority — consumes shared status registry.
 */

import {
  STATUS_REGISTRY,
  STATUS_POLICY,
  type StatusRecord,
  type SharedServiceHealth,
} from "@/lib/shared/status/registry";
import type { StatusServiceCard, ServiceHealth } from "@/lib/authority/types";

export { STATUS_POLICY };

export const STATUS_SERVICES: StatusServiceCard[] = STATUS_REGISTRY.map((s) => ({
  id: s.id,
  name: s.name,
  description: s.description,
  health: s.health as ServiceHealth,
  note: s.note,
  href: s.href,
}));

export function getStatusService(id: string): StatusServiceCard | undefined {
  return STATUS_SERVICES.find((s) => s.id === id);
}

export type { StatusRecord, SharedServiceHealth };
