# PERFORMANCE AUDIT — CloudSwift (app-main)
**Audit type:** Read-only source analysis — no browser automation  
**Date:** 2026-09-23  
**Auditor:** Claude Code (Sonnet 4.6)  
**Known baseline:** 7.92s LCP on mobile (reported prior to this audit)

---

## Step 1 — Dependency Weight

| Package | Version | Est. bundle (minified+gzip) | Notes |
|---|---|---|---|
| `next` | 16.3.0 | ~90 KB (framework core) | Includes React reconciler, Router, etc. |
| `react` + `react-dom` | 19.2.8 | ~45 KB | Expected; latest stable |
| **`framer-motion`** | ^13.1.0 | **~143 KB** | Largest dependency by far — loaded synchronously on every page |
| `cross-env` | ^10.1.0 | 0 KB | devDependency only |
| `sharp` | ^0.34.2 | 0 KB | devDependency — server-side image processing at build time |
| `typescript`, `eslint` | — | 0 KB | devDependencies only |

**Total JavaScript shipped to browser (est.):** ~278 KB gzip before app code.

**Findings:**
- No charting libraries, no lodash, no moment.js, no other large utility libraries. ✓
- Framer Motion v13 is the single dominant dependency and represents **~51% of third-party bundle weight**.
- No tree-shaking is in effect for framer-motion — the entire library loads because imports come from the package root (`"framer-motion"`) rather than subpaths, and no `LazyMotion`/`domAnimation` splitting is used.
- Zero `dynamic()` calls exist in the entire codebase — **no code-splitting at all**. Every component loads on every page regardless of whether it's used.

---

## Step 2 — Framer Motion Audit

29 files import from `framer-motion`. None are lazy-loaded via `dynamic()`.

| File | What it animates | Above fold? | Lazy loaded? | Could use CSS? |
|---|---|---|---|---|
| `components/HeroSection.tsx` | Parallax scroll, word ticker, entrance blur+y | ✓ YES | ✗ No | Partial — ticker is JS-dependent; entrance could be CSS |
| `components/Navbar.tsx` | Nav slide-in from top, mobile menu `AnimatePresence` | ✓ YES | ✗ No | YES — slide-in is simple CSS |
| `components/GridBackground.tsx` | Scroll-parallax on hero gradient/mesh image | ✓ YES | ✗ No | YES — CSS scroll-driven animation |
| `components/CustomCursor.tsx` | Spring-physics cursor dot (desktop only) | ✓ YES (global layout) | ✗ No | NO — physics requires JS |
| `components/AIAssistant.tsx` | Chat panel open/close via `AnimatePresence` | ✓ YES (global layout, FAB visible) | ✗ No | YES — simple CSS transition |
| `components/HeroCarousel.tsx` | Slide transition on service page hero carousels | Context-dependent | ✗ No | Partial |
| `components/OfferingsMarquee.tsx` | Horizontal scroll marquee | Below fold | ✗ No | YES — CSS `animation: scroll` |
| `components/ServicesSection.tsx` | Card entrance blur+y on viewport enter | Below fold | ✗ No | YES — CSS `@keyframes` + IntersectionObserver |
| `components/PlatformOrbit.tsx` | Orbit/rotation animation | Below fold | ✗ No | Partial |
| `components/HowWeHelp.tsx` | Section entrance animation | Below fold | ✗ No | YES |
| `components/FAQSection.tsx` | Accordion open/close `AnimatePresence` | Below fold | ✗ No | YES — `<details>` or CSS |
| `components/FeaturedProjects.tsx` | Card entrance + hover animation | Below fold | ✗ No | YES — hover is CSS |
| `components/TestimonialsSection.tsx` | Testimonial entrance, scroll-spring | Below fold | ✗ No | YES |
| `components/Footer.tsx` | Footer scale+y scroll-spring entrance | Below fold | ✗ No | YES — CSS scroll-driven |
| `components/SplitWords.tsx` | Word-by-word text entrance | Below fold (mostly) | ✗ No | Partial |
| `components/OfferingCatalog.tsx` | Card list entrance with `useInView` | Below fold | ✗ No | YES |
| `components/OfferingDetail.tsx` | Hero image entrance | Below fold | ✗ No | YES |
| `components/IndustriesCatalog.tsx` | Grid entrance with `useInView` | Below fold | ✗ No | YES |
| `components/IndustriesTwoColumnLayout.tsx` | Tab switch `AnimatePresence` | Below fold | ✗ No | YES — CSS transitions |
| `components/IndustryDetail.tsx` | Section entrance | Below fold | ✗ No | YES |
| `components/AIServiceTimeline.tsx` | Timeline steps entrance | Below fold | ✗ No | YES |
| `components/AWSJourney.tsx` | Journey step animations | Below fold | ✗ No | YES |
| `components/GCPJourney.tsx` | Journey step animations | Below fold | ✗ No | YES |
| `app/about/page.tsx` | Full page entrance with `useInView` | Above fold (page-level) | ✗ No | YES |
| `app/blog/BlogListing.tsx` | Card entrance with `useInView` | Below fold | ✗ No | YES |
| `app/contact/ContactPage.tsx` | Form section entrance with `useInView` | Below fold | ✗ No | YES |
| `app/not-found.tsx` | 404 entrance animation | Page-level | ✗ No | YES |
| `app/projects/ProjectsGrid.tsx` | Project card entrance | Below fold | ✗ No | YES |
| `app/projects/[slug]/ProjectDetail.tsx` | Detail section entrance | Below fold | ✗ No | YES |
| `app/solutions/[slug]/SolutionDetail.tsx` | Detail section entrance | Below fold | ✗ No | YES |

