import Link from "next/link";
import {
  inviteEmployee,
  seedLaunchCatalogueAction,
  suspendEmployee,
  transferEmployee,
} from "@/app/skl/actions";
import { createClient } from "@/lib/supabase/server";
import { ORG_ROLE_TEMPLATES, getOrgCompanies } from "@/lib/organization/registry";

export default async function EnergyEmployeesPage() {
  const supabase = await createClient();
  const { data: employees } = await supabase
    .from("workforce_employees")
    .select("*")
    .order("created_at", { ascending: false });

  const { count: posts } = await supabase
    .from("stankings_career_posts")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-cream">Employees</h1>
          <p className="mt-2 text-cream-muted">
            Hire from Applications or invite directly. Both paths provision identical SKL accounts.
          </p>
          <p className="mt-1 text-sm text-cream-muted">
            Published vacancies: {posts ?? 0}
          </p>
        </div>
        <form action={seedLaunchCatalogueAction}>
          <button
            type="submit"
            className="rounded-sm border border-gold bg-gold px-4 py-2 text-sm font-semibold text-ink"
          >
            Seed org + Phase 1 jobs
          </button>
        </form>
      </div>

      <section className="rounded-sm border border-gold-subtle p-6">
        <h2 className="mb-4 font-serif text-xl text-cream">Invite worker</h2>
        <form action={inviteEmployee} className="grid gap-3 md:grid-cols-2">
          <input name="full_name" required placeholder="Full name" className="rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
          <input name="email" type="email" required placeholder="Email" className="rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
          <select name="company_id" required className="rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream">
            {getOrgCompanies().map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input name="department_slug" required placeholder="Department slug" defaultValue="operations" className="rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream" />
          <select name="role_key" required className="rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream md:col-span-2">
            {ORG_ROLE_TEMPLATES.map((j) => (
              <option key={j.roleKey} value={j.roleKey}>
                {j.title} ({j.companyId}) · P{j.phase}
              </option>
            ))}
          </select>
          <select name="workspace_key" required className="rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream">
            {[...new Set(ORG_ROLE_TEMPLATES.map((j) => j.workspaceKey))].map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
          <select name="hierarchy_level" className="rounded-sm border border-gold-subtle bg-ink-muted px-3 py-2 text-cream">
            <option value="staff">Staff</option>
            <option value="department_manager">Department Manager</option>
            <option value="company_head">Company Head</option>
          </select>
          <button type="submit" className="rounded-sm border border-gold bg-gold px-4 py-2 text-sm font-semibold text-ink md:col-span-2">
            Send invite & provision SKL
          </button>
        </form>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl text-cream">Directory</h2>
        <div className="space-y-3">
          {(employees ?? []).length === 0 ? (
            <p className="text-cream-muted">No employees yet.</p>
          ) : (
            (employees ?? []).map((e) => (
              <div
                key={e.id}
                className="flex flex-wrap items-start justify-between gap-4 rounded-sm border border-gold-subtle px-4 py-3"
              >
                <div>
                  <p className="text-cream">{e.full_name ?? e.email}</p>
                  <p className="text-xs text-cream-muted">
                    {e.company_id} · {e.role_key} · {e.workspace_key} · {e.status} · via {e.source}
                  </p>
                  <Link href={`/energy/skl-monitor?employee=${e.id}`} className="text-sm text-gold">
                    Monitor office →
                  </Link>
                </div>
                <div className="flex flex-col gap-2">
                  <form action={suspendEmployee}>
                    <input type="hidden" name="employee_id" value={e.id} />
                    <button type="submit" className="text-sm text-danger">
                      Suspend
                    </button>
                  </form>
                  <form action={transferEmployee} className="flex flex-wrap gap-1">
                    <input type="hidden" name="employee_id" value={e.id} />
                    <input type="hidden" name="company_id" value={e.company_id} />
                    <input name="department_slug" defaultValue={e.department_slug} className="w-28 rounded-sm border border-gold-subtle bg-ink-muted px-2 py-1 text-xs text-cream" />
                    <input name="role_key" defaultValue={e.role_key} className="w-40 rounded-sm border border-gold-subtle bg-ink-muted px-2 py-1 text-xs text-cream" />
                    <input name="workspace_key" defaultValue={e.workspace_key} className="w-28 rounded-sm border border-gold-subtle bg-ink-muted px-2 py-1 text-xs text-cream" />
                    <button type="submit" className="text-xs text-gold">
                      Transfer
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
