# CloudSwift — 22 Unblocked Tasks (Ready to Execute)
> Generated: 27 September 2026
> All context gathered. Local dev server running at http://localhost:3000
> Execute in order — some tasks have dependencies noted.

---

## BUCKET 1 — Performance & Core Web Vitals (6 tasks)

### W2-01 · Replace `useWordStep()` with CSS animation
- **File:** `components/HeroSection.tsx`
- **Problem:** `useWordStep()` reads `window.matchMedia` on mount — causes React hydration error #418 (server/client text mismatch). Also breaks LCP.
- **Fix:** Replace the JS word-stepping hook with a CSS `@keyframes` animation that cycles through the words. No `window` access at render time.
- **Impact:** Fixes live hydration error. LCP improvement.

### W2-02 · Fix ticker text overflow at 375px
- **File:** `components/HeroSection.tsx` + `components/HeroSection.module.css`
- **Problem:** Ticker/marquee text clips or overflows on 375px viewport (iPhone SE, base iPhone).
- **Fix:** Add `@media (max-width: 390px)` breakpoint — reduce font size or adjust padding so ticker fits without horizontal scroll.
- **Impact:** Mobile UX — 375px is the most common small-phone width.

### W2-03 · Lazy-load AIAssistant with `next/dynamic()`
- **File:** `app/layout.tsx`
- **Problem:** `AIAssistant` is eagerly imported in root layout — adds to every page's initial JS bundle. It's a client-only widget that doesn't need to block first paint.
- **Fix:** Replace `import AIAssistant from "@/components/AIAssistant"` with `dynamic(() => import("@/components/AIAssistant"), { ssr: false })`.
- **Impact:** Reduces initial JS bundle. Faster TTI.

### W2-04 · Lazy-load CustomCursor with `next/dynamic()`
- **File:** `app/layout.tsx`
- **Problem:** `CustomCursor` is eagerly imported. It self-disables on mobile/touch but still ships JS to those clients.
- **Fix:** Replace import with `dynamic(() => import("@/components/CustomCursor"), { ssr: false })`.
- **Impact:** Removes cursor JS from mobile bundles entirely.

### W2-05 · Hero image PNG → WebP + `priority` prop
- **File:** `components/HeroSection.tsx` (wherever the hero background/image is loaded)
- **Problem:** Hero image is PNG. LCP image needs `priority` prop to preload and should be WebP for smaller size.
- **Fix:** Convert hero PNG to WebP. Add `priority` to the `<Image>` component. Confirm `sizes` prop is set correctly.
- **Impact:** LCP score improvement. Faster paint on mobile.

### W2-06 · Manrope 6 weights → 1 variable font
- **File:** `app/layout.tsx`
- **Problem:** `Manrope` loaded with 6 explicit weights: `["200", "300", "400", "500", "600", "700"]` — 6 separate font file requests.
- **Fix:** Change to `weight: "200 700"` (variable font range). Next.js/Google Fonts serves a single variable font file.
- **Impact:** Reduces 5 extra font requests. Faster font load, no FOUT.

---

## BUCKET 2 — SEO & Metadata (10 tasks)

### W2-07 · Extend `prefers-reduced-motion` to HeroSection
- **File:** `components/HeroSection.tsx`
- **Problem:** HeroSection animations (word cycle, entrance) don't respect `prefers-reduced-motion`. WCAG 2.3.3 and accessibility best practice.
- **Fix:** Add `useReducedMotion()` from Framer Motion. When true, skip or instant-complete animations. Already done for `PlatformOrbit` sweep — apply same pattern here.
- **Impact:** Accessibility compliance. Also improves LCP for users with reduced motion OS setting.

### W2-08 · Canonical tags on all 33 pages
- **Files:** Multiple `generateMetadata` functions across `app/`
- **Problem:** Most dynamic route pages (`solutions/[slug]`, `industries/[slug]`, `services/[id]`, `ai-services/[id]`, `managed-cloud/[id]`) return only `{ title, description }` — no `alternates.canonical`.
- **Fix:** Add `alternates: { canonical: \`https://oncloudswift.com/[route]/\${id}\` }` to each `generateMetadata`.
- **Pages affected:** solutions (6), industries (8), services, ai-services, managed-cloud.

