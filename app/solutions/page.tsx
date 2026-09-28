import type { Metadata } from "next";
import SolutionsGrid from "./SolutionsGrid";

export const metadata: Metadata = {
  title: "Cloud Solutions & Business Platforms for Indian Enterprises",
  description:
    "End-to-end cloud solutions for Indian startups and enterprises. Azure migration, AI integration, and managed cloud platforms. CloudSwift Technologies, Bengaluru.",
};

export default function SolutionsPage() {
  return <SolutionsGrid />;
}
