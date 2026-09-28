# METADATA AUDIT — CloudSwift (app-main)
**Audit type:** Read-only SEO metadata coverage review  
**Date:** 2026-09-23  
**Auditor:** Claude Code (Sonnet 4.6)  
**Scope:** All routable pages in `app/` directory

---

## Step 1 — Full Metadata Coverage Table

| Route | Title | Description | OG Image | Twitter Card | Canonical | JSON-LD | Issues |
|---|---|---|---|---|---|---|---|
| `/` (homepage) | ✗ Inherits root | ✗ Inherits root | ✗ | ✗ | ✗ | ✗ | No metadata export at all |
| `/about` | ✗ Inherits root | ✗ Inherits root | ✗ | ✗ | ✗ | ✗ | `"use client"` blocks metadata export |
| `/contact` | ✓ "Contact" | ✓ | ✗ | ✗ | ✗ | ✗ | No OG, no canonical |
| `/services` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | No OG, no canonical |
| `/services/[id]` (dynamic) | ✓ item.title | ✓ item.desc | ✗ | ✗ | ✗ | ✗ | No OG, no canonical |
| `/managed-cloud` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | No OG, no canonical |
| `/managed-cloud/[id]` (dynamic) | ✓ item.title | ✓ item.desc | ✗ | ✗ | ✗ | ✗ | No OG, no canonical |
| `/ai-services` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | No OG, no canonical |
| `/ai-services/[id]` (dynamic) | ✓ item.title | ✓ item.desc | ✗ | ✗ | Partial* | ✗ | *Only when `item.href` is set |
| `/ai/customer-support-agents` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ Full schema | Best-in-class |
| `/ai/enterprise-knowledge-base-agents` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ Full schema | Best-in-class |
| `/ai/ai-agents-for-sales-automation` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ via ServiceLanding | Best-in-class |
| `/ai/ai-powered-hr-onboarding` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ via ServiceLanding | Best-in-class |
| `/ai/legal-document-processing-agents` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ via ServiceLanding | Best-in-class |
| `/ai/ai-agents-for-supply-chain` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ via ServiceLanding | Best-in-class |
| `/ai/ai-agents-for-finance-operations` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ via ServiceLanding | Best-in-class |
| `/ai/azure-openai-integration` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ via ServiceLanding | Best-in-class |
| `/ai/multi-agent-orchestration` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ via ServiceLanding | Best-in-class |
| `/ai/ai-model-fine-tuning` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ via ServiceLanding | Best-in-class |
| `/ai/ai-security-compliance` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ via ServiceLanding | Best-in-class |
| `/ai/intelligent-document-processing` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ via ServiceLanding | Best-in-class |
| `/ai/mlops-and-model-lifecycle` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ via ServiceLanding | Best-in-class |
| `/ai/computer-vision-solutions` | ✓ absolute | ✓ | ✓ | ✓ | ✓ | ✓ via ServiceLanding | Best-in-class |
| `/solutions` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | No OG, no canonical |
| `/solutions/[slug]` (dynamic) | ✓ project.title | ✓ project.desc | ✗ | ✗ | ✗ | ✗ | No OG, no canonical |
| `/industries` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | No OG, no canonical |
| `/industries/[slug]` (dynamic) | ✓ industry.title | ✓ industry.desc | ✗ | ✗ | ✗ | ✗ | No OG, no canonical |
| `/blog` | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | No OG, no canonical |
| `/blog/[slug]` (dynamic) | ✓ seoTitle\|\|title | ✓ seoDescription\|\|excerpt | ✗ | ✗ | ✗ | ✗ | No OG image, no canonical |
| `/privacy-policy` | ✓ title only | ✗ | ✗ | ✗ | ✗ | ✗ | No description, no OG |
| `/terms-of-service` | ✓ title only | ✗ | ✗ | ✗ | ✗ | ✗ | No description, no OG; wrong company body text |
| `/projects` | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | Redirects to `/solutions`; no metadata |
| `/projects/[slug]` | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | Redirects to `/solutions/[slug]`; no metadata |
| `/admin` | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | Server-side redirect; no metadata needed |
| `/admin/login` | ✗ Inherits root | ✗ Inherits root | ✗ | ✗ | ✗ | ✗ | `"use client"` — crawlable with root title |
| `/admin/blogs` | ✗ Inherits root | ✗ Inherits root | ✗ | ✗ | ✗ | ✗ | `"use client"` — crawlable with root title |

