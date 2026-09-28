import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryDetail from "@/components/IndustryDetail";
import { findIndustry, industries } from "@/lib/industries";
import { company } from "@/lib/data";

const ORIGIN = company.website.replace(/\/$/, "");

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const industry = findIndustry((await params).slug);
  if (!industry) return {};
  return {
    title: industry.title,
    description: industry.desc,
    alternates: { canonical: `${ORIGIN}/industries/${industry.id}` },
    openGraph: {
      title: industry.title,
      description: industry.desc,
      url: `${ORIGIN}/industries/${industry.id}`,
      images: [{ url: industry.image || "/og-default.png", width: 1200, height: 630 }],
    },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const industry = findIndustry((await params).slug);
  if (!industry) notFound();
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": industry.title,
    "description": industry.desc,
    "provider": {
      "@type": "Organization",
      "name": "CloudSwift Technologies Pvt. Ltd.",
      "url": "https://oncloudswift.com"
    },
    "areaServed": { "@type": "Country", "name": "India" },
    "audience": {
      "@type": "Audience",
      "audienceType": industry.title
    },
    "url": `${ORIGIN}/industries/${industry.id}`
  };
  return (
    <>
      <IndustryDetail industry={industry} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}