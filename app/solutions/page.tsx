import type { Metadata } from "next";
import SolutionsGrid from "./SolutionsGrid";

export const metadata: Metadata = {
  title: "Cloud Solutions & Business Platforms for Indian Enterprises",
  description:
    "End-to-end cloud solutions for Indian enterprises. Azure migration, AI integration, and managed cloud platforms. CloudSwift Technologies, Bengaluru.",
  alternates: { canonical: "https://oncloudswift.com/solutions" },
  openGraph: {
    title: "Cloud Solutions & Business Platforms for Indian Enterprises",
    description:
      "Azure migration, AI integration, and managed cloud platforms for Indian enterprises. CloudSwift Technologies, Bengaluru.",
    url: "https://oncloudswift.com/solutions",
  },
};

export default function SolutionsPage() {
  return <SolutionsGrid />;
}
