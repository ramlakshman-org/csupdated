import type { Metadata } from "next";
import OfferingCatalog from "@/components/OfferingCatalog";
import { catalogAiServices } from "@/lib/catalog";

export const metadata: Metadata = {
  title: { absolute: "Enterprise AI Services — Agents, GenAI & MLOps | CloudSwift" },
  description:
    "18 enterprise AI services from strategy to production — AI agents, generative AI, ChatGPT integrations, SaaS products, and MLOps. CloudSwift, Bengaluru.",
  alternates: { canonical: "https://oncloudswift.com/ai-services" },
  openGraph: {
    title: "Enterprise AI Services — Agents, GenAI & MLOps | CloudSwift",
    description:
      "18 AI services from readiness and agents to generative AI, product builds, and MLOps. CloudSwift Technologies, Bengaluru.",
    url: "https://oncloudswift.com/ai-services",
  },
};

export default function AiServicesPage() {
  return (
    <OfferingCatalog
      title="AI Solutions for Business"
      yearLabel="5 AI practices"
      description="From an AI readiness assessment and sequenced roadmap to ChatGPT Enterprise, document intelligence, AI SaaS products, multi-agent systems, and MLOps infrastructure."
      basePath="/ai-services"
      categories={catalogAiServices}
      ctaLabel="View service"
    />
  );
}
