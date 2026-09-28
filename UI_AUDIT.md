# CloudSwift app-main — UI/UX Audit
**Audited:** 2026-09-23  
**Site:** `Cloudswift.app-main` at `localhost:3000`  
**Stack:** Next.js App Router · Framer Motion (framer-motion) · Manrope font · CSS Modules · Tailwind-free  
**Auditor:** Claude Sonnet 4.6 (read-only audit, no files modified)

---

## Severity Scale

| Code | Meaning |
|------|---------|
| C1 | Critical — breaks functionality or exposes legal/brand risk on live site |
| C2 | High — affects conversion, SEO ranking, or creates bad first impressions |
| C3 | Medium — noticeable UX friction or technical debt |
| C4 | Low / polish — minor but worth fixing |

---

## Section 1 — Design System

### Tokens (`app/globals.css`)
| Token | Value | Notes |
|-------|-------|-------|
| `--bg` | `#0b1f44` | Azure navy — dark-only, no light mode |
| `--bg-2` / `--surface` | `#123056` | Secondary surface |
| `--text-primary` | `#ffffff` | |
| `--text-soft` | `rgba(255,255,255,0.7)` | |
| `--text-secondary/muted` | `rgba(255,255,255,0.5)` | |
| `--accent-*` | pink/mint/sky/lilac/cream | Accent palette — used sparingly |
| `--font-sans` | Manrope (Google Fonts) | Single font family — no display/mono variants |
| `--radius-sm/md/full` | 6px / 12px / 999px | |
| `--transition` | `0.3s cubic-bezier(0.4,0,0.2,1)` | |
| `--page-pad` | 30px → 16px → 12px | Responsive padding |
| `--max-w` | 1400px | |

**Findings:**
- No light mode: there is no `@media (prefers-color-scheme: light)` or data-theme toggle. Dark-only is a conscious design choice (fine) but mention-worthy.
- Design system is clean and minimal — single font family, consistent radius scale.
- Comment in globals.css says "NYRO — Global Design System (matched to nyro.framer.website)" — the Framer template branding comment is still present in production CSS.

---

## Section 2 — Page-by-Page Visual

### Homepage (`/`)
- **Hero:** Large kinetic type cycling through "Cloud / Azure / Microsoft / AI" — striking on desktop. On mobile (375px) the single word fills the entire viewport height, and the full heading text "Running for Cloud" is not visible until scrolling — **above-the-fold value prop is lost on mobile** (C2).
- Grid background SVG renders correctly. Gradient mesh blob visible.
- Navbar hides on menu open (slides out of view) — intentional animated behavior.
- Social icons (LinkedIn, X, Instagram) in hero sidebar are single-character text labels ("in", "wa") — not icon images — looks unpolished (C3).
- Stats section, Services grid, Testimonials, FAQ, Footer — all render correctly at desktop.
- "Book a Free Cloud Audit" CTA links to Calendly — real URL, not placeholder.

### About (`/about`)
- `"use client"` at page level (Framer Motion animations) — SEO impact: no server-rendered content for crawlers.
- Hero renders correctly. Company bio and team section load.
- Uses `WhyChooseCloudSwift` component — the 4 case study slides use client logos (`carvia-logo.png`, `courto-logo.png`, `driveon-logo.png`) but one alt text says "Client logo placeholder" (C3).
- Team member images appear to use hashed filenames (e.g. `32xbQ0Al6yHnoa8YJGNyzv7r44.png`) — no descriptive alt-friendly names (C4).

### Services (`/services`)
- Server component — good for SEO.
- 6 category filter chips with counts render correctly.
- Offering cards link to `/services/[id]` — valid dynamic routes.
- "5 AI practices" eyebrow on `/ai-services` is hardcoded — will become stale when service count changes (C4).

### AI Services (`/ai-services`)
- 5 category chips (AI Consulting, Agent Dev, Generative AI, AI Ops, AI Products).
- `yearLabel` shows "5 AI practices" — see above.
- Individual AI service pages (`/ai-services/[id]`) use `JsonLd.tsx` component (uses `<Script strategy="beforeInteractive">`) — correct approach.

