"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { videos } from "@/data/videos";
import { youtubeVideos } from "@/data/youtube";
import { thumbnailUrl, type Video } from "@/lib/video";

// Datos y piezas que usa la página

export const shorts: Video[] = videos;

export const longVideos: Video[] = youtubeVideos.map((v) => ({
  title: v.title,
  client: v.channel,
  url: v.url,
  category: "entretenimiento",
  label: "YouTube",
}));

export function usePlayer() {
  const [active, setActive] = useState<Video | null>(null);
  const close = useCallback(() => setActive(null), []);
  return { active, play: setActive, close };
}

// Miniatura de YouTube con respaldo si la de mayor calidad no existe
// (YouTube responde con una imagen gris de 120px cuando falta una resolución)
export function VideoThumb({ video, className }: { video: Video; className?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const thumb = thumbnailUrl(video);
  const next = useCallback(
    (img: HTMLImageElement) => {
      if (!thumb || img.naturalWidth > 120) return;
      const i = Number(img.dataset.fallback ?? 0);
      if (i >= thumb.fallbacks.length) return;
      img.dataset.fallback = String(i + 1);
      img.src = thumb.fallbacks[i];
    },
    [thumb],
  );
  // Si la imagen ya cargó antes de que React se conectara, onLoad no se dispara: se revisa al montar
  useEffect(() => {
    if (ref.current?.complete) next(ref.current);
  }, [next]);

  if (!thumb) return <div className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={thumb.src}
      alt=""
      loading="lazy"
      onLoad={(e) => next(e.currentTarget)}
      onError={(e) => {
        e.currentTarget.dataset.broken = "1";
        const img = e.currentTarget;
        const i = Number(img.dataset.fallback ?? 0);
        if (thumb && i < thumb.fallbacks.length) {
          img.dataset.fallback = String(i + 1);
          img.src = thumb.fallbacks[i];
        }
      }}
      className={className}
    />
  );
}

function shuffle<T>(list: T[]) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Intercala por creador: uno de cada uno por turnos (Rakyz, Flavia, Diego, Rakyz, Flavia…).
// Con random, también se mezcla el orden de los creadores y de los videos de cada uno.
export function interleave<T>(list: T[], key: (item: T) => string, random: boolean) {
  const groups = new Map<string, T[]>();
  for (const item of list) {
    const k = key(item);
    groups.set(k, [...(groups.get(k) ?? []), item]);
  }
  let lists = [...groups.values()];
  if (random) lists = shuffle(lists).map(shuffle);
  const longest = Math.max(0, ...lists.map((l) => l.length));
  const out: T[] = [];
  for (let i = 0; i < longest; i++) for (const l of lists) if (l[i]) out.push(l[i]);
  return out;
}

// Orden intercalado que cambia en cada visita. La mezcla se hace en el navegador después de cargar
// (el servidor usa el orden sin mezclar) para que no haya diferencias al hidratar.
export function useInterleaved<T>(list: T[], key: (item: T) => string) {
  const [order, setOrder] = useState(() => interleave(list, key, false));
  useEffect(() => setOrder(interleave(list, key, true)), []); // eslint-disable-line react-hooks/exhaustive-deps
  return order;
}
