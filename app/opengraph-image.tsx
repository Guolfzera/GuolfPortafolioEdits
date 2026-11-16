import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { clients } from "@/data/clients";
import { resolvePublicImage } from "@/lib/assets";

// Imagen que aparece al compartir el link (WhatsApp, Instagram, X, Discord, LinkedIn…).
// Se genera sola al compilar con tu nombre, rol, foto y marcas.
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function photoDataUrl() {
  const src = resolvePublicImage(site.about.photo);
  if (!src) return null;
  const file = fs.readFileSync(path.join(process.cwd(), "public", src));
  const ext = path.extname(src).slice(1).replace("jpg", "jpeg");
  return `data:image/${ext};base64,${file.toString("base64")}`;
}

// Space Grotesk (la fuente de los títulos del sitio). Si no hay internet al compilar, usa la fuente por defecto.
async function loadFont(weight: 400 | 700, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@${weight}&text=${encodeURIComponent(text)}`,
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!url) return null;
    const data = await fetch(url).then((r) => r.arrayBuffer());
    return { name: "Space Grotesk", data, weight: weight as 400 | 700, style: "normal" as const };
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const photo = photoDataUrl();
  const [first, ...rest] = site.name.split(" ");
  const brands = clients.filter((c) => c.type === "marca").map((c) => c.name);
  const text = [site.name, site.role, "Portafolio", ...brands].join(" ");
  const fonts = (await Promise.all([loadFont(400, text), loadFont(700, text)])).filter((f) => f !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          color: "#f2f2f2",
          fontFamily: fonts.length ? "Space Grotesk" : undefined,
          backgroundImage:
            "linear-gradient(to right, #1c1c1c 1px, transparent 1px), linear-gradient(to bottom, #1c1c1c 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#8c8c8c",
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: 7, background: "#ef4444" }} />
            Portafolio
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 150, fontWeight: 700, lineHeight: 0.9, letterSpacing: -6 }}>{first}</div>
            {rest.length > 0 && (
              <div style={{ fontSize: 150, fontWeight: 700, lineHeight: 0.9, letterSpacing: -6, color: "#5a5a5a" }}>
                {rest.join(" ")}
              </div>
            )}
            <div style={{ marginTop: 28, fontSize: 36, color: "#d4d4d4" }}>{site.role}</div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {brands.map((b) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid #333",
                  fontSize: 20,
                  color: "#bdbdbd",
                }}
              >
                {b}
              </div>
            ))}
          </div>
        </div>

        {photo && (
          <div style={{ display: "flex", width: 420, height: "100%", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="" width={420} height={630} style={{ width: 420, height: 630, objectFit: "cover" }} />
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 420,
                height: 630,
                display: "flex",
                background: "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0) 35%)",
              }}
            />
          </div>
        )}
      </div>
    ),
    { ...size, fonts },
  );
}