**Key findings:**
- All 29 files ship in the initial bundle — no code splitting.
- 5 are in the **critical path** (HeroSection, Navbar, GridBackground, CustomCursor, AIAssistant) — these fire on every page before any user interaction.
- The remaining 24 animate content that is **below the fold or on secondary pages** — none of these need to be in the initial bundle.
- `LazyMotion` with `domAnimation` feature bundle would reduce framer-motion's contribution by ~30KB with no API changes.
- `CustomCursor` and `AIAssistant` are the clearest targets for `dynamic(() => import(...), { ssr: false })` — they are non-critical global components that load framer-motion in the layout.

---

## Step 3 — Image Audit

### Hero and above-fold images

| File | Component | `next/image`? | `priority`? | Format | Size | Issue |
|---|---|---|---|---|---|---|
| `/images/hero-gradient.png` | `HeroSection.tsx`, `GridBackground.tsx` | ✓ (fill) | ✗ NO | PNG | **2.7 MB** | Missing `priority`; `unoptimized` flag bypasses Next.js optimization; 2.7MB PNG loads uncached |
| `/images/gradient-mesh.png` | `GridBackground.tsx` (mesh mode) | ✓ (fill) | ✗ NO | PNG | **936 KB** | Same — `unoptimized`, no priority |
| Logo (Navbar) | `Navbar.tsx` | ✓ | ✓ YES | PNG | Small | Correctly prioritized ✓ |

### Critical oversize images in `/public/images/cs/services/`

| Filename | Size | Issue |
|---|---|---|
| `ZeroTrustIndustrialCybersecurity.webp` | **6.4 MB** | Extreme — likely unoptimized source export |
| `PolicyholderDataGovernance-Insurance.webp` | **5.0 MB** | Same |
| `PCI-DSS.webp` | **4.9 MB** | Same |
| `StudentIdentity&AccessGovernance- Edu.webp` | **4.9 MB** | Same |
| `pexels-cottonbro-8657363.webp` | **4.9 MB** | Stock photo, unoptimized |
| `zerotrustfinancialgovernance- Bank.webp` | **3.2 MB** | Same |
| `FraudDetection&RiskModeling-Bank.webp` | **3.0 MB** | Same |
| `aboutnew.webp` | **2.7 MB** | Used above fold in WhyChooseCloudSwift carousel |
| `vista.jpg` | **2.9 MB** | JPEG (not webp) |
| `carvia.jpg` / `driveon.jpg` / `rentigo.jpg` | ~1MB each | JPEGs in /public root (client logos) |

