# Mobile Rendering Audit — CloudSwift Technologies
**Scope:** `D:\SEO\CS Workspace\Cloudswift.app-main`
**Target viewports:** 375px (iPhone SE / standard mobile) and 768px (iPad / tablet)
**Method:** Static source analysis — TSX components + CSS Modules. No live browser session.
**Date:** 2026-09-23

---

## Summary

The site has responsive structure but critical gaps at 375px. The main hero is JS-dependent for font sizing (causing layout shift on hydration) and the H1 is fully hidden until JS runs. Social icon touch targets are undersized in three separate locations. PlatformOrbit renders an SVG at 768px that may overflow. No breakpoints exist at 375px in Footer, and the contact sidebar is technically visible at 769–1024px while hero padding is set to 100px left — a layout squeeze. Overall mobile posture: **6 / 10**.

---

## Findings Table

| ID | Component | Issue | Severity | File:Line |
|----|-----------|-------|----------|-----------|
| MB-01 | HeroSection | H1 enters with `initial={{ y: "115%" }}` — fully clipped offscreen until JS hydrates. Largest Contentful Paint is blocked; search bots and users on slow connections see a blank hero. | **C1 — Critical** | `components/HeroSection.tsx` (Framer Motion prop on H1) |
| MB-02 | HeroSection | `useWordStep()` sets font size via JS `useState` + `useEffect`. Before hydration the ticker renders at SSR default (168px), then snaps to 72px on mobile. Causes measurable Cumulative Layout Shift. | **C2 — High** | `components/HeroSection.tsx:useWordStep` |
| MB-03 | HeroSection | At ≤809.98px the `.inner` container still has `padding-left: 56px`. At 375px this leaves only `375 - 12 - 56 = 307px` usable width for the headline text and ticker together. | **C2 — High** | `components/HeroSection.module.css:234` |
| MB-04 | HeroSection | Ticker container width: `min(100%, 58vw)` at ≤809.98px. At 375px = 217px. The words "Infrastructure" (13 chars at 72px) overflow the ticker box and are clipped. | **C2 — High** | `components/HeroSection.module.css:250` |
| MB-05 | HeroSection | Social link container: `width: 40px; height: 40px` (CSS) wrapping a 32×32px image. WCAG 2.5.5 requires 44×44px minimum. Falls 4px short on both axes. | **C3 — Medium** | `components/HeroSection.module.css:97–106` |
| MB-06 | Navbar overlay | Overlay social icons: container `width: 40px; height: 40px`, image `22×22px`. Same 4px shortfall as Hero socials. | **C3 — Medium** | `components/Navbar.module.css:218–227` |
| MB-07 | Footer | Social icon container: `width: 36px; height: 36px`, image `28×28px` — 8px below WCAG minimum on both axes. Most undersized social target on the page. | **C3 — Medium** | `components/Footer.module.css:74–83` |
| MB-08 | Footer | `.bookCall` CTA has only `padding-bottom: 4px`; no explicit height or vertical padding. Rendered tap target is approximately 22px tall — well below 44px. | **C3 — Medium** | `components/Footer.module.css:96–111` |
| MB-09 | Footer | No CSS breakpoint below 768px. Footer padding, column layout, and font sizes are untested at 375px. Content may squeeze without designer review. | **C3 — Medium** | `components/Footer.module.css:203–226` |
| MB-10 | PlatformOrbit | SVG node positions are absolute `%` coordinates set inline in TSX. At 768px the component renders (`display: none` only fires at ≤479.98px), with `aspect-ratio: 1.05` and `min-height: 0`. Nodes at edge positions (e.g. top-right AWS, bottom-left Oracle) may clip outside the `overflow: hidden` map container. | **C2 — High** | `components/PlatformOrbit.module.css:76–77` |
| MB-11 | HeroSection | Custom breakpoints (479.98px, 809.98px, 1199.98px) skip 375px entirely. At exactly 375px the 479.98px rule applies, but the 16px side gutter leaves a 343px content area — tight for 72px headline text. | **C3 — Medium** | `components/HeroSection.module.css:258–273` |
| MB-12 | HeroSection | Breakpoint system uses non-standard values (479.98 / 809.98 / 1199.98). Misaligns with common device sizes (375 / 390 / 414 / 768 / 1024). Makes QA against real devices unpredictable. | **C3 — Medium** | `components/HeroSection.module.css:197–273` |
| MB-13 | ContactPage | Contact sidebar (LinkedIn "in" + WhatsApp "wa" text links) is `position: absolute; left: 24px` and only hidden at `max-width: 768px`. At 769–1024px it overlaps the hero which has `padding-left: 100px`. Both exist in the same stacking context; sidebar text could overprint page title at tablet portrait. | **C3 — Medium** | `app/contact/ContactPage.module.css:19–27, 287–293` |
| MB-14 | ContactPage sidebar | `.sideIcon` is `width: 32px; height: 32px`. At 769–1024px the sidebar is visible — both icons are below 44px WCAG minimum. (Hidden at ≤768px, so impact is tablet-only.) | **C3 — Medium** | `app/contact/ContactPage.module.css:29–39` |
| MB-15 | HeroSection | Hero minimum height: `480px` at ≤479.98px. On landscape mobile (e.g., iPhone SE landscape = 375px tall) the `88vh` combined with `min-height: 480px` forces scroll to see bottom social links. No landscape override exists. | **C4 — Low** | `components/HeroSection.module.css:258–273` |
| MB-16 | HeroSection | `prefers-reduced-motion` is **not** respected for the hero entrance animation (`initial={{ y: "115%" }}` + Framer Motion spring). Only the Navbar ticker animation has a `@media (prefers-reduced-motion: reduce)` guard. | **C3 — Medium** | `components/HeroSection.tsx`, `components/Navbar.module.css:294–297` |
| MB-17 | Navbar | Navbar close button SVG is `width="16" height="16"` with `strokeWidth="1"`. However, the CSS container is `width: 80px; height: 54px` (or `72×48px` at ≤479.98px) — so the actual tap target is adequate. Visual affordance is poor, not a functional issue. | **C4 — Low** | `components/Navbar.module.css:98–116, 285–291` |
| MB-18 | HeroSection | CSS sets `.tickerWord { font-size: 120px }` at desktop, while `useWordStep()` returns 168 and sets inline font-size. JS inline style overrides CSS. The CSS breakpoint cascade (100px → clamp → 72px) is bypassed by `useWordStep` — two systems competing for the same property. | **C2 — High** | `components/HeroSection.module.css:185–195, HeroSection.tsx:useWordStep` |

