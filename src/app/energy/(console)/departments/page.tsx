import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { getCompany } from "@/lib/shared/company/registry";

export default async function EnergyDepartmentsPage() {
  const supabase = await createClient();
  const [{ data: departments }, { data: roles }] = await Promise.all([
    supabase
      .from("workforce_departments")
      .select("*")
      .order("company_id", { ascending: true }),
    supabase
      .from("workforce_roles")
      .select("*")
      .order("company_id", { ascending: true }),
  ]);

  const byCompany = new Map<string, typeof departments>();
  for (const d of departments ?? []) {
    const list = byCompany.get(d.company_id) ?? [];
    list.push(d);
    byCompany.set(d.company_id, list);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-cream">Departments & roles</h1>
        <p className="mt-2 text-cream-muted">
          Org structure seeded from the launch catalogue.{" "}
          <Link href="/energy/employees" className="text-gold">
            Manage employees →
          </Link>
        </p>
      </div>

      {[...byCompany.entries()].map(([companyId, deps]) => (
        <section key={companyId} className="rounded-sm border border-gold-subtle p-5">
          <h2 className="font-serif text-xl text-cream">
            {getCompany(companyId)?.name ?? companyId}
          </h2>
          <p className="mt-1 text-sm text-cream-muted">
            {(deps ?? []).map((d) => d.name).join(" · ")}
          </p>
          <ul className="mt-4 space-y-1 text-sm text-cream">
            {(roles ?? [])
              .filter((r) => r.company_id === companyId)
              .map((r) => (
                <li key={r.id}>
                  {r.title}{" "}
                  <span className="text-xs text-cream-muted">
                    · {r.department_slug} · {r.workspace_key} · {r.hierarchy_level}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
