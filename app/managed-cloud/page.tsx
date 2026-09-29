import type { Metadata } from "next";
import OfferingCatalog from "@/components/OfferingCatalog";
import { catalogManagedCloud, allManagedItems } from "@/lib/catalog";

const ORIGIN = "https://oncloudswift.com";

export const metadata: Metadata = {
  title: { absolute: "Managed Cloud Services — Azure, AWS, GCP | CloudSwift" },
  description:
    "25 managed cloud services — Azure, AWS, GCP, Microsoft 365, Oracle, private cloud, security, and data centre. Azure Expert MSP, Bengaluru.",
  alternates: { canonical: "https://oncloudswift.com/managed-cloud" },
  openGraph: {
    title: "Managed Cloud Services — Azure, AWS, GCP | CloudSwift",
    description:
      "25 managed cloud services from CloudSwift — Azure Expert MSP headquartered in Bengaluru.",
    url: "https://oncloudswift.com/managed-cloud",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Managed Cloud Services",
  "url": `${ORIGIN}/managed-cloud`,
  "numberOfItems": allManagedItems.length,
  "itemListElement": allManagedItems.slice(0, 12).map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.title,
    "url": `${ORIGIN}/managed-cloud/${item.id}`,
  })),
};

export default function ManagedCloudPage() {
  return (
    <>
      <OfferingCatalog
        title="Managed Cloud Services"
        yearLabel="6 cloud domains"
        description="We manage your cloud environment from migration and security to monitoring, support and cost optimization."
        basePath="/managed-cloud"
        categories={catalogManagedCloud}
        ctaLabel="View service"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </>
  );
}
