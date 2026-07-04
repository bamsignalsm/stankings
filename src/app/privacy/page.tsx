import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: "Stankings Group institutional privacy policy.",
  path: "/privacy",
});

export default function PrivacyPage() {
  redirect("/legal/privacy");
}
