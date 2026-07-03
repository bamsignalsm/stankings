import type { Metadata } from "next";
import Link from "next/link";
import { USER_LOGIN_PATH, USER_REGISTER_PATH } from "@/lib/auth-paths";

export const metadata: Metadata = {
  title: "Member Access",
  description:
    "Access The Stankings Library, Constitution, and institutional documents with a verified member account.",
};

const MEMBER_DOCUMENTS = [
  {
    title: "The Stankings Library",
    description: "Founding volumes, governance frameworks, and institutional knowledge.",
    href: "/library",
  },
  {
    title: "The Group Constitution",
    description: "Volume I — the highest governing document of Stankings Group.",
    href: "/library/constitution",
  },
];

export default function MembersPage() {
  return (
    <div className="pt-20">
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Institutional Documents
          </p>
          <h1 className="mb-6 font-serif text-4xl font-semibold text-cream md:text-5xl">
            Member Access
          </h1>
          <p className="text-lg leading-relaxed text-cream-muted">
            The Stankings Library, Group Constitution, and other founding documents
            are reserved for verified members. Create an account, confirm your
            email, and await super admin approval to read.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 grid gap-6 sm:grid-cols-2">
            {MEMBER_DOCUMENTS.map((doc) => (
              <div
                key={doc.href}
                className="rounded-lg border border-gold-subtle bg-ink-muted p-6"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-gold">🔒</span>
                  <span className="text-[10px] uppercase tracking-widest text-cream-muted">
                    Members only
                  </span>
                </div>
                <h2 className="mb-2 font-serif text-xl font-semibold text-cream">
                  {doc.title}
                </h2>
                <p className="text-sm text-cream-muted">{doc.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-gold/30 bg-gold-subtle p-8 text-center">
            <h2 className="mb-4 font-serif text-2xl font-semibold text-cream">
              Get started
            </h2>
            <p className="mb-8 text-cream-muted">
              Sign up with your email, verify your address, then await super admin
              approval to access institutional documents.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={USER_REGISTER_PATH}
                className="rounded-sm border border-gold bg-gold px-8 py-3 text-sm font-semibold text-ink transition hover:bg-gold-light"
              >
                Create account
              </Link>
              <Link
                href={USER_LOGIN_PATH}
                className="rounded-sm border border-gold-subtle px-8 py-3 text-sm font-medium text-cream transition hover:border-gold/40 hover:text-gold"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
