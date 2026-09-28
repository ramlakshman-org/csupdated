# CloudSwift app-main — Security Audit
**Audited:** 2026-09-23  
**Scope:** `Cloudswift.app-main` codebase (READ-ONLY — no files modified)  
**Stack:** Next.js 16.3.0 · React 19 · Framer Motion 13 · Standalone output  
**Auditor:** Claude Sonnet 4.6

---

## Step 1 — Credentials & Secret Exposure

### Source-code hits (excluding `node_modules`, `.next/`)

| File:Line | Found | Risk |
|-----------|-------|------|
| `lib/auth.ts:6` | `process.env.ADMIN_PASSWORD \|\| "cloudswift-admin"` — **hardcoded fallback password** | **Critical** |
| `lib/auth.ts:16` | `sign()` is `Buffer.from("cs:" + password).toString("base64url")` — Base64 is **not a hash, not a MAC**. The "session token" is trivially reversible. | **Critical** |
| `lib/auth.ts:3` | Cookie name `"cs_admin_session"` is exposed in source — attacker can name-guess the cookie | Medium |
| `next.config.ts:1` | Comment: "Allow CloudSeek-sourced images in the **Nyro template**" — template origin disclosed | Low |
| `lib/ai.ts:1` | Comment: "adapted from cloudseek backend system-prompt.ts" — internal system name disclosed | Low |

### No `.env` or `.env.local` files found in the repo
- No `.env` files exist at all. This means:
  - `ADMIN_PASSWORD` is not set → the hardcoded default `"cloudswift-admin"` is the active password in any environment that hasn't set this variable.
  - There is no secret management in place. **If `ADMIN_PASSWORD` is not set on the production host, any visitor can log in to `/admin` with the password `cloudswift-admin`.**

### Hardcoded default password detail (`lib/auth.ts:6`)
```ts
export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "cloudswift-admin";
}
```
If `ADMIN_PASSWORD` env var is absent (which it is in this repo — no `.env` found), the admin password is the literal string `cloudswift-admin`. The login endpoint at `POST /api/admin/login` accepts this and issues a cookie.

---

## Step 2 — NEXT_PUBLIC_ Variable Exposure

**Grep result:** Zero `NEXT_PUBLIC_` variables found anywhere in the codebase.

This is actually correct — no secrets are being exposed to the browser via `NEXT_PUBLIC_` prefixed variables. All sensitive values (admin password, cookie secret) are server-side only via `process.env`.

**However:** The absence of any `.env` file means the only "secret" (`ADMIN_PASSWORD`) is the hardcoded fallback, which is worse than an exposed `NEXT_PUBLIC_` variable because the value is committed to source history.

| Variable | Status |
|----------|--------|
| `NEXT_PUBLIC_*` | None found — ✓ |
| `ADMIN_PASSWORD` | Not set anywhere; falls back to hardcoded `"cloudswift-admin"` — **Critical** |

---

## Step 3 — Admin Route Protection

### `/admin/page.tsx`
```ts
export default async function AdminIndex() {
  if (await isAdminAuthenticated()) redirect("/admin/blogs");
  redirect("/admin/login");
}
```
- **Server-side check:** ✓ — uses `isAdminAuthenticated()` which reads the `cs_admin_session` cookie server-side via Next.js `cookies()`.
- **Redirect if unauthenticated:** ✓ — always redirects to `/admin/login`.

### `/admin/login/page.tsx`
- **Client component** (`"use client"`) — the login page itself has no auth check (correct, it is the login page).
- Sends credentials to `POST /api/admin/login` — server-side route.
- **No rate limiting** on the login form or the API endpoint — brute force is unrestricted. **High risk.**
- No CSRF protection on the login POST.

### `/admin/blogs/page.tsx`
- **Client component** (`"use client"`) — auth is checked indirectly: it calls `GET /api/blogs?all=1` and redirects to `/admin/login` if it receives a 401.
- **This is client-side auth enforcement** — the page HTML renders before the auth check fires. A fast network request can read the page structure before the redirect happens.
- **No server-side check at the page level** — unlike `/admin/page.tsx`, the blogs page has no `isAdminAuthenticated()` call before rendering. The redirect only happens after the initial `useEffect` fires.
- **Direct API access bypass:** An authenticated user (or someone who has the cookie) can call `GET /api/blogs?all=1`, `POST /api/blogs`, `PUT /api/blogs/[id]`, `DELETE /api/blogs/[id]`, and `POST /api/upload` directly with the cookie. These API routes do check `isAdminAuthenticated()` server-side — **this part is correct**.

