import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/url";

// Le dice a Google qué páginas tiene el sitio (/sitemap.xml)
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
