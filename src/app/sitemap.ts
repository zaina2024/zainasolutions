import type { MetadataRoute } from "next";
import { PROJECTS, coverOf } from "@/lib/projects";

const SITE = "https://zainasolutions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const caseStudies: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${SITE}/work/${p.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${SITE}${coverOf(p)}`],
  }));

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
      priority: 0.9,
      images: [`${SITE}/work/opengraph-image`],
    },
    ...caseStudies,
  ];
}
