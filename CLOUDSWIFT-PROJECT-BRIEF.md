# CloudSwift Website — Technical Project Brief
**Last updated:** 30 September 2026 · Audit Rev 2 applied · Go-live pending P1 clearance

---

## Repo & Deployment Details

| Key | Value |
|---|---|
| Staging URL | https://csupdated.vercel.app/ |
| Production URL | https://oncloudswift.com/ |
| Framework | Next.js (App Router) — see AGENTS.md for version notes |
| Staging deploy | Vercel — auto-deploys from `frontend-main` (confirm branch name with Nitin) |
| Prod deploy | Azure App Service: `cloudswifttechnologies` |
| Local new build | `D:\SEO\CS Workspace\Cloudswift.app-main` |
| Local prod copy | `D:\CS\CS Digital Strategy doc\Cloudswift.app-main` |

---

## Current Branch Status

| Branch | Purpose | Last Commit | Status |
|---|---|---|---|
| `main` | Production live on oncloudswift.com (Azure) | — confirm with Nitin | ⚠ Old build — missing all SEO/schema work |
| `frontend-main` (or equivalent) | New build — staging on csupdated.vercel.app | d61eb2b · 30 Sep 2026 | ✅ Stable — all audit fixes live |

> **Nitin: confirm the exact branch name that deploys to csupdated.vercel.app.** All fixes in this session were committed and pushed from `D:\SEO\CS Workspace\Cloudswift.app-main`. The production oncloudswift.com still runs the old build and has none of the SEO improvements.

---

## What Has Been Done (completed & verified live on csupdated.vercel.app)

- [x] **H1 aria-label for crawlability** — `components/HeroSection.tsx` — `aria-label="Running Azure, Cloud, Microsoft & AI for Indian Enterprises"` confirmed in DOM
- [x] **Schema phone unified** — `app/page.tsx` — Organization.contactPoint.telephone now matches LocalBusiness.telephone: `+91 98455 70066`
- [x] **Dynamic OG image — HTTP 200** — `app/opengraph-image.tsx` + `metadataBase` updated to Vercel URL. Image renders correctly (1200×630).
- [x] **BreadcrumbList on /about** — `app/about/layout.tsx` — Home → About. Schema types: Organization, AboutPage, BreadcrumbList
- [x] **BreadcrumbList on /contact** — `app/contact/page.tsx` — Home → Contact. Schema types: FAQPage, BreadcrumbList
- [x] **llms.txt entity alignment** — `public/llms.txt` — "Indian startups and enterprises" → "Indian enterprises" (2 locations)
- [x] **PlatformOrbit alt text** — `components/PlatformOrbit.tsx` — index list logos now have `alt={p.title}`
- [x] **GTM consent-first defaults** — `components/GoogleTagManager.tsx` — `ad_storage: denied`, `analytics_storage: denied`, `wait_for_update: 500`. GTM now `lazyOnload` (was render-blocking `beforeInteractive` in old build).
- [x] **Vercel Analytics + SpeedInsights** — `app/layout.tsx` — both enabled. Was absent from old production build.
- [x] **CookieConsent component** — `app/layout.tsx` — absent from old production build.
- [x] **JSON-LD schemas on homepage** — `app/page.tsx` — Organization, LocalBusiness, FAQPage schemas. All absent from old production build.
- [x] **robots.txt with AI crawlers + llms.txt** — `public/robots.txt` — GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot explicitly allowed. Absent from old build.

---

## What Is In Progress (started, not merged to production)

- [ ] **Domain migration: csupdated.vercel.app → oncloudswift.com** — New build is production-ready pending P1 clearance. Requires: (1) custom domain set in Vercel, (2) metadataBase reverted, (3) GSC sitemap submission.

---

## What Is Pending (not started)

- [ ] Grievance Officer name in Privacy Policy — **P1 legal blocker** — awaiting Ram / Havil
- [ ] BadgeStrip.tsx alt text audit — P2
- [ ] BreadcrumbList on service sub-pages (`/services`, `/managed-cloud`, `/ai-services`, `/solutions`) — P2
- [ ] Full address + pincode in LocalBusiness schema — P2 — awaiting Ram
- [ ] Lead flow end-to-end test (Form → WhatsApp → SimpleCRM) — **P1 go-live gate**
- [ ] Credential claims sign-off (Havil) — **P1 go-live gate**
- [ ] Author bio + Person schema on /about — P2 — awaiting content from Ram
- [ ] Case study page: IFFCO Dubai AD migration — P2 — awaiting copy from Ram/team
- [ ] GBP + Microsoft Partner Directory verification — P2 — external, Ram / team action

