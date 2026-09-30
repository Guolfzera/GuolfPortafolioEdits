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
| `data/site.ts` | Nombre, frase, bio, herramientas, cifras, email, WhatsApp, redes, showreel |
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

1. Copia las imágenes a `public/photos/` (ej. `public/photos/setup.jpg`).
2. En `data/photos.ts`: `{ src: "/photos/setup.jpg", alt: "Mi setup", tall: true }`.

Tu foto para "Sobre mí" va en `data/site.ts` → `about.photo`.

### Logos de clientes

Guarda los logos en `public/clients/` (PNG o SVG sin fondo) y ponlos en `data/clients.ts`:
`{ name: "Marca", logo: "/clients/marca.png" }`.

### Showreel de portada

Pega el link de YouTube/Vimeo en `showreel` dentro de `data/site.ts`. Se reproduce en silencio y en loop.

> Antes de publicar, reemplaza los datos de ejemplo: el video de muestra (Big Buck Bunny), los clientes, las cifras de "Sobre mí", el email, WhatsApp e Instagram.

## Publicar en Vercel

1. Sube este proyecto a un repositorio de GitHub.
2. Entra a https://vercel.com, inicia sesión con GitHub y pulsa **Add New → Project**.
3. Elige el repositorio y pulsa **Deploy** (Vercel detecta Next.js solo).
4. Desde ahí, cada vez que hagas `git push` el sitio se actualiza automáticamente.

Para usar tu propio dominio: en Vercel, **Settings → Domains**.
