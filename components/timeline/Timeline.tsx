"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "motion/react";
import { site } from "@/data/site";
import { clients } from "@/data/clients";
import { services } from "@/data/services";
import type { Photo } from "@/data/photos";
import { thumbnails } from "@/data/thumbnails";
import { videos } from "@/data/videos";
import { categories, embedUrl, findVideo, type Category, type Video } from "@/lib/video";
import { VideoModal } from "./VideoModal";
import { Particles } from "./Particles";
import { longVideos, shorts, usePlayer, VideoThumb } from "./shared";

// Estilo "Timeline": la página es un programa de edición (paneles, bins, pistas y cabezal de reproducción)
const mono = "font-[family-name:var(--font-tl-mono)]";
const panel = "rounded-md border border-[#2c2c30] bg-[#1f1f22]/75 backdrop-blur-md";
const clipColors = ["#8f73d9", "#3fa9a1", "#d46a8c", "#d6b54a", "#5d9de0", "#6bb36b"];
const TOTAL_SECONDS = 4 * 60 + 12;

function tc(seconds: number) {
  const p = (n: number) => String(Math.floor(n)).padStart(2, "0");
  return `${p(seconds / 3600)}:${p((seconds / 60) % 60)}:${p(seconds % 60)}:${p((seconds % 1) * 24)}`;
}

export function Timeline({ photos }: { photos: ResolvedPhoto[] }) {
  const { active, play, close } = usePlayer();
  const { scrollYProgress } = useScroll();
  const [time, setTime] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => setTime(p * TOTAL_SECONDS));

  return (
    <div className={`relative min-h-svh bg-[#161618] pb-24 text-[#d6d6d6] ${mono}`}>
      <Particles />
      <TopBar time={time} />
      <main className="relative z-10 mx-auto max-w-[1400px] space-y-3 px-3 pt-16 md:px-4">
        <Workspace onPlay={play} time={time} />
        <TimelinePanel onPlay={play} />
        <Credits />
        <ShortsBin onPlay={play} />
        <YoutubeBin onPlay={play} />
        <ThumbsBin />
        <BtsBin photos={photos} />
        <Metadata />
        <Effects />
        <ExportDialog />
      </main>
      <VideoModal video={active} onClose={close} />
    </div>
  );
}

