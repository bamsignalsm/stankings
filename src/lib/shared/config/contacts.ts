/**
 * Central contact directory — no duplicated email strings elsewhere.
 */

export const CONTACTS = {
  office: "office@stankings.com",
  hello: "hello@stankings.com",
  support: "support@stankings.com",
  trust: "trust@stankings.com",
  legal: "legal@stankings.com",
  security: "security@stankings.com",
  press: "press@stankings.com",
  media: "media@stankings.com",
  careers: "careers@stankings.com",
  developers: "developers@stankings.com",
  foundation: "foundation@stankings.com",
  privacy: "privacy@stankings.com",
  accessibility: "accessibility@stankings.com",
} as const;

export type ContactKey = keyof typeof CONTACTS;

export function getContact(key: ContactKey): string {
  return CONTACTS[key];
}

export function getContactMailto(key: ContactKey, subject?: string): string {
  const email = CONTACTS[key];
  if (!subject) return `mailto:${email}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}

/** Legacy institutional contact shape (compatibility) */
export const INSTITUTIONAL_CONTACT = {
  general: CONTACTS.hello,
  support: CONTACTS.support,
  trust: CONTACTS.trust,
  security: CONTACTS.security,
  legal: CONTACTS.legal,
  privacy: CONTACTS.privacy,
  press: CONTACTS.press,
  careers: CONTACTS.careers,
  disclosure: CONTACTS.security,
  lawEnforcement: CONTACTS.legal,
  dataRequests: CONTACTS.privacy,
  accessibility: CONTACTS.accessibility,
  office: CONTACTS.office,
  media: CONTACTS.media,
  developers: CONTACTS.developers,
  foundation: CONTACTS.foundation,
} as const;
