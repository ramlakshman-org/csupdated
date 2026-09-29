import type { Metadata } from "next";
import OfferingCatalog from "@/components/OfferingCatalog";
import { catalogServices } from "@/lib/catalog";

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

export default function ServicesPage() {
  return (
    <OfferingCatalog
      title="Complete IT Services for Enterprises"
      yearLabel="6 practice areas"
      description="Applications, infrastructure, cybersecurity, digital workplace, consulting and technology transformation."
      basePath="/services"
      categories={catalogServices}
      ctaLabel="View service"
    />
  );
}
