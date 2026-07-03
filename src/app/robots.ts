import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://stankings.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/energy/", "/auth/", "/login", "/signup"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