**Root-level PNGs** with random-looking names (e.g. `32xbQ0Al6yHnoa8YJGNyzv7r44.png`, `uYP7tx8eUEv8RDKzcDv5St7C6y4.png`) appear to be Framer template exports and are duplicates of `gradient-mesh.png` and `hero-gradient.png` respectively based on identical sizes. They may be unused.

### Image system summary

| Aspect | Status |
|---|---|
| `next/image` used for hero content | ✓ Yes |
| Hero gradient has `priority` | ✗ No — 2.7 MB PNG loads lazily |
| `unoptimized` on hero background | ✗ Yes — bypasses all Next.js optimization |
| Responsive sizes attribute set | ✓ Where `next/image` is used properly |
| Service images have optimized `opt/` variants | ✓ Yes — webp srcset exists for AI service images |
| Above-fold service images use `FluidServiceImage` with `priority` | ✓ When `priority` prop is passed (e.g. `AiServiceDetail.tsx:166`) |
| Large unoptimized webp files in `/cs/services/` | ✗ Many files 3–6 MB; lazy-loaded but still waste bandwidth |

---

## Step 4 — Font Loading Audit

**File:** [`app/layout.tsx`](app/layout.tsx)

```ts
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});
```

| Aspect | Status | Finding |
|---|---|---|
| Loaded via `next/font/google` | ✓ | Auto-preloaded, self-hosted at build — no external font request at runtime |
| `display: "swap"` | ✓ | Text visible during font load (prevents invisible text) |
| Auto-preloaded by Next.js | ✓ | `<link rel="preload" as="font">` injected automatically |
| Weights loaded | **6 weights: 200, 300, 400, 500, 600, 700** | Over-specified — 200 and 300 are ultra-light weights unlikely to appear in body or headings |
| Subsetting | `latin` only | Correct for English/Indian-English content |
| Variable font available | Not used | Manrope is available as a variable font (`Manrope:wght@200..700`) — a single variable font file replaces 6 static weight files |

**Recommendation:** Swap 6 static weights for the variable font (`weight: ["200..700"]` in Next.js syntax, or use the `variable` property with `next/font/variable`). This reduces font file count from 6 to 1 and shaves ~40–60KB from font payload.

---

## Step 5 — Script Loading Audit

| File | Script / ID | Strategy | Issue |
|---|---|---|---|
| `components/GoogleTagManager.tsx` | `id="google-tag-manager"` (GTM inline loader) | **`beforeInteractive`** | ⚠ CRITICAL — `beforeInteractive` blocks hydration; GTM does not need to run before React hydrates. Should be `afterInteractive`. |
| `components/JsonLd.tsx` | `id="json-ld"`, `type="application/ld+json"` | **`beforeInteractive`** | ⚠ WRONG — JSON-LD is read by crawlers, not by the browser render engine. `lazyOnload` or `afterInteractive` is correct. |

### GTM deep-dive

`GoogleTagManager` is imported directly in `app/layout.tsx` and rendered on every page. The GTM snippet is:

```ts
strategy="beforeInteractive"
```

In Next.js, `beforeInteractive` is designed for scripts that must run before the page becomes interactive (e.g., polyfills). It **blocks the main thread** during initial HTML parse. For GTM — an analytics loader — this means the browser cannot begin React hydration until GTM has been fetched, parsed, and executed. On a 3G mobile connection this alone can add 300–800ms to Time to Interactive (TTI) and LCP.

**Fix:** Change to `strategy="afterInteractive"`.

---

## Step 6 — Render-Blocking Global Components

