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
    default: "Bitirme Takımı",
    template: "%s | Bitirme Takımı",
  },
  description: "Ekip bitirme projesi websitesi",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: "Bitirme Takımı",
    title: "Bitirme Takımı",
    description: "Ekip bitirme projesi websitesi",
    images: [{ url: "/logo.svg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitirme Takımı",
    description: "Ekip bitirme projesi websitesi",
    images: ["/logo.svg"],
  },
  themeColor: "#0a0f1a",
  applicationName: "Bitirme Takımı",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <header className="border-b border-[var(--border)] bg-[var(--muted)]/70 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--muted)/0.6]">
          <div className="container-page flex items-center justify-between py-4">
            <Link href="/" className="text-lg font-semibold tracking-wide">
              <span className="text-[var(--foreground)]">Bitirme</span>
              <span className="ml-1 text-[var(--color-primary-600)]">Takımı</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/#hero" className="hover:text-[var(--color-primary-600)] transition-colors">Ana Sayfa</Link>
              <Link href="/#reports" className="hover:text-[var(--color-primary-600)] transition-colors">Raporlar</Link>
              <Link href="/#team" className="hover:text-[var(--color-primary-600)] transition-colors">Takım</Link>
              <Link href="/#project" className="hover:text-[var(--color-primary-600)] transition-colors">Proje</Link>
            </nav>
          </div>
        </header>
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