---

## Known Issues / Bugs

- **metadataBase is currently set to `csupdated.vercel.app`** — OG image works on staging but will break on oncloudswift.com if deployed without reverting the one-line change in `app/layout.tsx`. Nitin must revert this immediately when the Vercel custom domain points to oncloudswift.com.
- **AIAssistant component** is present in the old production build but absent from the new build. If this feature needs to come back, it must be added before go-live. **Ram to confirm intention.**
- **Old production site (oncloudswift.com) has render-blocking GTM** (`strategy="beforeInteractive"`) and no consent mode. Until the new build is live, the production site is non-DPDP-compliant.
- **Grievance Officer placeholder still live on staging** — `app/privacy-policy/page.tsx` line 184 reads `[Name — to be updated]`. Visible to any visitor on the staging URL.

---

## Team & Ownership

| Person | Role |
|---|---|
| Ram Rishikesh | Product owner · Strategy · SEO/GEO direction · Content approvals · Address + Grievance Officer input |
| Nitin | Developer · Owns codebase · All commits and deployments |
| Havil | Credential sign-off — ISO 27001 / SOC 2 / Microsoft certifications verification before go-live |

---

## Nitin's Task List

### Task 1 — Fill Grievance Officer name in Privacy Policy
- **File / Location:** `app/privacy-policy/page.tsx` — line 184
- **What to do:** Replace `[Name — to be updated]` with the confirmed officer name and designation. Required by DPDP Act 2023, Section 9.
- **Expected output:** A real name visible in the Grievance Officer section. No placeholder text anywhere in the Privacy Policy.
- **Priority:** P1
- **Estimated time:** 2 minutes once name is confirmed
- **⛔ Awaiting Ram / Havil** — cannot proceed until name is supplied.

---

### Task 2 — Revert metadataBase to production domain on go-live
- **File / Location:** `app/layout.tsx` — line 24
- **What to do:** Change `new URL("https://csupdated.vercel.app")` back to `new URL(company.website)`. Do this in the same commit that sets up the Vercel custom domain for oncloudswift.com.
- **Expected output:** `og:image` URL in page source reads `https://oncloudswift.com/opengraph-image?...` not the Vercel URL.
- **Priority:** P1
- **Estimated time:** 1 minute — do it as part of the domain migration commit

---

### Task 3 — Test lead flow end-to-end before go-live
- **File / Location:** Contact form on https://csupdated.vercel.app/contact
- **What to do:** Submit a test lead through the contact form on staging. Confirm it arrives in WhatsApp AND creates a record in SimpleCRM. Document the test with a screenshot.
- **Expected output:** Form → WhatsApp notification received · SimpleCRM record created · No errors in browser console on form submit
- **Priority:** P1
- **Estimated time:** 30–60 minutes (includes debugging if flow is broken)
- **Note:** Needs SimpleCRM credentials and WhatsApp webhook URL. Confirm with Ram if not already in env vars.

---

### Task 4 — Audit BadgeStrip.tsx for missing image alt text
- **File / Location:** `components/BadgeStrip.tsx` (or equivalent ticker/marquee component)
- **What to do:** Check every `<Image>` tag in the component. For brand logos (Azure, Microsoft, AWS, etc.), add `alt="[Brand] logo"`. If the image is purely decorative inside a labelled link, `alt=""` is acceptable only if the parent has `aria-label`.
- **Expected output:** Zero `<Image>` tags with empty alt that lack a parent `aria-label`. Run Axe DevTools in browser to verify.
- **Priority:** P2
- **Estimated time:** 15 minutes

---

### Task 5 — Add BreadcrumbList schema to service / solution section layouts
- **File / Location:** `app/services/layout.tsx`, `app/managed-cloud/layout.tsx`, `app/ai-services/layout.tsx`, `app/solutions/layout.tsx` — create layout files if they don't already exist
- **What to do:** Follow the exact pattern in `app/about/layout.tsx`. For each section add a BreadcrumbList with two items: Home (`https://oncloudswift.com`) and the section (e.g. `https://oncloudswift.com/services`).
- **Expected output:** Rich Results Test on each section page shows BreadcrumbList detected. Page source contains valid JSON-LD with `@type: BreadcrumbList`.
- **Priority:** P2
- **Estimated time:** 30 minutes for all 4 sections

