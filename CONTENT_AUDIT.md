# CONTENT AUDIT — CloudSwift (app-main)
**Audit type:** Read-only content accuracy review  
**Date:** 2026-09-23  
**Auditor:** Claude Code (Sonnet 4.6)  
**Scope:** All written content in `app/`, `components/`, `lib/`, `data/`

---

## Step 1 — Entity Name & Placeholder Scan

### Critical: Wrong company name in live-facing pages

| File:Line | Found text | Context | Severity |
|---|---|---|---|
| `app/terms-of-service/page.tsx:22` | `Nyro Silvan provides UX/UI design, web design, branding, and Framer development services.` | Section 2 "Services" — this is the site's legal ToS, publicly visible | **CRITICAL** |
| `app/terms-of-service/page.tsx:27` | `Nyro Silvan retains the right to showcase completed work in portfolio and promotional materials` | Section 3 "Intellectual Property" | **CRITICAL** |
| `app/terms-of-service/page.tsx:42` | `Nyro Silvan shall not be liable for any indirect, incidental, special…` | Section 6 "Limitation of Liability" | **CRITICAL** |
| `app/terms-of-service/page.tsx:47` | `nyro@example.com` | Section 7 "Contact" — clickable `<a href="mailto:nyro@example.com">` | **CRITICAL** |
| `app/privacy-policy/page.tsx:47` | `nyro@example.com` | Section 7 "Contact" — clickable `<a href="mailto:nyro@example.com">` | **CRITICAL** |

**Fix for all five:** The entire Terms of Service and Privacy Policy body text must be replaced with CloudSwift-specific legal content. See Step 7 for full analysis.

### Non-critical: Template origin in code comments only

| File:Line | Found text | Context | Risk |
|---|---|---|---|
| `next.config.ts:1` | `Allow CloudSeek-sourced images in the Nyro template.` | JSDoc comment — not rendered | Low — internal dev comment |
| `lib/data.ts:2` | `CloudSwift site content for the Nyro template.` | JSDoc comment — not rendered | Low — internal dev comment |
| `lib/ai.ts:2` | `Answers run locally in the Nyro template chat widget` | JSDoc comment — not rendered | Low — internal dev comment |
| `components/SparkleIcon.tsx:3` | `Nyro iridescent "glass" sparkle` | JSDoc comment — not rendered | Low — internal dev comment |

These are code comments only and not visible to site visitors. They should be cleaned up but pose no user-facing risk.

### HTML `placeholder` attributes (form fields — not content)

These are acceptable HTML input placeholder attributes, not user-facing copy errors:

| File | Placeholder text | Status |
|---|---|---|
| `app/contact/ContactPage.tsx:201` | `"Your full name"` | ✓ Appropriate |
| `app/contact/ContactPage.tsx:216` | `"you@company.com"` | ✓ Appropriate |
| `app/contact/ContactPage.tsx:231` | `"Company name"` | ✓ Appropriate |
| `app/contact/ContactPage.tsx:266` | `"Tell us about your environment..."` | ✓ Appropriate — CloudSwift-specific |
| `components/AIAssistant.tsx:83` | `"Ask CloudSwift AI anything…"` | ✓ Appropriate |

### Template client images used as content

| File:Line | Found text | Issue |
|---|---|---|
| `components/WhyChooseCloudSwift.tsx:11,19` | `"/images/carvia-logo.png"` | Nyro template client logo used in "Why Choose CloudSwift" carousel |
| `components/WhyChooseCloudSwift.tsx:27` | `"/images/courto-logo.png"` | Nyro template client logo — carousel slide 3 |
| `components/WhyChooseCloudSwift.tsx:35` | `"/images/driveon-logo.png"` | Nyro template client logo — carousel slide 4 |
| `components/WhyChooseCloudSwift.tsx:127` | `alt="Client logo placeholder"` | Alt text explicitly states these are placeholder logos |

The four "client story" carousel slides on the homepage still show Nyro template company logos (Carvia, Courto, DriveOn). The alt text `"Client logo placeholder"` confirms these have never been replaced with real CloudSwift client logos. The slide text references CloudSwift services correctly, but the client attribution is misleading.

---

## Step 2 — Service Description Accuracy

