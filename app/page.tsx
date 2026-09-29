import type { Metadata } from "next";
import { faqs } from "@/lib/data";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";

export const metadata: Metadata = {
  title: "CloudSwift — Azure Expert MSP for Indian Startups",
  description:
    "Managed Azure services for Indian startups and growing companies. 15-min response, 99.97% uptime SLA. Azure Expert MSP — Bengaluru.",
  alternates: { canonical: "https://oncloudswift.com" },
  openGraph: {
    title: "CloudSwift — Azure Expert MSP for Indian Startups",
    description:
      "Managed Azure services for Indian startups and growing companies.",
    url: "https://oncloudswift.com",
  },
};
import BadgeStrip from "@/components/BadgeStrip";
import HowWeHelp from "@/components/HowWeHelp";
import PlatformOrbit from "@/components/PlatformOrbit";
import OfferingsMarquee from "@/components/OfferingsMarquee";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

/**
 * Home narrative (template layout preserved):
 * 1. Hero — what we run
 * 2. Platforms — estate map
 * 3. How we help — Migrate / Secure / Operate
 * 4. What we offer — service hubs
 * 5. Proof — stats
 * 6. Featured solutions
 * 7. Social proof + FAQ + footer
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CloudSwift Technologies Pvt. Ltd.",
  "url": "https://oncloudswift.com",
  "logo": "https://oncloudswift.com/images/cs/logo.png",
  "description": "Azure Expert MSP providing managed cloud, AI, and IT services for Indian startups and enterprises.",
  "foundingDate": "2023",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-91487-06809",
    "contactType": "sales",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/cloudswift-technologies-pvt-ltd",
    "https://x.com/CloudSwiftTech",
    "https://www.instagram.com/cloudswift_technologies/",
    "https://www.youtube.com/@CloudSwiftTechnologies"
  ]
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BadgeStrip />
      <TrustBar />
      <PlatformOrbit />
      <OfferingsMarquee />
      <HowWeHelp />
      <ServicesSection />
      <StatsSection />
      <FeaturedProjects />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((f) => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": { "@type": "Answer", "text": f.answer },
            })),
          }),
        }}
      />
    </>
  );
}
