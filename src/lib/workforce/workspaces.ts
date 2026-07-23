/**
 * Workspace module registry — maps workspace_key → office features.
 */

export interface WorkspaceFeature {
  slug: string;
  label: string;
  permission?: string;
}

export interface WorkspaceDefinition {
  key: string;
  label: string;
  description: string;
  features: WorkspaceFeature[];
}

export const WORKSPACE_REGISTRY: Record<string, WorkspaceDefinition> = {
  editorial: {
    key: "editorial",
    label: "Editorial & Content",
    description: "Draft, review, publish news and manage media.",
    features: [
      { slug: "drafts", label: "Draft Articles", permission: "editorial.write" },
      { slug: "pending", label: "Pending Review", permission: "editorial.read" },
      { slug: "published", label: "Published Stories", permission: "editorial.read" },
      { slug: "media", label: "Media Library", permission: "editorial.write" },
      { slug: "categories", label: "Categories", permission: "editorial.write" },
      { slug: "calendar", label: "Editorial Calendar", permission: "editorial.read" },
      { slug: "seo", label: "SEO Checklist", permission: "editorial.write" },
      { slug: "analytics", label: "Analytics", permission: "editorial.read" },
      { slug: "social", label: "Social Publishing", permission: "editorial.write" },
    ],
  },
  public_relations: {
    key: "public_relations",
    label: "Public Relations",
    description: "Press, media contacts, campaigns, and crisis response.",
    features: [
      { slug: "releases", label: "Press Releases", permission: "pr.write" },
      { slug: "requests", label: "Media Requests", permission: "pr.read" },
      { slug: "campaigns", label: "Campaigns", permission: "pr.write" },
      { slug: "contacts", label: "Press Contacts", permission: "pr.read" },
      { slug: "announcements", label: "Announcements", permission: "pr.write" },
      { slug: "events", label: "Events", permission: "pr.write" },
    ],
  },
  customer_support: {
    key: "customer_support",
    label: "Customer Support",
    description: "Tickets, escalations, customer lookup, and KB.",
    features: [
      { slug: "assigned", label: "Assigned Tickets", permission: "support.read" },
      { slug: "open", label: "Open Tickets", permission: "support.read" },
      { slug: "resolved", label: "Resolved Tickets", permission: "support.read" },
      { slug: "escalations", label: "Escalations", permission: "support.escalate" },
      { slug: "knowledge", label: "Knowledge Base", permission: "support.read" },
      { slug: "lookup", label: "Customer Lookup", permission: "support.read" },
      { slug: "performance", label: "Performance", permission: "support.read" },
    ],
  },
  moderation: {
    key: "moderation",
    label: "Moderation & Trust",
    description: "Reports, reviews, appeals, and safety actions.",
    features: [
      { slug: "reports", label: "Reports Queue", permission: "moderation.read" },
      { slug: "photos", label: "Photo Review", permission: "moderation.write" },
      { slug: "listings", label: "Listing Review", permission: "moderation.write" },
      { slug: "profiles", label: "Profile Review", permission: "moderation.write" },
      { slug: "appeals", label: "Appeals", permission: "moderation.write" },
      { slug: "safety", label: "Safety Dashboard", permission: "moderation.read" },
      { slug: "actions", label: "Actions History", permission: "moderation.read" },
    ],
  },
  operations: {
    key: "operations",
    label: "Operations",
    description: "Daily ops, approvals, documents, and activity.",
    features: [
      { slug: "tasks", label: "Tasks", permission: "ops.write" },
      { slug: "daily", label: "Daily Operations", permission: "ops.read" },
      { slug: "reports", label: "Reports", permission: "ops.read" },
      { slug: "documents", label: "Documents", permission: "ops.read" },
      { slug: "approvals", label: "Approvals", permission: "ops.write" },
      { slug: "activity", label: "Activity Feed", permission: "ops.read" },
    ],
  },
  risk_ops: {
    key: "risk_ops",
    label: "Risk & Operations",
    description: "Settlements, payments, fraud, and financial evidence.",
    features: [
      { slug: "settlements", label: "Settlement Review", permission: "ops.write" },
      { slug: "payments", label: "Payment Exceptions", permission: "ops.write" },
      { slug: "evidence", label: "Financial Evidence", permission: "ops.read" },
      { slug: "dashboard", label: "Operational Dashboard", permission: "company.analytics" },
    ],
  },
  engineering: {
    key: "engineering",
    label: "Engineering",
    description: "Sprint board, issues, deployments, and incidents.",
    features: [
      { slug: "sprint", label: "Sprint Board", permission: "eng.read" },
      { slug: "issues", label: "Assigned Issues", permission: "eng.write" },
      { slug: "docs", label: "Documentation", permission: "eng.read" },
      { slug: "deployments", label: "Deployments", permission: "eng.write" },
      { slug: "incidents", label: "Incidents", permission: "eng.write" },
      { slug: "architecture", label: "Architecture", permission: "eng.read" },
    ],
  },
  executive: {
    key: "executive",
    label: "Executive",
    description: "Company oversight, approvals, and analytics.",
    features: [
      { slug: "overview", label: "Company Overview", permission: "company.analytics" },
      { slug: "approvals", label: "Approvals", permission: "supervise.company" },
      { slug: "team", label: "Leadership Team", permission: "team.read" },
    ],
  },
  people_ops: {
    key: "people_ops",
    label: "People Operations",
    description: "Onboarding and workforce support.",
    features: [
      { slug: "onboarding", label: "Onboarding", permission: "tasks.write" },
      { slug: "directory", label: "Directory", permission: "team.read" },
    ],
  },
  education_ops: {
    key: "education_ops",
    label: "Education Operations",
    description: "Admissions, student success, and learning coordination.",
    features: [
      { slug: "admissions", label: "Admissions", permission: "ops.write" },
      { slug: "students", label: "Student Success", permission: "ops.write" },
      { slug: "learning", label: "Learning", permission: "ops.read" },
      { slug: "community", label: "Community", permission: "ops.read" },
    ],
  },
  foundation_ops: {
    key: "foundation_ops",
    label: "Foundation Operations",
    description: "Programmes, volunteers, and engagement.",
    features: [
      { slug: "programmes", label: "Programmes", permission: "ops.write" },
      { slug: "volunteers", label: "Volunteers", permission: "ops.write" },
      { slug: "engagement", label: "Engagement", permission: "ops.read" },
      { slug: "communications", label: "Communications", permission: "pr.read" },
    ],
  },
  sales: {
    key: "sales",
    label: "Sales",
    description: "Pipeline, clients, and consultations.",
    features: [
      { slug: "pipeline", label: "Pipeline", permission: "ops.write" },
      { slug: "clients", label: "Clients", permission: "ops.read" },
      { slug: "inspections", label: "Inspections", permission: "ops.write" },
    ],
  },
  verification: {
    key: "verification",
    label: "Verification",
    description: "Property, vehicle, and profile verification queues.",
    features: [
      { slug: "queue", label: "Verification Queue", permission: "ops.write" },
      { slug: "reviews", label: "Reviews", permission: "moderation.read" },
      { slug: "audit", label: "Audit Log", permission: "ops.read" },
    ],
  },
  design: {
    key: "design",
    label: "Design & Creative",
    description: "Creative assets and media production.",
    features: [
      { slug: "assets", label: "Assets", permission: "editorial.write" },
      { slug: "briefs", label: "Briefs", permission: "editorial.read" },
    ],
  },
  growth: {
    key: "growth",
    label: "Growth & Marketing",
    description: "Campaigns, community, and growth metrics.",
    features: [
      { slug: "campaigns", label: "Campaigns", permission: "ops.write" },
      { slug: "community", label: "Community", permission: "ops.read" },
      { slug: "metrics", label: "Metrics", permission: "company.analytics" },
    ],
  },
};

export function getWorkspace(key: string): WorkspaceDefinition {
  return (
    WORKSPACE_REGISTRY[key] ?? {
      key,
      label: "General Office",
      description: "Role workspace",
      features: [{ slug: "home", label: "Home", permission: "office.access" }],
    }
  );
}
