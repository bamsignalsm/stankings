"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSuperAdmin, getCurrentMember } from "@/lib/members";
import { slugify } from "@/lib/careers";
import type { ApplicationStatus, CareerPostStatus, MemberStatus } from "@/lib/types";

async function requireSuperAdmin() {
  const member = await getCurrentMember();
  if (!isSuperAdmin(member)) {
    throw new Error("Unauthorized");
  }
  return member!;
}

export async function updateMemberStatus(
  memberId: string,
  status: MemberStatus
) {
  await requireSuperAdmin();
  const supabase = await createClient();

  const { error } = await supabase
    .from("stankings_members")
    .update({ status })
    .eq("id", memberId);

  if (error) throw new Error(error.message);
  revalidatePath("/energy/members");
}

export async function createCareerPost(formData: FormData) {
  const admin = await requireSuperAdmin();
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const companyArea = String(formData.get("company_area") ?? "").trim();
  const companyId = String(formData.get("company_id") ?? "").trim();
  const departmentSlug = String(formData.get("department_slug") ?? "").trim();
  const roleKey = String(formData.get("role_key") ?? "").trim();
  const workspaceKey = String(formData.get("workspace_key") ?? "").trim();
  const responsibilities = String(formData.get("responsibilities") ?? "").trim();
  const requiredSkills = String(formData.get("required_skills") ?? "").trim();
  const reportingManagerTitle = String(
    formData.get("reporting_manager_title") ?? ""
  ).trim();
  const description = String(formData.get("description") ?? "").trim();
  const requirements = String(formData.get("requirements") ?? "").trim();
  const location = String(formData.get("location") ?? "Lagos, Nigeria").trim();
  const employmentType = String(formData.get("employment_type") ?? "full-time");
  const status = String(formData.get("status") ?? "draft") as CareerPostStatus;

  if (!title || !companyArea || !description) {
    throw new Error("Title, company area, and description are required");
  }

  const slug = slugify(title);

  const { error } = await supabase.from("stankings_career_posts").insert({
    title,
    slug,
    company_area: companyArea,
    company_id: companyId || null,
    department_slug: departmentSlug || null,
    role_key: roleKey || null,
    workspace_key: workspaceKey || null,
    responsibilities: responsibilities || null,
    required_skills: requiredSkills || null,
    reporting_manager_title: reportingManagerTitle || null,
    description,
    requirements: requirements || null,
    location,
    employment_type: employmentType,
    status,
    created_by: admin.id,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/energy/careers");
  revalidatePath("/career");
}

export async function updateCareerPost(id: string, formData: FormData) {
  await requireSuperAdmin();
  const supabase = await createClient();

  const title = String(formData.get("title") ?? "").trim();
  const companyArea = String(formData.get("company_area") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const requirements = String(formData.get("requirements") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const employmentType = String(formData.get("employment_type") ?? "full-time");
  const status = String(formData.get("status") ?? "draft") as CareerPostStatus;

  const { error } = await supabase
    .from("stankings_career_posts")
    .update({
      title,
      slug: slugify(title),
      company_area: companyArea,
      description,
      requirements: requirements || null,
      location,
      employment_type: employmentType,
      status,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/energy/careers");
  revalidatePath("/career");
}

export async function approveMember(formData: FormData) {
  const memberId = String(formData.get("member_id") ?? "");
  await updateMemberStatus(memberId, "approved");
}

export async function rejectMember(formData: FormData) {
  const memberId = String(formData.get("member_id") ?? "");
  await updateMemberStatus(memberId, "rejected");
}

export async function setApplicationStatus(formData: FormData) {
  const applicationId = String(formData.get("application_id") ?? "");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  await updateApplicationStatus(applicationId, status);
}

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
) {
  const { advanceApplicationStatus } = await import("@/app/skl/actions");
  const fd = new FormData();
  fd.set("application_id", applicationId);
  fd.set("status", status);
  await advanceApplicationStatus(fd);
}

export async function submitCareerApplication(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    throw new Error("Create or sign in with your Stankings Passport to apply");
  }

  const postId = String(formData.get("post_id") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const coverLetter = String(formData.get("cover_letter") ?? "").trim();
  const linkedinUrl = String(formData.get("linkedin_url") ?? "").trim();

  if (!postId || !fullName || !email) {
    throw new Error("Name and email are required");
  }

  const { ensurePassportForUser } = await import("@/lib/passport/person");
  const passport = await ensurePassportForUser({
    userId: user.id,
    email: user.email,
    fullName,
  });
  if (!passport.ok || !passport.link) {
    if (passport.recoveryRequired) {
      throw new Error(
        "PASSPORT_RECOVERY_REQUIRED: A Stankings Passport already exists for this email. Open /passport/recovery — no second Passport was created."
      );
    }
    throw new Error(passport.error ?? "Could not issue Stankings Passport");
  }

  await supabase.from("stankings_members").upsert(
    {
      id: user.id,
      email: user.email.toLowerCase(),
      full_name: fullName,
      role: "member",
      status: "approved",
    },
    { onConflict: "id" }
  );

  const { error } = await supabase.from("stankings_career_applications").insert({
    post_id: postId,
    applicant_id: user.id,
    passport_id: passport.link.passport_id,
    full_name: fullName,
    email,
    phone: phone || null,
    cover_letter: coverLetter || null,
    linkedin_url: linkedinUrl || null,
    status: "submitted",
  });

  if (error) throw new Error(error.message);
  revalidatePath("/career");
  revalidatePath("/career/applications");
  revalidatePath("/passport/applicant");
}