### W2-09 · Add solutions + industries routes to sitemap
- **File:** `app/sitemap.ts`
- **Problem:** Sitemap CORE has only top-level routes. 6 solutions pages and 8 industry pages are not in the sitemap — Google can't discover them.
- **Fix:** Import `catalogSolutions` and `industries` arrays. Generate entries for each slug with `lastModified` set to a real date.
- **Impact:** Indexing of 14 additional pages.

### W2-10 · Fix sitemap `lastModified` to real dates
- **File:** `app/sitemap.ts`
- **Problem:** All sitemap entries use `lastModified: new Date()` — changes every build, signals to Google that every page updated on every deploy. Noise that devalues the signal.
- **Fix:** Hardcode real dates (when content was last meaningfully changed). Use `data/blogs.json` `publishedAt` dates for blog entries.
- **Impact:** GSC crawl budget efficiency. Accurate change signals.

### W2-11 · Remove `/projects` from sitemap
- **File:** `app/sitemap.ts`
- **Problem:** `/projects` is in the sitemap CORE but the Projects section (`app/projects/`) is a Nyro template leftover. The page exists in the repo but is not a CloudSwift product page.
- **Fix:** Remove `/projects` and `/projects/[slug]` from the sitemap entries.
- **Impact:** Prevents Google from indexing irrelevant template pages.

### W2-12 · About page metadata via `app/about/layout.tsx`
- **File:** Create `app/about/layout.tsx`
- **Problem:** `app/about/page.tsx` is `"use client"` — cannot export `metadata`. No title/description/canonical for the About page.
- **Fix:** Create a server component `app/about/layout.tsx` that exports the metadata. The `page.tsx` stays as a client component.
- **Metadata to add:** title, description, canonical `https://oncloudswift.com/about`, OG image.

### W2-13 · Canonical + OG to AI service pages
- **File:** `app/ai-services/[id]/page.tsx`
- **Problem:** `generateMetadata` returns only `{ title, description }` for non-redirect items.
- **Fix:** Add `alternates: { canonical }` and `openGraph: { title, description, url, images }`.

### W2-14 · Canonical + OG to industry pages
- **File:** `app/industries/[slug]/page.tsx`
- **Problem:** `generateMetadata` returns only `{ title, description }`.
- **Fix:** Add `alternates: { canonical }` and `openGraph`.

### W2-15 · Canonical + OG to solutions pages
- **File:** `app/solutions/[slug]/page.tsx`
- **Problem:** `generateMetadata` returns only `{ title, description }`.
- **Fix:** Add `alternates: { canonical }` and `openGraph`.

### W2-16 · Canonical + OG to services + managed-cloud pages
- **Files:** `app/services/[id]/page.tsx`, `app/managed-cloud/[id]/page.tsx`
- **Problem:** Both return only `{ title, description }`.
- **Fix:** Add `alternates: { canonical }` and `openGraph` to both.

---

## BUCKET 3 — Mobile & Accessibility (4 tasks)

### W2-19 · Social icon touch targets 40px → 44px
- **Files:** `components/Footer.module.css`, `components/Navbar.module.css` (check for third location)
- **Problem:** `.socialIcon` container is 36×36px in Footer CSS. WCAG 2.5.5 minimum is 44×44px.
- **Fix:** Change `.socialIcon { width: 36px; height: 36px; }` to `44px × 44px` in all locations. The inner `img` stays 28×28px — only the tap target grows.
- **Locations:** Footer socials, Navbar/header socials, any inline social links.

### W2-20 · Footer `bookCall` minimum tap target
- **File:** `components/Footer.module.css`
- **Problem:** `.bookCall` is an `inline-flex` link with only `padding-bottom: 4px` — renders as ~20px tall. Too small to tap reliably on mobile.
- **Fix:** Add `min-height: 44px; display: inline-flex; align-items: center;` to `.bookCall`.

