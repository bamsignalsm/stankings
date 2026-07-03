import Link from "next/link";
import { getCurrentMember } from "@/lib/members";

const ENERGY_NAV = [
  { href: "/energy", label: "Overview" },
  { href: "/energy/launch", label: "Launch War Room" },
  { href: "/energy/members", label: "Members" },
  { href: "/energy/careers", label: "Careers" },
  { href: "/energy/applications", label: "Applications" },
  { href: "/energy/library", label: "Library Engine" },
];

export default async function EnergyConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const member = await getCurrentMember();

  return (
    <div className="min-h-screen bg-ink pt-20">
      <div className="border-b border-gold-subtle bg-ink-light">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-gold">
              Energy
            </p>
            <p className="text-sm text-cream-muted">{member?.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-cream-muted hover:text-gold">
              Site
            </Link>
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="text-sm text-cream-muted hover:text-gold"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[220px_1fr]">
        <nav className="space-y-1">
          {ENERGY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-sm px-3 py-2 text-sm text-cream-muted transition hover:bg-ink-muted hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}