### Overall assessment

The service catalog (in `lib/catalog.json`) covers ~100+ services across Azure, AWS, GCP, Microsoft 365, Dynamics 365, Power BI, security, AI, and managed cloud. The descriptions are technically accurate for what an Azure Expert MSP delivers. No fabricated services, no wildly exaggerated capabilities.

**Language quality issue:** Several descriptions in `catalog.json` read as machine-translated from another language. Examples:
- `"Systems of old, built upon an architecture that won't hinder you tomorrow."` (Legacy Modernisation)
- `"The correct problems chosen initially, not necessarily the loudest demand in the room."` (Power Platform)
- `"Apps were created quickly, but not at the expense of their future sustainability."` (Power Platform)
- `"Ensure that your cloud ecosystem remains dependable with managed services and proactive support."` (AWS)
- `"Optimize your environment with cloud security, governance, and best practices."` (AWS)

These are not factually wrong but are awkward phrasing that reads as translated or AI-generated content — a quality signal that affects trust.

### Specific claim flags

| Claim | Location | Issue |
|---|---|---|
| `"guaranteed 15-minute response times for critical security incidents"` | `lib/industriesSolutionsData.ts:359,376` | SLA guarantee in service marketing copy — requires contractual backing |
| `"guaranteed RPO/RTO SLA"` | `lib/catalog.json:1386` | Specific guarantee without parameters — what are the RPO/RTO values? |
| `"Industry-leading first-contact resolution"` | `components/HeroCarousel.tsx:68` | Superlative without evidence or qualifier |
| `"scalability…guaranteed from day one"` | `lib/catalog.json:236` | Vague guarantee in application development description |

---

## Step 3 — Company Facts Check

### Verified facts from `lib/data.ts`

| Claim | Value | Consistent? | Notes |
|---|---|---|---|
| Legal name | CloudSwift Technologies Pvt. Ltd. | ✓ | Used in JSON-LD and AI knowledge |
| Founded | 2023 | ✓ | Consistent across data.ts, ai.ts, FAQ |
| HQ | Bengaluru, India | ✓ | Consistent |
| Mumbai office | Mumbai, India | ✓ | Mentioned in data.ts, AI assistant, FAQ |
| US office | Lewes, Delaware, USA | ✓ | Consistent across data.ts, ai.ts, FAQ |
| India phone 1 | +91 98455 70066 | ✓ | Appears in data.ts and contact page |
| India phone 2 | +91 91487 06809 | ✓ | Consistent |
| US phone | +1 (330) 516-7590 | ✓ | Consistent |
| India email | hello.in@oncloudswift.com | ✓ | CloudSwift domain — not example.com |
| US email | sales.us@oncloudswift.co | Note: `.co` not `.com` | Both `.co` and `.com` emails present — intentional? |
| Clients served | 450+ enterprise clients | Partially stale risk | Hard-coded number — will need updating |
| Cloud migrations | 200+ | Partially stale risk | Same |
| Uptime SLA | 99.97% | ✓ | Consistent |
| Critical response | 15 minutes | ✓ | Consistent |
| First-call resolution | ~87% | ✓ | Consistent |
| Website | https://oncloudswift.com | ✓ | Consistent |

### Azure Expert MSP claim — accuracy concern

**Claim in `lib/data.ts:205`:**
> "CloudSwift Technologies is a recipient of the Microsoft Certified Azure Expert MSP accreditation, which is the highest level within the Microsoft partner network, **held by less than 100 partners globally**"

**Issue:** The "less than 100" figure is likely outdated. The Azure Expert MSP program has expanded significantly since its launch. As of 2024–2025, Microsoft lists 100–200+ Azure Expert MSPs globally depending on the region and tier counted. The claim may have been accurate at launch (2023) but is now unverifiable and risks being demonstrably false. It should be updated to a verifiable phrasing such as "one of Microsoft's most selective partner designations" or cross-checked against the current Microsoft partner directory.

### Trust badge accuracy

