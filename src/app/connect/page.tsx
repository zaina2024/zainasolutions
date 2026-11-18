import type { Metadata, Viewport } from "next";
import { CONNECT_PROFILE as P } from "@/lib/connect";
import { ConnectView } from "./ConnectView";

export const metadata: Metadata = {
  title: `${P.name} · ${P.role}`,
  description: `${P.name}, ${P.role} of ${P.company}. Save the contact, call, WhatsApp, email, or see our work.`,
  alternates: { canonical: "/connect" },
  openGraph: {
    type: "profile",
    url: "/connect",
    title: `${P.name} · ${P.company}™`,
    description: `${P.role}, ${P.company}. Tap to save contact, call, WhatsApp or email.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${P.name} · ${P.company}™`,
    description: `${P.role}, ${P.company}. Tap to save contact, call, WhatsApp or email.`,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function ConnectPage() {
  return <ConnectView />;
}
