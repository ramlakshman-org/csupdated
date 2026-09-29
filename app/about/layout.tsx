import type { Metadata } from "next";
import { company } from "@/lib/data";

const ORIGIN = company.website.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "About CloudSwift — Azure Expert MSP for Indian Enterprises",
  description:
    "CloudSwift is a Microsoft-certified Azure Expert MSP headquartered in Bengaluru. We help Indian enterprises migrate, manage, and modernise cloud infrastructure with a 99.97% uptime SLA.",
  alternates: { canonical: `${ORIGIN}/about` },
  openGraph: {
    title: "About CloudSwift — Azure Expert MSP for Indian Enterprises",
    description:
      "Microsoft-certified Azure Expert MSP. Cloud migration, managed services, AI, and security for Indian enterprises.",
    url: `${ORIGIN}/about`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
