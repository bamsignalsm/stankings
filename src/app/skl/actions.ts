"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSuperAdmin, getCurrentMember } from "@/lib/members";
import { provisionWorkforceEmployee } from "@/lib/workforce/provisioner";
import { HIRING_PIPELINE_STATUSES } from "@/lib/workforce/types";
import type { ApplicationStatus } from "@/lib/types";
import type { HierarchyLevel } from "@/lib/workforce/types";

async function requireSuperAdmin() {
  const member = await getCurrentMember();
  if (!isSuperAdmin(member)) {
    throw new Error("Unauthorized");
  }
  return member!;
}

export async function advanceApplicationStatus(formData: FormData) {
  const admin = await requireSuperAdmin();
  const supabase = await createClient();
  const applicationId = String(formData.get("application_id") ?? "");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  const note = String(formData.get("note") ?? "").trim();
  const interviewScore = String(formData.get("interview_score") ?? "").trim();
  const hiringDecision = String(formData.get("hiring_decision") ?? "").trim();

  if (
    status === "draft" ||
    !HIRING_PIPELINE_STATUSES.includes(status as (typeof HIRING_PIPELINE_STATUSES)[number])
  ) {
    throw new Error("Invalid application status");
  }

  const { data: prev } = await supabase
    .from("stankings_career_applications")
    .select("status")
    .eq("id", applicationId)
    .single();

  const update: Record<string, unknown> = { status };
  if (interviewScore) update.interview_score = Number(interviewScore);
  if (hiringDecision) update.hiring_decision = hiringDecision;
  if (note) update.internal_notes = note;

  const { error } = await supabase
    .from("stankings_career_applications")
    .update(update)
    .eq("id", applicationId);
  if (error) throw new Error(error.message);

  await supabase.from("workforce_application_events").insert({
    application_id: applicationId,
    actor_id: admin.id,
    from_status: prev?.status ?? null,
    to_status: status,
    note: note || null,
  });

  if (note) {
    await supabase.from("workforce_application_notes").insert({
      application_id: applicationId,
      author_id: admin.id,
      body: note,
    });
  }

  if (status === "hired") {
    await hireFromApplication(applicationId);
  }

  revalidatePath("/energy/applications");
  revalidatePath("/energy/employees");
  revalidatePath("/career");
}

export async function hireFromApplication(applicationId: string) {
  const admin = await requireSuperAdmin();
  const supabase = await createClient();

  const { data: app, error } = await supabase
    .from("stankings_career_applications")
    .select("*, stankings_career_posts(*)")
    .eq("id", applicationId)
    .single();

  if (error || !app) throw new Error(error?.message ?? "Application not found");

  const post = app.stankings_career_posts as {
    company_id?: string | null;
    department_slug?: string | null;
    role_key?: string | null;
    workspace_key?: string | null;
    title?: string;
  } | null;

  if (!post?.company_id || !post.role_key || !post.workspace_key) {
    throw new Error("Career post missing company/role/workspace binding");
  }

  const result = await provisionWorkforceEmployee({
    source: "hire",
    email: app.email,
    fullName: app.full_name,
    companyId: post.company_id,
    departmentSlug: post.department_slug ?? "operations",
    roleKey: post.role_key,
    workspaceKey: post.workspace_key,
    applicationId,
    existingUserId: app.applicant_id ?? undefined,
    actorMemberId: admin.id,
  });

  if (!result.ok) throw new Error(result.error ?? "Provisioning failed");

  await supabase
    .from("stankings_career_applications")
    .update({ status: "hired", hiring_decision: "hired" })
    .eq("id", applicationId);

  revalidatePath("/energy/employees");
  return result;
}

