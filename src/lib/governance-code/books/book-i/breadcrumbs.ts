import type { GovernanceBreadcrumbItem } from "@/lib/governance-code/types";

const VOLUME_II = { label: "Volume II — Governance Code", href: "/library/governance-code" };
const BOOK_I = { label: "Book I — Governance Bodies", href: "/library/governance-code/book-i" };

export function bookIBreadcrumbs(
  items: GovernanceBreadcrumbItem[],
): GovernanceBreadcrumbItem[] {
  return [VOLUME_II, BOOK_I, ...items];
}

export function bookICharterBreadcrumbs(): GovernanceBreadcrumbItem[] {
  return bookIBreadcrumbs([
    { label: "Foundational Charter", href: "/library/governance-code/book-i/foundational-charter" },
  ]);
}

export function bookIPartBreadcrumbs(
  partLabel: string,
  partTitle: string,
  partHref: string,
): GovernanceBreadcrumbItem[] {
  return bookIBreadcrumbs([
    { label: `${partLabel} — ${partTitle}`, href: partHref },
  ]);
}

export function bookIChapterBreadcrumbs(
  partLabel: string,
  partTitle: string,
  partHref: string,
  chapterLabel: string,
  chapterTitle: string,
): GovernanceBreadcrumbItem[] {
  return bookIBreadcrumbs([
    { label: `${partLabel} — ${partTitle}`, href: partHref },
    { label: `${chapterLabel} — ${chapterTitle}` },
  ]);
}
