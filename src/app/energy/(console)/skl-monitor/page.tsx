import { createClient } from "@/lib/supabase/server";
import { getCompany } from "@/lib/shared/company/registry";
import Link from "next/link";

export default async function EnergySKLMonitorPage({
  searchParams,
}: {
  searchParams: Promise<{ employee?: string }>;
}) {
  const { employee: employeeId } = await searchParams;
  const supabase = await createClient();

  const { data: employee } = employeeId
    ? await supabase.from("workforce_employees").select("*").eq("id", employeeId).maybeSingle()
    : { data: null };

  const companyId = employee?.company_id;

  const [{ count: tickets }, { count: reports }, { count: articles }, { data: audit }] =
    await Promise.all([
      companyId
        ? supabase
            .from("workforce_support_tickets")
            .select("*", { count: "exact", head: true })
            .eq("company_id", companyId)
        : Promise.resolve({ count: 0 }),
      companyId
        ? supabase
            .from("workforce_moderation_reports")
            .select("*", { count: "exact", head: true })
            .eq("company_id", companyId)
        : Promise.resolve({ count: 0 }),
      companyId
        ? supabase
            .from("workforce_editorial_articles")
            .select("*", { count: "exact", head: true })
            .eq("company_id", companyId)
        : Promise.resolve({ count: 0 }),
      supabase
        .from("workforce_audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(30),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-cream">SKL monitoring</h1>
        <p className="mt-2 text-cream-muted">
          Founder oversight of company offices. Workers never see Energy.
        </p>
      </div>

      {employee ? (
        <section className="rounded-sm border border-gold-subtle p-6">
          <p className="text-xs uppercase tracking-widest text-gold">Selected worker</p>
          <h2 className="font-serif text-2xl text-cream">
            {employee.full_name ?? employee.email}
          </h2>
          <p className="text-sm text-cream-muted">
            {getCompany(employee.company_id)?.name ?? employee.company_id} · {employee.role_key} ·{" "}
            {employee.workspace_key} · {employee.status}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-sm bg-ink-muted p-3">
              <p className="text-xs text-cream-muted">Support tickets</p>
              <p className="text-xl text-cream">{tickets ?? 0}</p>
            </div>
            <div className="rounded-sm bg-ink-muted p-3">
              <p className="text-xs text-cream-muted">Moderation reports</p>
              <p className="text-xl text-cream">{reports ?? 0}</p>
            </div>
            <div className="rounded-sm bg-ink-muted p-3">
              <p className="text-xs text-cream-muted">Editorial articles</p>
              <p className="text-xl text-cream">{articles ?? 0}</p>
            </div>
          </div>
        </section>
      ) : (
        <p className="text-cream-muted">
          Select a worker from{" "}
          <Link href="/energy/employees" className="text-gold">
            Employees
          </Link>
          .
        </p>
      )}

      <section>
        <h2 className="mb-4 font-serif text-xl text-cream">Audit log</h2>
        <ul className="space-y-2">
          {(audit ?? []).map((a) => (
            <li key={a.id} className="rounded-sm border border-gold-subtle px-4 py-2 text-sm text-cream">
              <span className="text-gold">{a.action}</span> · {a.entity_type}{" "}
              {a.entity_id ? `· ${a.entity_id}` : ""} ·{" "}
              <span className="text-cream-muted">
                {new Date(a.created_at).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