export async function inviteEmployee(formData: FormData) {
  const admin = await requireSuperAdmin();
  const email = String(formData.get("email") ?? "").trim();
  const fullName = String(formData.get("full_name") ?? "").trim();
  const companyId = String(formData.get("company_id") ?? "").trim();
  const departmentSlug = String(formData.get("department_slug") ?? "").trim();
  const roleKey = String(formData.get("role_key") ?? "").trim();
  let workspaceKey = String(formData.get("workspace_key") ?? "").trim();
  const hierarchyLevel = String(
    formData.get("hierarchy_level") ?? "staff"
  ) as HierarchyLevel;

  const { ORG_ROLE_TEMPLATES } = await import("@/lib/organization/registry");
  const orgMatch = ORG_ROLE_TEMPLATES.find((j) => j.roleKey === roleKey);
  if (orgMatch) {
    workspaceKey = orgMatch.workspaceKey;
  }

  const result = await provisionWorkforceEmployee({
    source: "invite",
    email,
    fullName,
    companyId: orgMatch?.companyId ?? companyId,
    departmentSlug: orgMatch?.departmentSlug ?? departmentSlug,
    roleKey,
    workspaceKey: orgMatch?.workspaceKey ?? workspaceKey,
    hierarchyLevel: orgMatch?.hierarchyLevel ?? hierarchyLevel,
    actorMemberId: admin.id,
  });

  if (!result.ok) throw new Error(result.error ?? "Invite failed");
  revalidatePath("/energy/employees");
}

export async function suspendEmployee(formData: FormData) {
  const admin = await requireSuperAdmin();
  const supabase = await createClient();
  const employeeId = String(formData.get("employee_id") ?? "");
  const { error } = await supabase
    .from("workforce_employees")
    .update({ status: "suspended" })
    .eq("id", employeeId);
  if (error) throw new Error(error.message);
  await supabase.from("workforce_audit_logs").insert({
    actor_id: admin.id,
    action: "workforce.suspend",
    entity_type: "workforce_employee",
    entity_id: employeeId,
  });
  revalidatePath("/energy/employees");
}

export async function transferEmployee(formData: FormData) {
  const admin = await requireSuperAdmin();
  const supabase = await createClient();
  const employeeId = String(formData.get("employee_id") ?? "");
  const companyId = String(formData.get("company_id") ?? "").trim();
  const departmentSlug = String(formData.get("department_slug") ?? "").trim();
  const roleKey = String(formData.get("role_key") ?? "").trim();
  const workspaceKey = String(formData.get("workspace_key") ?? "").trim();

  const { error } = await supabase
    .from("workforce_employees")
    .update({
      company_id: companyId,
      department_slug: departmentSlug,
      role_key: roleKey,
      workspace_key: workspaceKey,
    })
    .eq("id", employeeId);
  if (error) throw new Error(error.message);

  await supabase.from("workforce_audit_logs").insert({
    actor_id: admin.id,
    action: "workforce.transfer",
    entity_type: "workforce_employee",
    entity_id: employeeId,
    payload: { companyId, departmentSlug, roleKey, workspaceKey },
  });
  revalidatePath("/energy/employees");
}

export async function seedLaunchCatalogueAction() {
  const admin = await requireSuperAdmin();
  const { seedOrganizationRegistry } = await import("@/lib/organization/seed");
  await seedOrganizationRegistry(admin.id);
  revalidatePath("/career");
  revalidatePath("/energy/careers");
  revalidatePath("/energy/workforce");
  revalidatePath("/energy/employees");
  revalidatePath("/energy/organization");
}

export async function completeWelcomeItem(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const itemId = String(formData.get("item_id") ?? "");
  const { data: emp } = await supabase
    .from("workforce_employees")
    .select("id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();
  if (!emp) throw new Error("Not an employee");

  const { error } = await supabase
    .from("workforce_welcome_checklist")
    .update({ completed: true, completed_at: new Date().toISOString() })
    .eq("id", itemId)
    .eq("employee_id", emp.id);
  if (error) throw new Error(error.message);
  revalidatePath("/skl");
}

export async function createEditorialArticle(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: emp } = await supabase
    .from("workforce_employees")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .limit(1)
    .maybeSingle();
  if (!emp) throw new Error("Active employee required");

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  if (!title) throw new Error("Title required");

  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { error } = await supabase.from("workforce_editorial_articles").insert({
    company_id: emp.company_id,
    author_employee_id: emp.id,
    title,
    slug: `${slug}-${Date.now().toString(36)}`,
    body,
    category: category || null,
    status: "draft",
  });
  if (error) throw new Error(error.message);
  revalidatePath("/skl");
}

