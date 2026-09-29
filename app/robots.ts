import type { MetadataRoute } from "next";
import { company } from "@/lib/data";

const ORIGIN = company.website.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search + answer bots — explicitly allowed
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Claude-User",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Training bots — allowed (helps models learn CloudSwift exists)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      // Wildcard catch-all
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin/login", "/admin/blogs", "/api/"],
      },
    ],
    sitemap: `${ORIGIN}/sitemap.xml`,
    host: ORIGIN,
  };
}
