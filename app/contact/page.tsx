import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contact CloudSwift — Book a Free Azure Consultation",
  description:
    "Talk to CloudSwift's Azure Expert MSP team in Bengaluru. Book a free 30-minute cloud consultation for Azure migration, managed cloud, or AI services. India-wide coverage.",
  alternates: {
    canonical: "https://oncloudswift.com/contact",
  },
  openGraph: {
    title: "Contact CloudSwift — Book a Free Azure Consultation",
    description:
      "Talk to CloudSwift's Azure Expert MSP team in Bengaluru. Book a free 30-minute cloud consultation.",
    url: "https://oncloudswift.com/contact",
  },
};

export default function Contact() {
  return <ContactPage />;
}
