// Tus videos. Para agregar uno, copia un bloque y cambia los datos.
// category: "marca" | "entretenimiento" | "social"
// url: link de YouTube (incluye Shorts) o Vimeo. Vacío = tarjeta "Próximamente".
// vertical: true para videos 9:16 (reels, shorts, tiktoks).
// thumbnail (opcional): imagen propia en /public para la miniatura.
import type { Video } from "@/lib/video";

export const videos: Video[] = [
  { title: "Campaña AMD", client: "AMD", category: "marca", url: "" },
  { title: "Clips de stream", client: "Streamers", category: "social", url: "", vertical: true },
  // Ejemplo funcionando: reemplázalo por un video tuyo
  { title: "Video de ejemplo", category: "entretenimiento", url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ" },
  { title: "Campaña Fortnite", client: "Fortnite", category: "marca", url: "", vertical: true },
  { title: "Speed ramp edit", category: "social", url: "", vertical: true },
  { title: "Weones Pencas", client: "Podcast", category: "entretenimiento", url: "", vertical: true },
  { title: "Vlog", client: "YouTube", category: "entretenimiento", url: "" },
  { title: "Campaña MG Motors", client: "MG Motors", category: "marca", url: "" },
  { title: "Music sync edit", category: "social", url: "", vertical: true },
  { title: "Campaña Delicious Pro", client: "Delicious Pro", category: "marca", url: "", vertical: true },
];
