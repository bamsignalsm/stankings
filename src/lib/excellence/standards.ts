/**
 * Standards of Excellence — per-department operationalization of CANON-008
 */

export interface ExcellenceKpi {
  label: string;
  target: string;
}

export interface DepartmentExcellenceStandard {
  slug: string;
  name: string;
  excellenceLane: string;
  companySlug?: string;
  standardsOfExcellence: string[];
  kpis: ExcellenceKpi[];
  qualityChecklist: string[];
  continuousImprovementPlan: string[];
  auditFrequency: string;
  lessonsLearned: string[];
  canonReferences: string[];
}

export const DEPARTMENT_EXCELLENCE_STANDARDS: DepartmentExcellenceStandard[] = [
  {
    slug: "yike",
    name: "Yike",
    excellenceLane: "Marketplace Excellence",
    companySlug: "yike",
    standardsOfExcellence: [
      "Every high-value listing verified before publication",
      "Search results load within 2 seconds at p95",
      "Listing photos meet documented quality standards",
      "Customer support responds within 4 business hours",
      "Trust signals visible on every transaction pathway",
    ],
    kpis: [
      { label: "Listing verification completion rate", target: "≥ 98%" },
      { label: "Search p95 latency", target: "< 2s" },
      { label: "Support first-response time", target: "< 4 hours" },
      { label: "Disputed transaction resolution", target: "< 72 hours" },
    ],
    qualityChecklist: [
      "Listing metadata complete and accurate",
      "Verification status confirmed",
      "Photos meet resolution and authenticity standards",
      "Pricing and fees transparent",
      "Escrow pathway available for high-value items",
    ],
    continuousImprovementPlan: [
      "Monthly marketplace quality review",
      "Quarterly vendor feedback synthesis",
      "Search performance optimization sprint each quarter",
    ],
    auditFrequency: "Monthly operational audit · Quarterly trust audit",
    lessonsLearned: [
      "Speed without verification damages institutional trust — CANON-002.",
    ],
    canonReferences: ["CANON-008", "CANON-002", "CANON-005", "CANON-003"],
  },
  {
    slug: "stankings-auto-hub",
    name: "Stankings Auto Hub",
    excellenceLane: "Automotive Excellence",
    companySlug: "stankings-auto-hub",
    standardsOfExcellence: [
      "100-point inspection means 100 points — every vehicle, every time",
      "Verification documentation complete before listing approval",
      "Fleet and retail customers receive identical inspection rigour",
      "Import advisory based on evidence, not optimism",
    ],
    kpis: [
      { label: "Inspection checklist completion", target: "100%" },
      { label: "Post-sale defect rate (30 days)", target: "< 2%" },
      { label: "Verification report turnaround", target: "< 24 hours" },
    ],
    qualityChecklist: [
      "All 100+ inspection points documented",
      "Vehicle history verified",
      "Photos match physical condition",
      "Pricing reflects verified condition",
      "Customer disclosure complete",
    ],
    continuousImprovementPlan: [
      "Inspector calibration training quarterly",
      "Defect pattern analysis monthly",
      "Inspection checklist review annually",
    ],
    auditFrequency: "Weekly spot audits · Monthly full audit",
    lessonsLearned: [
      "Marketing claims must match operational reality — CANON-007.",
    ],
    canonReferences: ["CANON-008", "CANON-007", "CANON-002", "CANON-005"],
  },
  {
    slug: "stanhan",
    name: "Stanhan Real Estate",
    excellenceLane: "Property Excellence",
    companySlug: "stanhan",
    standardsOfExcellence: [
      "Verification consistent for ₦5M plots and ₦5B commercial properties",
      "Due diligence documentation complete before client recommendation",
      "Construction quality meets documented specifications",
      "Standards independent of client profile or transaction size",
    ],
    kpis: [
      { label: "Verification report accuracy (audit sample)", target: "≥ 99%" },
      { label: "Project milestone on-time delivery", target: "≥ 90%" },
      { label: "Client satisfaction (post-verification)", target: "≥ 4.5/5" },
    ],
    qualityChecklist: [
      "Title and documentation verified",
      "Physical inspection completed",
      "Valuation methodology documented",
      "Risk factors disclosed to client",
      "Photographic evidence archived",
    ],
    continuousImprovementPlan: [
      "Verification methodology review semi-annually",
      "Cross-training with Yike trust standards",
      "Construction quality benchmark updates annually",
    ],
    auditFrequency: "Per-project verification audit · Quarterly portfolio review",
    lessonsLearned: [],
    canonReferences: ["CANON-008", "CANON-002", "CANON-003", "CANON-005"],
  },
  {
    slug: "hannahkings-education",
    name: "Hannahkings Education",
    excellenceLane: "Educational Excellence",
    companySlug: "hannahkings-education",
    standardsOfExcellence: [
      "Teaching quality consistent across all year groups",
      "Administration responsive and accurate",
      "Facilities maintained to documented standards",
      "Character development integrated into curriculum",
    ],
    kpis: [
      { label: "Parent satisfaction survey", target: "≥ 4.5/5" },
      { label: "Teacher professional development hours", target: "≥ 40/year" },
      { label: "Facility safety inspection pass rate", target: "100%" },
    ],
    qualityChecklist: [
      "Lesson plans meet curriculum standards",
      "Student progress tracked and communicated",
      "Facilities inspection current",
      "Safeguarding protocols followed",
      "Character development activities documented",
    ],
    continuousImprovementPlan: [
      "Termly curriculum review",
      "Annual faculty development programme",
      "Facility upgrade plan aligned to institutional standards",
    ],
    auditFrequency: "Termly academic review · Annual governance audit",
    lessonsLearned: [],
    canonReferences: ["CANON-008", "CANON-001", "CANON-004", "CANON-006"],
  },
  {
    slug: "engineering",
    name: "Engineering",
    excellenceLane: "Technical Excellence",
    standardsOfExcellence: [
      "Clean architecture and maintainable code",
      "Thoughtful testing — weaknesses revealed, not hidden",
      "Documentation sufficient for future engineers",
      "Security and incident response per documented standards",
      "Performance measured objectively",
    ],
    kpis: [
      { label: "Production incident MTTR", target: "< 4 hours (P1)" },
      { label: "Test coverage (critical paths)", target: "≥ 80%" },
      { label: "Security finding remediation (critical)", target: "< 7 days" },
      { label: "Documentation freshness", target: "Reviewed quarterly" },
    ],
    qualityChecklist: [
      "Code review completed",
      "Tests pass and cover critical paths",
      "Security review for sensitive changes",
      "Documentation updated",
      "Monitoring and alerts configured",
      "IDR created for architectural decisions",
    ],
    continuousImprovementPlan: [
      "Monthly technical debt review",
      "Quarterly architecture review",
      "Post-incident retrospectives within 48 hours",
      "Performance optimization per service annually",
    ],
    auditFrequency: "Continuous CI/CD gates · Monthly security scan · Quarterly architecture audit",
    lessonsLearned: [
      "Technical debt deferred becomes institutional debt — CANON-006.",
      "Truth in metrics prevents convenience-driven launches — CANON-007.",
    ],
    canonReferences: ["CANON-008", "CANON-007", "CANON-006", "CANON-002"],
  },
];

export function getDepartmentExcellence(slug: string): DepartmentExcellenceStandard | undefined {
  return DEPARTMENT_EXCELLENCE_STANDARDS.find((d) => d.slug === slug);
}

export function getAllDepartmentExcellence(): DepartmentExcellenceStandard[] {
  return DEPARTMENT_EXCELLENCE_STANDARDS;
}
