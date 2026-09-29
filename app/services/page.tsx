import type { Metadata } from "next";
import OfferingCatalog from "@/components/OfferingCatalog";
import { catalogServices, allServiceItems } from "@/lib/catalog";

const ORIGIN = "https://oncloudswift.com";

export const metadata: Metadata = {
  title: "Managed IT Services for Indian Enterprises",
  description:
    "21 managed IT services including Azure cloud, cybersecurity, DevOps, and AI. Trusted by 450+ enterprises across India. CloudSwift Technologies, Bengaluru.",
  alternates: { canonical: "https://oncloudswift.com/services" },
  openGraph: {
    title: "Managed IT Services for Indian Enterprises | CloudSwift",
    description:
      "21 managed IT services — Azure cloud, cybersecurity, DevOps, AI. Trusted by 450+ enterprises. CloudSwift Technologies, Bengaluru.",
    url: "https://oncloudswift.com/services",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Managed IT Services for Indian Enterprises",
  "url": `${ORIGIN}/services`,
  "numberOfItems": allServiceItems.length,
  "itemListElement": allServiceItems.slice(0, 12).map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.title,
    "url": `${ORIGIN}/services/${item.id}`,
  })),
};

export default function ServicesPage() {
  return (
    <>
      <OfferingCatalog
        title="Complete IT Services for Enterprises"
        yearLabel="6 practice areas"
        description="Applications, infrastructure, cybersecurity, digital workplace, consulting and technology transformation."
        basePath="/services"
        categories={catalogServices}
        ctaLabel="View service"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}
