# CTA AUDIT — CloudSwift (app-main)
**Audit type:** Read-only conversion path analysis  
**Date:** 2026-09-23  
**Auditor:** Claude Code (Sonnet 4.6)  
**Scope:** All CTAs across 45 pages and global components

---

## Step 1 — Full CTA Inventory

| ID | Page / Component | CTA Label | Destination | Position | New Tab? | File:Line |
|---|---|---|---|---|---|---|
| C01 | Navbar (global) | "Contact Us" (nav link) | `/contact` | Top nav (inside hamburger overlay) | No | `components/Navbar.tsx:9` |
| C02 | HeroSection (homepage) | *(No CTA)* | — | Hero | — | `components/HeroSection.tsx` |
| C03 | HowWeHelp (homepage §4) | "talk through your environment ↗" | `/contact` | Mid-page | No | `components/HowWeHelp.tsx:98` |
| C04 | StatsSection / HeroCarousel (homepage §5) — Slide 1 | "Learn more" | `/services` | Mid-page | No | `components/HeroCarousel.tsx:39` |
| C05 | StatsSection / HeroCarousel — Slide 2 | "Learn more" | `/managed-cloud` | Mid-page | No | `components/HeroCarousel.tsx:49` |
| C06 | StatsSection / HeroCarousel — Slide 3 | "Learn more" | `/contact` | Mid-page | No | `components/HeroCarousel.tsx:59` |
| C07 | StatsSection / HeroCarousel — Slide 4 | "Learn more" | `/contact` | Mid-page | No | `components/HeroCarousel.tsx:69` |
| C08 | FeaturedProjects (homepage §6) | "see all solutions ↗" | `/solutions` | Mid-page | No | `components/FeaturedProjects.tsx:84` |
| C09 | Footer (global) | "book a free consultation ↗" | `https://calendly.com/havil-richard-oncloudswift/30min` | Footer | Yes | `components/Footer.tsx:104` |
| C10 | About page | "talk to an architect ↗" | `/contact` | Bottom of page | No | `app/about/page.tsx:104` |
| C11 | Services index (`/services`) | "View service" (each card) | `/services/[id]` | Below fold | No | `components/OfferingCatalog.tsx` |
| C12 | AI Services index (`/ai-services`) | "View service" (each card) | `/ai-services/[id]` | Below fold | No | `components/OfferingCatalog.tsx` |
| C13 | Services/[id] hero (OfferingDetail) | "book a consultation ↗" | `/contact` | Hero (above fold) | No | `components/OfferingDetail.tsx:46` |
| C14 | Managed-cloud/[id] hero (OfferingDetail) | "book a consultation ↗" | `/contact` | Hero (above fold) | No | `components/OfferingDetail.tsx:46` |
| C15 | All 14 AI landing pages — hero | `page.heroCta.label` (varies per page, e.g. "Talk to us about your support workflow") | `/contact` | Hero (above fold) | No | `components/AiServiceDetail.tsx:154` |
| C16 | All 14 AI landing pages — sticky header | "Book Now" | `/contact` | Sticky (appears on scroll) | No | `components/AiServiceDetail.tsx:190` |
| C17 | All 14 AI landing pages — secondary | "check out our blogs →" | `/blog` | Hero (above fold) | No | `components/AiServiceDetail.tsx:157` |
| C18 | All 14 AI landing pages — bottom | `page.heroCta.label` (same as C15) | `/contact` | Bottom of page | No | `components/AiServiceDetail.tsx:546` |
| C19 | Industries/[slug] — hero | "Talk to an expert →" | `/contact` | Hero (above fold) | No | `components/IndustryDetail.tsx:72` |
| C20 | Industries/[slug] — hero secondary | "Explore solutions ↓" | `#solutions` | Hero (above fold) | No | `components/IndustryDetail.tsx:75` |
| C21 | Industries/[slug] — mid-page | "Talk to a [Industry] architect →" | `/contact` | Mid-page | No | `components/IndustryDetail.tsx:150` |
| C22 | Industries/[slug] — bottom | "Start a conversation →" | `/contact` | Bottom section | No | `components/IndustryDetail.tsx:239` |
| C23 | Solutions/[slug] — hero | "visit website ↗" | `project.websiteUrl` = `/solutions/[id]` | Hero (above fold) | No | `app/solutions/[slug]/SolutionDetail.tsx:89` |
| C24 | Blog index — cards | "Read article ↗" | `/blog/[slug]` | Below fold | No | `app/blog/BlogListing.tsx:84` |
| C25 | Blog post — related posts | Related post titles | `/blog/[slug]` | Bottom of post | No | `app/blog/[slug]/page.tsx:100` |
| C26 | Contact page — form | "Send Message →" | `handleSubmit` (stub — sends nothing) | Mid-page | No | `app/contact/ContactPage.tsx:274` |
| C27 | Contact page — sidebar | WhatsApp icon | `https://wa.me/919148706809` | Hero sidebar | Yes | `app/contact/ContactPage.tsx:42` |
| C28 | Contact page — sidebar | LinkedIn icon | LinkedIn URL | Hero sidebar | Yes | `app/contact/ContactPage.tsx:33` |
| C29 | Industries index | Industry card click | In-page accordion reveal | Below fold | No | `components/IndustriesTwoColumnLayout.tsx` |
| C30 | WhyChooseCloudSwift (homepage, About) | "Learn more ↗" | `/blog/...` or `/blog` | Mid-page | No | `components/WhyChooseCloudSwift.tsx:134` |

