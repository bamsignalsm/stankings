/**
 * Design system catalogue — for /design-system documentation.
 */

export interface CatalogueEntry {
  id: string;
  name: string;
  category: "token" | "primitive" | "pattern" | "layout";
  description: string;
  importPath: string;
}

export const COMPONENT_CATALOGUE: CatalogueEntry[] = [
  { id: "button", name: "Button", category: "primitive", description: "Primary, secondary, ghost, and danger actions.", importPath: "@/components/ui/Button" },
  { id: "input", name: "Input", category: "primitive", description: "Text fields with labels and focus rings.", importPath: "@/components/ui/Input" },
  { id: "textarea", name: "Textarea", category: "primitive", description: "Multi-line text input.", importPath: "@/components/ui/Textarea" },
  { id: "alert", name: "Alert", category: "primitive", description: "Informational, warning, and danger notices.", importPath: "@/components/ui/Alert" },
  { id: "badge", name: "StatusBadge", category: "primitive", description: "Status and label badges.", importPath: "@/components/ui/StatusBadge" },
  { id: "dialog", name: "Dialog", category: "primitive", description: "Accessible modal dialog.", importPath: "@/components/ui/Dialog" },
  { id: "dropdown", name: "Dropdown", category: "primitive", description: "Simple disclosure menu.", importPath: "@/components/ui/Dropdown" },
  { id: "tabs", name: "Tabs", category: "primitive", description: "Keyboard-accessible tab panels.", importPath: "@/components/ui/Tabs" },
  { id: "pagination", name: "Pagination", category: "primitive", description: "Page navigation controls.", importPath: "@/components/ui/Pagination" },
  { id: "skeleton", name: "Skeleton", category: "primitive", description: "Loading placeholders.", importPath: "@/components/ui/Skeleton" },
  { id: "table", name: "Table", category: "primitive", description: "Semantic data tables.", importPath: "@/components/ui/Table" },
  { id: "list", name: "List", category: "primitive", description: "Structured lists.", importPath: "@/components/ui/List" },
  { id: "form-field", name: "FormField", category: "primitive", description: "Label, control, and error composition.", importPath: "@/components/ui/FormField" },
  { id: "search-header", name: "SearchHeader", category: "pattern", description: "Search input header.", importPath: "@/components/ui/SearchHeader" },
  { id: "section-hero", name: "SectionHero", category: "layout", description: "Page hero with breadcrumbs.", importPath: "@/components/ui/SectionHero" },
  { id: "breadcrumb", name: "Breadcrumb", category: "pattern", description: "Hierarchical navigation.", importPath: "@/components/ui/Breadcrumb" },
  { id: "resource-grid", name: "ResourceGrid", category: "pattern", description: "Card grid for resources.", importPath: "@/components/ui/ResourceGrid" },
  { id: "timeline", name: "Timeline", category: "pattern", description: "Vertical timeline.", importPath: "@/components/ui/Timeline" },
  { id: "document-card", name: "DocumentCard", category: "pattern", description: "Document / download card.", importPath: "@/components/ui/DocumentCard" },
  { id: "metric-card", name: "MetricCard", category: "pattern", description: "Metric display card.", importPath: "@/components/ui/MetricCard" },
  { id: "company-card", name: "CompanyCardUi", category: "pattern", description: "Company summary card.", importPath: "@/components/ui/CompanyCardUi" },
  { id: "support-card", name: "SupportCard", category: "pattern", description: "Support queue card.", importPath: "@/components/ui/SupportCard" },
  { id: "status-card", name: "StatusCard", category: "pattern", description: "Service status card.", importPath: "@/components/authority/StatusCard" },
  { id: "legal-notice", name: "LegalNotice", category: "pattern", description: "Policy callout.", importPath: "@/components/ui/LegalNotice" },
  { id: "trust-badge", name: "TrustBadge", category: "pattern", description: "Trust center badge link.", importPath: "@/components/ui/TrustBadge" },
  { id: "policy-header", name: "PolicyHeader", category: "layout", description: "Policy document header.", importPath: "@/components/ui/PolicyHeader" },
  { id: "empty-state", name: "EmptyStateUi", category: "pattern", description: "Empty / no-data state.", importPath: "@/components/ui/EmptyStateUi" },
  { id: "document-viewer", name: "DocumentViewer", category: "pattern", description: "Article sections viewer.", importPath: "@/components/ui/DocumentViewer" },
];

export const TOKEN_GROUPS = [
  { id: "colors", name: "Colors", description: "Legacy Gold institutional palette." },
  { id: "gradients", name: "Gradients", description: "Gold and ink gradients." },
  { id: "spacing", name: "Spacing", description: "4px-based scale." },
  { id: "radius", name: "Radius", description: "Corner radii." },
  { id: "typography", name: "Typography", description: "Serif and sans families." },
  { id: "elevations", name: "Elevations", description: "Shadows and focus rings." },
  { id: "animations", name: "Animations", description: "Enterprise transitions." },
  { id: "breakpoints", name: "Breakpoints", description: "Responsive breakpoints including ultra-wide." },
  { id: "containers", name: "Containers", description: "Content max-widths." },
  { id: "icons", name: "Icons", description: "Icon sizing tokens." },
] as const;