Components mounted in `app/layout.tsx` for every page:

| Component | `"use client"` | Framer Motion | Blocks main thread | Can be lazy-loaded? |
|---|---|---|---|---|
| `GoogleTagManager` | ✓ | ✗ | ✓ YES — `beforeInteractive` Script | N/A — fix strategy instead |
| `GoogleTagManagerNoScript` | ✗ | ✗ | ✗ | N/A |
| `CustomCursor` | ✓ | ✓ YES | ✓ Partially — hydrates framer-motion springs on load; returns `null` on mobile | ✓ YES — `dynamic()` with `ssr: false` |
| `Navbar` | ✓ | ✓ YES | ✓ Partially — `motion.nav` hydrates spring on every page | Partial — could split mobile menu |
| `AIAssistant` | ✓ | ✓ YES | ✓ YES — full `AnimatePresence` + chat panel hydrated globally on every page | ✓ YES — `dynamic()` with `ssr: false` ideal; panel is hidden by default |

### Layout-level framer-motion load chain

On every page load, the following fires before any user interaction:

```
layout.tsx → GoogleTagManager (beforeInteractive, blocks)
           → CustomCursor (framer-motion springs x2)
           → Navbar (framer-motion motion.nav)
           → AIAssistant (AnimatePresence + motion.div, useState)
```

All four are statically imported. Together they force framer-motion (143KB) to hydrate on every single page — including pages that have no animations visible above the fold (e.g., the contact form, the blog listing page).

---

## Step 7 — Code Splitting

**Zero `dynamic()` calls in the application source code.**

The only `dynamic()` calls found were in `node_modules` (Next.js internals, styled-jsx).

This means:
- Every component ships in the initial bundle regardless of the page
- Below-fold heavy components (TestimonialsSection, FeaturedProjects, PlatformOrbit, etc.) all load eagerly
- Framer-motion's 143KB loads even on the Blog page where it's used only for card entrance animations

**What should be dynamically imported:**

| Component | Why lazy-load | Estimated saving |
|---|---|---|
| `AIAssistant` | Never visible until user clicks FAB; loads framer-motion globally | ~20KB first-paint |
| `CustomCursor` | Only visible on desktop pointer devices; mobile users always get `null` return but still pay parse cost | ~5KB |
| `TestimonialsSection` | Below fold; `AnimatePresence` + scroll spring | ~8KB |
| `FeaturedProjects` | Below fold; multiple motion elements | ~8KB |
| `PlatformOrbit` | Below fold on homepage | ~5KB |
| `Footer` | Bottom of page; scroll-spring | ~8KB |

---

## Step 8 — Root Cause Analysis: 7.92s Mobile LCP

### What is the LCP element?

The hero section (`HeroSection.tsx`) contains:
- An `<h1>` with animated text: **"Running for Cloud/Azure/Microsoft/AI"**
- A decorative `hero-gradient.png` (2.7MB PNG, `unoptimized`, no `priority`)
- A CSS grid `aria-hidden` div

The LCP element is almost certainly the **H1 heading text** ("Running"), as it is the largest visible text block. The image is decorative and may not register as LCP depending on paint order. However, the heading itself is wrapped in a `motion.span` that animates from `y: "115%"` to `y: "0%"` — meaning it is **clipped off-screen on initial paint** and only becomes visible after framer-motion hydrates and fires the entrance animation.

This is the core LCP problem: **the h1 is intentionally off-screen at SSR/first-paint** and only enters the viewport after JS executes.

### Most likely causes of 7.92s LCP (ranked)

