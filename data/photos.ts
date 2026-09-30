// Fotos tuyas editando (detrás de escena).
// Guarda cada imagen en /public/photos con EXACTAMENTE el nombre de `src` y aparecerá sola.
// Da igual si es .jpg, .png o .webp: se detecta automáticamente.
//
// Para Google: nombres en minúscula, sin tildes ni ñ, palabras separadas con guiones
// (edicion-de-video-premiere-pro.jpg ✅  ediciondevideo1.jpg ❌).
// `alt` describe la foto con palabras que alguien buscaría; también se muestra al pasar el cursor.
// tall: true hace la foto más alta en la grilla.
export type Photo = { src: string; alt: string; tall?: boolean };

export const photos: Photo[] = [
  {
    src: "/photos/editor-de-video-guolf-setup.jpg",
    alt: "Setup de edición de video de Guolf",
    tall: true,
  },
  {
    src: "/photos/edicion-de-video-premiere-pro.jpg",
    alt: "Edición de video en Premiere Pro",
  },
  {
    src: "/photos/edicion-de-video-after-effects.jpg",
    alt: "Animación y efectos en After Effects",
  },
  {
    src: "/photos/editor-de-video-cristobal-guolf-editando.jpg",
    alt: "Cristóbal «Guolf», editor de video, editando",
    tall: true,
  },
  {
    src: "/photos/edicion-clips-de-stream.jpg",
    alt: "Editando clips de stream para redes sociales",
  },
  {
    src: "/photos/edicion-de-video-para-marcas.jpg",
    alt: "Edición de video para campañas de marcas",
  },
];
