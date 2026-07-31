import { ImageResponse } from "next/og";

export const alt = "Zaina Solutions™ - We turn Zero Asset into Novel Artifact";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(224,71,59,0.16), transparent 60%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, backgroundColor: "#f2574a" }} />
          <div
            style={{
              color: "#9a9aa2",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Zaina Solutions™
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              color: "#f4f4f5",
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.1,
              maxWidth: 920,
            }}
          >
            We turn Zero Asset into&nbsp;
            <span style={{ color: "#f2574a" }}>Novel Artifact.</span>
          </div>
          <div
            style={{
              marginTop: 28,
              color: "#9a9aa2",
              fontSize: 28,
              maxWidth: 820,
              lineHeight: 1.45,
            }}
          >
            A technology company turning ideas into digital assets. Websites,
            SaaS platforms, business systems, and branding.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
            color: "#9a9aa2",
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <div>zainasolutions.com</div>
          <div>Calicut · India</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
