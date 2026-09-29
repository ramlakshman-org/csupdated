import type { Metadata } from "next";
import { company } from "@/lib/data";

const ORIGIN = company.website.replace(/\/$/, "");

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": company.legalName,
  "url": ORIGIN,
  "logo": `${ORIGIN}/images/cs/logo.png`,
  "foundingDate": company.founded,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "addressCountry": "IN",
  },
  "sameAs": [
    company.socials.linkedin,
    company.socials.twitter,
    company.socials.instagram,
    company.socials.youtube,
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About CloudSwift — Azure Expert MSP for Indian Enterprises",
  "url": `${ORIGIN}/about`,
  "isPartOf": { "@type": "WebSite", "url": ORIGIN },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": ORIGIN },
    { "@type": "ListItem", "position": 2, "name": "About", "item": `${ORIGIN}/about` },
  ],
};

export const metadata: Metadata = {
  title: { absolute: "About CloudSwift — Azure Expert MSP for Indian Enterprises" },
  description:
    "Microsoft-certified Azure Expert MSP in Bengaluru. Cloud migration, managed services, and AI for Indian enterprises — 99.97% uptime SLA.",
  alternates: { canonical: `${ORIGIN}/about` },
  openGraph: {
    title: "About CloudSwift — Azure Expert MSP for Indian Enterprises",
    description:
      "Microsoft-certified Azure Expert MSP. Cloud migration, managed services, AI, and security for Indian enterprises.",
    url: `${ORIGIN}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
