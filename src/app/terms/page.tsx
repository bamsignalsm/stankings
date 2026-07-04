import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description: "Terms governing use of stankings.com.",
  path: "/terms",
});

export default function TermsPage() {
  redirect("/legal/terms");
}
