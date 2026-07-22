/**
 * Logging conventions — structured fields; no logging backend required.
 */

export type EnterpriseLogLevel = "debug" | "info" | "warn" | "error";

export interface EnterpriseLogFields {
  level: EnterpriseLogLevel;
  message: string;
  capability: string;
  correlationId?: string;
  subjectId?: string;
  platformId?: string;
  eventType?: string;
  /** Never put emails, names, or secrets here by default */
  meta?: Record<string, string | number | boolean | null>;
}

export function buildLogLine(fields: EnterpriseLogFields): string {
  const base = {
    level: fields.level,
    message: fields.message,
    capability: fields.capability,
    correlationId: fields.correlationId,
    subjectId: fields.subjectId,
    platformId: fields.platformId,
    eventType: fields.eventType,
    ...fields.meta,
  };
  return JSON.stringify(base);
}

export const LOGGING_CONVENTION = {
  id: "enterprise-logging-convention",
  version: "1.0.0",
  rules: [
    "Prefer subjectId over PII.",
    "Always include capability.",
    "Propagate correlationId across federation and events when present.",
    "Do not log secrets or credentials.",
  ],
} as const;
