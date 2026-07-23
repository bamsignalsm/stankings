/**
 * Enterprise ATS application profile — structured for recruiter review + future AI.
 */

export interface EducationEntry {
  institution: string;
  qualification: string;
  course: string;
  grade: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
}

export interface CertificationEntry {
  certificate: string;
  issuer: string;
  date: string;
  credentialId: string;
  credentialUrl: string;
}

export interface EmploymentEntry {
  employer: string;
  position: string;
  department: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  currentEmployer: boolean;
  responsibilities: string;
  achievements: string;
  reasonForLeaving: string;
}

export interface SkillEntry {
  skill: string;
  yearsOfExperience: number | null;
  selfRating: number | null; // 1–5
  assessmentScore: number | null;
}

export interface LanguageEntry {
  language: string;
  speaking: string;
  reading: string;
  writing: string;
  fluencyLevel: string;
}

export interface ReferenceEntry {
  name: string;
  organization: string;
  position: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface DocumentRef {
  kind:
    | "cv"
    | "cover_letter"
    | "certification"
    | "portfolio"
    | "passport_photo"
    | "id_document"
    | "other";
  fileName: string;
  storagePath: string | null;
  url: string | null;
}

export interface AtsCompliance {
  informationAccurate: boolean;
  backgroundChecksConsent: boolean;
  privacyPolicyAccepted: boolean;
  recruitmentConsent: boolean;
  talentPoolConsent: boolean;
}

export interface AtsAvailability {
  noticePeriod: string;
  earliestStartDate: string;
  currentEmploymentStatus: string;
  currentSalary: string;
  expectedSalary: string;
  preferredEmploymentType: string;
  willingToRelocate: boolean | null;
  willingToTravel: boolean | null;
}

export interface AtsPersonal {
  fullLegalName: string;
  preferredName: string;
  email: string;
  phone: string;
  alternativePhone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  stateOfOrigin: string;
  lga: string;
  residentialAddress: string;
  currentCity: string;
  currentState: string;
  country: string;
}

export interface AtsIdentity {
  meansOfIdentification: string;
  idNumber: string;
  expiryDate: string;
}

export interface AtsProfiles {
  linkedin: string;
  github: string;
  portfolio: string;
  personalWebsite: string;
  behance: string;
}

export interface AtsApplicationProfile {
  schemaVersion: 1;
  personal: AtsPersonal;
  identity: AtsIdentity;
  education: EducationEntry[];
  certifications: CertificationEntry[];
  employmentHistory: EmploymentEntry[];
  skills: SkillEntry[];
  languages: LanguageEntry[];
  profiles: AtsProfiles;
  references: ReferenceEntry[];
  availability: AtsAvailability;
  roleAnswers: Record<string, string>;
  documents: DocumentRef[];
  compliance: AtsCompliance;
  coverLetter: string;
}

export interface RecruiterScorecard {
  overall: number | null;
  cultureFit: number | null;
  technical: number | null;
  communication: number | null;
  recommendation: "strong_hire" | "hire" | "hold" | "no_hire" | null;
  summary: string;
}

export interface RoleQuestion {
  id: string;
  label: string;
  required?: boolean;
}

export const SKILL_TAG_SUGGESTIONS = [
  "Leadership",
  "Sales",
  "Marketing",
  "Customer Service",
  "DevOps",
  "AWS",
  "Linux",
  "React",
  "Accounting",
  "HR",
  "Procurement",
  "Communication",
  "Operations",
] as const;

export const DEFAULT_ROLE_QUESTIONS: Record<string, RoleQuestion[]> = {
  engineering: [
    { id: "languages", label: "Programming languages", required: true },
    { id: "frameworks", label: "Frameworks" },
    { id: "cloud", label: "Cloud platforms" },
    { id: "databases", label: "Database experience" },
  ],
  marketing: [
    { id: "campaigns", label: "Campaign experience" },
    { id: "seo", label: "SEO experience" },
    { id: "paid_ads", label: "Paid ads platforms" },
    { id: "analytics", label: "Analytics tools" },
  ],
  finance: [
    { id: "ifrs", label: "IFRS familiarity" },
    { id: "erp", label: "ERP systems" },
    { id: "audit", label: "Audit experience" },
  ],
  customer_success: [
    { id: "crm", label: "CRM platforms" },
    { id: "support", label: "Support platforms" },
  ],
  default: [
    { id: "why_stankings", label: "Why Stankings?", required: true },
    { id: "relevant_experience", label: "Most relevant experience", required: true },
  ],
};

export function emptyAtsProfile(partial?: {
  fullName?: string;
  email?: string;
}): AtsApplicationProfile {
  return {
    schemaVersion: 1,
    personal: {
      fullLegalName: partial?.fullName ?? "",
      preferredName: "",
      email: partial?.email ?? "",
      phone: "",
      alternativePhone: "",
      dateOfBirth: "",
      gender: "",
      nationality: "Nigerian",
      stateOfOrigin: "",
      lga: "",
      residentialAddress: "",
      currentCity: "",
      currentState: "",
      country: "Nigeria",
    },
    identity: {
      meansOfIdentification: "",
      idNumber: "",
      expiryDate: "",
    },
    education: [],
    certifications: [],
    employmentHistory: [],
    skills: [],
    languages: [],
    profiles: {
      linkedin: "",
      github: "",
      portfolio: "",
      personalWebsite: "",
      behance: "",
    },
    references: [
      {
        name: "",
        organization: "",
        position: "",
        phone: "",
        email: "",
        relationship: "",
      },
      {
        name: "",
        organization: "",
        position: "",
        phone: "",
        email: "",
        relationship: "",
      },
    ],
    availability: {
      noticePeriod: "",
      earliestStartDate: "",
      currentEmploymentStatus: "",
      currentSalary: "",
      expectedSalary: "",
      preferredEmploymentType: "full-time",
      willingToRelocate: null,
      willingToTravel: null,
    },
    roleAnswers: {},
    documents: [],
    compliance: {
      informationAccurate: false,
      backgroundChecksConsent: false,
      privacyPolicyAccepted: false,
      recruitmentConsent: false,
      talentPoolConsent: false,
    },
    coverLetter: "",
  };
}

export function resolveRoleQuestions(
  workspaceKey?: string | null,
  custom?: RoleQuestion[] | null
): RoleQuestion[] {
  if (custom && custom.length > 0) return custom;
  const key = (workspaceKey ?? "").toLowerCase();
  if (key.includes("eng")) return DEFAULT_ROLE_QUESTIONS.engineering;
  if (key.includes("growth") || key.includes("editorial") || key.includes("pr")) {
    return DEFAULT_ROLE_QUESTIONS.marketing;
  }
  if (key.includes("risk") || key.includes("finance")) {
    return DEFAULT_ROLE_QUESTIONS.finance;
  }
  if (key.includes("support") || key.includes("customer")) {
    return DEFAULT_ROLE_QUESTIONS.customer_success;
  }
  return DEFAULT_ROLE_QUESTIONS.default;
}