### Contact (`/contact`)
- **CRITICAL: Contact form is fake** — `handleSubmit` sets `setSubmitted(true)` and shows a success message but **does not send data anywhere** (no fetch, no server action, no API call). This is a pure UI fake. A visitor who fills this out receives no follow-up. (C1)
- Form fields are correct: name, email, company, interest (select), message.
- Post-submit success message says "A CloudSwift teammate will get back to you soon" — misleading since nothing is sent (C1).
- Phone numbers and addresses are real (`+91 98455 70066`, Bengaluru, Mumbai, Delaware).
- Calendly link is real.
- WhatsApp link (`https://wa.me/919148706809`) is real.

### Blog (`/blog`)
- Server component — good.
- Fetches real posts via `getPublishedBlogs()`.
- Blog card images render; dates shown in `AI · 2026-03-21` format.

### Industries (`/industries`)
- Renders correctly with hero image and "Industries We Serve" heading.
- Industry cards with real photos visible.

### Privacy Policy (`/privacy-policy`)
- **Template email not replaced:** Contact email in Section 7 is `nyro@example.com` — a Framer template placeholder, not a CloudSwift email. (C1)
- Content is generic but acceptable for a basic policy.
- "Last updated: January 1, 2025" — a static date that will become stale (C3).

### Terms of Service (`/terms-of-service`)
- **Template agency name not replaced:** Section 2 says *"Nyro Silvan provides UX/UI design, web design, branding, and Framer development services."* — completely wrong business description. (C1)
- **Template email not replaced:** Section 7 contact email is `nyro@example.com`. (C1)
- Section 3 says *"Nyro Silvan retains the right to showcase completed work in portfolio and promotional materials"* — again wrong entity. (C1)
- This page is publicly accessible and legally bound — this is the most urgent issue on the site.

### Projects (`/projects`)
- Route exists. Server component.

### Solutions (`/solutions`)
- Server component — good.

### Managed Cloud (`/managed-cloud`)
- Server component — good.

### Not Found (`/not-found.tsx`)
- Custom 404 exists — good.

---

## Section 3 — Navigation & Header

**Navbar component:** `"use client"` (Framer Motion animations).

### Structure
- Logo → `/` (smooth scroll to top on same page)
- Menu links: Home / About Us / Industries / Enterprise Services / Managed Cloud Services / AI Services / Platform Solutions / Blog / Contact Us
- Single hamburger → full-screen animated overlay menu

### Findings
- **No direct "Contact" CTA button in the collapsed nav bar** — only accessible via hamburger. Desktop visitors never see a "Book a Call" or "Contact" button without opening the menu (C2). Compare: most B2B sites pin a CTA in the top-right at all times.
- **Admin routes not in nav** (correct) — `/admin/blogs`, `/admin/login` are staff-only.
- No sticky CTA visible on desktop — relies entirely on page-level CTAs (C3).
- Escape key closes menu — good keyboard accessibility.
- `aria-hidden={menuOpen}` on nav when overlay opens — correct.
- No skip-to-content link (C3 — accessibility).
- Logo has correct `aria-label={company.name}`.

---

## Section 4 — Footer

**Footer component:** `"use client"` (Framer Motion + useReducedMotion).

### Structure
- Left col: brand tagline, email, social icons (LinkedIn, X, Instagram), Calendly link
- Right col: CTA headline "your enterprise cloud with confidence"
- Big animated "let's talk" image on scroll
- Bottom bar: copyright + Terms/Privacy links

### Findings
- **Copyright format:** `© CloudSwift Technologies Pvt. Ltd. 2026` — format is correct (no double-year bug).
- **Missing social platforms:** Footer only shows LinkedIn, X, Instagram. The `company.socials` object also has YouTube and GitHub — these are not linked in the footer (C4).
- **No navigation links in footer** — no sitemap-style links to Services, AI Services, Industries, Blog, Contact. Users who scroll to the bottom have no site navigation (C3).
- Footer `mounted` guard for `useReducedMotion` — already fixed in this session (correct).
- Calendly link is real (`calendly.com/havil-richard-oncloudswift/30min`).
- Email (`hello.in@oncloudswift.com`) is real.