---

## Step 2 — Destination Check

### Working destinations ✓

| Destination | Type | Status |
|---|---|---|
| `/contact` | Internal | ✓ Route exists |
| `/services` | Internal | ✓ Route exists |
| `/services/[id]` | Internal | ✓ Dynamic route exists |
| `/managed-cloud` | Internal | ✓ Route exists |
| `/managed-cloud/[id]` | Internal | ✓ Dynamic route exists |
| `/ai-services` | Internal | ✓ Route exists |
| `/ai-services/[id]` | Internal | ✓ Dynamic route exists |
| `/solutions` | Internal | ✓ Route exists |
| `/blog` | Internal | ✓ Route exists |
| `/blog/[slug]` | Internal | ✓ Dynamic route exists |
| `https://calendly.com/havil-richard-oncloudswift/30min` | External | ✓ Calendly link set from `company.calendly` |
| `https://wa.me/919148706809` | External | ✓ WhatsApp link |
| `#solutions`, `#overview`, `#impact` | Anchor | ✓ Targets exist in IndustryDetail |

### Broken / problematic destinations ✗

| ID | CTA | Destination | Issue |
|---|---|---|---|
| **C23** | "visit website ↗" on `/solutions/[slug]` | `project.websiteUrl` = `/solutions/[id]` | **SELF-LINK** — the "visit website" CTA on every solutions detail page links back to the same page. Defined in `lib/data.ts:156`: `websiteUrl: \`/solutions/${s.id}\`` |
| **C26** | "Send Message" on contact form | `handleSubmit` → `setSubmitted(true)` only | **STUB** — form submission shows success state but sends zero data anywhere. Already flagged as C1 in UI_AUDIT.md |

---

## Step 3 — Conversion Journey Maps

### Journey 1: User lands on Homepage

```
Homepage
  └── Hero section — ZERO CTAs (critical gap)
        ↓ scroll
  └── PlatformOrbit — no CTA
        ↓ scroll
  └── OfferingsMarquee — no CTA
        ↓ scroll
  └── HowWeHelp §4 — [C03] "talk through your environment ↗" → /contact  ← FIRST CTA
                        ↓ OR open hamburger nav → "Contact Us" → /contact
  └── /contact — form present, but form doesn't submit (stub)
```

| Metric | Value |
|---|---|
| Clicks to reach contact (nav path) | 2 (open menu → "Contact Us") |
| Clicks to reach contact (scroll path) | 1 click after scrolling past 3 sections |
| CTA visible above the fold | ✗ NO — homepage hero has no CTA |
| First CTA seen by scroller | §4 HowWeHelp (below fold) |
| Contact form actually works | ✗ NO — stub |

**Verdict:** The homepage hero is a conversion dead zone. A user who doesn't open the nav menu must scroll through 3 full sections before seeing any action. Every competitor's homepage hero has at least one CTA button.

---

### Journey 2: User lands on an AI service page (`/ai/customer-support-agents`)

```
AI service landing page (e.g. /ai/customer-support-agents)
  └── Hero [C15] "Talk to us about your support workflow ↗" → /contact  ← ABOVE FOLD ✓
  └── OR [C17] "check out our blogs →" → /blog (secondary, same position)
        ↓
  └── /contact — form present, but stub
```

| Metric | Value |
|---|---|
| Clicks to reach contact | 1 |
| CTA visible above the fold | ✓ YES |
| CTA label | Varies per page (`page.heroCta.label`) — not standardized |
| Contact form actually works | ✗ NO — stub |

