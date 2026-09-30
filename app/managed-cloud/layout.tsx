import { company } from "@/lib/data";

const ORIGIN = company.website.replace(/\/$/, "");

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": ORIGIN },
    { "@type": "ListItem", "position": 2, "name": "Managed Cloud", "item": `${ORIGIN}/managed-cloud` },
  ],
};

export default function ManagedCloudLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