### Summary

| Route | Server-side check | Redirect if unauth | Risk |
|-------|------------------|--------------------|------|
| `/admin` | ✓ Server async component | ✓ | Low (correctly guarded) |
| `/admin/login` | N/A (is the login page) | N/A | N/A |
| `/admin/blogs` | ✗ Client component — auth via `useEffect` only | ✗ (client redirect only) | **High** |
| `POST /api/admin/login` | ✓ Checks password | — | No rate limiting — High |
| `GET /api/blogs?all=1` | ✓ `isAdminAuthenticated()` | 401 returned | OK |
| `POST /api/blogs` | ✓ | — | OK |
| `POST /api/upload` | ✓ | — | See Step 3 notes |

### Upload endpoint risk (`app/api/upload/route.ts`)
- Auth-gated (`isAdminAuthenticated()`) — ✓
- Accepts any file type (only checks `file instanceof File`)
- **No file-type validation** — an authenticated attacker could upload `.php`, `.js`, `.html`, or any other file to `/public/uploads/`. The files land in the `public/` directory and are served statically.
- Files are served at `/uploads/<uuid>.<ext>` — no content-type restriction, no malware scan.
- **Risk:** authenticated admin could upload an HTML/JS file and serve it from the same origin — potential for stored XSS if any page ever renders the URL without escaping. **Medium.**

---

## Step 4 — Middleware Check

**`middleware.ts` does not exist.**

This is a **Critical** finding.

Without middleware:
- `/admin/blogs` page HTML is served to any unauthenticated visitor before Next.js has a chance to run the client-side redirect.
- `/admin/login` is crawlable and discoverable.
- There is no edge-level enforcement of auth on any `/admin/*` route.
- Bots, crawlers, and attackers can observe the admin UI structure.

The auth check on `/admin/page.tsx` (server component) does work correctly, but:
1. It only covers `/admin` — not `/admin/blogs` directly.
2. There is no middleware-level blanket protection for the `/admin/*` namespace.
3. A visitor who navigates directly to `/admin/blogs` will have the page partially rendered client-side before the `useEffect` triggers the redirect.

**Required fix:** Create `middleware.ts` at the repo root to protect all `/admin/*` routes at the edge, before any page renders.

---

## Step 5 — HTTP Security Headers

**`next.config.ts` has NO `headers()` configuration.**

The file only contains:
- `output: "standalone"`
- `images` config
- `redirects()`

No security headers are set at the Next.js level.

| Header | Present | Attack it prevents |
|--------|---------|-------------------|
| `Content-Security-Policy` | ✗ Missing | XSS, clickjacking, injection of untrusted scripts |
| `X-Frame-Options` | ✗ Missing | Clickjacking — site can be embedded in an iframe |
| `X-Content-Type-Options: nosniff` | ✗ Missing | MIME-type sniffing attacks — browsers guess content type |
| `Referrer-Policy` | ✗ Missing | Referrer header leaks internal URLs to third-party requests |
| `Permissions-Policy` | ✗ Missing | Controls browser APIs (camera, mic, geolocation) |
| `Strict-Transport-Security` | ✗ Missing | Forces HTTPS; prevents protocol downgrade / SSL-strip attacks |

**All 6 standard security headers are absent.** This is a significant hardening gap, especially:
- Without **CSP**, any XSS vulnerability (e.g. if the blog content ever renders raw HTML) can run arbitrary scripts.
- Without **X-Frame-Options** or CSP `frame-ancestors`, the site can be embedded in an iframe for clickjacking attacks (fake login, phishing overlay).
- Without **HSTS**, browsers do not enforce HTTPS on subsequent visits.

**Required fix:** Add a `headers()` block to `next.config.ts` covering all routes (`source: "/(.*)"`) with at minimum X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and HSTS.

---

## Step 6 — Dependency Vulnerabilities

### `package.json` — All dependencies

