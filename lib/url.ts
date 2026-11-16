// Dirección pública del sitio. Si conectas un dominio propio, ponlo en NEXT_PUBLIC_SITE_URL
// (Vercel → Settings → Environment Variables). Si no, Vercel entrega su dominio de producción solo.
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (fromVercel ? `https://${fromVercel}` : "https://guolf-portafolio-edits.vercel.app")
).replace(/\/$/, "");
