import type { Metadata, Viewport } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import { ChatWidget } from "@/components/site/ChatWidget";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE = "https://zainasolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Zaina Solutions™ - Technology Company",
    template: "%s · Zaina Solutions™",
  },
  description:
    "Zaina Solutions is a technology company that turns ideas into digital assets. We design and build high-performance websites, SaaS platforms, business systems, and brand identities for startups and growing businesses across India and beyond.",
  keywords: [
    "Zaina Solutions",
    "technology company India",
    "web development",
    "app development",
    "SaaS platforms",
    "branding",
    "UI/UX design",
    "digital assets",
    "Calicut",
  ],
  authors: [{ name: "Zaina Solutions" }],
  creator: "Zaina Solutions",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE,
    siteName: "Zaina Solutions™",
    title: "Zaina Solutions™ - We turn Zero Asset into Novel Artifact",
    description:
      "A technology company that turns ideas into digital assets. We build high-performance websites, SaaS platforms, business systems, and brand identities for growing businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaina Solutions™ - We turn Zero Asset into Novel Artifact",
    description:
      "A technology company that turns ideas into digital assets. Websites, SaaS platforms, business systems, and branding for growing businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/icon.webp", type: "image/webp" }],
    shortcut: [{ url: "/icon.webp", type: "image/webp" }],
    apple: [{ url: "/icon.webp", type: "image/webp" }],
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Zaina Solutions",
  legalName: "Zaina Innovators LLP",
  alternateName: "Zaina Solutions™",
  url: SITE,
  logo: `${SITE}/icon.webp`,
  image: `${SITE}/opengraph-image`,
  description:
    "A technology company that turns ideas into digital assets: websites, SaaS platforms, business systems, and branding for growing businesses.",
  slogan: "Zero Asset into Novel Artifact",
  email: "info@zainasolutions.com",
  telephone: "+918714313489",
  address: {
    "@type": "PostalAddress",
    streetAddress: "HiLITE Business Park",
    addressLocality: "Calicut",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  areaServed: "IN",
  founder: {
    "@type": "Person",
    name: "Muhammed Shifal",
    jobTitle: "Founder & CEO",
    sameAs: ["https://www.linkedin.com/in/muhammedshifal/"],
  },
  sameAs: [
    "https://www.instagram.com/zainasolutions",
    "https://www.linkedin.com/company/thezainasolution/",
    "https://www.facebook.com/people/Zaina-Solutions/61568530567019/",
  ],
  knowsAbout: [
    "Website Development",
    "App Development",
    "Branding",
    "UI/UX Design",
    "AI Automation",
    "MVP Development",
  ],
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${outfit.variable} ${geistMono.variable} antialiased`}
    >
      <body
        suppressHydrationWarning
        className="bg-void text-paper font-sans selection:bg-signal selection:text-paper"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
