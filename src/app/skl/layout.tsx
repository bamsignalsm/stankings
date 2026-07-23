import Link from "next/link";
import { getCurrentEmployee, getEmployeeGrants } from "@/lib/workforce/employees";
import { getWorkspace } from "@/lib/workforce/workspaces";
import { getCompany } from "@/lib/shared/company/registry";

const OFFICE_NAV = [
  { href: "/skl", label: "Home" },
  { href: "/skl/tasks", label: "My Tasks" },
  { href: "/skl/queue", label: "My Queue" },
  { href: "/skl/calendar", label: "Calendar" },
  { href: "/skl/documents", label: "Documents" },
  { href: "/skl/messages", label: "Messages" },
  { href: "/skl/notifications", label: "Notifications" },
  { href: "/skl/knowledge", label: "Knowledge Base" },
  { href: "/skl/performance", label: "Performance" },
  { href: "/skl/team", label: "Team" },
  { href: "/skl/announcements", label: "Announcements" },
];

export default async function SKLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const employee = await getCurrentEmployee();
  if (!employee) {
    return (
      <div className="min-h-screen bg-ink pt-24 text-cream">
        <p className="px-6">No active office assignment.</p>
      </div>
    );
  }

  const company = getCompany(employee.company_id);
  const workspace = getWorkspace(employee.workspace_key);
  const grants = await getEmployeeGrants(employee.id);

  return (
    <div className="min-h-screen bg-ink pt-20">
      <div className="border-b border-gold-subtle bg-ink-light">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold">SKL</p>
            <p className="font-serif text-lg text-cream">
              {company?.name ?? employee.company_id} · {workspace.label}
            </p>
            <p className="text-sm text-cream-muted">
              {employee.full_name ?? employee.email} · {employee.role_key}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/career" className="text-sm text-cream-muted hover:text-gold">
              Careers
            </Link>
            <form action="/auth/signout" method="post">
              <button type="submit" className="text-sm text-cream-muted hover:text-gold">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[220px_1fr]">
        <nav className="space-y-4">
          <div className="space-y-1">
            {OFFICE_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-sm px-3 py-2 text-sm text-cream-muted transition hover:bg-ink-muted hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <p className="mb-2 px-3 text-xs uppercase tracking-widest text-gold">
              Workspace
            </p>
            <div className="space-y-1">
              {workspace.features
                .filter((f) => !f.permission || grants.has(f.permission) || grants.has("supervise.company"))
                .map((f) => (
                  <Link
                    key={f.slug}
                    href={`/skl/workspace/${f.slug}`}
                    className="block rounded-sm px-3 py-2 text-sm text-cream-muted transition hover:bg-ink-muted hover:text-gold"
                  >
                    {f.label}
                  </Link>
                ))}
            </div>
          </div>
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}