**Verdict:** AI service pages have the best CTA placement in the site — hero CTA is above fold on all 14 pages. The journey is 1 click. The only failure is the dead-end contact form.

---

### Journey 3: User lands on an industry page (`/industries/healthcare`)

```
Industry detail page (e.g. /industries/healthcare)
  └── Hero [C19] "Talk to an expert →" → /contact  ← ABOVE FOLD ✓
  └── Hero [C20] "Explore solutions ↓" → #solutions (anchor)
  └── Mid-page [C21] "Talk to a Healthcare architect →" → /contact
  └── Bottom [C22] "Start a conversation →" → /contact
        ↓
  └── /contact — form present, but stub
```

| Metric | Value |
|---|---|
| Clicks to reach contact | 1 |
| CTA visible above the fold | ✓ YES |
| Number of CTAs on the page | 3 (hero, mid, bottom) |
| Contact form actually works | ✗ NO — stub |

**Verdict:** Industry pages are well-structured for conversion — 3 CTAs, first visible above the fold, and they use contextual labels ("Talk to a Healthcare architect") which is good practice.

---

### Journey 4: User lands on a blog post (`/blog/from-notebook-to-production-mlops-deployment`)

```
Blog post
  └── Hero: post title, metadata, cover image — ZERO CTA
  └── Body: article content — ZERO CTA (even though post mentions CloudSwift services)
  └── Related posts — links to other blog posts only
  └── Footer [C09] "book a free consultation ↗" → Calendly  ← ONLY conversion point
```

| Metric | Value |
|---|---|
| Clicks to reach contact | 2 (scroll to footer → click Calendly) |
| CTA visible above the fold | ✗ NO |
| In-article CTAs | ✗ ZERO |
| Conversion path from blog post | Footer Calendly only |

**Verdict:** Blog posts are a complete conversion dead end. The MLOps post, for example, links to `/ai-services/ai-model-deployment` internally in the content but there's no CTA for booking or contact anywhere in the page. A reader who finds the blog via search is never shown an offer.

---

## Step 4 — CTA Label Inconsistency

### All unique CTA labels (conversion intent)

| Label | Found at | Destination |
|---|---|---|
| "book a free consultation ↗" | Footer (every page) | Calendly |
| "book a consultation ↗" | Services/[id] hero, Managed-cloud/[id] hero | `/contact` |
| "Book Now" | AI pages sticky header | `/contact` |
| "Talk to us about your support workflow" | AI: Customer Support hero | `/contact` |
| "Talk to us about knowledge base architecture" | AI: Enterprise Knowledge Base hero | `/contact` |
| "Talk to us about your AI readiness" | (other AI pages, varies) | `/contact` |
| "Talk to an expert →" | Industry hero | `/contact` |
| "Talk to a [Industry] architect →" | Industry mid-page | `/contact` |
| "talk to an architect ↗" | About page bottom | `/contact` |
| "talk through your environment ↗" | HowWeHelp | `/contact` |
| "Start a conversation →" | Industry bottom CTA | `/contact` |
| "Get in touch" | Contact page H1 (not a button) | — |
| "Send Message →" | Contact form submit | Stub |
| "Learn more" | HeroCarousel (4 slides) | `/services`, `/managed-cloud`, `/contact` |
| "see all solutions ↗" | FeaturedProjects | `/solutions` |
| "visit website ↗" | Solutions/[slug] | Self-link (broken) |
| "Read article ↗" | Blog listing cards | `/blog/[slug]` |
| "check out our blogs →" | AI pages secondary | `/blog` |

### Inconsistency analysis

The primary booking/contact action has **7+ distinct phrasings**:

| Group | Labels | Issue |
|---|---|---|
| **Book (Calendly)** | "book a free consultation" | 1 label → Calendly. Correctly isolated |
| **Book (internal form)** | "book a consultation", "Book Now" | 2 labels for the same `/contact` destination |
| **Talk** | "talk through your environment", "talk to an architect", "Talk to an expert", "Talk to a [X] architect", "Talk to us about [Y]" | 5 variants — same action, fragmented phrasing |
| **Start** | "Start a conversation" | Another variant of the same action |
| **Undifferentiated** | "Learn more" × 4 slides | Generic label — tells the user nothing about what they're getting |

