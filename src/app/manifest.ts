import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zaina Solutions",
    short_name: "Zaina",
    description:
      "A technology company that turns ideas into digital assets: websites, SaaS platforms, business systems, and branding.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/icon.webp",
        sizes: "any",
        type: "image/webp",
        purpose: "any",
      },
    ],
  };
}
