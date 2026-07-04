import type { Metadata } from "next";
import { BRAND, SITE_URL } from "@/lib/brand";

export function buildPageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${opts.path === "/" ? "" : opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${opts.title} | Stankings Group`,
      description: opts.description,
      url,
      siteName: "Stankings Group",
      locale: "en_NG",
      type: "website",
      images: [
        {
          url: BRAND.ogImage.src,
          width: BRAND.ogImage.width,
          height: BRAND.ogImage.height,
          alt: BRAND.ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} | Stankings Group`,
      description: opts.description,
      images: [BRAND.ogImage.src],
    },
    robots: opts.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
