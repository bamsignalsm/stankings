import { getCurrentEmployee } from "@/lib/workforce/employees";
import { createClient } from "@/lib/supabase/server";

export default async function SKLNotificationsPage() {
  const employee = await getCurrentEmployee();
  if (!employee) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("workforce_notifications")
    .select("*")
    .eq("employee_id", employee.id)
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-cream">Notifications</h1>
      <ul className="space-y-2">
        {(data ?? []).map((n) => (
          <li key={n.id} className="rounded-sm border border-gold-subtle px-4 py-3">
            <p className="text-cream">{n.title}</p>
            {n.body ? <p className="text-sm text-cream-muted">{n.body}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