**"Book Now" vs "book a consultation" vs "book a free consultation":** Three versions of the same action, pointing to two different destinations (Calendly vs. `/contact`). The user has no signal about which one books a call and which one sends a form.

---

## Step 5 — Missing CTAs

| Page type | Above-fold CTA? | CTA label (if present) | Issue |
|---|---|---|---|
| **Homepage hero** | ✗ NO | — | Hero is the highest-converting real estate on the site. No CTA at all — only animated text and social icons |
| **Services index** (`/services`) | ✗ NO | — | `OfferingCatalog` has category jump-links and "View service" cards but no booking/contact CTA above or below fold |
| **Individual service page** (`/services/[id]`) | ✓ YES | "book a consultation ↗" | ✓ Good — present in hero |
| **AI Services index** (`/ai-services`) | ✗ NO | — | Same `OfferingCatalog` layout — "View service" cards only, no contact CTA |
| **Individual AI service page** | ✓ YES | Contextual per `page.heroCta.label` | ✓ Good — above fold |
| **Industries index** (`/industries`) | ✗ NO | — | `IndustriesTwoColumnLayout` shows industry grid with in-page accordion — no contact CTA |
| **Individual industry page** (`/industries/[slug]`) | ✓ YES | "Talk to an expert →" | ✓ Good |
| **Blog index** (`/blog`) | ✗ NO | — | Hero has page title and description only — no booking or contact CTA |
| **Individual blog post** | ✗ NO | — | Zero CTAs in post header, body, or footer — only footer Calendly if scrolled to end |
| **About page** | ✗ NO | — | Hero is company description only. CTA appears at the very bottom of the page, below team grid and WhyChoose carousel |

---

## Top 5 Conversion Fixes — Ranked by Impact

| # | Fix | File(s) | Impact |
|---|---|---|---|
| **CV-01** | **Add a CTA to the homepage hero.** The hero has 0 conversion links — only a cycling word ticker and social icons. Add two CTAs: primary "Book a Free Consultation →" (→ Calendly) and secondary "Explore our services →" (→ `/services`). This is the single highest-traffic location with the highest intent. | `components/HeroSection.tsx` | **HIGHEST — fixes the worst conversion gap on the site** |
| **CV-02** | **Fix the contact form — it currently sends nothing.** `handleSubmit` calls `setSubmitted(true)` with no fetch/API. A working form is required for every CTA that says "contact" or "book". Until this is fixed, every `/contact` CTA on the site is a dead end. | `app/contact/ContactPage.tsx:22` | **HIGH — all 20+ `/contact` CTAs currently go nowhere** |
| **CV-03** | **Add in-body CTAs to blog posts.** Blog posts are the primary SEO entry point (long-tail AI/cloud queries) and currently have zero conversion links in the article body. Add a contextual CTA banner after the conclusion of each post: "Interested in this for your environment? Book a free call →" (Calendly). | `app/blog/[slug]/page.tsx` | **HIGH — blog is a dead conversion zone despite potential SEO traffic** |
| **CV-04** | **Standardize the primary CTA label to one phrase.** Use "Book a Free Consultation" everywhere that books a call (Calendly) and "Get in Touch" everywhere that opens the form. Current 7-label fragmentation confuses users and dilutes brand voice. | `components/Footer.tsx`, `components/AiServiceDetail.tsx`, `components/OfferingDetail.tsx`, `components/IndustryDetail.tsx`, `components/HowWeHelp.tsx`, `app/about/page.tsx` | **MEDIUM — label consistency improves trust and reduces friction** |
| **CV-05** | **Fix the self-link "visit website ↗" on solutions/[slug] pages.** `project.websiteUrl` resolves to `/solutions/[id]` — the current page. Replace with a `/contact` CTA: "Talk to us about [Platform] →". | `lib/data.ts:156`, `app/solutions/[slug]/SolutionDetail.tsx:89` | **MEDIUM — converts a broken CTA into a live conversion point on 6 solution pages** |

---

## Summary

| Finding | Count |
|---|---|
| Pages with CTA above the fold | 20 of ~33 routable pages |
| Pages with **no** CTA above the fold | ~13 (homepage, about, blog listing, blog posts, services index, AI index, industries index, solutions detail, contact page hero) |
| Unique CTA labels for the booking/contact action | 7+ |
| Broken CTAs (self-link or stub form) | 2 (C23 self-link, C26 stub) |
| Conversion-dead pages by journey type | Blog posts (100% dead), Homepage hero, all catalog index pages |

---

*Audit complete. No source files were modified.*
