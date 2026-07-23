export const COMPANY_AREAS = [
  "Marketplace Services",
  "Relationship and Community Services",
  "Financial Services",
  "Property Development and Real Estate Services",
  "Automotive Services",
  "Logistics and Supply Chain",
  "Technology Procurement and Digital Infrastructure",
  "Education",
  "Leadership Development",
  "Community Development and Philanthropy",
  "Stankings Legacy Ltd (Corporate)",
  "Media & Communications",
] as const;

export const EMPLOYMENT_TYPES = [
  "full-time",
  "part-time",
  "contract",
  "internship",
] as const;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
