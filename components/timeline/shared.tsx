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
