// Tus videos. Para agregar uno, copia un bloque y cambia los datos.
// category: "marca" (Marcas & Publicidad) | "entretenimiento" | "social" (Edits / Social)
// url: link de YouTube (incluye Shorts) o Vimeo.
// client: creador o marca que aparece sobre el título.
// vertical: true para videos 9:16 (reels, shorts, tiktoks).
// thumbnail (opcional): imagen propia en /public para la miniatura.
// El orden de esta lista es el orden en que aparecen en la página.
import type { Video } from "@/lib/video";

export const videos: Video[] = [
  {
    title: "Campaña AMD París",
    client: "Blumecl",
    category: "marca",
    url: "https://youtube.com/shorts/rsJ7dgm_hPk",
    vertical: true,
  },
  {
    title: "Clip: implante de pelo",
    client: "Rakyz",
    category: "social",
    url: "https://youtube.com/shorts/kkHAWou0yh4",
    vertical: true,
  },
  {
    title: "Campaña Fortnite",
    client: "Blumecl",
    category: "marca",
    url: "https://youtube.com/shorts/HmjQ3YX7XpQ",
    vertical: true,
  },
  {
    title: "Reel adivinanza",
    client: "Weones Pencas",
    category: "entretenimiento",
    url: "https://youtube.com/shorts/yYxH_KKlR_8",
    vertical: true,
  },
  {
    title: "Campaña MG Motors",
    client: "Flavia Martin",
    category: "marca",
    url: "https://youtube.com/shorts/d0VzkVCgkn0",
    vertical: true,
  },
  {
    title: "Reel metro",
    client: "Weones Pencas",
    category: "entretenimiento",
    url: "https://youtube.com/shorts/LFeZzu8S21k",
    vertical: true,
  },
  {
    title: "Campaña Delicious Pro",
    client: "Diego Venegas",
    category: "marca",
    url: "https://youtube.com/shorts/oiqMQb-K1EY",
    vertical: true,
  },
  {
    title: "Reel adivinanza 2",
    client: "Weones Pencas",
    category: "entretenimiento",
    url: "https://youtube.com/shorts/rhgQjib5Cx4",
    vertical: true,
  },
];
