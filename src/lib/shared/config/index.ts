export {
  CONTACTS,
  INSTITUTIONAL_CONTACT,
  getContact,
  getContactMailto,
  type ContactKey,
} from "./contacts";

export const HQ_SITE = {
  name: "Stankings Group",
  domain: "stankings.com",
  url: "https://stankings.com",
  founder: "Stanley Ukeje",
} as const;

export const HQ_PATHS = {
  trust: "/trust",
  security: "/security",
  legal: "/legal",
  support: "/support",
  compliance: "/compliance",
  status: "/status",
  developer: "/developer",
  brand: "/brand",
  downloads: "/downloads",
  search: "/search",
  press: "/press",
  media: "/media",
  contact: "/contact",
  careers: "/careers",
  constitution: "/constitution",
} as const;
