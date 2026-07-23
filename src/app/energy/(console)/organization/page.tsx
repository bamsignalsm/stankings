import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { seedLaunchCatalogueAction } from "@/app/skl/actions";
import { RECRUITMENT_STATUS_LABELS } from "@/lib/organization/registry";

export default async function EnergyOrganizationPage() {
  const supabase = await createClient();
  const [{ data: companies }, { data: departments }, { data: roles }, { data: teams }] =
    await Promise.all([
      supabase.from("organization_companies").select("*").order("name"),
      supabase.from("organization_departments").select("*").order("company_id"),
      supabase.from("organization_roles").select("*").order("company_id"),
      supabase.from("organization_teams").select("*").order("company_id"),
    ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-cream">Organization Registry</h1>
          <p className="mt-2 max-w-2xl text-cream-muted">
            Authoritative structure: Enterprise → Company → Department → Team → Role →
            Employee → Workspace. Consumed by RBAC, Careers, and SKL routing.
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

      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Companies" value={companies?.length ?? 0} />
        <Stat label="Departments" value={departments?.length ?? 0} />
        <Stat label="Teams" value={teams?.length ?? 0} />
        <Stat label="Roles" value={roles?.length ?? 0} />
      </div>

      <section className="space-y-4">
        <h2 className="font-serif text-xl text-cream">Companies & recruitment</h2>
        {(companies ?? []).map((c) => (
          <div key={c.company_id} className="rounded-sm border border-gold-subtle p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-cream">{c.name}</p>
              <p className="text-xs text-gold">
                {RECRUITMENT_STATUS_LABELS[
                  c.recruitment_status as keyof typeof RECRUITMENT_STATUS_LABELS
                ] ?? c.recruitment_status}
              </p>
            </div>
            <p className="text-xs text-cream-muted">{c.legal_name}</p>
            <p className="mt-2 text-xs text-cream-muted">
              Depts:{" "}
              {(departments ?? [])
                .filter((d) => d.company_id === c.company_id)
                .map((d) => d.name)
                .join(" · ") || "—"}
            </p>
            <ul className="mt-2 space-y-1 text-sm text-cream">
              {(roles ?? [])
                .filter((r) => r.company_id === c.company_id)
                .map((r) => (
                  <li key={r.id}>
                    {r.title}{" "}
                    <span className="text-xs text-cream-muted">
                      · {r.workspace_key} · phase {r.phase} · {r.hierarchy_level}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      <p className="text-sm">
        <Link href="/energy/employees" className="text-gold">
          Employees →
        </Link>
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-sm border border-gold-subtle p-4">
      <p className="text-xs text-cream-muted">{label}</p>
      <p className="font-serif text-2xl text-cream">{value}</p>
    </div>
  );
}
