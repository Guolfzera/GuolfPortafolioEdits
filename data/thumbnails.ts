// Miniaturas de YouTube que hiciste. Guarda la imagen en public/thumbnails/ (JPG 1920x1080 o 1280x720)
// y agrega una línea. alt describe la miniatura para Google; creator aparece sobre el título.
export type Thumbnail = { src: string; title: string; creator: string; alt: string };

export const thumbnails: Thumbnail[] = [
  {
    src: "/thumbnails/miniatura-youtube-cumpleanos-dani-diego-venegas.jpg",
    title: "Vlog #2 · Cumpleaños Dani",
    creator: "Diego Venegas",
    alt: "Miniatura de YouTube vlog cumpleaños de Dani con Diego Venegas: casi nos chocan",
  },
  {
    src: "/thumbnails/miniatura-youtube-minecraft-hardcore-vichoobtw.jpg",
    title: "Minecraft Hardcore · Día 2",
    creator: "Vichoobtw",
    alt: "Miniatura de YouTube Minecraft Hardcore día 2 con Vichoobtw, Mrlujooo y Chetalonsoidh",
  },
  {
    src: "/thumbnails/miniatura-youtube-minecraft-hardcore-dia-2-vichoobtw.jpg",
    title: "Minecraft Hardcore · Día 2 (versión alternativa)",
    creator: "Vichoobtw",
    alt: "Miniatura alternativa de YouTube Minecraft Hardcore día 2 con Vichoobtw reaccionando",
  },
];

// Texto del aviso de precios. Cuando ya tengas más miniaturas, puedes cambiarlo o dejar launch: false para ocultarlo.
export const thumbnailOffer = {
  launch: true,
  badge: "Precio de lanzamiento",
  title: "Estoy empezando con las miniaturas",
  text: "Por eso, por ahora mis precios son más bajos y los conversamos según lo que necesites. También puedes pedir el pack video + miniatura.",
};
