"use client";

import { categoryLabel, parseVideo, thumbnailUrl, type Video } from "@/lib/video";

export function VideoCard({ video, onPlay }: { video: Video; onPlay: () => void }) {
  const thumb = thumbnailUrl(video);
  const playable = !!parseVideo(video.url);

  return (
    <button
      type="button"
      onClick={playable ? onPlay : undefined}
      aria-disabled={!playable}
      data-cursor={playable ? "Play" : undefined}
      aria-label={`Reproducir ${video.title}`}
      className="group relative block h-full w-full overflow-hidden rounded-2xl bg-neutral-900 text-left ring-1 ring-white/10 transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-glow hover:ring-white/25"
    >
      {thumb ? (
        <img
          src={thumb}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#3a3a3a,#111_70%)] transition-transform duration-700 ease-out-expo group-hover:scale-105">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(90deg, #fff 0 1px, transparent 1px 48px)",
            }}
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
        {categoryLabel(video.category)}
      </span>

      <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-white text-ink opacity-0 shadow-lift transition-all duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100 [.custom-cursor_&]:hidden">
        <svg viewBox="0 0 24 24" className="ml-0.5 h-6 w-6" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        {video.client && (
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/50">{video.client}</p>
        )}
        <h3 className="font-display text-lg font-bold leading-tight text-white transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 md:text-xl">
          {video.title}
        </h3>
        {!playable && <p className="mt-1 text-xs text-white/40">Próximamente</p>}
      </div>
    </button>
  );
}
