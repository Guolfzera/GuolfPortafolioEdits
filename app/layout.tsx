import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/url";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.description,
  keywords: [
    "editor de video",
    "edición de video",
    "clipper",
    "clips de stream",
    "editor de video Chile",
    "Premiere Pro",
    "After Effects",
    site.about.alias,
  ],
  authors: [{ name: `${site.about.fullName} «${site.about.alias}»` }],
  alternates: { canonical: "/" },
  // La imagen de vista previa (app/opengraph-image.tsx) la agrega Next.js sola a openGraph y twitter
  openGraph: {
    title,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
    locale: "es_CL",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  // Evita que la extensión Dark Reader altere los colores del diseño (y los errores de hidratación que provoca)
  other: { "darkreader-lock": "true" },
};

// Datos estructurados para que Google entienda quién eres y qué haces
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.about.fullName,
  url: siteUrl,
  image: `${siteUrl}${site.about.photo}`,
  alternateName: [site.about.alias, site.name],
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${site.contact.email}`,
  sameAs: [site.contact.instagram, site.contact.tiktok, site.contact.youtube].filter(Boolean),
  knowsAbout: ["Edición de video", "Clips de stream", ...site.about.tools],
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${display.variable}`}>
      <body className="grain font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
