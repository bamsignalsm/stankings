import { getCurrentEmployee } from "@/lib/workforce/employees";

export default async function Page() {
  const employee = await getCurrentEmployee();
  if (!employee) return null;
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-cream">Performance</h1>
      <p className="text-cream-muted">Performance metrics for your role will appear as you complete queue work.</p>
    </div>
  );
}
