import type { MetadataRoute } from "next";
import { company } from "@/lib/data";
import { AGENT_PAGES } from "@/lib/agentPages";
import { allManagedItems, allServiceItems, catalogSolutions } from "@/lib/catalog";
import { industries } from "@/lib/industries";
import { getPublishedBlogs } from "@/lib/blogs";

const ORIGIN = company.website.replace(/\/$/, "");

// Real dates — update when content meaningfully changes, not on every deploy
const D = {
  home:      new Date("2026-09-27"),
  nav:       new Date("2026-09-01"), // about, contact, blog index, category hubs
  offerings: new Date("2026-08-15"), // individual service / managed-cloud pages
  aiAgents:  new Date("2026-09-01"),
  solutions: new Date("2026-08-15"),
  industries: new Date("2026-08-15"),
};

const CORE = [
  "/",
  "/about",
  "/contact",
  "/ai-services",
  "/services",
  "/managed-cloud",
  "/solutions",
  "/industries",
  "/blog",
];

function offeringUrls(
  items: { id: string; href?: string }[],
  basePath: string
) {
  return items.map((item) => item.href ?? `${basePath}/${item.id}`);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedBlogs();
  const listed = new Set([
    ...CORE,
    ...AGENT_PAGES.map((page) => page.path),
  ]);

  const offeringPaths = [
    ...offeringUrls(allServiceItems, "/services"),
    ...offeringUrls(allManagedItems, "/managed-cloud"),
  ].filter((path) => {
    if (listed.has(path)) return false;
    listed.add(path);
    return true;
  });

  const solutionPaths = catalogSolutions
    .map((s) => `/solutions/${s.id}`)
    .filter((path) => {
      if (listed.has(path)) return false;
      listed.add(path);
      return true;
    });

  const industryPaths = industries
    .map((i) => `/industries/${i.id}`)
    .filter((path) => {
      if (listed.has(path)) return false;
      listed.add(path);
      return true;
    });

  return [
    ...CORE.map((path) => ({
      url: `${ORIGIN}${path}`,
      lastModified: path === "/" ? D.home : D.nav,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
      ...(path === "/ai-services"
        ? { images: AGENT_PAGES.map((page) => `${ORIGIN}${page.image}`) }
        : {}),
    })),
    ...AGENT_PAGES.map((page) => ({
      url: `${ORIGIN}${page.path}`,
      lastModified: D.aiAgents,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: [
        {
          url: `${ORIGIN}${page.image}`,
          title: page.imageAlt,
          caption: page.imageCaption ?? page.imageAlt,
        },
      ],
    })),
    ...offeringPaths.map((path) => ({
      url: `${ORIGIN}${path}`,
      lastModified: D.offerings,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...solutionPaths.map((path) => ({
      url: `${ORIGIN}${path}`,
      lastModified: D.solutions,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...industryPaths.map((path) => ({
      url: `${ORIGIN}${path}`,
      lastModified: D.industries,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...posts.map((post) => ({
      url: `${ORIGIN}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
  ];
}
