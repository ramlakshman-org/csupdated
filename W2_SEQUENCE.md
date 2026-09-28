# CloudSwift W2 — Task Execution Sequence
> 24 unblocked tasks · 9 phases · ~3 days
> Last updated: 27 September 2026

## Sequencing Principles
1. **Fix live bugs first** — broken things on real visitors outrank everything
2. **Batch by file** — never touch the same file in 3 separate passes; group edits, restart server once
3. **Clean before add** — remove wrong content before inserting correct content (sitemap)
4. **SEO foundations before content** — canonical/sitemap must exist before submitting to GSC
5. **Stable base before new features** — all layout.tsx edits done before adding cookie banner
6. **Content last** — has a deadline buffer (Oct 4); can run in parallel with code work

---

## Phase 1 — Fix live production bug
| # | Task | File | Why first |
|---|------|------|-----------|
| 1 | **W2-01** Replace `useWordStep()` with CSS | `components/HeroSection.tsx` | Hydration error #418 is hitting every real visitor right now. Nothing else is more urgent. |

---

## Phase 2 — layout.tsx batch
> Reason: W2-03, W2-04, W2-06 all edit `app/layout.tsx`. Doing them in 3 separate sessions means 3 file opens and 3 server restarts. One batch = one restart.

| # | Task | File | Why here |
|---|------|------|----------|
| 2 | **W2-03** Lazy-load AIAssistant | `app/layout.tsx` | Groups with 3 and 4 — same file |
| 3 | **W2-04** Lazy-load CustomCursor | `app/layout.tsx` | Same file as above |
| 4 | **W2-06** Manrope → variable font | `app/layout.tsx` | Same file — completes the batch |

---

