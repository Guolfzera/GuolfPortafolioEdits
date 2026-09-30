// Tus videos. Para agregar uno, copia un bloque y cambia los datos.
// category: "marca" | "entretenimiento" | "social"
// url: link de YouTube (incluye Shorts) o Vimeo. Vacío = tarjeta de ejemplo.
// vertical: true para videos 9:16 (reels, shorts, tiktoks).
// thumbnail (opcional): imagen propia en /public para la miniatura.
import type { Video } from "@/lib/video";

export const videos: Video[] = [
  { title: "Campaña de lanzamiento", client: "Marca deportiva", category: "marca", url: "" },
  { title: "Speed ramp edit", category: "social", url: "", vertical: true },
  // Ejemplo funcionando: reemplázalo por un video tuyo
  { title: "Videoclip oficial", client: "Artista", category: "entretenimiento", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
  { title: "Spot 30s", client: "Restaurante", category: "marca", url: "", vertical: true },
  { title: "Music sync edit", category: "social", url: "", vertical: true },
  { title: "Aftermovie festival", category: "entretenimiento", url: "" },
  { title: "Reel de producto", client: "Tienda online", category: "marca", url: "" },
  { title: "Transiciones al beat", category: "social", url: "", vertical: true },
  { title: "Podcast highlights", category: "entretenimiento", url: "", vertical: true },
];
