import { getCurrentEmployee } from "@/lib/workforce/employees";

export default async function Page() {
  const employee = await getCurrentEmployee();
  if (!employee) return null;
  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-cream">My Queue</h1>
      <p className="text-cream-muted">
        Open workspace features from the sidebar for role-specific queues (tickets, reports, drafts, ops).
      </p>
    </div>
  );
}
