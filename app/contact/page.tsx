import type { Metadata } from "next";
import { faqs } from "@/lib/data";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: { absolute: "Contact CloudSwift — Book a Free Azure Consultation" },
  description:
    "Talk to CloudSwift's Azure Expert MSP team in Bengaluru. Book a free 30-minute cloud consultation for Azure migration, managed cloud, or AI services.",
  alternates: {
    canonical: "https://oncloudswift.com/contact",
  },
  openGraph: {
    title: "Contact CloudSwift — Book a Free Azure Consultation",
    description:
      "Talk to CloudSwift's Azure Expert MSP team in Bengaluru. Book a free 30-minute cloud consultation.",
    url: "https://oncloudswift.com/contact",
  },
};

const ORIGIN = "https://oncloudswift.com";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": ORIGIN },
    { "@type": "ListItem", "position": 2, "name": "Contact", "item": `${ORIGIN}/contact` },
  ],
};

export default function Contact() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  };
  return (
    <>
      <ContactPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