| Badge claimed | Source | Verifiable? |
|---|---|---|
| Azure Expert MSP | `lib/data.ts` trust array | ✓ Claim is real, number claim needs updating |
| Microsoft Solutions Partner | `lib/data.ts` | ✓ Real designation |
| AWS Partner | `lib/data.ts` | ✓ Real designation |
| Google Cloud Partner | `lib/data.ts` | ✓ Real designation |
| Oracle Cloud MSP | `lib/data.ts` | ✓ Real designation |
| ISO 27001 | `lib/data.ts` + badge image present | ✓ `/images/brand/iso-27001.png` exists |
| SOC 2 Type II | `lib/data.ts` + badge image present | ✓ `/images/brand/soc2.png` exists |

### Email domain inconsistency

| Email | Domain |
|---|---|
| `hello.in@oncloudswift.com` | `.com` |
| `enquiry.in@oncloudswift.com` | `.com` |
| `sales.us@oncloudswift.co` | `.co` (not .com) |
| `hello.us@oncloudswift.co` | `.co` (not .com) |

The India emails use `.com` and the US emails use `.co`. If both are intentional domains, this is fine. If `.co` is a typo for `.com`, the US contact emails are broken.

---

## Step 4 — Blog Content Audit

**Source:** `data/blogs.json` (5 posts)

| Post | Author | Date | Content original? | Links valid? | Cover image issue |
|---|---|---|---|---|---|
| "Azure FinOps Quick Wins" | `CloudSwift Engineering` | 2025-11-12 | ✓ Original CloudSwift content | N/A (no internal links) | ✗ `aerolink.jpg` — Nyro template client photo |
| "Lessons From a Multi-Region AD Migration" | `CloudSwift Engineering` | 2025-09-03 | ✓ Original — implicitly references IFFCO engagement | N/A | ✗ `driveon.jpg` — Nyro template client photo |
| "Enterprise AI Readiness Checklist" | `CloudSwift AI Team` | 2026-01-20 | ✓ Original CloudSwift content | N/A | ✗ `courto.jpg` — Nyro template client photo |
| "How AI Agents Reduce Knowledge Gaps" | `CloudSwift AI Team` | 2026-08-20 | ✓ Original — links to AI service pages | ✓ Internal links confirmed valid | ✗ `courto.jpg` — same image as post 3 |
| "From Notebook to Production: MLOps" | `CloudSwift AI Team` | 2026-08-21 | ✓ Original — links to `/ai-services/ai-model-deployment`, `/ai-services/ai-infrastructure`, `/ai-services/ai-model-monitoring` | ✓ All linked routes exist | ✗ `courto.jpg` — same image as posts 3 and 4 |

### Cover image problem
3 of 5 posts use `/images/courto.jpg` and 1 uses `/images/aerolink.jpg` and 1 uses `/images/driveon.jpg`. All five images are Nyro template portfolio client photographs (startups from a design portfolio), completely unrelated to cloud computing, Azure, or the blog content. These should be replaced with CloudSwift-relevant imagery (data centre, cloud dashboards, enterprise settings).

### Content quality
The blog content is brief (bulleted lists, 3–6 paragraphs) but factually accurate for cloud/AI subject matter. Authors are correctly attributed to CloudSwift teams, not to individual names that might leave the company. No lorem ipsum, no placeholder text in the content bodies.

### Future-dated post
Post 1 ("Azure FinOps Quick Wins") has `publishedAt: "2025-11-12"` — this is in the past as of 2026-09-23. ✓ No date issues currently.

---

## Step 5 — Case Studies / Projects Audit

**Verdict: Not real case studies — they are service catalog entries repurposed as portfolio items.**

From `lib/data.ts:135–158`, `projects` is generated programmatically:

```ts
export const projects = [...catalogSolutions, aiServicesSolution].map((s) => ({
  challenge: s.desc,                    // same text as service description
  goal: `Deliver ${s.title} with clear governance, security, and measurable outcomes.`,  // template string
  solution: `${s.steps.join(" → ")}. Capabilities include ${s.capabilities.join(", ")}.`, // template string
  date: "2025",                         // hardcoded year
  duration: "Ongoing",                  // hardcoded
}));
```

**What this means:**
- The `/solutions/[slug]` pages (e.g., "Microsoft Azure", "Dynamics 365") are presented as portfolio/project pages but contain no real client data, no engagement specifics, no metrics
- The "challenge" section for every "project" is literally the service description text
- The "goal" is a template string: `"Deliver [service name] with clear governance, security, and measurable outcomes."`
- No client names, no quantified outcomes, no before/after metrics anywhere

