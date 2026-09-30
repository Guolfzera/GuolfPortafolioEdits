import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/data/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
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
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    type: "website",
    locale: "es_CL",
  },
  // Evita que la extensión Dark Reader altere los colores del diseño (y los errores de hidratación que provoca)
  other: { "darkreader-lock": "true" },
};

// Datos estructurados para que Google entienda quién eres y qué haces
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.about.fullName,
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
