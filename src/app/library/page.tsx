import type { Metadata } from "next";
import Link from "next/link";
import { USER_LOGIN_PATH } from "@/lib/auth-paths";
import { InstitutionalCardGrid } from "@/components/institutional/InstitutionalPageShell";
import { PUBLIC_LIBRARY_CATEGORIES } from "@/lib/corporate/public-library";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "The Library",
  description:
    "Corporate document repository and institutional knowledge of Stankings Legacy Ltd — policies, governance, press, and member library access.",
  path: "/library",
});

export default function LibraryPage() {
  return (
    <div className="pt-20">
      <section className="border-b border-gold-subtle py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-4 text-xs font-medium tracking-[0.35em] text-gold uppercase">
            The Stankings Library
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Knowledge preserved. Stewardship entrusted.
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-cream-muted">
            Public corporate resources are listed below. Authoritative constitutional text,
            canons, and frameworks are available to verified members.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-6 font-serif text-2xl text-cream">Document categories</h2>
          <InstitutionalCardGrid
            items={PUBLIC_LIBRARY_CATEGORIES.map((c) => ({
              href: c.href,
              title: c.title,
              summary: c.summary,
            }))}
          />

          <div className="mt-12 rounded-lg border border-gold/30 bg-gold-subtle p-8">
            <h2 className="mb-2 font-serif text-2xl text-cream">Member library</h2>
            <p className="mb-6 text-cream-muted">
              Volume 0 Canons, Volume I Constitution, frameworks, and institutional registers
              require a verified member account.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={USER_LOGIN_PATH}
                className="rounded-sm border border-gold bg-gold px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-light"
              >
                Sign in
              </Link>
              <Link
                href="/members"
                className="rounded-sm border border-gold-subtle px-6 py-3 text-sm text-cream transition hover:border-gold/40"
              >
                About member access
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