**The homepage carousel** (`WhyChooseCloudSwift.tsx`) presents 4 "client stories" with Nyro template logos (Carvia, Courto, DriveOn) — these are not CloudSwift clients.

**Real client work confirmed:** The testimonials data and AI knowledge base mention two real engagements:
- IFFCO Dubai — Active Directory migration across 18 regions
- Apex IT Bangalore — on-prem server and AD migration

But neither has a dedicated case study page with metrics, timeline, or client statement beyond the 5 testimonial quotes.

---

## Step 6 — Testimonials Audit

**Source:** `lib/catalog.json` (lines 2656–2687), rendered via `lib/data.ts:192–198`

**Verdict: Likely real client testimonials, attributed by role title only (no photos).**

| Testimonial | Name given | Role | Company | Real? | Photo? |
|---|---|---|---|---|---|
| 1 | Initials: SC | IT Infrastructure Manager | IFFCO, Dubai | Likely real — IFFCO is a verifiable major Indian co-operative with Dubai operations | ✗ No photo — uses initials avatar |
| 2 | Initials: MW | Head of Enterprise Infrastructure | IFFCO, Dubai | Same | ✗ No photo |
| 3 | Initials: PS | Infrastructure Operations Lead | IFFCO, Dubai | Same | ✗ No photo |
| 4 | Initials: AP | IT Operations Lead | Apex, Dubai | Likely real — consistent with AI knowledge "Apex IT Bangalore" | ✗ No photo |
| 5 | Initials: AP | Infrastructure Manager | Apex, Dubai | Same | ✗ No photo |

**Assessment:**
- No generic names ("John Smith", "Jane Doe") — ✓
- No stock photography — ✓ (initials avatars only)
- Company names are real organisations — ✓ (IFFCO is a Fortune Global 500-scale Indian co-operative)
- Content is specific to Azure AD migration work — consistent with stated engagements ✓
- Two different contacts from each company — plausible for enterprise projects ✓
- Role titles rather than full names is an acceptable privacy-conscious practice

**Minor issues:**
- Both Apex testimonials share initials `AP` — could appear as same person
- "IFFCO, Dubai" and "Apex, Dubai" — AI knowledge says "Apex IT Bangalore" not Apex Dubai; slight inconsistency in city
- All 5 testimonials are from 2 clients only — represents a narrow endorsement base

---

## Step 7 — Legal Pages Final Check

### Terms of Service (`app/terms-of-service/page.tsx`)

**The entire Terms of Service body is for a different company providing a different service.**

| Section | Current content | Issue |
|---|---|---|
| Section 2 "Services" | "Nyro Silvan provides UX/UI design, web design, branding, and Framer development services" | Wrong company, wrong services — CloudSwift is a B2B cloud MSP, not a design studio |
| Section 3 "Intellectual Property" | "All designs and deliverables become the property of the client upon full payment. Nyro Silvan retains the right to showcase completed work in portfolio materials" | Inapplicable — CloudSwift delivers managed services and cloud infrastructure, not design work |
| Section 5 "Revisions" | "Each project includes a specified number of revision rounds as outlined in the project agreement." | Framer/design revision model — irrelevant to cloud managed services |
| Section 6 "Limitation of Liability" | "Nyro Silvan shall not be liable for any indirect…" | Wrong entity name in a legally operative clause |
| Section 7 "Contact" | `nyro@example.com` | Broken mailto — bounced emails if anyone uses it |

**Additional gaps in ToS for a cloud MSP:**
- No mention of SLA terms, uptime guarantees, or incident response obligations
- No acceptable use policy for managed cloud environments
- No data processing terms (DPDP Act 2023 requires contractual basis for processing)
- No force majeure, change management, or governed exit clauses
- No jurisdiction (should specify India for B2B clients under DPDP)

### Privacy Policy (`app/privacy-policy/page.tsx`)