---

## Per-Component Breakpoint Map

| Component | Breakpoints Used | 375px coverage | 768px coverage |
|-----------|-----------------|----------------|----------------|
| HeroSection | 479.98px, 809.98px, 1199.98px | ✓ (479.98 fires) | ✓ (809.98 fires) |
| Navbar | 479.98px, 809.98px | ✓ | ✓ |
| Footer | 768px, 1024px | ✗ No 375px rule | Boundary (≤768px fires) |
| ContactPage | 768px, 1024px | ✗ No 375px rule | Boundary |
| PlatformOrbit | 479.98px, 809.98px, 1024px | ✓ (map hidden) | ✓ (aspect-ratio) |

---

## Touch Target Audit

WCAG 2.5.5 minimum: **44 × 44 CSS pixels**

| Location | Element | Container (CSS) | Image | Pass? |
|----------|---------|-----------------|-------|-------|
| HeroSection social stack | `.socialLink` | 40 × 40px | 32 × 32px | ✗ Fail |
| Navbar overlay socials | `.overlaySocials a` | 40 × 40px | 22 × 22px | ✗ Fail |
| Navbar menu button | `.menuBtn` | 80 × 54px | — | ✓ Pass |
| Navbar close button | `.closeBtn` | 80 × 54px (72×48 at <480px) | 16×16 SVG | ✓ Pass (container OK) |
| Overlay nav links | `.overlayLink` | 100% × 56–64px | — | ✓ Pass |
| Footer social icons | `.socialIcon` | 36 × 36px | 28 × 28px | ✗ Fail |
| Footer "book a free consultation" | `.bookCall` | ~22px tall | — | ✗ Fail |
| Contact sidebar icons | `.sideIcon` | 32 × 32px | — | ✗ Fail (tablet only) |
| Contact form submit button | `.submitBtn` | auto × ~52px | — | ✓ Pass |

**4 failing touch targets** across 3 components (HeroSection, Navbar overlay, Footer × 2).

---

## Font Size Audit at 375px

| Element | Computed value at 375px | Source |
|---------|------------------------|--------|
| Hero H1 "Designing" | `clamp(2.4rem, 12vw, 62px)` = ~45px (12vw @ 375 = 45px) | CSS |
| Hero ticker word | 72px (JS `useWordStep`) | JS inline style |
| Hero "for" text | Same clamp as designing (~45px) | CSS |
| Navbar overlay labels | 22px | CSS |
| Footer CTA headline | `clamp(1.6rem, 8vw, 2.4rem)` = ~30px | CSS |
| Contact hero title | `clamp(3rem, 14vw, 5rem)` = ~52.5px | CSS |
| Body / form inputs | 14.4px (0.9rem × 16) | CSS |

