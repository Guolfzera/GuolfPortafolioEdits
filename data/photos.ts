// Fotos tuyas editando (detrás de escena). Guarda las imágenes en /public/photos
// y agrégalas aquí, ej: { src: "/photos/setup.jpg", alt: "Mi setup", tall: true }
// src vacío = placeholder. tall: true hace la foto más alta en la grilla.
export type Photo = { src: string; alt: string; tall?: boolean };

export const photos: Photo[] = [
  { src: "", alt: "Editando en el setup", tall: true },
  { src: "", alt: "Timeline en Premiere" },
  { src: "", alt: "Color grading" },
  { src: "", alt: "Revisión con cliente", tall: true },
  { src: "", alt: "Sesión nocturna" },
  { src: "", alt: "Detalle del teclado" },
];