export async function publishEditorialArticle(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("article_id") ?? "");
  const { error } = await supabase
    .from("workforce_editorial_articles")
    .update({ status: "published", published_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/skl");
}

export async function createSupportTicket(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: emp } = await supabase
    .from("workforce_employees")
    .select("*")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();
  if (!emp) throw new Error("Employee required");

  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const queue = String(formData.get("queue") ?? "general").trim();
  if (!subject) throw new Error("Subject required");

  const { error } = await supabase.from("workforce_support_tickets").insert({
    company_id: emp.company_id,
    assignee_employee_id: emp.id,
    subject,
    body,
    queue,
    status: "assigned",
  });
  if (error) throw new Error(error.message);
  revalidatePath("/skl");
}

export async function updateSupportTicketStatus(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("ticket_id") ?? "");
  const status = String(formData.get("status") ?? "");
  const { error } = await supabase
    .from("workforce_support_tickets")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/skl");
}

export async function createModerationReport(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: emp } = await supabase
    .from("workforce_employees")
    .select("*")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();
  if (!emp) throw new Error("Employee required");

  const reason = String(formData.get("reason") ?? "").trim();
  const reportType = String(formData.get("report_type") ?? "general").trim();
  const subjectRef = String(formData.get("subject_ref") ?? "").trim();
  if (!reason) throw new Error("Reason required");

  const { error } = await supabase.from("workforce_moderation_reports").insert({
    company_id: emp.company_id,
    assignee_employee_id: emp.id,
    reason,
    report_type: reportType,
    subject_ref: subjectRef || null,
    status: "open",
  });
  if (error) throw new Error(error.message);
  revalidatePath("/skl");
}

export async function actionModerationReport(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("report_id") ?? "");
  const status = String(formData.get("status") ?? "actioned");
  const actionTaken = String(formData.get("action_taken") ?? "").trim();
  const { error } = await supabase
    .from("workforce_moderation_reports")
    .update({ status, action_taken: actionTaken || null })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/skl");
}

export async function createOpsItem(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: emp } = await supabase
    .from("workforce_employees")
    .select("*")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();
  if (!emp) throw new Error("Employee required");

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const moduleName = String(formData.get("module") ?? "operations").trim();
  if (!title) throw new Error("Title required");

  const { error } = await supabase.from("workforce_ops_items").insert({
    company_id: emp.company_id,
    assignee_employee_id: emp.id,
    title,
    body: body || null,
    module: moduleName,
    status: "open",
  });
  if (error) throw new Error(error.message);
  revalidatePath("/skl");
}

export async function createEngIssue(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: emp } = await supabase
    .from("workforce_employees")
    .select("*")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();
  if (!emp) throw new Error("Employee required");

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!title) throw new Error("Title required");

  const { error } = await supabase.from("workforce_eng_issues").insert({
    company_id: emp.company_id,
    assignee_employee_id: emp.id,
    title,
    body: body || null,
    status: "backlog",
  });
  if (error) throw new Error(error.message);
  revalidatePath("/skl");
}

export async function createPressRelease(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: emp } = await supabase
    .from("workforce_employees")
    .select("*")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();
  if (!emp) throw new Error("Employee required");

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!title) throw new Error("Title required");

  const { error } = await supabase.from("workforce_press_releases").insert({
    company_id: emp.company_id,
    author_employee_id: emp.id,
    title,
    body,
    status: "draft",
  });
  if (error) throw new Error(error.message);
  revalidatePath("/skl");
}
