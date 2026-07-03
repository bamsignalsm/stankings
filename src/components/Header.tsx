"use client";

import Link from "next/link";
import { USER_LOGIN_PATH, USER_REGISTER_PATH } from "@/lib/auth-paths";
import { useState } from "react";
import { COMPANIES } from "@/lib/data";
import { HeaderAuth } from "@/components/HeaderAuth";
import { BrandLogo } from "@/components/BrandLogo";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/companies", label: "Companies" },
  { href: "/trust", label: "Trust" },
  { href: "/support", label: "Support" },
  { href: "/careers", label: "Careers" },
  { href: "/library", label: "Library" },
  { href: "/status", label: "Status" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gold-subtle bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <BrandLogo variant="header" priority />

        <nav className="hidden items-center gap-5 xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-cream-muted transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <HeaderAuth />
          <Link
            href="/contact"
            className="hidden rounded-sm border border-gold/40 bg-gold-subtle px-4 py-2 text-sm font-medium text-gold transition hover:border-gold hover:bg-gold/15 lg:inline-block"
          >
            Contact
          </Link>

          <button
            type="button"
            className="flex flex-col gap-1.5 p-2 xl:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-cream transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-cream transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-cream transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gold-subtle bg-ink-light px-6 py-6 xl:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-cream-muted transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="text-cream-muted transition-colors hover:text-gold"
            >
              Contact
            </Link>
            <Link
              href={USER_LOGIN_PATH}
              onClick={() => setOpen(false)}
              className="text-cream-muted transition-colors hover:text-gold"
            >
              Sign in
            </Link>
            <Link
              href={USER_REGISTER_PATH}
              onClick={() => setOpen(false)}
              className="text-gold"
            >
              Member access
            </Link>
          </nav>
          <div className="mt-6 border-t border-gold-subtle pt-6">
            <p className="mb-3 text-xs uppercase tracking-widest text-cream-muted">
              Our Companies
            </p>
            <div className="grid grid-cols-2 gap-2">
              {COMPANIES.slice(0, 6).map((c) => (
                <Link
                  key={c.slug}
                  href={`/companies/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="text-sm text-cream-muted hover:text-gold"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
