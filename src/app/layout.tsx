import type { Metadata, Viewport } from "next";
import { Heebo, Assistant } from "next/font/google";
import "./globals.css";

/** Display font — used for the brand mark and headlines. */
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-heebo",
  display: "swap",
});

/** Body font — used for running text and UI. */
const assistant = Assistant({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-assistant",
  display: "swap",
});

const siteUrl = "https://taliabaruchyan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "טליה ברוכיאן — במאית, תסריטאית ומפיקה",
    template: "%s · טליה ברוכיאן",
  },
  description:
    "פורטפוליו של טליה ברוכיאן — במאית, תסריטאית ומפיקה. סרטים עלילתיים ותיעודיים, סדרות וקליפים.",
  keywords: [
    "טליה ברוכיאן",
    "Talia Baruchyan",
    "במאית",
    "תסריטאית",
    "מפיקה",
    "קולנוע",
    "סרטים",
  ],
  authors: [{ name: "טליה ברוכיאן" }],
  openGraph: {
    title: "טליה ברוכיאן — במאית, תסריטאית ומפיקה",
    description:
      "פורטפוליו קולנועי: סרטים עלילתיים ותיעודיים, סדרות וקליפים.",
    url: siteUrl,
    siteName: "טליה ברוכיאן",
    locale: "he_IL",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0e0c" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${assistant.variable}`}>
      <body>
        {/* Skip link for keyboard & screen-reader users */}
        <a
          href="#works"
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-paper"
        >
          דילוג לתוכן
        </a>
        {children}
      </body>
    </html>
  );
}
