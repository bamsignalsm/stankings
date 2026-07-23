/** Workforce Platform types */

export type HierarchyLevel =
  | "ceo"
  | "company_head"
  | "department_manager"
  | "staff";

export type EmployeeStatus = "invited" | "active" | "suspended" | "terminated";

export type HiringPipelineStatus =
  | "submitted"
  | "new"
  | "reviewing"
  | "shortlisted"
  | "interview_scheduled"
  | "interview_completed"
  | "offer_extended"
  | "offer_accepted"
  | "offer_rejected"
  | "accepted"
  | "hired"
  | "rejected"
  | "archived";

export const HIRING_PIPELINE_STATUSES: HiringPipelineStatus[] = [
  "submitted",
  "new",
  "reviewing",
  "shortlisted",
  "interview_scheduled",
  "interview_completed",
  "offer_extended",
  "offer_accepted",
  "offer_rejected",
  "accepted",
  "hired",
  "rejected",
  "archived",
];

export interface WorkforceEmployee {
  id: string;
  user_id: string;
  identity_subject_id: string | null;
  email: string;
  full_name: string | null;
  company_id: string;
  department_slug: string;
  role_key: string;
  workspace_key: string;
  hierarchy_level: HierarchyLevel;
  manager_employee_id: string | null;
  status: EmployeeStatus;
  source: "hire" | "invite";
  application_id: string | null;
  created_at: string;
  updated_at: string;
}

export const WELCOME_CHECKLIST_DEFAULTS = [
  { item_key: "profile", label: "Complete your employee profile" },
  { item_key: "knowledge", label: "Read company knowledge base intro" },
  { item_key: "conduct", label: "Acknowledge code of conduct" },
  { item_key: "queue", label: "Open your role queue" },
  { item_key: "manager", label: "Message your manager (if assigned)" },
] as const;
