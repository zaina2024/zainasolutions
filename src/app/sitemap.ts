import type { MetadataRoute } from "next";

const SITE = "https://zainasolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE}/opengraph-image`],
    },
    {
      url: `${SITE}/work`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${SITE}/work/opengraph-image`],
    },
  ];
}