| # | Cause | Est. LCP contribution |
|---|---|---|
| **1** | H1 text hidden via CSS clip + framer entrance animation — not painted until JS hydrates and fires | **Primary driver (~3–5s on mobile 3G)** |
| **2** | GTM `beforeInteractive` blocks hydration start | **+500–900ms** |
| **3** | framer-motion 143KB loaded synchronously — parse+execute before hydration | **+500–800ms** |
| **4** | `hero-gradient.png` (2.7MB, unoptimized PNG) requested without priority, competing for bandwidth | **+200–500ms bandwidth contention** |
| **5** | 6 Manrope font weight files (instead of 1 variable font) — more TCP connections | **+100–200ms** |
| **6** | `CustomCursor` + `AIAssistant` hydrating framer-motion springs before main content | **+100–300ms** |

### Single highest-impact change

**Remove the entrance animation clip from the H1.** The heading "Running for Cloud" should be visible on server render (y: 0, opacity: 1) and animate in via CSS only. Currently, `initial={{ y: "115%" }}` on the `motion.span` wrapping "Running" means the most important text on the page is invisible until JS fires. This alone likely accounts for 3+ seconds of the 7.92s LCP on mobile.

**Fix:**
```tsx
// HeroSection.tsx — instead of:
initial={{ y: "115%" }}
animate={{ y: "0%" }}

// Make the initial state server-visible, then enhance:
// Option A: use CSS animation only (no framer dependency)
// Option B: use `useEffect` to add the animation class after mount
// Option C: animate opacity+blur only, never y-clip (so text is visible immediately)
```

---

## Top 5 Performance Wins — Ranked by LCP Impact

| # | Fix | File(s) | Est. LCP improvement | Effort |
|---|---|---|---|---|
| **P-01** | **Make H1 visible at server render — remove y-clip entrance animation from the LCP element** ("Running for Cloud"). Text can still animate via opacity/blur after mount. | `components/HeroSection.tsx` | **-2,000 to -3,500ms** | Low (2 lines) |
| **P-02** | **Fix GTM script strategy: `beforeInteractive` → `afterInteractive`**. GTM is an analytics tag, not a render-critical script. | `components/GoogleTagManager.tsx` | **-500 to -900ms** | Trivial (1 word) |
| **P-03** | **Lazy-load `AIAssistant` and `CustomCursor` with `dynamic(() => import(...), { ssr: false })`** in `app/layout.tsx`. This delays framer-motion hydration for these global widgets until after first paint. | `app/layout.tsx` | **-300 to -600ms** | Low (4 lines) |
| **P-04** | **Add `priority` to `hero-gradient.png` and convert from PNG → WebP/AVIF**, OR remove `unoptimized` so Next.js optimizes it. 2.7MB PNG competes directly with fonts, scripts, and the LCP element for bandwidth. | `components/HeroSection.tsx`, `components/GridBackground.tsx` | **-200 to -500ms** | Low |
| **P-05** | **Switch Manrope from 6 static weights to variable font** (`weight: "200 700"` in Next.js). Reduces 6 font HTTP requests to 1. | `app/layout.tsx` | **-100 to -200ms** | Low (1 line) |

### Estimated LCP improvement if P-01 + P-02 + P-03 applied

| Current LCP | After P-01 | After P-01 + P-02 | After P-01 + P-02 + P-03 |
|---|---|---|---|
| 7.92s | ~4.5–5.0s | ~3.6–4.5s | **~3.0–4.0s** |

Applying all 5 fixes targets a final LCP of **~2.5–3.5s on mobile** — within Google's "Needs improvement" threshold. To reach the "Good" threshold (<2.5s LCP), additional work would be needed: image CDN, edge caching, and further framer-motion reduction via `LazyMotion`.

---

## Appendix — Fix for JSON-LD Script Strategy

`components/JsonLd.tsx` uses `strategy="beforeInteractive"` for structured data. JSON-LD is read by search engine crawlers, not by the browser at runtime. It has zero effect on user experience and should not block hydration.

**Change to:** `strategy="afterInteractive"` or `strategy="lazyOnload"`.

This does not affect SEO (crawlers parse the full HTML, including deferred scripts) and removes one unnecessary `beforeInteractive` execution per AI service page.

---

*Audit complete. No source files were modified.*
