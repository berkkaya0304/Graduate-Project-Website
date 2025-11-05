import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Figion — Dried Fig Analysis",
    template: "%s | Figion",
  },
  description: "Quality control and aflatoxin analysis for dried figs",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Figion",
    title: "Figion — Dried Fig Analysis",
    description: "Quality control and aflatoxin analysis for dried figs",
    images: [{ url: "/logo.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Figion — Dried Fig Analysis",
    description: "Quality control and aflatoxin analysis for dried figs",
    images: ["/logo.jpeg"],
  },
  themeColor: "#0f0a1a",
  applicationName: "Figion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        {/* Header removed */}
        <main className="container-page py-8">
          {children}
        </main>
        <footer className="mt-10 border-t border-[var(--border)]">
          <div className="container-page py-6 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">

          </div>
        </footer>
      </body>
    </html>
  );
}
