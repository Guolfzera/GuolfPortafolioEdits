// Fotos tuyas editando (detrás de escena).
// Guarda cada imagen en /public/photos con EXACTAMENTE el nombre de `src` y aparecerá sola.
// Da igual si es .jpg, .png o .webp: se detecta automáticamente.
//
// Para Google: nombres en minúscula, sin tildes ni ñ, palabras separadas con guiones
// (edicion-de-video-premiere-pro.jpg ✅  ediciondevideo1.jpg ❌).
// `alt` describe la foto con palabras que alguien buscaría; también se muestra al pasar el cursor.
// tall: true hace la foto más alta en la grilla.
// ratio: proporción exacta (ancho/alto) para imágenes que no se deben recortar, como capturas.
export type Photo = { src: string; alt: string; tall?: boolean; ratio?: string };

export const photos: Photo[] = [
  {
    src: "/photos/edicion-de-video-campana-amd-paris-blumecl.jpg",
    alt: "Editando la campaña AMD París de Blumecl en Premiere Pro",
    tall: true,
  },
  {
    src: "/photos/testimonio-campana-fortnite-edicion-de-video.jpg",
    alt: "Feedback de los encargados de la campaña Fortnite: «que buena edición»",
    ratio: "1170 / 854",
  },
  {
    src: "/photos/edicion-de-video-campana-fortnite-blumecl.jpg",
    alt: "Editando la campaña Fortnite de Blumecl en Premiere Pro",
    tall: true,
  },
  {
    src: "/photos/edicion-video-youtube-cartas-pokemon-rakyz.jpg",
    alt: "Editando el video de YouTube de cartas Pokémon para Rakyz",
    tall: true,
  },
  {
    src: "/photos/edicion-video-youtube-rakyz.jpg",
    alt: "Editando un video de YouTube para Rakyz",
    tall: true,
  },
];
