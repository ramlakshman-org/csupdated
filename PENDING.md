# CloudSwift — Pending Items Tracker
> Last updated: 2025-09-26
> Repo: `Cloudswift.app-main` | Live: `oncloudswift.com`

---

## 🔑 ENV VARS — Production `.env` Must Have These Before Deploy

| Variable | Purpose | Status | Source |
|----------|---------|--------|--------|
| `NEXT_PUBLIC_API_URL` | Contact form backend endpoint | ❌ Missing | Person 2 — Railway URL |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel fires only when set | ❌ Missing | Meta Business Manager |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager | ✅ Hardcoded `GTM-MTQ9HQZR` | Live |
| `ADMIN_COOKIE_SECRET` | Signs admin session cookie | ❌ Missing in prod | Generate: any 32-char random string |
| `ADMIN_PASSWORD` | Admin panel login | ❌ Missing in prod | Set by you — do not commit to git |
| `NEXT_PUBLIC_CALENDLY_URL` | Not used as env var | ✅ Hardcoded in `lib/data.ts` | Live |

**Generate `ADMIN_COOKIE_SECRET`:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🪙 API KEYS & PLATFORM ACCESS

### Meta (Facebook)
| Item | Status | How to Get |
|------|--------|-----------|
| Meta Business Manager account | ❓ Verify exists | business.facebook.com |
| Meta Pixel ID (`NEXT_PUBLIC_META_PIXEL_ID`) | ❌ Not in env | Business Manager → Events Manager → Pixels |
| Meta Pixel — cookie consent integration | ⚠️ Pending | Pixel fires without consent until W2-25 cookie banner is built |
| WhatsApp Business API (Cloud API) | ✅ Already set up (NexoVent) | Native Meta Cloud API |

### Google
| Item | Status | How to Get |
|------|--------|-----------|
| Google Tag Manager container `GTM-MTQ9HQZR` | ✅ Live and firing | tagmanager.google.com |
| GTM — Meta Pixel tag inside container? | ✅ Confirmed NOT present | Checked live site |
| Google Search Console — property verified | ❓ Unknown | search.google.com/search-console |
| Google Search Console — sitemap submitted | ❌ Pending W2-17 | After W2-09 sitemap fix |
| Google Analytics (GA4) | ❓ Via GTM probably | Check GTM container tags |
| Google Business Profile | ❌ Doesn't exist | W4-11 — Shreya |

### Microsoft
| Item | Status | Action |
|------|--------|--------|
| Azure Expert MSP designation | ✅ Active | Havil to confirm badge image is current |
| Microsoft Partner Center access | ❓ Havil has | Download current Solutions Partner badge |
| Microsoft Solutions Partner badge (current) | ❌ Need new download | Havil — Partner Center → W3-03 |

---

## 🖼️ ASSETS NEEDED

| Asset | Needed For | Owner | Deadline | Status |
|-------|-----------|-------|----------|--------|
| `og-default.png` (1200×630px, branded) | Social share preview image | Person 3 | Friday 5pm | ❌ |
| Azure Expert MSP badge image (current) | Hero trust signal W3-01 | Havil | Week 3 | ❌ |
| Microsoft Solutions Partner badge (current) | Footer / trust strip W3-03 | Havil | Week 3 | ❌ |
| IFFCO logo (with permission to use) | Case study page W3-06 | Havil | Week 3 | ❌ |
| Real client testimonial names + approval | Testimonials section W3-04 | Havil | Week 3 | ❌ |

---

## 👤 INFORMATION NEEDED FROM HAVIL

| Item | Needed For | Task | Status |
|------|-----------|------|--------|
| Calendly URL (30-min consult) | Hero CTA | M-07 | ✅ Have it — `calendly.com/havil-richard-oncloudswift/30min` |
| IFFCO case study details (scope, outcome, metrics) | Case study page | W3-06 | ❌ |
| IFFCO — permission to use logo + name | Case study page | W3-06 | ❌ |
| Real testimonial names + companies + approval | Trust signals | W3-04 | ❌ |
| Founder story (Havil bio) for About page | Above-fold About | W3-05 | ❌ |
| Pricing structure — "How we price" section | Contact page | W3-13 | ❌ |
| Typical client profile (size, industry, monthly spend) | Keyword map | W4-01 | ❌ |
| DPDP Grievance Officer name | Privacy Policy | W4-21 | ❌ — Legal requirement |
| Apex Technologies case study details | Month 2 | MO2-05 | ❌ |
| IFFCO + Apex contacts for Clutch reviews | GEO | W4-15 | ❌ |

---