---

### Task 6 — Add street address and postal code to LocalBusiness schema
- **File / Location:** `app/page.tsx` — LocalBusiness schema, `address` block
- **What to do:** Add `"streetAddress"` and `"postalCode"` fields to the PostalAddress object. The same address must appear in the site footer and match the GBP listing exactly (character-for-character).
- **Expected output:** LocalBusiness schema in Google Rich Results Test shows full address including postal code.
- **Priority:** P2
- **Estimated time:** 5 minutes once address is confirmed
- **⛔ Awaiting Ram** — confirm the exact registered street address and Bengaluru postal code before Nitin adds it.

---

### Task 7 — Add Person schema and author bio to /about page
- **File / Location:** `app/about/page.tsx` and `app/about/layout.tsx`
- **What to do:** Add a named leadership card (name, title, 2-sentence bio, headshot, LinkedIn link). Add a Person schema JSON-LD block with `name`, `jobTitle`, `worksFor`, and `sameAs` (LinkedIn URL). Follow the script tag pattern in `app/about/layout.tsx`.
- **Expected output:** A named individual visible on /about. Person schema confirmed in Rich Results Test.
- **Priority:** P2
- **Estimated time:** 20 minutes once content is supplied
- **⛔ Awaiting Ram** — supply: name, job title, 2-sentence bio, headshot image, LinkedIn URL.

---

### Task 8 — Go-live domain migration
- **File / Location:** Vercel project settings + DNS registrar + `app/layout.tsx`
- **What to do:**
  1. Revert `metadataBase` (Task 2)
  2. Add `oncloudswift.com` as a custom domain in Vercel project settings
  3. Update DNS (A/CNAME) at registrar to point to Vercel
  4. Verify SSL is provisioned in Vercel
  5. Submit sitemap immediately after DNS propagates: `https://oncloudswift.com/sitemap.xml` → Google Search Console + Bing Webmaster Tools
- **Expected output:** `https://oncloudswift.com` serves the new build. OG image resolves from production domain. Sitemap indexed by GSC.
- **Priority:** P1
- **Estimated time:** 1–2 hours (includes DNS propagation wait)
- **Blocker:** All P1 items (Tasks 1, 2, 3 + Havil sign-off) must clear first.

---

## Go-Live Gate — All 5 Must Clear Before Launch

| Gate | Owner | Status |
|---|---|---|
| Task 1 · Grievance Officer name filled | Nitin (after Ram confirms name) | ❌ Blocked |
| Task 2 · metadataBase reverted to production URL | Nitin | ⚠ On migration |
| Task 3 · Lead flow Form → WhatsApp → SimpleCRM tested | Nitin + Ram | ❌ Not started |
| Credential claims sign-off (ISO 27001, SOC 2, Microsoft certs) | Havil | ❌ Not started |
| PageSpeed Insights — LCP <2.5s, CLS <0.1, INP <200ms | Nitin (run after go-live) | ⚠ Post-launch |

---

## Post-Launch Backlog (first 30 days)

| Item | Owner | Priority |
|---|---|---|
| Submit sitemap to GSC + Bing on day 1 | Nitin | P2 |
| Verify/create Google Business Profile (NAP must match schema) | Ram / team | P2 |
| Verify Microsoft Partner Directory listing | Ram / team | P2 |
| Publish IFFCO Dubai case study at `/case-studies/iffco-dubai` | Ram (copy) → Nitin (page) | P2 |
| Claim Clutch + GoodFirms, request client reviews | Ram / team | P2 |
| Run PageSpeed Insights — fix LCP if >2.5s (add `fetchpriority="high"` to hero image) | Nitin | P2 |
| WebSite schema with SearchAction (only if blog search is live) | Nitin | P3 |
| Confirm AIAssistant component intention (present in old build, absent in new) | Ram decision → Nitin if needed | P3 |

---

*CloudSwift Website Technical Brief · v2 · 30 September 2026 · 8-month engagement target: ₹10 Cr billing by Month 8*
