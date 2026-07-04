import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Security",
  description: "Security practices and responsible disclosure for Stankings Group.",
  path: "/security",
});

export default function SecurityPage() {
  redirect("/trust/security-practices");
}
