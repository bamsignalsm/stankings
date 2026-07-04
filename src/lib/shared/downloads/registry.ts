/**
 * Download registry — centralize downloadable / requestable assets.
 */

export type DownloadKind =
  | "brand_kit"
  | "press_kit"
  | "company_profile"
  | "annual_report"
  | "policy_pdf"
  | "mobile"
  | "other";

export interface DownloadRecord {
  id: string;
  title: string;
  summary: string;
  kind: DownloadKind;
  /** Public path or mailto request */
  href: string;
  available: boolean;
  note?: string;
}

export const DOWNLOAD_REGISTRY: DownloadRecord[] = [
  {
    id: "company-profile",
    title: "Company profile",
    summary: "Institutional overview via About and Companies pages.",
    kind: "company_profile",
    href: "/about",
    available: true,
  },
  {
    id: "press-kit",
    title: "Press kit",
    summary: "Boilerplate, contacts, and brand references.",
    kind: "press_kit",
    href: "/press",
    available: true,
  },
  {
    id: "brand-kit",
    title: "Brand kit",
    summary: "Logos, colors, and usage rules.",
    kind: "brand_kit",
    href: "/brand",
    available: true,
  },
  {
    id: "legal-policies",
    title: "Legal policies",
    summary: "Terms, privacy, cookies, and compliance documents.",
    kind: "policy_pdf",
    href: "/legal",
    available: true,
    note: "HTML policies; PDF packages on request.",
  },
  {
    id: "trust-resources",
    title: "Trust resources",
    summary: "Trust Center policies for all products.",
    kind: "other",
    href: "/trust",
    available: true,
  },
  {
    id: "security-resources",
    title: "Security resources",
    summary: "Disclosure policy and security.txt.",
    kind: "other",
    href: "/security",
    available: true,
  },
  {
    id: "annual-reports",
    title: "Annual reports",
    summary: "Stewardship reporting as reports mature.",
    kind: "annual_report",
    href: "/investors",
    available: true,
    note: "Published through stewardship channels — not placeholder PDFs.",
  },
  {
    id: "android",
    title: "Android",
    summary: "Published by product companies through official stores.",
    kind: "mobile",
    href: "/support",
    available: false,
    note: "HQ does not host APK files.",
  },
  {
    id: "ios",
    title: "iOS",
    summary: "Published by product companies through official stores.",
    kind: "mobile",
    href: "/support",
    available: false,
    note: "HQ does not host IPA files.",
  },
  {
    id: "apk",
    title: "APK",
    summary: "Future product APKs are not hosted on HQ.",
    kind: "mobile",
    href: "/support",
    available: false,
    note: "Reserved for future product distribution notes only.",
  },
];

export function getDownload(id: string): DownloadRecord | undefined {
  return DOWNLOAD_REGISTRY.find((d) => d.id === id);
}

export function listDownloads(kind?: DownloadKind): DownloadRecord[] {
  if (!kind) return DOWNLOAD_REGISTRY;
  return DOWNLOAD_REGISTRY.filter((d) => d.kind === kind);
}

export function listAvailableDownloads(): DownloadRecord[] {
  return DOWNLOAD_REGISTRY.filter((d) => d.available);
}
