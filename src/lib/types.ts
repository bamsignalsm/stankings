export type MemberRole = "member" | "admin" | "super_admin";
export type MemberStatus = "pending" | "approved" | "rejected";
export type CareerPostStatus = "draft" | "published" | "closed";
export type ApplicationStatus =
  | "draft"
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

export interface StankingsMember {
  id: string;
  email: string;
  full_name: string | null;
  role: MemberRole;
  status: MemberStatus;
  created_at: string;
  updated_at: string;
}

export interface CareerPost {
  id: string;
  title: string;
  slug: string;
  company_area: string;
  company_id?: string | null;
  department_slug?: string | null;
  role_key?: string | null;
  workspace_key?: string | null;
  responsibilities?: string | null;
  required_skills?: string | null;
  reporting_manager_title?: string | null;
  salary_range?: string | null;
  catalogue_key?: string | null;
  description: string;
  requirements: string | null;
  location: string;
  work_location_type?: string | null;
  employment_type: string;
  status: CareerPostStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CareerApplication {
  id: string;
  post_id: string;
  applicant_id: string | null;
  passport_id?: string | null;
  full_name: string;
  preferred_name?: string | null;
  email: string;
  phone: string | null;
  cover_letter: string | null;
  linkedin_url: string | null;
  profile?: Record<string, unknown> | null;
  shortlisted?: boolean;
  talent_pool?: boolean;
  passport_match?: boolean;
  duplicate_flag?: boolean;
  recruiter_scorecard?: Record<string, unknown> | null;
  hiring_recommendation?: string | null;
  status: ApplicationStatus;
  interview_score?: number | null;
  hiring_decision?: string | null;
  internal_notes?: string | null;
  created_at: string;
  updated_at?: string;
  stankings_career_posts?: {
    title: string;
    slug: string;
    company_id?: string | null;
    role_key?: string | null;
    workspace_key?: string | null;
    department_slug?: string | null;
    location?: string | null;
    work_location_type?: string | null;
  };
}