**Summary:** 14 of ~33 routable pages have full SEO metadata. 19 pages are missing OG images. 19 pages are missing canonical tags. 0 non-AI pages have JSON-LD.

---

## Step 2 — Root Metadata Analysis

**File:** [`app/layout.tsx`](app/layout.tsx)

```
metadataBase:    https://oncloudswift.com
Default title:   "CloudSwift — Cloud, AI & Managed IT Solutions Built for Modern Enterprises"
Title template:  "%s — CloudSwift"
Description:     company.description (dynamic from lib/data.ts)
Keywords:        ["CloudSwift", "Azure Expert MSP", "Cloud Migration", ... "Bengaluru"]
OG images:       ✗ MISSING — no openGraph.images in root
Twitter card:    ✗ MISSING — no twitter property in root
```

### Issues

| # | Severity | Finding |
|---|---|---|
| R-01 | HIGH | **No default OG image.** When any page without a page-level OG image is shared (homepage, about, contact, blog posts, all catalog pages), social previews show a blank card or platform fallback. 19 pages affected. |
| R-02 | HIGH | **No Twitter/X card configuration in root.** Same pages render without any Twitter card metadata, suppressing rich previews on X. |
| R-03 | MEDIUM | **Default title is 73 characters** — exceeds the ~60-char SERP display limit. Truncates to "CloudSwift — Cloud, AI & Managed IT Solutions Built for Mode…" in Google. |
| R-04 | LOW | **`keywords` array contains "Bengaluru"** — hardcoded city in root metadata (violates template reuse intent; also low SEO value as Google ignores `<meta name="keywords">`). |

---

## Step 3 — Title & Description Quality

### Title issues

| Route | Current title (resolved) | Chars | Issue |
|---|---|---|---|
| `/` | CloudSwift — Cloud, AI & Managed IT Solutions Built for Modern Enterprises | 73 | Over 60 chars; truncates in SERP |
| `/about` | CloudSwift — Cloud, AI & Managed IT Solutions… (root fallback) | 73 | No page-specific title; inherits root default |
| `/privacy-policy` | Terms of Service — CloudSwift | 29 | Missing description entirely |
| `/terms-of-service` | Terms of Service — CloudSwift | 29 | Body text is for wrong company ("Nyro Silvan") |
| `/blog/[slug]` | `seoTitle \|\| title` — CloudSwift | varies | Falls back to raw post title — may lack brand qualifier |
| `/admin/login` | CloudSwift — Cloud, AI & Managed IT Solutions… (root) | 73 | Admin pages exposed to root title; should be `noindex` |

### Description issues

| Route | Issue |
|---|---|
| `/` | Inherits root `company.description` — no homepage-specific description |
| `/about` | Inherits root — no about-page description |
| `/privacy-policy` | No description at all |
| `/terms-of-service` | No description at all |
| `/admin/login` | Inherits root — admin page should be `noindex,nofollow` |
| `/admin/blogs` | Inherits root — admin page should be `noindex,nofollow` |

### Duplicate metadata risk

The root default title and description are inherited by `/`, `/about`, `/admin/login`, and `/admin/blogs`. Google may deduplicate or demote pages with identical metadata. Specifically:
- `/` and `/about` both render with the same root title and description
- `/admin/login` and `/admin/blogs` also inherit root title, creating 4 pages with duplicate title/description pairs

---

## Step 4 — Structured Data (JSON-LD) Coverage

**File:** [`lib/agentPages.ts`](lib/agentPages.ts) — `agentPageJsonLd()` function  
**Component:** [`components/JsonLd.tsx`](components/JsonLd.tsx)

### What exists

All 14 AI landing pages receive a full `@graph` containing:
- `Organization` + `WebSite` + `WebPage` nodes
- `Service` with `areaServed`, `provider`, `termsOfService`
- `TechArticle` with `keywords`, `author`, `publisher`
- `FAQPage` with `Question`/`Answer` pairs (rich result eligible)
- `HowTo` with ordered `HowToStep` nodes (rich result eligible)
- `BreadcrumbList` (3 levels: Home → AI Services → [Page])
- `ImageObject` with width/height/caption

