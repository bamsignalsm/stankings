import { getCurrentEmployee } from "@/lib/workforce/employees";

export default async function Page() {
  const employee = await getCurrentEmployee();
  if (!employee) return null;
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-cream">Documents</h1>
      <p className="text-cream-muted">Company documents for {employee.company_id}.</p>
    </div>
  );
}
