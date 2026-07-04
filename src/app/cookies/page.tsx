import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Cookie Policy",
  description: "Cookies and similar technologies on stankings.com.",
  path: "/cookies",
});

export default function CookiesPage() {
  redirect("/legal/cookies");
}
