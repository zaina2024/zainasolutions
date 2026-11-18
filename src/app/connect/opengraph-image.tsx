import { ImageResponse } from "next/og";
import { CONNECT_PROFILE as P } from "@/lib/connect";
import { CONNECT_PHOTO_JPEG_BASE64 } from "@/lib/connect-photo";

export const alt = `${P.name}, ${P.role} of ${P.company}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ConnectOpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(ellipse 70% 80% at 85% 100%, rgba(224,71,59,0.30), transparent 60%)",
          padding: "0 96px",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${CONNECT_PHOTO_JPEG_BASE64}`}
          width={300}
          height={300}
          alt=""
          style={{
            borderRadius: 999,
            border: "6px solid rgba(255,255,255,0.12)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
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
          <div
            style={{
              marginTop: 22,
              color: "#f4f2ee",
              fontSize: 80,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {P.name}
          </div>
          <div style={{ marginTop: 16, color: "#f2574a", fontSize: 36 }}>{P.role}</div>
          <div
            style={{
              marginTop: 40,
              color: "#9a9aa2",
              fontSize: 24,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            zainasolutions.com/connect
          </div>
        </div>
      </div>
    ),
    size
  );
}
