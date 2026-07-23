/**
 * Seed Organization Registry + Phase 1 vacancies into Supabase.
 */

import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/careers";
import { WORKSPACE_PERMISSION_TEMPLATES } from "@/lib/workforce/rbac";
import {
  ORG_DEPARTMENT_CATALOGUE,
  ORG_ROLE_TEMPLATES,
  getOrgCompanies,
  defaultTeamFor,
} from "./registry";
import { BUSINESS_SECTOR_LABELS } from "@/lib/shared/company/registry";

function companyAreaLabel(companyId: string, sector?: string): string {
  if (companyId === "hq") return "Stankings Legacy Ltd (Corporate)";
  if (companyId === "stankings-times") return "Media & Communications";
  if (sector && sector in BUSINESS_SECTOR_LABELS) {
    return BUSINESS_SECTOR_LABELS[sector as keyof typeof BUSINESS_SECTOR_LABELS];
  }
  return companyId;
}

export async function seedOrganizationRegistry(createdBy?: string): Promise<{
  companies: number;
  departments: number;
  teams: number;
  roles: number;
  posts: number;
}> {
  const admin = createAdminClient();
  let companies = 0;
  let departments = 0;
  let teams = 0;
  let roles = 0;
  let posts = 0;

  for (const company of getOrgCompanies()) {
    const { error } = await admin.from("organization_companies").upsert(
      {
        company_id: company.id,
        name: company.name,
        legal_name: company.legalName,
        recruitment_status: company.recruitmentStatus,
        status: "active",
      },
      { onConflict: "company_id" }
    );
    if (!error) companies += 1;
  }

  for (const dept of ORG_DEPARTMENT_CATALOGUE) {
    const { error } = await admin.from("organization_departments").upsert(
      {
        company_id: dept.companyId,
        slug: dept.slug,
        name: dept.name,
        status: "active",
      },
      { onConflict: "company_id,slug" }
    );
    if (!error) departments += 1;

    const team = defaultTeamFor(dept.companyId, dept.slug);
    const { error: tErr } = await admin.from("organization_teams").upsert(
      {
        company_id: team.companyId,
        department_slug: team.departmentSlug,
        slug: team.slug,
        name: team.name,
        status: "active",
      },
      { onConflict: "company_id,department_slug,slug" }
    );
    if (!tErr) teams += 1;
  }

  const phase1Keys = new Set(
    ORG_ROLE_TEMPLATES.filter((r) => r.publishVacancy).map((r) => r.roleKey)
  );

  // Unpublish legacy catalogue posts that are not Phase 1 public vacancies
  const { data: publishedPosts } = await admin
    .from("stankings_career_posts")
    .select("id, catalogue_key, status")
    .eq("status", "published");
  for (const post of publishedPosts ?? []) {
    const key = post.catalogue_key as string | null;
    if (!key || !phase1Keys.has(key)) {
      await admin
        .from("stankings_career_posts")
        .update({ status: "draft" })
        .eq("id", post.id);
    }
  }

  for (const role of ORG_ROLE_TEMPLATES) {
    const { error } = await admin.from("organization_roles").upsert(
      {
        company_id: role.companyId,
        department_slug: role.departmentSlug,
        team_slug: role.teamSlug,
        role_key: role.roleKey,
        title: role.title,
        workspace_key: role.workspaceKey,
        hierarchy_level: role.hierarchyLevel,
        phase: role.phase,
        status: "active",
      },
      { onConflict: "company_id,role_key" }
    );
    if (!error) roles += 1;

    // Also mirror into workforce_roles for existing consumers
    await admin.from("workforce_roles").upsert(
      {
        company_id: role.companyId,
        department_slug: role.departmentSlug,
        role_key: role.roleKey,
        title: role.title,
        workspace_key: role.workspaceKey,
        hierarchy_level: role.hierarchyLevel,
        status: "active",
      },
      { onConflict: "company_id,role_key" }
    );

    const perms =
      WORKSPACE_PERMISSION_TEMPLATES[role.workspaceKey] ?? [
        "office.access",
        "tasks.read",
      ];
    for (const permission_key of perms) {
      await admin.from("workforce_role_templates").upsert(
        {
          role_key: role.roleKey,
          workspace_key: role.workspaceKey,
          permission_key,
        },
        { onConflict: "role_key,permission_key" }
      );
    }

    const company = getOrgCompanies().find((c) => c.id === role.companyId);
    const area = companyAreaLabel(
      role.companyId,
      company?.registry.businessSector
    );
    const description = [
      `${role.title} — ${company?.name ?? role.companyId}.`,
      "",
      "## Responsibilities",
      `Deliver excellence as ${role.title} within the Stankings ecosystem.`,
      "",
      "## Organization",
      `Company: ${role.companyId}`,
      `Department: ${role.departmentSlug}`,
      `Team: ${role.teamSlug}`,
      `Workspace: ${role.workspaceKey}`,
      `Phase: ${role.phase}`,
    ].join("\n");

    const catalogueKey = role.roleKey;
    const postStatus = role.publishVacancy ? "published" : "draft";

    const { data: existing } = await admin
      .from("stankings_career_posts")
      .select("id")
      .eq("catalogue_key", catalogueKey)
      .maybeSingle();

    const payload = {
      title: role.title,
      company_area: area,
      company_id: role.companyId,
      department_slug: role.departmentSlug,
      role_key: role.roleKey,
      workspace_key: role.workspaceKey,
      responsibilities: `Deliver excellence as ${role.title}.`,
      required_skills:
        "Professional communication, institutional discipline, digital literacy",
      reporting_manager_title:
        role.hierarchyLevel === "staff"
          ? "Department Manager"
          : role.hierarchyLevel === "department_manager"
            ? "Company Head"
            : "CEO",
      description,
      requirements:
        "Professional communication, institutional discipline, digital literacy",
      location: "Lagos, Nigeria / Hybrid",
      employment_type: "full-time",
      status: postStatus,
      catalogue_key: catalogueKey,
    };

    if (existing) {
      await admin.from("stankings_career_posts").update(payload).eq("id", existing.id);
      posts += 1;
    } else {
      const { error: pErr } = await admin.from("stankings_career_posts").insert({
        ...payload,
        slug: slugify(`${role.companyId}-${role.title}`),
        created_by: createdBy ?? null,
      });
      if (!pErr) posts += 1;
    }
  }

  return { companies, departments, teams, roles, posts };
}