### W2-21 · Footer 375px breakpoint
- **File:** `components/Footer.module.css`
- **Problem:** Footer has breakpoints at 1024px and 768px but nothing at 375px. At 375px, layout items may overflow or stack poorly.
- **Fix:** Add `@media (max-width: 390px)` — reduce padding, adjust font sizes, ensure `.bottomLinks` wraps cleanly.

### W2-22 · PlatformOrbit map fix at 768px
- **File:** `components/PlatformOrbit.module.css`
- **Problem:** `.map { display: none; }` only kicks in at `max-width: 479.98px`. At 768px (iPad portrait), the orbit map and the index list stack in a single column (`grid-template-columns: 1fr`) but the map still renders — it's too cramped and the node labels overlap.
- **Fix:** Add `@media (max-width: 768px) { .map { display: none; } }` or reduce map `min-height` and node sizes at that breakpoint so it renders usably.

---

## BUCKET 4 — Trust & Content (2 tasks)

### W2-23 · Remove template client logos from WhyChooseCloudSwift
- **File:** `components/WhyChooseCloudSwift.tsx`
- **Problem:** `WHY_CHOOSE_SLIDES` uses `carvia-logo.png`, `courto-logo.png`, `driveon-logo.png` — all Nyro Framer template assets. These are not CloudSwift clients. Shows fake logos to real prospects.
- **Fix:** Remove the `logo` field from all 4 slides (or replace with a generic CloudSwift icon). Update `alt="Client logo placeholder"` to something accurate. Leave the slide content (headings, descriptions, links) — only remove the fake logos.

### W2-24 · Wire `company.trust` array to render on homepage
- **File:** `app/page.tsx` (homepage) + check where trust badges should appear
- **Problem:** `company.trust` exists in `lib/data.ts` (7 trust items: "450+ clients", "200+ migrations", "99.97% uptime", etc.) but is not rendered anywhere on the site — invisible to users and search engines.
- **Fix:** Find the right section on the homepage (likely below hero or in StatsSection) and render the trust items as a strip/badge row.

---

## BUCKET 5 — Compliance (1 task)

### W2-25 · Build cookie consent banner
- **Files:** Create `components/CookieConsent.tsx` + wire into `app/layout.tsx`
- **Problem:** GTM (`GTM-MTQ9HQZR`) and Meta Pixel both fire immediately on page load with no consent. This violates DPDP Act 2023 (non-essential cookies need prior consent).
- **Fix:** Build a bottom-bar consent banner. On "Accept", set a `cs_cookie_consent=1` cookie and unblock GTM/Pixel. On "Decline", block both. Gate `<GoogleTagManager />` and `<MetaPixel />` on consent cookie presence.
- **Note:** Until `NEXT_PUBLIC_META_PIXEL_ID` is set in prod env, Pixel won't fire anyway — but the banner should still be built.

---

## BUCKET 6 — Content (1 task)

### W2-26 · Blog post: "Cloud Migration vs Cloud Modernisation"
- **File:** Create entry in `data/blogs.json` + write MDX/content
- **Due:** Oct 4, 2026
- **Topic:** When to migrate (lift-and-shift) vs when to modernise (re-architect). Target keyword: "cloud migration vs modernisation India". ~1,200 words. Link to CloudSwift migration services page.

---

## Execution Order (recommended)

```
Day 1 (today):   W2-03, W2-04, W2-06          ← quick wins, < 5 min each
Day 1 (today):   W2-11, W2-10, W2-09          ← sitemap fixes, do together
Day 1 (today):   W2-12, W2-08, W2-13–W2-16    ← metadata batch, do together
Day 2:           W2-01, W2-05, W2-07           ← performance, needs testing
Day 2:           W2-19, W2-20, W2-21, W2-22    ← mobile/CSS fixes
Day 2:           W2-23, W2-24                   ← trust/content
Day 3:           W2-25                          ← cookie banner (largest task)
Day 4:           W2-26                          ← blog post (due Oct 4)
```

---

## Manual tasks (NOT in this list — Ram/Shreya must do these)
- **W2-17** — Submit sitemap to Google Search Console (after W2-09 is done)
- **W2-18** — Verify GSC property for oncloudswift.com

---

*Last updated: 27 Sep 2026 | Repo: Cloudswift.app-main | Live: oncloudswift.com*
