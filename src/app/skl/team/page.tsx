import { getCurrentEmployee } from "@/lib/workforce/employees";
import { createClient } from "@/lib/supabase/server";

export default async function SKLTeamPage() {
  const employee = await getCurrentEmployee();
  if (!employee) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("workforce_employees")
    .select("id, full_name, email, role_key, department_slug, status")
    .eq("company_id", employee.company_id)
    .order("full_name");

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-cream">Team</h1>
      <ul className="space-y-2">
        {(data ?? []).map((m) => (
          <li key={m.id} className="rounded-sm border border-gold-subtle px-4 py-3 text-cream">
            {m.full_name ?? m.email}{" "}
            <span className="text-xs text-cream-muted">
              · {m.role_key} · {m.department_slug} · {m.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