---

## Section 5 — Contact Form

| Check | Status |
|-------|--------|
| Fields present | ✓ Name, Email, Company, Interest, Message |
| Required fields marked | ✓ name, email, message |
| Validation on submit | ✓ HTML5 `required` |
| Data actually sent | ✗ **FAKE** — `e.preventDefault(); setSubmitted(true)` only |
| Server action / API call | ✗ None |
| Success message accurate | ✗ Misleading ("teammate will reply") |
| Loading state | ✗ No pending state shown |
| Error handling | ✗ None |

**Verdict: C1 — Form collects no data. Must be wired to a real endpoint (email service / CRM / server action) before going live.**

---

## Section 6 — Performance Signals

### Bundle composition
- **Framer Motion in 23 of 27 components** — very heavy animation library loaded on nearly every page. No dynamic imports for Framer Motion — it's in the initial bundle.
- **animejs:** Not found in app-main (only in frontend-main).
- **Single font family (Manrope):** Loaded via `next/font/google` with `display: swap` — correct.
- **`CustomCursor`:** Loaded globally in layout — adds JS weight on mobile where a custom cursor is invisible/irrelevant. No mobile guard (C3).
- **`AIAssistant`:** Loaded globally in layout — adds LLM client logic (`@/lib/ai`) to every page bundle. Opened by default as closed, but code is always loaded (C3).
- **`GoogleTagManager`:** Uses `<Script>` — but the `GoogleTagManagerNoScript` is rendered in `<body>` (correct noscript position). GTM ID should be verified as real (non-template).
- **Image filenames:** Hashed UUIDs (e.g. `32xbQ0Al6yHnoa8YJGNyzv7r44.png`) — no descriptive filenames. Not a performance issue but hurts debugging and image SEO (C4).
- **No `next/image` `sizes` attribute issues observed** — `lets-talk.png` in Footer correctly has `sizes="(max-width: 1800px) 100vw, 1800px"`.
- **`package.json` name:** `"name": "nyro-portfolio"` — Framer template name never updated (C4, cosmetic).

---

## Section 7 — SEO Signals

### robots.ts
```
rules: { userAgent: "*", allow: "/" }
```
- **Allows all pages including `/admin/*`** — admin routes are accessible to crawlers. Should block `/admin/`. (C2)
- No Disallow for staff portals.

### sitemap.ts
- Covers: `/`, `/about`, `/contact`, `/ai-services`, `/services`, `/managed-cloud`, `/solutions`, `/industries`, `/projects`, `/blog`, all AI service pages, all service/managed-cloud offering pages, all blog posts.
- **`lastModified: now` for all static routes** — same dynamic-date anti-pattern as frontend-main. GSC will see every URL as updated on every crawl, wasting crawl budget and confusing freshness signals. (C2)
- Blog posts use real `updatedAt`/`publishedAt` dates — correct.
- No `/ai-services/[id]` sub-pages in sitemap — the many individual AI service pages (e.g. `/ai-services/enterprise-chatbots`) are not in the sitemap. (C2)

### Metadata
- Root metadata in `layout.tsx` with proper `metadataBase`.
- **`template: "%s — CloudSwift"`** — separator is `—` (em dash). Title pattern is correct.
- 32 pages have `export const metadata` or `generateMetadata` — good coverage.
- **About page:** `"use client"` with no metadata export — inherits root metadata only. No page-specific title or description for `/about`. (C2)
- **Contact page:** Has `metadata` export (confirmed via grep count of 32 pages).
- No Open Graph images configured site-wide — no `og:image` in root metadata or on most pages. (C2)
- No Twitter Card meta tags on most pages.
- No `canonical` tags on non-AI-service pages — only `/ai-services/[id]` has `alternates.canonical`. (C3)

