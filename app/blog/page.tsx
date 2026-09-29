import type { Metadata } from "next";
import BlogListing from "./BlogListing";
import { getPublishedBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Azure & Cloud Blog | CloudSwift Technologies",
  description:
    "Field notes from CloudSwift — Azure migration playbooks, FinOps quick wins, managed security, and AI rollout guides for Indian enterprises.",
  alternates: { canonical: "https://oncloudswift.com/blog" },
  openGraph: {
    title: "Azure & Cloud Blog | CloudSwift Technologies",
    description:
      "Migration playbooks, FinOps, managed security, and AI guides from CloudSwift's engineering team.",
    url: "https://oncloudswift.com/blog",
  },
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedBlogs();
  return <BlogListing posts={posts} />;
}