## Phase 3 — sitemap.ts batch
> Reason: W2-11, W2-09, W2-10 all edit `app/sitemap.ts`. Remove wrong entries first, then add correct ones, then fix dates — in that order within the same session. Sitemap must be correct before W2-17 (GSC submission, manual, Ram's task).

| # | Task | File | Why this order |
|---|------|------|----------------|
| 5 | **W2-11** Remove /projects from sitemap | `app/sitemap.ts` | Clean before adding — don't submit garbage alongside the new entries |
| 6 | **W2-09** Add solutions + industries (14 pages) | `app/sitemap.ts` | After cleanup, add the 14 pages Google is currently missing |
| 7 | **W2-10** Fix lastModified to real dates | `app/sitemap.ts` | Final polish — complete the sitemap in one session |

---

## Phase 4 — SEO metadata batch
> Reason: 6 files all get the same treatment (`alternates.canonical` + `openGraph`). Establish the pattern on the simplest case (new file) → apply the sweep → repeat per route type. All 33 pages have canonical after step 13.

| # | Task | File | Why this order |
|---|------|------|----------------|
| 8 | **W2-12** About page metadata (new file) | `app/about/layout.tsx` (create) | New file = zero risk of breaking existing pages. Sets the pattern. |
| 9 | **W2-08** Canonical audit — all dynamic pages | Multiple `generateMetadata` | Systemic sweep to confirm what's missing before individual fixes |
| 10 | **W2-13** AI service pages — canonical + OG | `app/ai-services/[id]/page.tsx` | Follow pattern from #9 |
| 11 | **W2-14** Industry pages — canonical + OG | `app/industries/[slug]/page.tsx` | Same pattern |
| 12 | **W2-15** Solutions pages — canonical + OG | `app/solutions/[slug]/page.tsx` | Same pattern |
| 13 | **W2-16** Services + managed-cloud — canonical + OG | `app/services/[id]/page.tsx` + `managed-cloud/[id]/page.tsx` | Completes the batch. All 33 pages now have canonical. |

---

## Phase 5 — HeroSection batch
> Reason: W2-07, W2-05, W2-02 all touch HeroSection. Test the hero once after all three changes, not three times. W2-07 (non-visual) before W2-05 (image swap) before W2-02 (CSS).

| # | Task | File | Why this order |
|---|------|------|----------------|
| 14 | **W2-07** prefers-reduced-motion → HeroSection | `components/HeroSection.tsx` | Non-breaking addition. Before image work so the component is fully correct before we swap the asset. |
| 15 | **W2-05** Hero PNG → WebP + priority prop | `components/HeroSection.tsx` + `public/` | LCP fix. After W2-07 so we test both changes in one browser pass. |
| 16 | **W2-02** Ticker overflow at 375px | `HeroSection.module.css` | CSS-only. Last in the hero batch — visual testing at 375px covers both LCP image and ticker. |

---

## Phase 6 — Footer + mobile CSS batch
> Reason: W2-20 and W2-21 both edit Footer.module.css — do together. W2-19 also touches footer CSS plus Navbar — do immediately after while Footer is still in focus.

| # | Task | File | Why this order |
|---|------|------|----------------|
| 17 | **W2-20** Footer bookCall tap target (44px) | `components/Footer.module.css` | Groups with W2-21 — same file |
| 18 | **W2-21** Footer 375px breakpoint | `components/Footer.module.css` | Same file as above — complete footer CSS in one session |
| 19 | **W2-19** Social icons 40px → 44px (3 locations) | `Footer.module.css` + `Navbar.module.css` | After footer batch — footer is already open, add nav. Test all 3 locations once on mobile. |
| 20 | **W2-22** PlatformOrbit fix at 768px | `components/PlatformOrbit.module.css` | Separate component, separate file. Last in mobile batch — isolated, easy to test. |

---

## Phase 7 — Trust content
> Reason: Remove fake template content (W2-23) before adding real content (W2-24). Visual stability of the homepage must be confirmed between these two steps.

| # | Task | File | Why this order |
|---|------|------|----------------|
| 21 | **W2-23** Remove Nyro template logos (carvia/courto/driveon) | `components/WhyChooseCloudSwift.tsx` | Remove first. Carousel may need visual adjustment after logo removal — test before touching homepage. |
| 22 | **W2-24** Wire company.trust array to homepage | `app/page.tsx` | After template cleanup. Page is in clean state before new trust content is added. |

---

## Phase 8 — New component (largest, most testing)
> Reason: Cookie consent banner is the most complex task — new component, layout.tsx changes, GTM/Pixel gating logic. layout.tsx must be stable (all Phase 2 changes settled) before touching it again.

| # | Task | File | Why last in code tasks |
|---|------|------|------------------------|
| 23 | **W2-25** Cookie consent banner | `components/CookieConsent.tsx` (new) + `app/layout.tsx` | Touches layout.tsx again. All other layout changes (Phase 2) must be tested and stable first. New component = most testing needed. |

---

## Phase 9 — Content (runs in parallel with code work)
> Reason: Content writing is independent of all code tasks. Has a hard deadline (Oct 4). Can be worked on while code tasks are in review or waiting for server restart.

| # | Task | File | Why last / parallel |
|---|------|------|---------------------|
| 24 | **W2-26** Blog: Migration vs Modernisation | `data/blogs.json` + blog content | Independent of all code. Due Oct 4 — 7-day buffer. Can be written any time. |

---

## Summary View

```
Phase 1   [1 task]   Live bug fix           → W2-01
Phase 2   [3 tasks]  layout.tsx batch       → W2-03, W2-04, W2-06
Phase 3   [3 tasks]  sitemap.ts batch       → W2-11, W2-09, W2-10
Phase 4   [6 tasks]  SEO metadata batch     → W2-12, W2-08, W2-13, W2-14, W2-15, W2-16
Phase 5   [3 tasks]  HeroSection batch      → W2-07, W2-05, W2-02
Phase 6   [4 tasks]  Mobile/CSS batch       → W2-20, W2-21, W2-19, W2-22
Phase 7   [2 tasks]  Trust content          → W2-23, W2-24
Phase 8   [1 task]   New component          → W2-25
Phase 9   [1 task]   Content (parallel)     → W2-26
─────────────────────────────────────────────────────
Total     24 tasks   ~3 days execution
```

## After all 24 done — Ram's manual tasks unlock:
- **W2-17** Submit sitemap to GSC (needs Phase 3 complete)
- **W2-18** Verify GSC property for oncloudswift.com

---
*File: W2_SEQUENCE.md | Repo: Cloudswift.app-main*
