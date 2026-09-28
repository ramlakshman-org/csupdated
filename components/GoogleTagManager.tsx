import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MTQ9HQZR";

// Runs synchronously in <head> before any tag fires.
// Reads the stored consent choice (denied by default for new visitors).
// wait_for_update: 500 gives returning visitors 500ms for a consent update
// to arrive before GA4 counts the session — prevents missed sessions for
// users who previously accepted.
const CONSENT_DEFAULT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;var _c='denied';try{_c=localStorage.getItem('cloudswift_consent')==='granted'?'granted':'denied';}catch(e){}gtag('consent','default',{'ad_storage':_c,'analytics_storage':_c,'wait_for_update':500});`;

export function GoogleTagManagerConsent() {
  return (
    <Script id="gtm-consent-default" strategy="beforeInteractive">
      {CONSENT_DEFAULT}
    </Script>
  );
}

// Loads GTM after the page is fully idle — no render-blocking.
export function GoogleTagManager() {
  return (
    <Script
      id="google-tag-manager"
      src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
      strategy="lazyOnload"
    />
  );
}

export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