**Risk:** Hero ticker runs at 72px (JS) inside a container sized for ~45px CSS font — the ticker height is 72px (CSS), but the surrounding `.forText` and `.designing` lines use the smaller CSS clamp value. Visual misalignment between headline lines.

---

## Top 5 Mobile Fixes (Ranked by Impact)

### FIX-1: Unblock H1 LCP — `HeroSection.tsx` *(C1 — Critical)*
**Problem:** `initial={{ y: "115%" }}` on the H1 keeps it offscreen until JS hydrates. LCP candidate never paints before hydration.
**Fix:** Change the hero H1 animation to start visible (`initial={{ opacity: 0 }}` fade only, or SSR-render at final position and animate in-place). Alternative: use `initial={false}` on the wrapping `MotionConfig` for server renders.
**Impact:** Directly improves Largest Contentful Paint score.

---

### FIX-2: Replace `useWordStep()` with CSS `clamp()` — `HeroSection.tsx` + `HeroSection.module.css` *(C2 — High)*
**Problem:** JS hook sets inline `font-size` via `useState` + `useEffect`. Before hydration, SSR emits the default 168px, then JS snaps to 72px on mobile. This produces a measurable CLS spike and makes two systems (JS inline + CSS) compete for the same property.
**Fix:** Remove `useWordStep()` entirely. Set ticker font-size via CSS:
```css
/* HeroSection.module.css */
.tickerWord { font-size: clamp(4.5rem, 18vw, 168px); }
/* Fine-tune heights to match at each breakpoint */
```
CSS clamp with viewport units avoids JS, eliminates hydration flicker, and respects `prefers-reduced-motion` patterns.
**Impact:** Eliminates CLS, simplifies component.

---

### FIX-3: Bring all social icon touch targets to 44px minimum *(C3 — Medium, 3 locations)*
**Problem:** HeroSection (40×40px), Navbar overlay (40×40px), Footer (36×36px) all fall short of WCAG 2.5.5.
**Fix:** In each CSS module, update the anchor/button container:
```css
/* HeroSection.module.css — .socialLink */
width: 44px;
height: 44px;

/* Navbar.module.css — .overlaySocials a */
width: 44px;
height: 44px;

/* Footer.module.css — .socialIcon */
width: 44px;
height: 44px;
```
Also add to Footer `.bookCall`:
```css
padding: 12px 0; /* gives ~44px tap height */
```
**Impact:** Passes WCAG 2.5.5 across all social links site-wide.

---

### FIX-4: Fix ticker width overflow at 375px — `HeroSection.module.css` *(C2 — High)*
**Problem:** At ≤809.98px the inner container has `padding-left: 56px` and the ticker is `min(100%, 58vw)`. At 375px: `56px` left-pad leaves 303px total, and the ticker takes `58vw = 217px`. Long words like "Infrastructure" (13 chars × ~40px each at 45px font) may exceed the container width.
**Fix:** At ≤479.98px, reduce `padding-left` on `.inner` and widen `.ticker`:
```css
@media (max-width: 479.98px) {
  .inner { padding-left: 44px; }    /* down from 56px */
  .ticker { width: min(100%, 68vw); } /* up from 58vw */
}
```
**Impact:** Prevents text clipping on small-phone hero.

---

### FIX-5: Hide or reposition PlatformOrbit at 768px — `PlatformOrbit.module.css` *(C2 — High)*
**Problem:** The orbit diagram uses absolute-positioned nodes at fixed percentage coordinates. At 768px the component renders in a 1.05 aspect-ratio box. Edge nodes (AWS at ~88% right, Oracle at ~15% left-bottom) may clip outside `overflow: hidden`.
**Fix (Option A — safe):** Extend the `display: none` breakpoint from 479.98px to 767px. Replace with a simple 2-column logo grid at ≤767px.
**Fix (Option B — preserve diagram):** Test at 768px in browser. If nodes clip, reduce `nodeCore` to 40px and adjust the % positions for edge nodes to stay within 5–95% bounds.
**Impact:** Prevents invisible/clipped platform logos on tablet — one of the key product sections.

---

## Notes for Developer

- **No viewport meta tag issue** — Next.js App Router injects `<meta name="viewport" content="width=device-width, initial-scale=1">` by default. No action needed.
- **`prefers-reduced-motion`** — Only the Navbar ticker currently has a guard. Add it to HeroSection entrance animations.
- **Contact sidebar at 769–1024px** — Currently `position: absolute; left: 24px` while hero has `padding-left: 100px`. The sidebar sits in the padding channel which is correct, but test at 769px portrait to confirm no overlap.
- **All CSS files use non-standard breakpoints (479.98 / 809.98)** — Consider aligning with standard device widths (480 / 768 / 1024) for DevTools parity. The `.98` suffix prevents double-firing on exact-pixel devices but is unconventional and may confuse QA.
