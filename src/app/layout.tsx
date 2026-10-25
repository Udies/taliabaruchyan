import type { Metadata, Viewport } from "next";
import { Heebo, Assistant, Frank_Ruhl_Libre } from "next/font/google";
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

/** Editorial serif — used for emotive headlines and the pull-quote. */
const frank = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-frank",
  display: "swap",
});

const siteUrl = "https://taliabaruchyan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "וידאותרפיה · טליה ברוכיאן · סדנה קבוצתית",
    template: "%s · טליה ברוכיאן",
  },
  description:
    "סדנת וידאותרפיה בהנחיית טליה ברוכיאן. תהליך יצירה רגשי בווידאו ומרחב להתבוננות, ביטוי וצמיחה. שישה מפגשים בתל אביב, החל מדצמבר.",
  keywords: [
    "וידאותרפיה",
    "סדנת וידאותרפיה",
    "טליה ברוכיאן",
    "Talia Baruchyan",
    "התפתחות אישית",
    "קולנוע",
    "צילום",
    "תל אביב",
  ],
  authors: [{ name: "טליה ברוכיאן" }],
  openGraph: {
    title: "וידאותרפיה · טליה ברוכיאן · סדנה קבוצתית",
    description:
      "תהליך יצירה רגשי בווידאו ומרחב להתבוננות, ביטוי וצמיחה. שישה מפגשים בתל אביב, החל מדצמבר.",
    url: siteUrl,
    siteName: "טליה ברוכיאן · וידאותרפיה",
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
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} ${assistant.variable} ${frank.variable}`}
    >
      <body>
        {/* Skip link for keyboard & screen-reader users */}
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-2 focus:text-sm focus:text-paper"
        >
          דילוג לתוכן
        </a>
        <div className="film-grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
