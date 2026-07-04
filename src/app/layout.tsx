import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { BRAND, SITE_URL } from "@/lib/brand";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/images/icon-32.webp", sizes: "32x32", type: "image/webp" },
      { url: "/images/icon-512.webp", sizes: "512x512", type: "image/webp" },
    ],
    apple: [
      { url: "/images/icon-180.webp", sizes: "180x180", type: "image/webp" },
    ],
    shortcut: "/images/icon-32.webp",
  },
  manifest: "/site.webmanifest",
  title: {
    default: "Stankings Group — Building Institutions That Empower Generations",
    template: "%s | Stankings Group",
  },
  description:
    "Stankings Group is one of Africa's emerging institutional groups — building trusted businesses, transformative technologies, respected educational institutions, and lasting social impact.",
  keywords: [
    "Stankings Group",
    "Yike",
    "BamSignal",
    "BayRight",
    "Stanhan",
    "Nigeria",
    "institution",
    "trust",
  ],
  openGraph: {
    title: "Stankings Group — Building Institutions That Empower Generations",
    description:
      "We are not building businesses to enrich one generation. We are building institutions that empower generations.",
    url: SITE_URL,
    siteName: "Stankings Group",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: BRAND.ogImage.src,
        width: BRAND.ogImage.width,
        height: BRAND.ogImage.height,
        alt: BRAND.ogImage.alt,
        type: "image/jpeg",
      },
      {
        url: BRAND.ogImage.webp,
        width: BRAND.ogImage.width,
        height: BRAND.ogImage.height,
        alt: BRAND.ogImage.alt,
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Stankings Group",
    description:
      "We are not building businesses to enrich one generation. We are building institutions that empower generations.",
    images: [BRAND.ogImage.src],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Stankings Group",
            url: SITE_URL,
            logo: `${SITE_URL}${BRAND.logo.src}`,
            email: "hello@stankings.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Lagos",
              addressCountry: "NG",
            },
            sameAs: [
              "https://bamsignal.com",
              "https://yike.ng",
              "https://bayright.com",
            ],
          }}
        />
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
