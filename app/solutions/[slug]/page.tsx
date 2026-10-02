import { notFound } from "next/navigation";
import { projects, company } from "@/lib/data";
import SolutionDetail from "./SolutionDetail";
import type { Metadata } from "next";

const ORIGIN = company.website.replace(/\/$/, "");

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.metaDescription ?? project.description,
    alternates: { canonical: `${ORIGIN}/solutions/${slug}` },
    openGraph: {
      title: project.title,
      description: project.metaDescription ?? project.description,
      url: `${ORIGIN}/solutions/${slug}`,
    },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = projects.filter((p) => p.slug !== slug).slice(0, 2);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": project.title,
    "description": project.description,
    "provider": {
      "@type": "Organization",
      "name": "CloudSwift Technologies Pvt. Ltd.",
      "url": "https://oncloudswift.com"
    },
    "areaServed": { "@type": "Country", "name": "India" },
    "url": `${ORIGIN}/solutions/${slug}`
  };

  return (
    <>
      <SolutionDetail project={project} related={related} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
