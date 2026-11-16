import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/url";

// Permite que los buscadores lean todo el sitio y les indica dónde está el sitemap (/robots.txt)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
