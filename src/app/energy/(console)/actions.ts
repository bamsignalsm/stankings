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
  const location = String(
    formData.get("location") ?? "Stankings HQ, Abia State, Nigeria / Hybrid"
  ).trim();
  const workLocationType = String(
    formData.get("work_location_type") ?? "hybrid"
  ).trim();
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
    work_location_type: workLocationType,
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
  const preferredName = String(formData.get("preferred_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const coverLetter = String(formData.get("cover_letter") ?? "").trim();
  const linkedinUrl = String(formData.get("linkedin_url") ?? "").trim();
  const atsRaw = String(formData.get("ats_profile") ?? "");

  if (!postId || !fullName || !email) {
    throw new Error("Name and email are required");
  }

  let profile: Record<string, unknown> = {};
  if (atsRaw) {
    try {
      profile = JSON.parse(atsRaw) as Record<string, unknown>;
    } catch {
      throw new Error("Invalid application profile payload");
    }
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

  // Duplicate detection: same email or passport with another open application
  const { count: dupCount } = await supabase
    .from("stankings_career_applications")
    .select("*", { count: "exact", head: true })
    .neq("status", "draft")
    .or(
      [
        `email.eq.${email}`,
        `passport_id.eq.${passport.link.passport_id}`,
        `applicant_id.eq.${user.id}`,
      ].join(",")
    );

  const talentPool =
    Boolean(
      (profile as { compliance?: { talentPoolConsent?: boolean } }).compliance
        ?.talentPoolConsent
    ) || false;

  const { data: inserted, error } = await supabase
    .from("stankings_career_applications")
    .insert({
      post_id: postId,
      applicant_id: user.id,
      passport_id: passport.link.passport_id,
      full_name: fullName,
      preferred_name: preferredName || null,
      email,
      phone: phone || null,
      cover_letter: coverLetter || null,
      linkedin_url: linkedinUrl || null,
      profile,
      passport_match: true,
      duplicate_flag: (dupCount ?? 0) > 0,
      talent_pool: talentPool,
      status: "submitted",
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  await supabase.from("workforce_audit_logs").insert({
    actor_id: user.id,
    action: "career.application.submitted",
    entity_type: "career_application",
    entity_id: inserted?.id ?? postId,
    payload: {
      passportId: passport.link.passport_id,
      email,
      duplicateFlag: (dupCount ?? 0) > 0,
      structuredProfile: true,
    },
  });

  revalidatePath("/career");
  revalidatePath("/career/applications");
  revalidatePath("/passport/applicant");
  revalidatePath("/energy/applications");
}

export async function updateRecruiterApplicationReview(formData: FormData) {
  const admin = await requireSuperAdmin();
  const supabase = await createClient();
  const applicationId = String(formData.get("application_id") ?? "");
  const shortlisted = formData.get("shortlisted") === "on";
  const talentPool = formData.get("talent_pool") === "on";
  const recommendation = String(formData.get("hiring_recommendation") ?? "").trim();
  const overall = String(formData.get("score_overall") ?? "").trim();
  const cultureFit = String(formData.get("score_culture") ?? "").trim();
  const technical = String(formData.get("score_technical") ?? "").trim();
  const communication = String(formData.get("score_communication") ?? "").trim();
  const summary = String(formData.get("score_summary") ?? "").trim();
  const note = String(formData.get("recruiter_note") ?? "").trim();

  if (!applicationId) throw new Error("Application required");

  const { error } = await supabase
    .from("stankings_career_applications")
    .update({
      shortlisted,
      talent_pool: talentPool,
      hiring_recommendation: recommendation || null,
      recruiter_scorecard: {
        overall: overall ? Number(overall) : null,
        cultureFit: cultureFit ? Number(cultureFit) : null,
        technical: technical ? Number(technical) : null,
        communication: communication ? Number(communication) : null,
        recommendation: recommendation || null,
        summary,
      },
      updated_at: new Date().toISOString(),
    })
    .eq("id", applicationId);

  if (error) throw new Error(error.message);

  if (note) {
    await supabase.from("career_application_notes").insert({
      application_id: applicationId,
      author_id: admin.id,
      body: note,
      visibility: "internal",
    });
    // Keep legacy internal_notes append for compatibility
    const { data: app } = await supabase
      .from("stankings_career_applications")
      .select("internal_notes")
      .eq("id", applicationId)
      .maybeSingle();
    const prior = app?.internal_notes ? `${app.internal_notes}\n` : "";
    await supabase
      .from("stankings_career_applications")
      .update({
        internal_notes: `${prior}[${new Date().toISOString()}] ${note}`,
      })
      .eq("id", applicationId);
  }

  revalidatePath("/energy/applications");
}