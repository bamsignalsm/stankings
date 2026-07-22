/**
 * Shared Notification Foundation — provider-agnostic abstraction.
 * No product mailers / SMS vendors wired beyond adapter interfaces.
 */

import {
  createEnterpriseEvent,
  ENTERPRISE_EVENT_TYPES,
  type MemoryEventCollector,
} from "@/lib/enterprise-platform/events";
import {
  validationFail,
  validationOk,
  type EnterpriseValidationResult,
} from "@/lib/enterprise-platform/quality/validation";

export type NotificationChannelKind =
  | "email"
  | "sms"
  | "push"
  | "in_app"
  | "webhook";

export type NotificationDeliveryStatus =
  | "queued"
  | "sending"
  | "delivered"
  | "failed"
  | "suppressed";

export interface NotificationTemplate {
  templateId: string;
  channel: NotificationChannelKind;
  version: string;
  subject?: string;
  bodyTemplate: string;
  locale?: string;
}

export interface NotificationPreferenceHook {
  subjectId: string;
  channel: NotificationChannelKind;
  allowed: boolean;
  purposeKey?: string;
}

export interface NotificationMessage {
  notificationId: string;
  channel: NotificationChannelKind;
  templateId?: string;
  to: string;
  subject?: string;
  body: string;
  status: NotificationDeliveryStatus;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  updatedAt: string;
  lastError?: string;
  metadata?: Record<string, string>;
  correlationId?: string;
}

export interface NotificationProviderAdapter {
  readonly providerId: string;
  readonly channels: NotificationChannelKind[];
  send(message: NotificationMessage): Promise<{ ok: boolean; providerMessageId?: string; error?: string }>;
}

export interface CreateNotificationInput {
  channel: NotificationChannelKind;
  to: string;
  body: string;
  subject?: string;
  templateId?: string;
  metadata?: Record<string, string>;
  correlationId?: string;
  maxAttempts?: number;
  now?: string;
}

export function validateNotificationMessage(
  message: NotificationMessage,
): EnterpriseValidationResult {
  const errors: string[] = [];
  if (!message.notificationId?.trim()) errors.push("notificationId required");
  if (!message.to?.trim()) errors.push("to required");
  if (!message.body?.trim()) errors.push("body required");
  if (message.maxAttempts < 1) errors.push("maxAttempts >= 1");
  return errors.length ? validationFail(errors) : validationOk();
}

export function createNotificationMessage(
  input: CreateNotificationInput,
): NotificationMessage {
  const now = input.now ?? new Date().toISOString();
  return {
    notificationId: `ntf_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`,
    channel: input.channel,
    templateId: input.templateId,
    to: input.to,
    subject: input.subject,
    body: input.body,
    status: "queued",
    attempts: 0,
    maxAttempts: input.maxAttempts ?? 3,
    createdAt: now,
    updatedAt: now,
    metadata: input.metadata,
    correlationId: input.correlationId,
  };
}

/** In-memory provider for tests — does not send externally. */
export class MemoryNotificationProvider implements NotificationProviderAdapter {
  readonly providerId = "memory";
  readonly channels: NotificationChannelKind[] = [
    "email",
    "sms",
    "push",
    "in_app",
    "webhook",
  ];
  readonly sent: NotificationMessage[] = [];

  async send(message: NotificationMessage) {
    this.sent.push({ ...message, status: "delivered" });
    return { ok: true, providerMessageId: `mem_${message.notificationId}` };
  }
}

export class NotificationService {
  constructor(
    private readonly provider: NotificationProviderAdapter,
    private readonly events?: MemoryEventCollector,
  ) {}

  async enqueue(
    input: CreateNotificationInput,
    preferences?: NotificationPreferenceHook[],
  ): Promise<{ ok: boolean; message?: NotificationMessage; errors: string[] }> {
    const message = createNotificationMessage(input);
    const check = validateNotificationMessage(message);
    if (!check.valid) return { ok: false, errors: check.errors };

    const pref = preferences?.find((p) => p.channel === message.channel);
    if (pref && !pref.allowed) {
      const suppressed = {
        ...message,
        status: "suppressed" as const,
        updatedAt: new Date().toISOString(),
      };
      return { ok: true, message: suppressed, errors: [] };
    }

    this.events?.publish(
      createEnterpriseEvent({
        eventType: ENTERPRISE_EVENT_TYPES.NOTIFICATION_QUEUED,
        domain: "audit",
        sourceRuntime: "enterprise-notifications",
        payload: {
          notificationId: message.notificationId,
          channel: message.channel,
          status: message.status,
        },
        correlationId: message.correlationId,
      }),
    );

    return this.deliver(message);
  }

  async deliver(
    message: NotificationMessage,
  ): Promise<{ ok: boolean; message?: NotificationMessage; errors: string[] }> {
    if (!this.provider.channels.includes(message.channel)) {
      return {
        ok: false,
        errors: [`provider ${this.provider.providerId} does not support ${message.channel}`],
      };
    }

    let current: NotificationMessage = {
      ...message,
      status: "sending",
      attempts: message.attempts + 1,
    };
    const result = await this.provider.send(current);
    if (result.ok) {
      current = {
        ...current,
        status: "delivered",
        updatedAt: new Date().toISOString(),
        metadata: {
          ...current.metadata,
          providerMessageId: result.providerMessageId ?? "",
        },
      };
      this.events?.publish(
        createEnterpriseEvent({
          eventType: ENTERPRISE_EVENT_TYPES.NOTIFICATION_DELIVERED,
          domain: "audit",
          sourceRuntime: "enterprise-notifications",
          payload: {
            notificationId: current.notificationId,
            channel: current.channel,
            status: current.status,
          },
          correlationId: current.correlationId,
        }),
      );
      return { ok: true, message: current, errors: [] };
    }

    const failed = current.attempts >= current.maxAttempts;
    current = {
      ...current,
      status: failed ? "failed" : "queued",
      lastError: result.error,
      updatedAt: new Date().toISOString(),
    };
    if (failed) {
      this.events?.publish(
        createEnterpriseEvent({
          eventType: ENTERPRISE_EVENT_TYPES.NOTIFICATION_FAILED,
          domain: "audit",
          sourceRuntime: "enterprise-notifications",
          payload: {
            notificationId: current.notificationId,
            channel: current.channel,
            status: current.status,
            error: result.error ?? "unknown",
          },
          correlationId: current.correlationId,
        }),
      );
    }
    return {
      ok: false,
      message: current,
      errors: [result.error ?? "delivery failed"],
    };
  }
}

export const defaultNotificationTemplates: NotificationTemplate[] = [
  {
    templateId: "tpl.consent.granted",
    channel: "email",
    version: "1.0.0",
    subject: "Consent recorded",
    bodyTemplate: "Your consent {{purposeKey}} was recorded ({{consentId}}).",
  },
  {
    templateId: "tpl.consent.revoked",
    channel: "email",
    version: "1.0.0",
    subject: "Consent revoked",
    bodyTemplate: "Your consent {{purposeKey}} was revoked ({{consentId}}).",
  },
];

export const NOTIFICATION_FOUNDATION = {
  id: "enterprise-notification-foundation",
  version: "1.0.0",
  docsPath: "docs/platform/NOTIFICATION_FOUNDATION.md",
} as const;
