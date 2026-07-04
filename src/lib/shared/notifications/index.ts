/**
 * Shared notification channel helpers — routing only, no product logic.
 */

import { CONTACTS, type ContactKey, getContactMailto } from "@/lib/shared/config/contacts";

export type NotificationChannel =
  | "general"
  | "support"
  | "trust"
  | "legal"
  | "security"
  | "press"
  | "careers"
  | "foundation";

const CHANNEL_TO_CONTACT: Record<NotificationChannel, ContactKey> = {
  general: "hello",
  support: "support",
  trust: "trust",
  legal: "legal",
  security: "security",
  press: "press",
  careers: "careers",
  foundation: "foundation",
};

export function getNotificationEmail(channel: NotificationChannel): string {
  return CONTACTS[CHANNEL_TO_CONTACT[channel]];
}

export function buildNotificationMailto(
  channel: NotificationChannel,
  subject: string,
  body?: string,
): string {
  const base = getContactMailto(CHANNEL_TO_CONTACT[channel], subject);
  if (!body) return base;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}body=${encodeURIComponent(body)}`;
}

export function listNotificationChannels(): NotificationChannel[] {
  return Object.keys(CHANNEL_TO_CONTACT) as NotificationChannel[];
}