## 👤 INFORMATION NEEDED FROM PERSON 2

| Item | Needed For | Status |
|------|-----------|--------|
| Railway backend URL (contact form API) | `NEXT_PUBLIC_API_URL` | ❌ — Contact form dead until this lands |
| Email automation setup | MO2-07 | ❌ Month 2 |
| WhatsApp Journey B (Smart Routing) | MO2-10 | ❌ Month 2 |

---

## 👤 TASKS FOR SHREYA

| Item | Task | Week |
|------|------|------|
| Create Google Business Profile | W4-11 | Week 4 |
| Create Clutch profile (full service listing) | W4-12 | Week 4 |
| Create GoodFirms + G2 listings | W4-13 | Week 4 |
| Create Crunchbase company profile | W4-14 | Week 4 |

---

## 🚨 COMPLIANCE / LEGAL BLOCKERS

| Item | Risk | Status |
|------|------|--------|
| DPDP Grievance Officer name in Privacy Policy | Legal requirement under DPDP Act 2023 | ❌ Placeholder in Privacy Policy — Havil must provide name |
| Cookie consent banner before Meta Pixel fires | DPDP 2023 — non-essential cookies need consent | ⚠️ W2-25 — Week 2. Pixel fires without consent until then. |
| Terms of Service — Havil review | Updated from agency template to MSP. Needs legal sign-off | ⚠️ Havil to read and approve |
| Privacy Policy — Havil review | DPDP 2023 draft. Needs legal sign-off | ⚠️ Havil to read and approve |

---

## 🔧 ACCOUNTS TO CREATE / REGISTER

| Platform | Purpose | Owner | Task | Status |
|----------|---------|-------|------|--------|
| Google Business Profile | Local SEO / GEO entity | Shreya | W4-11 | ❌ |
| Clutch | B2B reviews / GEO trust | Shreya | W4-12 | ❌ |
| GoodFirms | Directory listing | Shreya | W4-13 | ❌ |
| G2 | Software reviews directory | Shreya | W4-13 | ❌ |
| Crunchbase | Entity / funding database | Shreya | W4-14 | ❌ |
| Google Search Console | SEO tracking baseline | Ram | W2-18 | ❓ Verify access |

---

## 📋 CONTENT PENDING (needs human input before Claude can write)

| Content | Task | Blocked On |
|---------|------|-----------|
| IFFCO case study | W3-06 | Havil — scope, metrics, logo permission |
| Apex Technologies case study | MO2-05 | Havil |
| SMB startup cost reduction case study | MO2-06 | Havil — client details |
| "Best Azure MSPs for Indian Startups 2026" blog | W4-16 | Ram to write (Claude can draft) |
| Press release — Azure Expert MSP | MO2-01 | Ram + Havil |
| Guest post — Azure cost optimisation | MO2-02 | Havil + Ram |
| Pricing structure copy ("How we price") | W3-13 | Havil |
| Keyword map (one primary keyword per page) | W4-01 | Ram to decide |

---

## ✅ WHAT'S DONE (Block A + B — Sep 26)

| Task | What |
|------|------|
| M-01 | Contact form wired to `NEXT_PUBLIC_API_URL` — env var pending |
| M-02 | Terms of Service rewritten for cloud MSP |
| M-03 | Privacy Policy updated with DPDP 2023 sections |
| M-04 | robots.ts — /admin/* disallow confirmed |
| M-05 | Admin auth HMAC confirmed |
| M-06 | middleware.ts upgraded to verify HMAC signature |
| M-07 | Hero CTAs in code (Book a Free Consultation + Get in Touch) |
| M-08 | LCP animation fix — "for" text no longer starts off-screen |
| M-09 | GTM `afterInteractive` confirmed |
| M-10 | Meta Pixel component created — fires when `NEXT_PUBLIC_META_PIXEL_ID` is set |
| M-11 | OG fallback image added to root layout metadata |
| M-12 | Homepage metadata confirmed complete |
| M-13 | Admin pages confirmed noindex |
| M-14 | HTTP security headers confirmed in `next.config.ts` |
| M-15 | `public/llms.txt` created |

---

## 📅 WHAT'S NEXT

| Phase | Starts | Key output |
|-------|--------|-----------|
| Week 2 | Sep 30 | All 33 pages have metadata, sitemap fixed, performance sprint |
| Week 3 | Oct 7 | Trust signals, IFFCO case study, CTA cleanup, structured data |
| Week 4 | Oct 14 | Content depth, GEO directories, legal full rewrite |
| Month 2 | Oct 21 | Press, Clutch reviews, guest posts, email automation |
