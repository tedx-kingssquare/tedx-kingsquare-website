import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://tedxkingssquarewomen.com";

export const viewport: Viewport = {
  themeColor: "#EB0028",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TEDx Kings Square Women | Unscripted 2026",
    template: "%s | TEDx Kings Square Women",
  },
  description:
    "TEDx Kings Square Women – Unscripted 2026. Join us at Civic Center, Onitsha for a transformative conference featuring innovative ideas and inspiring leaders.",
  keywords: [
    "TEDx",
    "Kings Square Women",
    "Unscripted",
    "Onitsha",
    "Women's Conference",
    "Nigeria",
    "Leadership",
    "Innovation",
  ],
  authors: [{ name: "TEDx Kings Square Women", url: BASE_URL }],
  creator: "TEDx Kings Square Women Team",
  publisher: "TEDx Kings Square Women",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: BASE_URL,
    siteName: "TEDx Kings Square Women",
    title: "TEDx Kings Square Women | Unscripted 2026",
    description:
      "A bold call for women to advance and create new possibilities. October 2026 at Civic Center, Onitsha.",
    images: [
      {
        url: "/og-image.png",
        width: 640,
        height: 640,
        alt: "TEDx Kings Square Women – Unscripted 2026",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "TEDx Kings Square Women | Unscripted 2026",
    description:
      "Join us for TEDx Kings Square Women 2026 in Onitsha. Be part of the change.",
    images: ["/og-image.png"],
    site: "@TEDxKingsSqWomen",
  },
  icons: {
    icon: "/logo-black.png",
    shortcut: "/logo-black.png",
    apple: "/logo-black.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
