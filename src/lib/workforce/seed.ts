/**
 * Idempotent seed of departments, roles, and career posts from launch catalogue.
 */

import { createAdminClient } from "@/lib/supabase/admin";
import { slugify } from "@/lib/careers";
import {
  DEPARTMENT_CATALOGUE,
  LAUNCH_JOB_CATALOGUE,
  WORKFORCE_COMPANY_IDS,
} from "./job-catalogue";
import { WORKSPACE_PERMISSION_TEMPLATES } from "./rbac";

export async function seedWorkforceCatalogue(createdBy?: string): Promise<{
  departments: number;
  roles: number;
  posts: number;
  templates: number;
}> {
  const admin = createAdminClient();
  let departments = 0;
  let roles = 0;
  let posts = 0;
  let templates = 0;

  for (const companyId of WORKFORCE_COMPANY_IDS) {
    const usedDepts = new Set(
      LAUNCH_JOB_CATALOGUE.filter((j) => j.companyId === companyId).map(
        (j) => j.departmentSlug
      )
    );
    for (const slug of usedDepts) {
      const name =
        DEPARTMENT_CATALOGUE.find((d) => d.slug === slug)?.name ?? slug;
      const { error } = await admin.from("workforce_departments").upsert(
        {
          company_id: companyId,
          slug,
          name,
          status: "active",
        },
        { onConflict: "company_id,slug" }
      );
      if (!error) departments += 1;
    }
  }

  for (const job of LAUNCH_JOB_CATALOGUE) {
    const { error } = await admin.from("workforce_roles").upsert(
      {
        company_id: job.companyId,
        department_slug: job.departmentSlug,
        role_key: job.roleKey,
        title: job.title,
        workspace_key: job.workspaceKey,
        hierarchy_level: job.hierarchyLevel,
        status: "active",
      },
      { onConflict: "company_id,role_key" }
    );
    if (!error) roles += 1;

    for (const permission_key of job.permissionKeys ?? []) {
      const { error: tErr } = await admin.from("workforce_role_templates").upsert(
        {
          role_key: job.roleKey,
          workspace_key: job.workspaceKey,
          permission_key,
        },
        { onConflict: "role_key,permission_key" }
      );
      if (!tErr) templates += 1;
    }

    const baseSlug = slugify(`${job.companyId}-${job.title}`);
    const description = [
      job.description,
      "",
      "## Responsibilities",
      job.responsibilities,
      "",
      "## Required skills",
      job.requiredSkills,
      "",
      `Reports to: ${job.reportingManagerTitle}`,
      `Workspace: ${job.workspaceKey}`,
    ].join("\n");

    const { data: existing } = await admin
      .from("stankings_career_posts")
      .select("id")
      .eq("catalogue_key", job.catalogueKey)
      .maybeSingle();

    if (existing) {
      await admin
        .from("stankings_career_posts")
        .update({
          title: job.title,
          company_area: job.companyArea,
          company_id: job.companyId,
          department_slug: job.departmentSlug,
          role_key: job.roleKey,
          workspace_key: job.workspaceKey,
          responsibilities: job.responsibilities,
          required_skills: job.requiredSkills,
          reporting_manager_title: job.reportingManagerTitle,
          description,
          location: job.location,
          employment_type: job.employmentType,
          status: "published",
        })
        .eq("id", existing.id);
      posts += 1;
    } else {
      const { error: pErr } = await admin.from("stankings_career_posts").insert({
        title: job.title,
        slug: baseSlug,
        catalogue_key: job.catalogueKey,
        company_area: job.companyArea,
        company_id: job.companyId,
        department_slug: job.departmentSlug,
        role_key: job.roleKey,
        workspace_key: job.workspaceKey,
        responsibilities: job.responsibilities,
        required_skills: job.requiredSkills,
        reporting_manager_title: job.reportingManagerTitle,
        description,
        requirements: job.requiredSkills,
        location: job.location,
        employment_type: job.employmentType,
        status: "published",
        created_by: createdBy ?? null,
      });
      if (!pErr) posts += 1;
    }
  }

  // Ensure workspace templates for all workspace keys
  for (const [workspace_key, keys] of Object.entries(
    WORKSPACE_PERMISSION_TEMPLATES
  )) {
    for (const permission_key of keys) {
      await admin.from("workforce_role_templates").upsert(
        {
          role_key: `workspace.${workspace_key}`,
          workspace_key,
          permission_key,
        },
        { onConflict: "role_key,permission_key" }
      );
    }
  }

  return { departments, roles, posts, templates };
}