Two pages (`customer-support-agents`, `enterprise-knowledge-base-agents`) import `<JsonLd>` directly; all others receive it via `ServiceLanding` wrapper. Implementation uses `<Script strategy="beforeInteractive">` — correct approach.

### What is missing

| Page / Route | Schema type needed | Priority |
|---|---|---|
| `/` (homepage) | `Organization`, `WebSite`, `SiteLinksSearchBox` | P1 — Critical |
| `/about` | `Organization`, `AboutPage` | P1 — High |
| `/contact` | `ContactPage`, `LocalBusiness` | P1 — High |
| `/blog/[slug]` | `Article` / `BlogPosting` with `datePublished`, `author`, `image` | P1 — High |
| `/services/[id]` | `Service` with `provider`, `areaServed` | P2 — Medium |
| `/managed-cloud/[id]` | `Service` | P2 — Medium |
| `/solutions/[slug]` | `CaseStudy` or `Article` | P2 — Medium |
| `/industries/[slug]` | `WebPage` with `about`, `audience` | P2 — Medium |
| `/blog` (listing) | `CollectionPage` with `hasPart` | P3 — Low |
| `/services` (listing) | `ItemList` or `CollectionPage` | P3 — Low |

---

## Step 5 — Canonical Tag Audit

### Coverage

- **14 AI landing pages:** canonical set via `agentPageMetadata()` → `alternates: { canonical: url }` ✓
- **`/ai-services/[id]` (dynamic):** canonical set only when `item.href` is defined — partial coverage
- **All other 19+ pages:** no canonical tag

### Risks

| Risk | Pages affected | Impact |
|---|---|---|
| **Self-referential canonicals missing** | All non-AI pages (~19) | Google may choose a different canonical, especially for paginated or filtered content |
| **`/projects` redirects to `/solutions`** without canonical | `/projects`, `/projects/[slug]` | Redirect signals intent, but explicit canonical on target would reinforce |
| **`/about` inherits root title+desc** with no canonical | `/about` | Duplicate of homepage signals; canonical would disambiguate |
| **Blog posts** lack canonical | All `/blog/[slug]` | If posts are syndicated or shared with UTM params, no canonical to consolidate signals |
| **Admin pages crawlable without `noindex`** | `/admin/login`, `/admin/blogs` | No canonical and no `robots: noindex` — Google may index login/admin pages |

---

## Step 6 — Robots & Sitemap Cross-Check

### `app/robots.ts`

```ts
rules: { userAgent: "*", allow: "/" }
// No disallow rules at all
```

**Issues:**
- `/admin/`, `/admin/login`, `/admin/blogs` are fully crawlable
- No `Sitemap:` directive in robots output (Next.js auto-adds it at `/sitemap.xml`, but an explicit pointer is best practice)

### `app/sitemap.ts`

**In sitemap:**
- CORE paths: `/`, `/about`, `/contact`, `/ai-services`, `/services`, `/managed-cloud`, `/solutions`, `/industries`, `/projects`, `/blog`
- All 14 AGENT_PAGES paths
- `services/[id]` items via `offeringUrls(allServiceItems, "/services")`
- `managed-cloud/[id]` items via `offeringUrls(allManagedItems, "/managed-cloud")`
- All published blog posts via `getPublishedBlogs()`

**Not in sitemap:**
- `/solutions/[slug]` — project case study pages are missing
- `/industries/[slug]` — industry landing pages are missing
- `/privacy-policy` and `/terms-of-service` — legal pages absent (low priority but should be excluded via robots, not just absent)

**`lastModified` is always `new Date()` (current time)** for all static and AGENT pages — this means every crawl marks every page as "just updated," which trains crawlers to ignore the signal entirely.

### Cross-check contradictions

| Page | In sitemap | In robots allow | Issue |
|---|---|---|---|
| `/admin/login` | ✗ | ✓ (default allow) | Crawlable but not in sitemap; should be `noindex` + disallowed |
| `/admin/blogs` | ✗ | ✓ (default allow) | Same as above |
| `/solutions/[slug]` | ✗ | ✓ | Indexable case study pages missing from sitemap |
| `/industries/[slug]` | ✗ | ✓ | Indexable industry pages missing from sitemap |
| `/projects` | ✓ (in CORE) | ✓ | Redirect page in sitemap — sends mixed signal to crawlers |

