import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientWidgets from "@/components/ClientWidgets";
import {
  GoogleTagManager,
  GoogleTagManagerConsent,
  GoogleTagManagerNoScript,
} from "@/components/GoogleTagManager";
import CookieConsent from "@/components/CookieConsent";
import { company } from "@/lib/data";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const manrope = Manrope({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.website),
  title: {
    default: `${company.name} — Cloud, AI & Managed IT Solutions Built for Modern Enterprises`,
    template: `%s — ${company.name}`,
  },
  description: company.description,
  keywords: [
    "CloudSwift",
    "Azure Expert MSP",
    "Cloud Migration",
    "Microsoft 365",
    "Dynamics 365",
    "AI Services",
    "Bengaluru",
  ],
  openGraph: {
    siteName: company.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={manrope.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={manrope.className} suppressHydrationWarning>
        <GoogleTagManagerConsent />
        <GoogleTagManagerNoScript />
        <GoogleTagManager />
        <CookieConsent />
        <ClientWidgets />
        <Navbar />
        <main>{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
