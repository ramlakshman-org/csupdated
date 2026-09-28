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
    title: item.title,
    description: item.desc,
    alternates: { canonical: `${ORIGIN}/managed-cloud/${id}` },
    openGraph: {
      title: item.title,
      description: item.desc,
      url: `${ORIGIN}/managed-cloud/${id}`,
      images: [{ url: item.image || "/og-default.png", width: 1200, height: 630 }],
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
  return (
    <>
      <OfferingDetail
        item={item}
        category={item.category}
        basePath="/managed-cloud"
        related={related}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