---

## Section 8 — Broken References & Dead Code

### Template placeholders (not replaced)
| File | Issue |
|------|-------|
| `app/terms-of-service/page.tsx` | "Nyro Silvan" business description in Sections 2, 3; `nyro@example.com` in Section 7 |
| `app/privacy-policy/page.tsx` | `nyro@example.com` in Section 7 |
| `app/globals.css` (comment) | "NYRO — Global Design System" comment |
| `package.json` | `"name": "nyro-portfolio"` |

### Dead/stub code
| File | Issue |
|------|-------|
| `app/contact/ContactPage.tsx:23` | `handleSubmit` is a stub — no real submission logic |
| `components/WhyChooseCloudSwift.tsx:127` | `alt="Client logo placeholder"` — missed alt text |

### Routes with potential issues
| Route | Issue |
|-------|-------|
| `/admin` | No noindex — admin dashboard is indexable |
| `/admin/login` | No noindex — login page is indexable |
| `/admin/blogs` | No noindex — editor page is indexable |
| `/projects` | Exists in sitemap and nav — verify content is real |

### No dead route pages found — all `app/*/page.tsx` files appear intentional.

---

## Section 9 — Mobile Responsiveness

**Tested at 375×812 (iPhone SE viewport)**

| Page | Issue |
|------|-------|
| Homepage hero | Word animation "Cloud" fills entire viewport — full headline/CTA not visible above fold (C2) |
| Contact | Renders correctly — hero, calendly link, form all visible |
| Services | Category filter chips may overflow horizontally (not tested but chip count is 6) |
| Navbar | Hamburger menu exists and functional |
| Footer | Not tested visually but structure is single-column — likely fine |

### `useWordStep()` in HeroSection
- At `≤479px`: 72px step — text still very large
- At `≤809px`: 90px step
- At `≤1199px`: 140px step
- Desktop: 168px
- The hero kinetic text is intentionally large — however the value proposition copy ("Is cloud complexity slowing down your business?...") is positioned below the large word and likely hidden above the fold on phones. Users must scroll before seeing what CloudSwift does (C2).

### CustomCursor
- Loaded globally including on mobile/touch devices where `cursor: none` achieves nothing and adds unnecessary JS (C3).
- No `window.matchMedia("(pointer: coarse)")` guard.

### `--page-pad` responsive scaling
- `30px` → `16px (≤810px)` → `12px (≤480px)` — reasonable.

---

## Section 10 — Summary

### Stats

| Metric | Count |
|--------|-------|
| Total page routes | 45 (inc. admin + dynamic) |
| Components using Framer Motion | 23 / 27 |
| Pages with `"use client"` at page level | 3 (about, admin/blogs, admin/login) |
| Template strings still present | 5 (Nyro Silvan ×3, nyro@example.com ×2) |
| Contact form backend | 0 (not wired) |
| Sitemap entries (approx.) | 50+ |

---

### All Findings Ranked

