// Servicios que ofreces. featured: true hace la tarjeta más ancha (usa solo una).
// icon: "camera" | "idea" | "youtube" | "clips" | "brand"
export type Service = {
  icon: "camera" | "idea" | "youtube" | "clips" | "brand";
  title: string;
  text: string;
  tags: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    icon: "camera",
    title: "Producción con equipo",
    text: "Trabajo junto a un equipo con cámara para grabar eventos y producir videos más elaborados, desde el rodaje hasta la edición final.",
    tags: ["Eventos", "Rodaje", "Videos producidos"],
    featured: true,
  },
  {
    icon: "idea",
    title: "Idea y creatividad",
    text: "Te ayudo con la parte creativa: concepto, estructura y estilo del video para que conecte con tu audiencia.",
    tags: ["Concepto", "Estructura", "Estilo"],
  },
  {
    icon: "youtube",
    title: "Formato YouTube",
    text: "Vlogs, videos especiales y podcasts editados para mantener la atención de principio a fin.",
    tags: ["Vlogs", "Videos especiales", "Podcast"],
  },
  {
    icon: "clips",
    title: "Clips para streamers",
    text: "Saco los mejores momentos de tus streams y los publico en tus redes, editados con dinamismo.",
    tags: ["Clips", "Shorts", "Reels", "TikTok"],
  },
  {
    icon: "brand",
    title: "Campañas y redes",
    text: "Contenido para marcas e influencers con speed ramps, music sync y edits dinámicos.",
    tags: ["Campañas", "Edits", "Music sync"],
  },
];
