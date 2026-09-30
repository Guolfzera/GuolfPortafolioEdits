import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

// Devuelve la ruta de la imagen si existe en /public (probando también otras extensiones
// con el mismo nombre), o null si todavía no se ha subido. Se evalúa al compilar.
export function resolvePublicImage(src: string): string | null {
  if (!src) return null;
  const publicDir = path.join(process.cwd(), "public");
  if (fs.existsSync(path.join(publicDir, src))) return src;
  const base = src.replace(/\.[a-z0-9]+$/i, "");
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(publicDir, base + ext))) return base + ext;
  }
  return null;
}