| Section | Issue |
|---|---|
| Section 7 "Contact" | `nyro@example.com` — wrong and broken |
| Last updated | January 1, 2025 — stale; does not reflect current data practices |
| Cookie disclosure | "Our website may use cookies" — vague; GTM is actively loaded and places cookies; this is legally insufficient in India and the EU |
| No mention of GTM / Google Analytics | Google Tag Manager is `strategy="beforeInteractive"` on every page — this is a substantive data collection tool and must be disclosed |
| No mention of Calendly | Calendly is referenced in the contact flow and collects personal data; must be disclosed as a third-party data processor |
| No mention of cross-border transfers | CloudSwift serves India, UAE, and US clients; policy must disclose cross-border data transfers |

### DPDP Act 2023 compliance gaps

India's Digital Personal Data Protection Act 2023 imposes specific requirements on websites collecting personal data from Indian residents. CloudSwift's privacy policy is materially non-compliant:

| DPDP Requirement | Status | Risk |
|---|---|---|
| **Consent notice before data collection** | ✗ No consent notice on contact form | HIGH — form collects name, email, company without consent notice |
| **Grievance Officer details required** | ✗ Not mentioned anywhere on site | HIGH — mandatory under DPDP s.13; must name an officer with contact info |
| **Data Fiduciary identity disclosure** | ✗ Privacy policy contact is `nyro@example.com` | HIGH — DPB cannot identify the Data Fiduciary |
| **Data retention periods** | ✗ Not mentioned | MEDIUM — policy must state how long data is held |
| **Right to erasure/correction** | Only generic mention; no process described | MEDIUM — DPDP gives Data Principals specific rights with timelines |
| **Cross-border transfer disclosure** | ✗ Missing | MEDIUM — transfers to US/UAE servers require disclosure |
| **Third-party processor list** | ✗ GTM, Calendly, Cloudways not disclosed | MEDIUM — processors must be named in policy |
| **Cookie consent mechanism** | ✗ No cookie banner, no consent layer | MEDIUM — GTM sets cookies; DPDP requires consent |

### Cookie policy

There is no separate cookie policy and no cookie consent banner on the site. GTM (Google Tag Manager) is loaded `beforeInteractive` on every page — this sets analytics and tracking cookies before any consent is obtained. Under DPDP 2023 and the IT Rules 2021, explicit consent is required for non-essential cookies.

---

## Summary: Priority Fix List

| Priority | Issue | File | Fix |
|---|---|---|---|
| **C1** | Entire ToS body is for Nyro Silvan design studio | `app/terms-of-service/page.tsx` | Rewrite for CloudSwift Technologies cloud MSP |
| **C1** | `nyro@example.com` contact in ToS | `app/terms-of-service/page.tsx:47` | Replace with `hello.in@oncloudswift.com` |
| **C1** | `nyro@example.com` contact in Privacy Policy | `app/privacy-policy/page.tsx:47` | Replace with `hello.in@oncloudswift.com` |
| **C1** | Privacy Policy missing DPDP Grievance Officer | `app/privacy-policy/page.tsx` | Add Section 8 with Grievance Officer name and email |
| **C1** | No cookie consent banner despite GTM running | `app/layout.tsx` | Add consent layer before GTM fires |
| **C2** | Template client logos (Carvia, Courto, DriveOn) on homepage | `components/WhyChooseCloudSwift.tsx` | Replace with real CloudSwift client logos or remove branding |
| **C2** | Blog cover images are Nyro template client photos | `data/blogs.json` | Replace all 5 cover images with relevant cloud/tech imagery |
| **C2** | "Less than 100 Azure Expert MSPs globally" — likely outdated | `lib/data.ts:205` | Verify with Microsoft partner directory; update phrasing |
| **C2** | US email domain `.co` vs `.com` inconsistency | `lib/data.ts:36,37` | Verify both domains are intentional and active |
| **C3** | Projects/solutions page content is template-generated, not real case studies | `lib/data.ts:135–158` | Replace with real CloudSwift engagement case studies |
| **C3** | `alt="Client logo placeholder"` on carousel | `components/WhyChooseCloudSwift.tsx:127` | Update alt text when logos are replaced |
| **C3** | Privacy policy does not mention GTM, Calendly, or cloud infrastructure processors | `app/privacy-policy/page.tsx` | Add third-party processor section |

---

*Audit complete. No source files were modified.*
