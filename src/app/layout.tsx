import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { BRAND, SITE_URL } from "@/lib/brand";
import { CONTACTS } from "@/lib/shared/config/contacts";

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
      { url: BRAND.favicon.src32, sizes: "32x32", type: "image/webp" },
      { url: BRAND.favicon.src512, sizes: "512x512", type: "image/webp" },
    ],
    apple: [
      { url: BRAND.favicon.src180, sizes: "180x180", type: "image/webp" },
    ],
    shortcut: BRAND.favicon.src32,
  },
  manifest: "/site.webmanifest",
  title: {
    default: `${BRAND.displayName} — Building Institutions That Empower Generations`,
    template: `%s | ${BRAND.displayName}`,
  },
  description:
    `${BRAND.legalName} is one of Africa's emerging institutional groups — building trusted businesses, transformative technologies, respected educational institutions, and lasting social impact.`,
  keywords: [
    BRAND.displayName,
    BRAND.legalName,
    "Yike",
    "BamSignal",
    "BayRight",
    "Stanhan",
    "Stankings Times",
    "Stankings Hotel & Suites",
    "Shodis Industries",
    "Nigeria",
    "institution",
    "trust",
  ],
  openGraph: {
    title: `${BRAND.displayName} — Building Institutions That Empower Generations`,
    description: BRAND.tagline,
    url: SITE_URL,
    siteName: BRAND.displayName,
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
    title: BRAND.displayName,
    description: BRAND.tagline,
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
            name: BRAND.legalName,
            url: SITE_URL,
            logo: `${SITE_URL}${BRAND.logo.src}`,
            email: CONTACTS.hello,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Abia State",
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
