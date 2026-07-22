export {
  ENTERPRISE_EVENT_ENVELOPE_VERSION,
  ENTERPRISE_EVENT_TYPES,
  createEnterpriseEvent,
  validateEnterpriseEvent,
  MemoryEventCollector,
  type EnterpriseEvent,
  type EnterpriseEventDomain,
  type EnterpriseEventType,
  type CreateEnterpriseEventInput,
} from "./model";

export {
  EVENT_CATALOGUE,
  listEventDefinitions,
  getEventDefinition,
  validateEventDefinition,
  negotiateEventCompatibility,
  type EventDefinition,
} from "./catalogue";

export const ENTERPRISE_EVENT_FOUNDATION = {
  id: "enterprise-event-foundation",
  version: "1.1.0",
  milestone: "M2A+",
  docsPath: "docs/platform/ENTERPRISE_EVENTS.md",
  transport: "none" as const,
} as const;
