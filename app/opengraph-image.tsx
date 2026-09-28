import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = readFileSync(
    join(process.cwd(), "public/images/brand/logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #0b1628 0%, #1B2B4B 100%)",
          padding: "64px 80px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top-right glow blob */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-100px",
            width: "560px",
            height: "460px",
            background:
              "radial-gradient(ellipse at center, rgba(56,132,255,0.28) 0%, rgba(100,60,220,0.12) 55%, transparent 75%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />

        {/* Bottom-left soft glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "-60px",
            width: "360px",
            height: "300px",
            background:
              "radial-gradient(ellipse at center, rgba(56,132,255,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            display: "flex",
          }}
        />

        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            display: "flex",
          }}
        />

        {/* Logo */}
        <img
          src={logoSrc}
          width={260}
          height={54}
          style={{ objectFit: "contain", objectPosition: "left center" }}
        />

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Gold accent bar */}
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "#C9A961",
              borderRadius: "2px",
              marginBottom: "8px",
              display: "flex",
            }}
          />

          <div
            style={{
              fontSize: "60px",
              fontWeight: 300,
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            Stop Wasting Cloud Spend.
          </div>

          <div
            style={{
              fontSize: "44px",
              fontWeight: 300,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "-1.5px",
              display: "flex",
            }}
          >
            Start Scaling Securely.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {[
            "450+ Enterprise Clients",
            "99.97% Uptime SLA",
            "15-min P1 Response",
          ].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "10px 22px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.13)",
                borderRadius: "100px",
                fontSize: "15px",
                color: "rgba(255,255,255,0.65)",
                letterSpacing: "0.2px",
              }}
            >
              {label}
            </div>
          ))}

          <div
            style={{
              marginLeft: "auto",
              fontSize: "17px",
              color: "rgba(255,255,255,0.28)",
              letterSpacing: "0.5px",
              display: "flex",
            }}
          >
            oncloudswift.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
