export type MemberRole = "member" | "admin" | "super_admin";
export type MemberStatus = "pending" | "approved" | "rejected";
export type CareerPostStatus = "draft" | "published" | "closed";
export type ApplicationStatus =
  | "new"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "hired";

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
  description: string;
  requirements: string | null;
  location: string;
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
  full_name: string;
  email: string;
  phone: string | null;
  cover_letter: string | null;
  linkedin_url: string | null;
  status: ApplicationStatus;
  created_at: string;
  stankings_career_posts?: { title: string; slug: string };
}
