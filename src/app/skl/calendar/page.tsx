import { getCurrentEmployee } from "@/lib/workforce/employees";

export default async function Page() {
  const employee = await getCurrentEmployee();
  if (!employee) return null;
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-cream">Calendar</h1>
      <p className="text-cream-muted">Operational calendar for your role — events attach as your team schedules work.</p>
    </div>
  );
}
