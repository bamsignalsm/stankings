import Link from "next/link";
import { SITE } from "@/lib/institutional/public-site";
import { CONTACTS } from "@/lib/shared/config/contacts";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";
import { BrandLogo } from "@/components/BrandLogo";

/** Required on every page — HQ as central authority */
const AUTHORITY_LINKS = [
  { href: "/support", label: "Support" },
  { href: "/trust", label: "Trust" },
  { href: "/legal", label: "Legal" },
  { href: "/security", label: "Security" },
  { href: "/compliance", label: "Compliance" },
  { href: "/status", label: "Status" },
  { href: "/developer", label: "Developers" },
  { href: "/brand", label: "Brand" },
  { href: "/design-system", label: "Design System" },
  { href: "/downloads", label: "Downloads" },
  { href: "/search", label: "Search" },
  { href: "/press", label: "Press" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
  { href: "/careers", label: "Careers" },
  { href: "/constitution", label: "Constitution" },
] as const;

const INSTITUTION_LINKS = [
  { href: "/about", label: "About" },
  { href: "/companies", label: "Companies" },
  { href: "/leadership", label: "Leadership" },
  { href: "/library", label: "Library" },
  { href: "/partners", label: "Partners" },
  { href: "/investors", label: "Investors" },
  { href: "/foundation", label: "Foundation" },
  { href: "/institute", label: "Institute" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold-subtle bg-ink-light">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-5">
              <BrandLogo variant="footer" />
            </div>
            <p className="mb-4 text-sm leading-relaxed text-cream-muted">{SITE.motto}</p>
            <p className="text-xs text-cream-muted/70">Founded by {SITE.founder}</p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-gold uppercase">
              Authority
            </h3>
            <ul className="space-y-2">
              {AUTHORITY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-muted transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-gold uppercase">
              Institution
            </h3>
            <ul className="space-y-2">
              {INSTITUTION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-muted transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-widest text-gold uppercase">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-cream-muted">
              <li>
                <a href={`mailto:${CONTACTS.hello}`} className="transition-colors hover:text-cream">
                  {CONTACTS.hello}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACTS.security}`}
                  className="transition-colors hover:text-cream"
                >
                  {CONTACTS.security}
                </a>
              </li>
              <li>Lagos, Nigeria</li>
              <li>
                <Link href={USER_LOGIN_PATH} className="transition-colors hover:text-cream">
                  Member sign in
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gold-subtle pt-8 md:flex-row">
          <p className="text-xs text-cream-muted/60">
            © {year} Stankings Group Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-cream-muted/60">
            <Link href="/privacy" className="hover:text-cream">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-cream">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-cream">
              Cookies
            </Link>
            <Link href="/legal/accessibility" className="hover:text-cream">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
