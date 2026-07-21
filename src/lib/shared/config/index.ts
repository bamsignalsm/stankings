import { CORPORATE } from "./corporate";

export {
  CONTACTS,
  INSTITUTIONAL_CONTACT,
  getContact,
  getContactMailto,
  type ContactKey,
} from "./contacts";

export { CORPORATE, STANKINGS_CAREERS_URL, STANKINGS_LEGACY_LTD } from "./corporate";
/** @deprecated Use CORPORATE */
export { CORPORATE as COMPANY } from "./corporate";

export const HQ_SITE = {
  name: CORPORATE.legalName,
  domain: "stankings.com",
  url: CORPORATE.website,
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
  careers: "/career",
  constitution: "/constitution",
} as const;
