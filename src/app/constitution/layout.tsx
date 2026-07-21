import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Constitution",
  description:
    "Volume I — The Group Constitution of Stankings Legacy Ltd. Structure, articles, and member access to the authoritative text.",
  path: "/constitution",
});

export default function ConstitutionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
