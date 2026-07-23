import { getCurrentEmployee } from "@/lib/workforce/employees";
import { createClient } from "@/lib/supabase/server";

export default async function SKLTasksPage() {
  const employee = await getCurrentEmployee();
  if (!employee) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("workforce_tasks")
    .select("*")
    .eq("company_id", employee.company_id)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-cream">My Tasks</h1>
      <ul className="space-y-2">
        {(data ?? []).map((t) => (
          <li key={t.id} className="rounded-sm border border-gold-subtle px-4 py-3 text-cream">
            {t.title}{" "}
            <span className="text-xs text-cream-muted">· {t.status}</span>
          </li>
        ))}
        {(data ?? []).length === 0 ? (
          <li className="text-cream-muted">No tasks yet — create work from your role queue.</li>
        ) : null}
      </ul>
    </div>
  );
}