---

## Top 10 Fixes — Ranked by SEO Impact

| # | Fix | File(s) | Impact |
|---|---|---|---|
| **M-01** | **Add default OG image to root layout** — create a 1200×630 fallback `og-default.png` and add `openGraph.images` + `twitter` card to `app/layout.tsx` | `app/layout.tsx` | HIGH — fixes social preview for 19 pages instantly |
| **M-02** | **Add homepage metadata export** — move homepage metadata out of root default into `app/page.tsx` with a page-specific title (~55 chars), description, OG image, canonical, and `WebSite`+`Organization` JSON-LD | `app/page.tsx` | HIGH — homepage is the highest-value SEO target |
| **M-03** | **Add `robots: noindex` to admin pages** — add `export const metadata` with `robots: { index: false, follow: false }` to login page; add disallow in `robots.ts` | `app/admin/login/page.tsx`, `app/robots.ts` | HIGH — prevents admin pages from appearing in SERP |
| **M-04** | **Fix `/about` client component metadata** — extract the non-animated sections to a server wrapper so metadata can be exported, OR move animations to a child client component | `app/about/page.tsx` | HIGH — about page currently inherits homepage title/desc |
| **M-05** | **Add canonical tags to all catalog dynamic routes** — extend `generateMetadata` in services, managed-cloud, solutions, industries, and blog to include `alternates: { canonical }` | `app/services/[id]/page.tsx`, `app/managed-cloud/[id]/page.tsx`, `app/solutions/[slug]/page.tsx`, `app/industries/[slug]/page.tsx`, `app/blog/[slug]/page.tsx` | HIGH — consolidates link equity on the correct URL |
| **M-06** | **Add `BlogPosting` JSON-LD to blog posts** — add `Article`/`BlogPosting` schema with `datePublished`, `dateModified`, `author`, `image`, `headline` to `app/blog/[slug]/page.tsx` | `app/blog/[slug]/page.tsx` | MEDIUM — enables Google News/Discover rich results |
| **M-07** | **Add OG images to all `generateMetadata` routes** — for catalog routes (services, managed-cloud, solutions, industries), add `openGraph.images` using a generic service OG image or a route-specific one | 5 dynamic route files | MEDIUM — fixes blank social previews for all catalog pages |
| **M-08** | **Fix `lastModified` in sitemap** — use actual file mtime or data `updatedAt` fields instead of `new Date()` for static pages; only blog posts currently use real dates | `app/sitemap.ts` | MEDIUM — crawl budget optimization; Google stops trusting stale signal |
| **M-09** | **Add missing routes to sitemap** — add `solutions/[slug]` and `industries/[slug]` pages; remove `/projects` (redirect); add legal pages with `priority: 0.2` | `app/sitemap.ts` | MEDIUM — ensures all indexable pages are discoverable |
| **M-10** | **Add `Organization` + `ContactPage` JSON-LD to contact page** — and `LocalBusiness` if targeting Bengaluru/India local search | `app/contact/page.tsx` | LOW-MEDIUM — supports local pack eligibility |

---

## Appendix — `agentPageMetadata()` Quality Baseline

The 14 AI landing pages represent the metadata gold standard in this codebase. For reference, each receives:

```ts
title:       { absolute: page.metaTitle }           // bypasses "%s — CloudSwift" template
description: page.metaDescription
keywords:    page.queryVariants                      // 15–30 variant search terms
canonical:   `${ORIGIN}${page.path}`
openGraph:   { type, locale: "en_IN", url, title, description, siteName, images }
twitter:     { card: "summary_large_image", title, description, images }
robots:      { index: true, follow: true }
```

JSON-LD `@graph` per page includes 8 node types: `Organization`, `WebSite`, `WebPage`, `Service`, `TechArticle`, `FAQPage`, `HowTo`, `BreadcrumbList`.

All non-AI pages should be brought to this standard progressively, starting with the homepage and blog posts (highest organic traffic potential).

---

*Audit complete. No source files were modified.*
