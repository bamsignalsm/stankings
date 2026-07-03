import type { Metadata } from "next";
import Link from "next/link";
import { MemberBanner } from "@/components/MemberBanner";
import { INP_BODY, INP_FRAMEWORK, INP_PURPOSE } from "@/lib/frameworks/innovation-portal";

export const metadata: Metadata = {
  title: "Innovation Portal Framework",
  description: "FRAMEWORK-INP-001 — Venture Studio and constitutional innovation pipeline.",
  robots: { index: false, follow: false },
};

export default function InnovationPortalFrameworkPage() {
  return (
    <div className="pt-20">
      <MemberBanner />
      <section className="border-b border-gold-subtle py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {INP_FRAMEWORK.identifier}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-semibold text-cream md:text-5xl">
            {INP_FRAMEWORK.title}
          </h1>
          <p className="text-cream-muted">{INP_PURPOSE}</p>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-8 whitespace-pre-wrap text-sm text-cream-muted">{INP_BODY}</div>
        <Link href="/library/innovation-portal" className="text-gold hover:text-gold-light">
          Innovation Portal →
        </Link>
      </div>
    </div>
  );
}
