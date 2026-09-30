# Guolf Edits — Portafolio

Sitio hecho con Next.js, Tailwind CSS y Motion. Se publica en Vercel.

## Probar en tu computador

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Cambiar el contenido

Todo el contenido está en la carpeta `data/`. No hace falta tocar nada más.

| Archivo | Qué contiene |
| --- | --- |
| `data/site.ts` | Nombre, frase, bio, puntos destacados, herramientas, cifras, email, Instagram, showreel |
| `data/videos.ts` | Tus videos |
| `data/photos.ts` | Fotos detrás de escena |
| `data/clients.ts` | Marcas / clientes |

### Agregar un video

En `data/videos.ts` agrega una línea:

```ts
{ title: "Nombre del video", client: "Cliente", category: "marca", url: "https://youtu.be/XXXXXXXXXXX" },
```

- `category`: `"marca"` (Marcas & Publicidad), `"entretenimiento"` o `"social"` (Edits / Social).
- `url`: link de YouTube (videos normales o Shorts) o de Vimeo. La miniatura se saca sola.
- `vertical: true` para videos 9:16 (reels, shorts, TikTok).
- `thumbnail: "/photos/mi-miniatura.jpg"` si quieres una miniatura propia.
- Si `url` está vacío, la tarjeta aparece como "Próximamente".

### Agregar fotos

Los nombres ya están definidos en `data/photos.ts`. Solo guarda cada foto en `public/photos/` con ese nombre y aparece sola (puede ser .jpg, .png o .webp):

| Archivo | Qué foto |
| --- | --- |
| `cristobal-guolf-editor-de-video.jpg` | Tu foto para "Sobre mí" |
| `editor-de-video-guolf-setup.jpg` | Tu setup (vertical) |
| `edicion-de-video-premiere-pro.jpg` | Pantalla con Premiere Pro |
| `edicion-de-video-after-effects.jpg` | Pantalla con After Effects |
| `editor-de-video-cristobal-guolf-editando.jpg` | Tú editando (vertical) |
| `edicion-clips-de-stream.jpg` | Editando clips de stream |
| `edicion-de-video-para-marcas.jpg` | Trabajando en una campaña |

Con `npm run dev`, las fotos que faltan muestran el nombre esperado.

**Nombres para Google:** minúsculas, sin tildes ni ñ, palabras separadas con guiones
(`edicion-de-video-premiere-pro.jpg` ✅, `ediciondevideo1.jpg` ❌). El texto `alt` de cada foto
también cuenta: describe lo que se ve usando palabras que alguien buscaría.
Para agregar más fotos, suma una línea en `data/photos.ts` siguiendo el mismo formato.

### Logos de clientes

Guarda los logos en `public/clients/` (PNG o SVG sin fondo) y ponlos en `data/clients.ts`:
`{ name: "Marca", type: "marca", logo: "/clients/marca.png" }` (`type` es `"creador"` o `"marca"`).

### Video destacado de la portada

En `data/site.ts` → `showreel`, pega el link de uno de tus videos de `data/videos.ts`.
Se reproduce en silencio en la portada, toma su título y cliente, y al hacer clic se abre con sonido.

## Publicar en Vercel

1. Sube este proyecto a un repositorio de GitHub.
2. Entra a https://vercel.com, inicia sesión con GitHub y pulsa **Add New → Project**.
3. Elige el repositorio y pulsa **Deploy** (Vercel detecta Next.js solo).
4. Desde ahí, cada vez que hagas `git push` el sitio se actualiza automáticamente.

Para usar tu propio dominio: en Vercel, **Settings → Domains**.
