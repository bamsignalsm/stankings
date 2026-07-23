import { getCurrentEmployee } from "@/lib/workforce/employees";

export default async function Page() {
  const employee = await getCurrentEmployee();
  if (!employee) return null;
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-cream">Messages</h1>
      <p className="text-cream-muted">Internal messages for your company office.</p>
    </div>
  );
}
