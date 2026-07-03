/** Brand assets — WebP sources derived from public/images/logo.png & icon.png */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://stankings.com";

export const BRAND = {
  logo: {
    src: "/images/logo.webp",
    width: 1122,
    height: 288,
    alt: "Stankings Group",
  },
  icon: {
    src: "/images/icon.webp",
    width: 1254,
    height: 1254,
    alt: "Stankings Group",
  },
  ogImage: {
    /** JPEG for WhatsApp / Telegram / Facebook crawlers; WebP as alternate */
    src: "/images/og-image.jpg",
    webp: "/images/og-image.webp",
    width: 1200,
    height: 1200,
    alt: "Stankings Group",
  },
} as const;
