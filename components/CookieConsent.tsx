"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CookieConsent.module.css";

const STORAGE_KEY = "cloudswift_consent";
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

function initPixel() {
  if (!PIXEL_ID || (window as any).fbq) return;
  const s = document.createElement("script");
  s.text = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`;
  document.head.appendChild(s);
}

function pushConsentGranted() {
  const dl = ((window as any).dataLayer = (window as any).dataLayer || []);
  dl.push({ event: "consent_update" });
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
    });
  }
  initPixel();
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      } else if (stored === "granted") {
        pushConsentGranted();
      }
    } catch {
      // localStorage unavailable (private mode) — show banner
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem(STORAGE_KEY, "granted"); } catch { /* noop */ }
    pushConsentGranted();
    setVisible(false);
  };

  const decline = () => {
    try { localStorage.setItem(STORAGE_KEY, "denied"); } catch { /* noop */ }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      aria-live="polite"
    >
      <p className={styles.text}>
        We use cookies for analytics and personalised advertising. Under India&apos;s DPDP Act 2023, your consent is required before we process any personal data. See our{" "}
        <Link href="/privacy-policy" className={styles.link}>
          Privacy Policy
        </Link>{" "}
        for details.
      </p>
      <div className={styles.actions}>
        <button type="button" onClick={decline} className={styles.decline}>
          Decline
        </button>
        <button type="button" onClick={accept} className={styles.accept}>
          Accept all
        </button>
      </div>
    </div>
  );
}
