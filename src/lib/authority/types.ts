export interface AuthoritySection {
  slug: string;
  title: string;
  summary: string;
  href: string;
}

export interface AuthorityArticle {
  slug: string;
  title: string;
  lastUpdated: string;
  sections: { heading: string; body: string }[];
}

export type ServiceHealth = "operational" | "degraded" | "outage" | "maintenance" | "unknown";

export interface StatusServiceCard {
  id: string;
  name: string;
  description: string;
  /** Honest status only — never invent uptime percentages */
  health: ServiceHealth;
  note: string;
  href?: string;
}
