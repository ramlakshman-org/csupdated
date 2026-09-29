import type { Metadata } from "next";
import IndustriesTwoColumnLayout from "@/components/IndustriesTwoColumnLayout";

export const metadata: Metadata = {
  title: "Industry Cloud Solutions — Healthcare, BFSI, Manufacturing & More",
  description:
    "Industry-specific cloud, AI, and managed IT services from CloudSwift — healthcare, BFSI, manufacturing, retail, logistics, and more across India.",
  alternates: { canonical: "https://oncloudswift.com/industries" },
  openGraph: {
    title: "Industry Cloud Solutions — Healthcare, BFSI, Manufacturing & More",
    description:
      "Industry-specific cloud and managed IT services for Indian enterprises. CloudSwift Technologies, Bengaluru.",
    url: "https://oncloudswift.com/industries",
  },
};

export default function IndustriesPage() {
  return <IndustriesTwoColumnLayout />;
}



