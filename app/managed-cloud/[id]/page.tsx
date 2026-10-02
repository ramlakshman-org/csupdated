import { notFound } from "next/navigation";
import type { Metadata } from "next";
import OfferingDetail from "@/components/OfferingDetail";
import {
  catalogManagedCloud,
  findOffering,
  allManagedItems,
} from "@/lib/catalog";
import { company } from "@/lib/data";

const ORIGIN = company.website.replace(/\/$/, "");

export function generateStaticParams() {
  return allManagedItems.map((i) => ({ id: i.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = findOffering(catalogManagedCloud, id);
  if (!item) return {};
  return {
    title: item.metaTitle ?? item.title,
    description: item.metaDescription ?? item.desc,
    alternates: { canonical: `${ORIGIN}/managed-cloud/${id}` },
    openGraph: {
      title: item.metaTitle ?? item.title,
      description: item.metaDescription ?? item.desc,
      url: `${ORIGIN}/managed-cloud/${id}`,
      ...(item.image ? { images: [{ url: item.image, width: 1200, height: 630 }] } : {}),
    },
  };
}

export default async function ManagedCloudDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = findOffering(catalogManagedCloud, id);
  if (!item) notFound();
  const related = allManagedItems.filter((i) => i.id !== id).slice(0, 3);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": item.title,
    "description": item.desc,
    "provider": {
      "@type": "Organization",
      "name": "CloudSwift Technologies Pvt. Ltd.",
      "url": "https://oncloudswift.com"
    },
    "areaServed": { "@type": "Country", "name": "India" },
    "url": `${ORIGIN}/managed-cloud/${id}`
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What does CloudSwift's ${item.title} service include?`,
        "acceptedAnswer": { "@type": "Answer", "text": item.desc },
      },
      {
        "@type": "Question",
        "name": `What SLA does CloudSwift offer for ${item.title}?`,
        "acceptedAnswer": { "@type": "Answer", "text": "CloudSwift delivers a 99.97% uptime SLA with 15-minute P1 incident response, 24/7/365, for all managed cloud services." },
      },
      {
        "@type": "Question",
        "name": `Which regions does CloudSwift cover for ${item.title}?`,
        "acceptedAnswer": { "@type": "Answer", "text": "CloudSwift serves enterprises across India (Bengaluru and Mumbai), the Gulf (UAE), and North America (US entity in Delaware)." },
      },
    ],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": ORIGIN },
      { "@type": "ListItem", "position": 2, "name": "Managed Cloud", "item": `${ORIGIN}/managed-cloud` },
      { "@type": "ListItem", "position": 3, "name": item.category, "item": `${ORIGIN}/managed-cloud` },
      { "@type": "ListItem", "position": 4, "name": item.title, "item": `${ORIGIN}/managed-cloud/${id}` },
    ],
  };
  return (
    <>
      <OfferingDetail
        item={item}
        category={item.category}
        basePath="/managed-cloud"
        related={related}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}