| Package | Pinned Version | Notes |
|---------|---------------|-------|
| `next` | `16.3.0` | Recent major release. `npm audit` required to confirm no CVEs. |
| `react` | `19.2.8` | Current stable. Low risk. |
| `react-dom` | `19.2.8` | Same. |
| `framer-motion` | `^13.1.0` | Animation library — no known critical CVEs. Client-side only. |
| `cross-env` | `^10.1.0` | Dev only — sets env vars cross-platform. Low risk. |
| `eslint` | `^9` | Dev only. |
| `eslint-config-next` | `16.3.0` | Dev only. |
| `sharp` | `^0.34.5` | Image processing — runs server-side. Check for CVEs (libvips). |
| `typescript` | `^5` | Dev only. |

### Manual step required
`npm audit` cannot be run in this read-only session. Must be run manually:
```bash
cd Cloudswift.app-main
npm audit --production
```
Pay particular attention to `sharp` (wraps native `libvips`) and any transitive dependencies of `next` that handle HTTP parsing or file uploads.

---

## Step 7 — Contact Form Injection Risk

`app/contact/ContactPage.tsx` — the form's `handleSubmit`:
```ts
function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSubmitted(true);
}
```

The form currently does nothing — it is a UI stub (also flagged in UI_AUDIT.md as C1). This means there is currently **zero injection risk** because no data is processed or stored.

**However**, when this form is wired to a real backend, the following controls must be in place:

| Control | Current Status | Required before go-live |
|---------|---------------|------------------------|
| Input sanitisation | ✗ None (form is stub) | Server-side: strip/escape HTML from all text fields before storage or email |
| Rate limiting | ✗ None | Add rate limit per IP on the submission endpoint (e.g. 5 requests/min) |
| CSRF protection | ✗ None | Next.js server actions include built-in CSRF (origin check) — prefer server actions over raw fetch |
| Email injection | ✗ Not applicable yet | Validate `email` field strictly (regex + domain check) before passing to email service |
| Honeypot field | ✗ None | Add a hidden field — bots fill it, humans don't; reject any submission where it's filled |
| reCAPTCHA / Turnstile | ✗ None | Add bot protection before making the form live |

---

## Step 8 — robots.ts Security

`app/robots.ts` content:
```ts
return {
  rules: { userAgent: "*", allow: "/" },
  sitemap: `${ORIGIN}/sitemap.xml`,
  host: ORIGIN,
};
```

**Admin routes are not disallowed.**

| Route | Crawlable? | Should be blocked? |
|-------|-----------|-------------------|
| `/admin` | ✓ Yes | **Yes** |
| `/admin/login` | ✓ Yes | **Yes** |
| `/admin/blogs` | ✓ Yes | **Yes** |

These are actively discoverable via Google. A search for `site:oncloudswift.com inurl:admin` could expose the admin panel URL. While the admin panel requires a password, exposing its existence and URL structure widens the attack surface.

---

## Security Findings Table

| ID | File:Line | Issue | Risk |
|----|-----------|-------|------|
| S-01 | `lib/auth.ts:6` | Hardcoded fallback admin password `"cloudswift-admin"` — no `.env` file found, so this is the active password | **Critical** |
| S-02 | `lib/auth.ts:15-17` | `sign()` uses Base64 encoding — trivially reversible, not a cryptographic signature | **Critical** |
| S-03 | *(repo root)* | No `middleware.ts` — `/admin/*` routes have no edge-level auth protection | **Critical** |
| S-04 | `next.config.ts` | Zero HTTP security headers configured — CSP, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy all absent | **High** |
| S-05 | `app/api/admin/login/route.ts` | No rate limiting on login endpoint — brute force unrestricted | **High** |
| S-06 | `app/admin/blogs/page.tsx` | Client component with no server-side auth — page HTML rendered before `useEffect` redirect fires | **High** |
| S-07 | `app/robots.ts` | `/admin`, `/admin/login`, `/admin/blogs` not disallowed — admin URLs crawlable and Google-indexable | **High** |
| S-08 | `app/api/upload/route.ts` | No file-type whitelist on upload — any extension accepted and served from `public/uploads/` | **Medium** |
| S-09 | `app/contact/ContactPage.tsx` | Form is a stub — no rate limiting, CSRF, or sanitisation in place for when it is wired | **Medium** |
| S-10 | `app/admin/login/page.tsx` | No CSRF token on login POST — Cross-Site Request Forgery possible on login endpoint | **Medium** |
| S-11 | `lib/auth.ts:3` | Cookie name `cs_admin_session` exposed in source — helps attackers identify target cookie | Low |