| ID | Severity | Page / File | Issue |
|----|----------|-------------|-------|
| A-01 | **C1** | `/terms-of-service` | Template business name "Nyro Silvan" still in Sections 2, 3 |
| A-02 | **C1** | `/terms-of-service` | Template email `nyro@example.com` in contact section |
| A-03 | **C1** | `/privacy-policy` | Template email `nyro@example.com` in contact section |
| A-04 | **C1** | `/contact` | Contact form is a stub — `handleSubmit` does not send data anywhere |
| A-05 | **C2** | `app/robots.ts` | `/admin/*` routes not blocked from crawlers |
| A-06 | **C2** | `app/sitemap.ts` | `lastModified: now` on all static pages — misleads GSC freshness |
| A-07 | **C2** | `app/sitemap.ts` | AI service sub-pages (`/ai-services/[id]`) missing from sitemap |
| A-08 | **C2** | `app/about/page.tsx` | `"use client"` with no metadata — no page title/description for SEO |
| A-09 | **C2** | `layout.tsx` | No root-level `og:image` — Open Graph missing site-wide |
| A-10 | **C2** | Homepage hero | Above-fold value prop not visible on mobile (375px) without scrolling |
| A-11 | **C2** | Navbar | No persistent CTA button (e.g. "Book a Call") visible on desktop |
| A-12 | **C3** | Footer | No navigation links — users at page bottom have no site navigation |
| A-13 | **C3** | Footer | YouTube and GitHub social links missing (in `company.socials` but not rendered) |
| A-14 | **C3** | `components/CustomCursor.tsx` | Loaded on mobile/touch with no pointer-type guard |
| A-15 | **C3** | `layout.tsx` | `AIAssistant` JS loaded on every page — consider lazy hydration |
| A-16 | **C3** | Hero sidebar | Social links show text ("in", "wa") instead of SVG icons |
| A-17 | **C3** | `app/about/page.tsx` | `"use client"` at page level — no SSR for crawlers |
| A-18 | **C3** | Multiple pages | No canonical tags except `/ai-services/[id]` |
| A-19 | **C3** | `app/globals.css` | Template comment "NYRO — Global Design System" still present |
| A-20 | **C4** | `package.json` | `"name": "nyro-portfolio"` — Framer template name not updated |
| A-21 | **C4** | `components/WhyChooseCloudSwift.tsx:127` | `alt="Client logo placeholder"` — missed alt text |
| A-22 | **C4** | AI Services page | "5 AI practices" eyebrow is hardcoded — will become stale |
| A-23 | **C4** | Public images | All image filenames are hashed UUIDs — poor for debugging / image SEO |

---

### Top 10 Fixes (Priority Order)

1. **[A-01, A-02]** Replace all "Nyro Silvan" and `nyro@example.com` in `terms-of-service/page.tsx` with CloudSwift's name and `hello.in@oncloudswift.com`.
2. **[A-03]** Replace `nyro@example.com` in `privacy-policy/page.tsx` with `hello.in@oncloudswift.com`.
3. **[A-04]** Wire the contact form to a real backend — add a server action (like `frontend-main` already has) or call an email API. The form currently collects nothing.
4. **[A-05]** Block admin routes in `robots.ts`: add `{ userAgent: "*", disallow: ["/admin/"] }`.
5. **[A-06]** Fix sitemap `lastModified` for static pages — use a real deploy date constant, not `new Date()`.
6. **[A-07]** Add individual AI service pages to sitemap (`/ai-services/[id]` dynamic entries via `allAiItems`).
7. **[A-08, A-09]** Add page-level metadata to `about/page.tsx`; add a default `og:image` in root `layout.tsx` metadata.
8. **[A-10]** Reduce hero text size on mobile so the value-prop copy ("Is cloud complexity slowing down your business?") is visible above the fold.
9. **[A-11]** Add a persistent "Book a Call" CTA button to the navbar visible at all times on desktop.
10. **[A-12]** Add a navigation link grid to the footer (Services, AI Services, Industries, Blog, Contact).

---

### Design Language Assessment

The site uses a premium dark-navy aesthetic (NYRO Framer template, well-adapted to CloudSwift). The design system is **coherent and visually strong**: single font (Manrope), tight radius scale, consistent motion language via Framer Motion. The `--text-soft/secondary/muted` opacity hierarchy is applied consistently.

**Strengths:** Kinetic hero type is memorable. Industries page hero image is high quality. The AI services category structure is well-organized.

**Weaknesses:** The template origin is still visible in several places (legal pages, CSS comment, package.json). The heaviest issue is not visual — it's functional: the contact form is broken, and the legal pages describe a different company entirely.

**Verdict:** The site is ~80% production-ready visually but has **2 C1 legal risks** (Terms/Privacy still say "Nyro Silvan") and **1 C1 functional failure** (contact form sends nothing). These must be fixed before going live.

---

*End of audit — 23 findings across 10 sections.*