function TopBar({ time }: { time: number }) {
  const tabs = [
    ["#trabajos", "Shorts"],
    ["#youtube", "YouTube"],
    ["#miniaturas", "Miniaturas"],
    ["#bts", "Detrás de escena"],
    ["#sobre-mi", "Sobre mí"],
    ["#servicios", "Servicios"],
    ["#contacto", "Contacto"],
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-11 items-center justify-between gap-3 border-b border-[#2c2c30] bg-[#111113]/95 px-3 text-xs backdrop-blur md:px-4">
      <a href="#top" className="flex items-center gap-2 whitespace-nowrap">
        <span className="grid h-6 w-6 place-items-center rounded bg-[#5d9de0] text-[10px] font-bold text-black">Ge</span>
        <span className="hidden text-white sm:inline">Guolf Edits</span>
        <span className="hidden text-white/30 xl:inline">— Portafolio.prproj</span>
      </a>
      <nav className="flex min-w-0 gap-0.5 overflow-x-auto [mask-image:linear-gradient(to_right,black_85%,transparent)] [scrollbar-width:none] lg:[mask-image:none]">
        {tabs.map(([h, l]) => (
          <a key={h} href={h} className="whitespace-nowrap rounded px-2.5 py-1.5 text-white/60 hover:bg-white/5 hover:text-white">
            {l}
          </a>
        ))}
      </nav>
      <span className="hidden shrink-0 rounded bg-black/50 px-2 py-1 tabular-nums text-[#5d9de0] sm:inline">{tc(time)}</span>
    </header>
  );
}

function PanelHeader({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-[#2c2c30] px-3 py-2 text-[11px] text-white/50">
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#5d9de0]" />
        {children}
      </span>
      {right}
    </div>
  );
}

function Workspace({ onPlay, time }: { onPlay: (v: Video) => void; time: number }) {
  const featured = findVideo(videos, site.showreel) ?? shorts[0];
  const reel = embedUrl(featured.url, { background: true });
  const bins = [
    ["Shorts", shorts.length, "#trabajos"],
    ["YouTube", longVideos.length, "#youtube"],
    ["Miniaturas", thumbnails.length, "#miniaturas"],
  ] as const;

  return (
    <section id="top" className="grid gap-3 lg:grid-cols-[1fr_1.15fr]">
      <div className={`${panel} flex flex-col`}>
        <PanelHeader right={<span>Proyecto</span>}>Portafolio.prproj</PanelHeader>
        <div className="flex flex-1 flex-col justify-between gap-10 p-5 md:p-8">
          <div>
            <motion.p
              className="mb-4 text-xs text-[#5d9de0]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              ● Disponible para proyectos
            </motion.p>
            <motion.h1
              className="font-display text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[0.9] tracking-tight text-white"
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            >
              Guolf
              <br />
              Edits<span className="text-[#5d9de0]">_</span>
            </motion.h1>
            <p className="mt-6 max-w-md font-sans text-lg text-white/60">
              <span className="text-white">{site.role}.</span> {site.tagline}
            </p>
          </div>
          <ul className="divide-y divide-[#2c2c30] border-y border-[#2c2c30] text-sm">
            {bins.map(([name, count, href]) => (
              <li key={name}>
                <a href={href} className="flex items-center justify-between py-2.5 hover:text-white">
                  <span className="flex items-center gap-2">
                    <span className="text-[#d6b54a]">▸ ▤</span> {name}
                  </span>
                  <span className="text-white/40">{count} elementos</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${panel} flex flex-col`}>
        <PanelHeader right={<span className="tabular-nums text-[#5d9de0]">{tc(time)}</span>}>
          Programa: {featured.title}
        </PanelHeader>
        <button
          type="button"
          onClick={() => onPlay(featured)}
          data-cursor="Play"
          className="relative flex flex-1 items-center justify-center bg-black p-4"
        >
          <div className="relative aspect-[9/16] h-[min(62svh,560px)] overflow-hidden">
            {reel && (
              <iframe
                src={reel}
                title="Programa"
                tabIndex={-1}
                allow="autoplay; encrypted-media"
                className="pointer-events-none absolute inset-0 h-full w-full scale-[1.2]"
              />
            )}
            {/* Guías de área segura */}
            <div className="pointer-events-none absolute inset-[5%] border border-white/20" />
            <div className="pointer-events-none absolute inset-[10%] border border-dashed border-white/15" />
          </div>
        </button>
        <div className="flex items-center justify-center gap-5 border-t border-[#2c2c30] py-2 text-white/60">
          <span>⏮</span>
          <span>◀◀</span>
          <button type="button" onClick={() => onPlay(featured)} className="text-white hover:text-[#5d9de0]">
            ▶
          </button>
          <span>▶▶</span>
          <span>⏭</span>
        </div>
      </div>
    </section>
  );
}

// Pistas con los videos como clips; el cabezal azul avanza con el scroll de la página
function TimelinePanel({ onPlay }: { onPlay: (v: Video) => void }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const left = useTransform(progress, [0, 1], ["0%", "100%"]);
  const widths = [9, 6, 11, 7, 8, 5, 10, 6];
  const tracks: { name: string; items: { label: string; video?: Video }[] }[] = [
    { name: "V3", items: thumbnails.map((t) => ({ label: `${t.creator}.psd` })) },
    { name: "V2", items: longVideos.map((v) => ({ label: v.title, video: v })) },
    { name: "V1", items: shorts.map((v) => ({ label: v.title, video: v })) },
  ];

  return (
    <section className={panel}>
      <PanelHeader right={<span>Secuencia 01 · 30 fps</span>}>Línea de tiempo</PanelHeader>
      <div className="overflow-x-auto [scrollbar-width:thin]">
        <div className="relative min-w-[1100px] py-2">
          {/* Regla */}
          <div className="ml-12 flex justify-between border-b border-[#2c2c30] pb-1 pr-2 text-[10px] text-white/30">
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i}>{tc((TOTAL_SECONDS / 8) * i).slice(3, 8)}</span>
            ))}
          </div>
          {tracks.map((track, ti) => (
            <div key={track.name} className="flex h-11 items-center border-b border-[#26262a]">
              <span className="w-12 shrink-0 text-center text-[11px] text-white/40">{track.name}</span>
              <div className="flex h-8 flex-1 gap-[2px] overflow-hidden pr-2">
                {track.items.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => item.video && onPlay(item.video)}
                    title={item.label}
                    style={{ flexGrow: widths[(i + ti * 3) % widths.length], background: clipColors[(i + ti) % clipColors.length] }}
                    className="min-w-0 basis-0 truncate rounded-[3px] px-1.5 text-left text-[10px] font-medium text-black/80 opacity-85 transition-opacity hover:opacity-100"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {["A1", "A2"].map((a, ai) => (
            <div key={a} className="flex h-9 items-center border-b border-[#26262a]">
              <span className="w-12 shrink-0 text-center text-[11px] text-white/40">{a}</span>
              <div className="flex h-6 flex-1 items-center gap-[1px] overflow-hidden rounded-[3px] bg-[#2f6b45]/60 px-1 pr-2">
                {Array.from({ length: 160 }, (_, i) => (
                  <span
                    key={i}
                    className="w-[3px] shrink-0 rounded-full bg-[#7fe0a0]/70"
                    style={{ height: `${Math.round(20 + Math.abs(Math.sin(i * 0.7 + ai) * Math.cos(i * 0.13)) * 75)}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="pointer-events-none absolute inset-y-0 left-12 right-2">
            <motion.div style={{ left }} className="absolute inset-y-0 w-px bg-[#5d9de0]">
              <span className="absolute -left-[5px] top-0 h-3 w-[11px] rounded-b bg-[#5d9de0]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Nombre de archivo tipo proyecto de edición: "rakyz_short_03.mp4"
function fileName(v: Video, kind: string, i: number) {
  const who = (v.client ?? "clip")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_");
  return `${who}_${kind}_${String(i + 1).padStart(2, "0")}.mp4`;
}

// Inclinación "desordenada" pero fija por posición (igual en servidor y navegador)
const tilts = [-3, 2, -1.5, 2.5, -2, 1.2, -2.6, 1.8, -1, 2.2];
const lifts = [0, 10, -6, 6, -4, 12, -8, 4, 8, -2];

// Columnas de la grilla de shorts según el ancho (igual que las clases sm/md/lg de la grilla)
function useGridColumns() {
  const [cols, setCols] = useState(5);
  useEffect(() => {
    const queries = [
      [1024, 5],
      [768, 4],
      [640, 3],
    ] as const;
    const update = () => setCols(queries.find(([w]) => window.innerWidth >= w)?.[1] ?? 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

// Toma videos hasta llenar filas completas (unas 10 casillas): un vertical ocupa 1 y un horizontal 2.
// Así nunca queda un video solo abajo: con 1 horizontal salen 9, con 2 salen 8, etc.
function fillRows(list: Video[], cols: number) {
  const cells = cols * Math.ceil(10 / cols);
  const out: Video[] = [];
  let used = 0;
  for (const v of list) {
    const size = v.vertical ? 1 : 2;
    if (used + size > cells) continue;
    out.push(v);
    used += size;
    if (used === cells) break;
  }
  return out;
}

function ShortsBin({ onPlay }: { onPlay: (v: Video) => void }) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [more, setMore] = useState(false);
  const list = filter === "all" ? shorts : shorts.filter((v) => v.category === filter);
  const cols = useGridColumns();
  const visible = more ? list : fillRows(list, cols);
  const hiddenCount = list.length - visible.length;

  return (
    <section id="trabajos" className={panel}>
      <PanelHeader right={<span>{list.length} elementos · vista de iconos</span>}>Bin: Shorts y campañas</PanelHeader>
      <div className="flex gap-1 border-b border-[#2c2c30] px-3 py-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => {
              setFilter(c.id);
              setMore(false);
            }}
            className={`rounded px-3 py-1 text-xs ${filter === c.id ? "bg-[#5d9de0] text-black" : "text-white/50 hover:bg-white/5"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Mesa de trabajo con puntos, donde los clips quedan "tirados" */}
      <div className="grid grid-flow-dense grid-cols-2 gap-x-5 gap-y-8 bg-[radial-gradient(rgb(255_255_255/0.06)_1px,transparent_1px)] p-5 pt-8 [background-size:18px_18px] sm:grid-cols-3 md:grid-cols-4 md:gap-x-7 md:p-8 lg:grid-cols-5">
        {visible.map((v, i) => {
          const color = clipColors[i % clipColors.length];
          const tilt = tilts[i % tilts.length];
          return (
            <motion.button
              key={v.url}
              type="button"
              onClick={() => onPlay(v)}
              data-cursor="Play"
              className={`group relative z-0 rounded-xl border border-white/10 bg-[#26262b] p-1.5 text-left shadow-[0_22px_40px_-14px_rgb(0_0_0/0.9)] outline-none hover:z-10 focus-visible:ring-2 focus-visible:ring-[#5d9de0] ${
                v.vertical ? "" : "col-span-2"
              }`}
              initial={{ opacity: 0, y: 50, rotate: tilt * 2 }}
              whileInView={{ opacity: 1, y: lifts[i % lifts.length], rotate: tilt }}
              whileHover={{ rotate: 0, scale: 1.06, y: -10 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              {/* Etiqueta de color del clip, como en el panel de proyecto */}
              <div className="mb-1.5 flex items-center gap-1.5 px-1 text-[10px] text-white/75">
                <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: color }} />
                <span className="truncate">{fileName(v, "short", i)}</span>
              </div>

              <div
                className={`relative overflow-hidden rounded-lg bg-black ring-1 ring-black/60 transition-shadow duration-300 group-hover:ring-2 group-hover:ring-[#5d9de0] ${
                  v.vertical ? "aspect-[9/16]" : "aspect-video"
                }`}
              >
                <VideoThumb
                  video={v}
                  className="absolute inset-0 h-full w-full object-cover saturate-[0.85] transition-all duration-500 group-hover:scale-105 group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white/80 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> {v.vertical ? "9:16" : "16:9"}
                </span>
                <span className="absolute right-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white/60 backdrop-blur">
                  fx
                </span>
                <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-[#5d9de0] text-black opacity-0 shadow-[0_0_30px_rgb(93_157_224/0.6)] transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  ▶
                </span>
                <span className="absolute bottom-2 left-2 right-2 flex justify-between text-[9px] text-white/70">
                  <span>{v.vertical ? "1080×1920" : "1920×1080"}</span>
                  <span>30 fps</span>
                </span>
              </div>

              <div className="px-1 pb-0.5 pt-2">
                <p className="truncate font-sans text-[13px] font-medium leading-tight text-white/90">{v.title}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-white/40">
                  <span className="h-1 w-3 rounded-full" style={{ background: color }} />
                  {v.client} · {v.category === "marca" ? "Campaña" : "Clip"}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {(hiddenCount > 0 || more) && (
        <button
          onClick={() => setMore((m) => !m)}
          className="w-full border-t border-[#2c2c30] py-2.5 text-xs text-white/50 hover:bg-white/5 hover:text-white"
        >
          {more ? "▴ Contraer bin" : `▾ Mostrar ${hiddenCount} elementos más`}
        </button>
      )}
    </section>
  );
}

// Carrusel de videos largos con una mini regla y cabezal que siguen el desplazamiento
function YoutubeBin({ onPlay }: { onPlay: (v: Video) => void }) {
  const row = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: row });
  const head = useTransform(useSpring(scrollXProgress, { stiffness: 200, damping: 30 }), [0, 1], ["0%", "100%"]);
  const scroll = (dir: number) => row.current?.scrollBy({ left: dir * row.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id="youtube" className={panel}>
      <PanelHeader
        right={
          <span className="flex items-center gap-3">
            <span className="hidden sm:inline">{longVideos.length} elementos · 1920×1080</span>
            <span className="flex gap-1">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  onClick={() => scroll(d)}
                  aria-label={d < 0 ? "Anteriores" : "Siguientes"}
                  className="grid h-7 w-7 place-items-center rounded border border-[#2c2c30] text-white/70 hover:border-[#5d9de0] hover:bg-[#5d9de0] hover:text-black"
                >
                  {d < 0 ? "◀" : "▶"}
                </button>
              ))}
            </span>
          </span>
        }
      >
        Bin: YouTube
      </PanelHeader>

      <div ref={row} className="flex snap-x snap-mandatory gap-4 overflow-x-auto p-4 [scrollbar-width:none] md:p-5">
        {longVideos.map((v, i) => {
          const color = clipColors[(i + 2) % clipColors.length];
          return (
            <motion.button
              key={v.url}
              type="button"
              onClick={() => onPlay(v)}
              data-cursor="Play"
              className="group w-[80vw] shrink-0 snap-start rounded-xl border border-white/10 bg-[#26262b] p-1.5 text-left shadow-[0_22px_40px_-14px_rgb(0_0_0/0.9)] sm:w-[400px]"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <div className="mb-1.5 flex items-center gap-1.5 px-1 text-[10px] text-white/75">
                <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: color }} />
                <span className="truncate">{fileName(v, "yt", i)}</span>
                <span className="ml-auto text-white/35">H.264</span>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg bg-black ring-1 ring-black/60 transition-shadow duration-300 group-hover:ring-2 group-hover:ring-[#5d9de0]">
                <VideoThumb video={v} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-[#5d9de0] text-black opacity-0 shadow-[0_0_30px_rgb(93_157_224/0.6)] transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  ▶
                </span>
                <span className="absolute bottom-2 left-2 right-2 flex justify-between text-[9px] text-white/75">
                  <span>1920×1080 · 16:9</span>
                  <span>YouTube</span>
                </span>
              </div>
              <div className="px-1 pb-0.5 pt-2">
                <p className="line-clamp-2 min-h-[2.5em] font-sans text-[13px] font-medium leading-tight text-white/90">{v.title}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[10px] text-white/40">
                  <span className="h-1 w-3 rounded-full" style={{ background: color }} />
                  {v.client}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Mini línea de tiempo: cada marca es un video; el cabezal muestra dónde vas en el carrusel */}
      <div className="border-t border-[#2c2c30] px-4 py-3 md:px-5">
        <div className="relative flex h-5 items-end gap-[3px]">
          {longVideos.map((v, i) => (
            <span
              key={v.url}
              className="h-full flex-1 rounded-[2px] opacity-70"
              style={{ background: clipColors[(i + 2) % clipColors.length] }}
            />
          ))}
          <motion.span style={{ left: head }} className="absolute -bottom-1 -top-1 w-px bg-[#5d9de0]">
            <span className="absolute -left-[5px] -top-1 h-2.5 w-[11px] rounded-b bg-[#5d9de0]" />
          </motion.span>
        </div>
      </div>
    </section>
  );
}

// Mini regla con cabezal que sigue el desplazamiento de un carrusel
function ScrollRuler({ target, count, offset = 0 }: { target: React.RefObject<HTMLDivElement | null>; count: number; offset?: number }) {
  const { scrollXProgress } = useScroll({ container: target });
  const head = useTransform(useSpring(scrollXProgress, { stiffness: 200, damping: 30 }), [0, 1], ["0%", "100%"]);
  return (
    <div className="border-t border-[#2c2c30] px-4 py-3 md:px-5">
      <div className="relative flex h-5 items-end gap-[3px]">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className="h-full flex-1 rounded-[2px] opacity-70" style={{ background: clipColors[(i + offset) % clipColors.length] }} />
        ))}
        <motion.span style={{ left: head }} className="absolute -bottom-1 -top-1 w-px bg-[#5d9de0]">
          <span className="absolute -left-[5px] -top-1 h-2.5 w-[11px] rounded-b bg-[#5d9de0]" />
        </motion.span>
      </div>
    </div>
  );
}

function CarouselArrows({ onScroll }: { onScroll: (dir: number) => void }) {
  return (
    <span className="flex gap-1">
      {[-1, 1].map((d) => (
        <button
          key={d}
          onClick={() => onScroll(d)}
          aria-label={d < 0 ? "Anteriores" : "Siguientes"}
          className="grid h-7 w-7 place-items-center rounded border border-[#2c2c30] text-white/70 hover:border-[#5d9de0] hover:bg-[#5d9de0] hover:text-black"
        >
          {d < 0 ? "◀" : "▶"}
        </button>
      ))}
    </span>
  );
}

// Miniaturas en grande: carrusel con 2 a la vista (1 en celular); al hacer clic se ven a pantalla completa
function ThumbsBin() {
  const row = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<(typeof thumbnails)[number] | null>(null);
  const scroll = (dir: number) => row.current?.scrollBy({ left: dir * row.current.clientWidth * 0.9, behavior: "smooth" });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="miniaturas" className={panel}>
      <PanelHeader
        right={
          <span className="flex items-center gap-3">
            <span className="hidden sm:inline">{thumbnails.length} elementos · Photoshop</span>
            {thumbnails.length > 2 && <CarouselArrows onScroll={scroll} />}
          </span>
        }
      >
        Bin: Miniaturas
      </PanelHeader>

      <div ref={row} className="flex snap-x snap-mandatory gap-4 overflow-x-auto p-4 [scrollbar-width:none] md:gap-5 md:p-5">
        {thumbnails.map((t, i) => {
          const color = clipColors[(i + 3) % clipColors.length];
          return (
            <motion.button
              key={t.src}
              type="button"
              onClick={() => setOpen(t)}
              data-cursor="Ver"
              className="group w-[88%] shrink-0 snap-start rounded-xl border border-white/10 bg-[#26262b] p-2 text-left shadow-[0_22px_40px_-14px_rgb(0_0_0/0.9)] md:w-[calc(50%-0.625rem)]"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <div className="mb-2 flex items-center gap-1.5 px-1 text-[11px] text-white/75">
                <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: color }} />
                <span className="truncate">{fileName({ title: t.title, client: t.creator, url: "", category: "entretenimiento" }, "mini", i).replace(".mp4", ".psd")}</span>
                <span className="ml-auto text-white/35">PSD</span>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg ring-1 ring-black/60 transition-shadow duration-300 group-hover:ring-2 group-hover:ring-[#5d9de0]">
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 90vw"
                  quality={90}
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-2 left-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white/80 backdrop-blur">
                  1920×1080 · 16:9
                </span>
                <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                  ⤢ Ver en grande
                </span>
              </div>
              <div className="flex items-center justify-between px-1 pb-0.5 pt-2.5">
                <p className="font-sans text-sm font-medium text-white/90">{t.title}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-white/40">
                  <span className="h-1 w-3 rounded-full" style={{ background: color }} />
                  {t.creator}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {thumbnails.length > 2 && <ScrollRuler target={row} count={thumbnails.length} offset={3} />}

      <div className="m-3 flex flex-col gap-4 rounded border border-[#d6b54a]/40 bg-[#d6b54a]/10 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs text-[#d6b54a]">◆ Marcador · Precio de lanzamiento</p>
          <p className="mt-1 font-sans text-white/80">
            Estoy empezando con las miniaturas: por ahora mis precios son más bajos y conversables. También hago el
            pack video + miniatura.
          </p>
        </div>
        <a
          href={site.contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded bg-[#d6b54a] px-4 py-2 text-xs font-bold text-black"
        >
          Cotizar miniatura →
        </a>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <motion.div
              className="w-full max-w-[min(72rem,calc((100svh-8rem)*16/9))]"
              initial={{ scale: 0.92, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden rounded-xl ring-1 ring-white/10">
                <Image src={open.src} alt={open.alt} fill sizes="100vw" quality={90} className="object-contain" />
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-white/80">
                <span>
                  {open.title} · <span className="text-white/50">{open.creator}</span>
                </span>
                <button onClick={() => setOpen(null)} className="rounded border border-white/20 px-3 py-1 text-xs hover:bg-white hover:text-black">
                  Cerrar ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Creadores y marcas como "créditos" de la secuencia
function Credits() {
  const groups = [
    { label: "Creadores", items: clients.filter((c) => c.type === "creador") },
    { label: "Campañas para", items: clients.filter((c) => c.type === "marca") },
  ];
  return (
    <section className={panel}>
      <PanelHeader right={<span>{clients.length} nombres</span>}>Créditos</PanelHeader>
      <div className="grid gap-4 p-4 md:grid-cols-2">
        {groups.map((g, gi) => (
          <div key={g.label}>
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/35">{g.label}</p>
            <div className="flex flex-wrap gap-2">
              {g.items.map((c, i) => (
                <span
                  key={c.name}
                  className="flex items-center gap-2 rounded border border-white/10 bg-[#26262b] px-2.5 py-1.5 font-sans text-sm text-white/85"
                >
                  <span className="h-2.5 w-2.5 rounded-sm" style={{ background: clipColors[(i + gi * 3) % clipColors.length] }} />
                  {c.name}
                  {c.note && <span className="text-[10px] text-white/40">{c.note}</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export type ResolvedPhoto = Photo & { resolved: string | null };

// Fotos detrás de escena: mismas tarjetas inclinadas sobre la mesa de trabajo que los shorts
function BtsBin({ photos }: { photos: ResolvedPhoto[] }) {
  const [more, setMore] = useState(false);
  const list = photos.filter((p) => p.resolved);
  const visible = more ? list : list.slice(0, 8);
  if (list.length === 0) return null;

  return (
    <section id="bts" className={panel}>
      <PanelHeader right={<span>{list.length} elementos · imágenes</span>}>Bin: Detrás de escena</PanelHeader>
      <div className="columns-1 gap-7 bg-[radial-gradient(rgb(255_255_255/0.06)_1px,transparent_1px)] p-5 pt-8 [background-size:18px_18px] sm:columns-2 md:p-8 lg:columns-4">
        {visible.map((p, i) => {
          const color = clipColors[(i + 4) % clipColors.length];
          const tilt = tilts[(i + 3) % tilts.length];
          return (
            <motion.figure
              key={p.src}
              className="group relative z-0 mb-7 break-inside-avoid rounded-xl border border-white/10 bg-[#26262b] p-1.5 shadow-[0_22px_40px_-14px_rgb(0_0_0/0.9)] hover:z-10"
              initial={{ opacity: 0, y: 50, rotate: tilt * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: tilt }}
              whileHover={{ rotate: 0, scale: 1.05, y: -8 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="mb-1.5 flex items-center gap-1.5 px-1 text-[10px] text-white/75">
                <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: color }} />
                <span className="truncate">IMG_{String(i + 1).padStart(4, "0")}.jpg</span>
                <span className="ml-auto text-white/35">RAW</span>
              </div>
              <div
                className={`relative overflow-hidden rounded-lg ring-1 ring-black/60 transition-shadow duration-300 group-hover:ring-2 group-hover:ring-[#5d9de0] ${
                  p.ratio ? "" : p.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
                style={p.ratio ? { aspectRatio: p.ratio } : undefined}
              >
                <Image
                  src={p.resolved!}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover saturate-[0.85] transition-all duration-500 group-hover:scale-105 group-hover:saturate-100"
                />
              </div>
              <figcaption className="px-1 pb-0.5 pt-2 font-sans text-xs leading-snug text-white/65">
                <span className="mr-1.5 inline-block h-1 w-3 rounded-full align-middle" style={{ background: color }} />
                {p.alt}
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
      {list.length > 8 && (
        <button
          onClick={() => setMore((m) => !m)}
          className="w-full border-t border-[#2c2c30] py-2.5 text-xs text-white/50 hover:bg-white/5 hover:text-white"
        >
          {more ? "▴ Contraer bin" : `▾ Mostrar ${list.length - 8} elementos más`}
        </button>
      )}
    </section>
  );
}

// Servicios como un panel de efectos: cada servicio es un "preset" con sus parámetros
function Effects() {
  return (
    <section id="servicios" className={panel}>
      <PanelHeader right={<span>{services.length} presets</span>}>Efectos: Servicios</PanelHeader>
      <div className="grid gap-3 p-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <article
            key={s.title}
            className={`group rounded-xl border border-white/10 bg-[#26262b] p-5 transition-colors hover:border-[#5d9de0] ${
              s.featured ? "lg:col-span-2" : ""
            }`}
          >
            <div className="mb-4 flex items-center justify-between text-[10px] text-white/40">
              <span className="flex items-center gap-2">
                <span className="rounded bg-[#5d9de0] px-1.5 py-0.5 font-bold text-black">fx</span>
                preset_{String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-white/30 group-hover:text-[#5d9de0]">◆ activo</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white">{s.title}</h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">{s.text}</p>
            <div className="mt-4 space-y-1.5">
              {s.tags.map((t, ti) => (
                <div key={t} className="flex items-center gap-3 text-[11px]">
                  <span className="w-28 shrink-0 truncate text-white/50">{t}</span>
                  <span className="h-1 flex-1 overflow-hidden rounded-full bg-black/40">
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${100 - ((ti * 17 + i * 11) % 45)}%`, background: clipColors[(i + ti) % clipColors.length] }}
                    />
                  </span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Metadata() {
  const { about } = site;
  const rows = [
    ["Editor", `${about.fullName} «${about.alias}»`],
    ["Edad", `${about.age} años`],
    ["Herramientas", about.tools.join(", ")],
    ...about.stats.map((s) => [s.label, String(s.value)]),
  ];
  return (
    <section id="sobre-mi" className={`${panel} grid md:grid-cols-[18rem_1fr]`}>
      <div className="relative aspect-square md:aspect-auto">
        <Image src={about.photo} alt={about.fullName} fill sizes="300px" className="rounded-l-md object-cover" />
      </div>
      <div>
        <PanelHeader right={<span>Metadatos</span>}>Sobre mí</PanelHeader>
        <dl className="grid grid-cols-[9rem_1fr] gap-x-4 gap-y-1.5 p-4 text-xs">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-white/40">{k}</dt>
              <dd className="text-white/85">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="space-y-3 border-t border-[#2c2c30] p-4 font-sans text-sm leading-relaxed text-white/65">
          {about.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExportDialog() {
  const fields = [
    ["Formato", "Mensaje directo"],
    ["Destino", `Instagram @${site.contact.instagramUser}`],
    ["Calidad", "Máxima · revisiones incluidas"],
  ];
  return (
    <section id="contacto" className="flex justify-center py-16">
      <div className={`${panel} w-full max-w-xl shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]`}>
        <PanelHeader right={<span>Contacto</span>}>Ajustes de exportación</PanelHeader>
        <div className="p-6">
          <p className="font-display text-4xl font-bold text-white">¿Tienes un proyecto?</p>
          <dl className="mt-6 space-y-2 text-sm">
            {fields.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 rounded bg-black/30 px-3 py-2">
                <dt className="text-white/40">{k}</dt>
                <dd className="text-right text-white/85">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <a href={`mailto:${site.contact.email}`} className="rounded border border-[#2c2c30] px-4 py-2 text-sm hover:bg-white/5">
              {site.contact.email}
            </a>
            <a
              href={site.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-[#5d9de0] px-6 py-2 text-sm font-bold text-black hover:bg-[#7db3ea]"
            >
              Escríbeme →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
