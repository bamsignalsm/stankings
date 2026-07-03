import Link from "next/link";
import { INSTITUTIONAL_FOOTER_GROUPS, SITE } from "@/lib/institutional/public-site";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-gold-subtle bg-ink-light">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-5">
              <BrandLogo variant="footer" />
            </div>
            <p className="mb-4 text-sm leading-relaxed text-cream-muted">
              {SITE.motto}
            </p>
            <p className="text-xs text-cream-muted/70">
              Founded by {SITE.founder}
            </p>
          </div>

          {INSTITUTIONAL_FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
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
          ))}

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-cream-muted">
              <li>
                <Link href="/contact" className="transition-colors hover:text-cream">
                  Contact hub
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@stankings.com"
                  className="transition-colors hover:text-cream"
                >
                  hello@stankings.com
                </a>
              </li>
              <li>Lagos, Nigeria</li>
              <li>
                <Link
                  href={USER_LOGIN_PATH}
                  className="transition-colors hover:text-cream"
                >
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
            <Link href="/legal/privacy" className="hover:text-cream">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-cream">
              Terms
            </Link>
            <Link href="/legal/cookies" className="hover:text-cream">
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