---

## Top 5 Fixes (Critical First)

### 1. Set a real `ADMIN_PASSWORD` and fix the signing function — `lib/auth.ts`
**Severity: Critical**

Two problems:
- No `.env` file → fallback `"cloudswift-admin"` is active in production.
- `sign()` uses Base64, not HMAC. If an attacker knows the algorithm (it's in source), they can forge a session token without the password.

**Fix:**
1. Create `.env.local` (gitignored): `ADMIN_PASSWORD=<long-random-string>`
2. Replace `sign()` with HMAC-SHA256:
```ts
import { createHmac } from "crypto";

export function sign(password: string) {
  const secret = process.env.ADMIN_COOKIE_SECRET || "change-this-secret";
  return createHmac("sha256", secret).update(`cs:${password}`).digest("hex");
}
```
Add `ADMIN_COOKIE_SECRET` as a separate env var so a password change doesn't invalidate the token formula.

---

### 2. Create `middleware.ts` to protect `/admin/*` at the edge
**Severity: Critical**

```ts
// middleware.ts (place at repo root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/auth";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin") &&
      !req.nextUrl.pathname.startsWith("/admin/login")) {
    const cookie = req.cookies.get(ADMIN_COOKIE);
    if (!cookie) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
```
This blocks unauthenticated rendering of `/admin/blogs` and any future admin pages at the edge, before Next.js renders anything.

---

### 3. Add HTTP security headers in `next.config.ts`
**Severity: High**

```ts
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      ],
    },
  ];
},
```
Add a `Content-Security-Policy` separately after auditing all script/image sources (Calendly, WhatsApp, Google Fonts, GTM require explicit allow-listing).

---

### 4. Add rate limiting to the login endpoint and block admin in robots.txt
**Severity: High**

**Login rate limit:** Next.js does not have built-in rate limiting. Options:
- Use Vercel Edge Middleware with `@vercel/kv` to track attempts per IP.
- Add Cloudflare WAF rate-limiting rule on `POST /api/admin/login` (5 req/min per IP).
- Use the `rate-limiter-flexible` npm package with an in-memory or Redis store.

**robots.ts:**
```ts
return {
  rules: [
    { userAgent: "*", allow: "/", disallow: ["/admin/", "/admin/login", "/admin/blogs"] },
  ],
  sitemap: `${ORIGIN}/sitemap.xml`,
  host: ORIGIN,
};
```

---

### 5. Wire the contact form to a real backend with input sanitisation and CSRF protection
**Severity: Medium (becomes Critical once wired)**

When the contact form is made functional (UI audit C1):
- Convert to a **Next.js Server Action** — these include built-in CSRF (origin check via `x-forwarded-host` comparison).
- Sanitise text inputs server-side before emailing (strip HTML tags).
- Add a honeypot hidden field.
- Add Cloudflare Turnstile or Google reCAPTCHA v3 before the form goes live.
- Restrict file uploads in `app/api/upload/route.ts` to image MIME types only.

---

## Manual Steps Required

These cannot be completed automatically and need human action before production:

| Step | Tool | Why |
|------|------|-----|
| **`npm audit --production`** | npm CLI | Check all transitive dependencies for known CVEs — especially `sharp` (libvips) |
| **Verify `ADMIN_PASSWORD` is set on the production host** | Vercel / server env | If not set, the hardcoded default is active right now |
| **Penetration test scope for go-live** | External pentest firm | Cover: admin brute force, upload bypass, XSS via blog content, cookie forgery |
| **Enable Cloudflare WAF** | Cloudflare dashboard | Bot protection, DDoS mitigation, rate limiting on API routes |
| **Google Search Console check** | GSC | Verify `/admin/` is not already indexed — submit robots.txt update and request removal if needed |
| **Secrets rotation** | Host env settings | Once `ADMIN_COOKIE_SECRET` and `ADMIN_PASSWORD` are created, rotate them before going live |

---

*End of security audit — 11 findings, 3 Critical, 4 High, 4 Medium/Low.*
