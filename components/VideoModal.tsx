"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { categoryLabel, embedUrl, type Video } from "@/lib/video";

export function VideoModal({ video, onClose }: { video: Video | null; onClose: () => void }) {
  const lenis = useLenis();
  const src = video ? embedUrl(video.url) : null;

  useEffect(() => {
    if (!video) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [video, lenis, onClose]);

  return (
    <AnimatePresence>
      {video && src && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          data-cursor-theme="dark"
          aria-modal="true"
          aria-label={video.title}
        >
          <motion.div
            className={`relative w-full ${video.vertical ? "max-w-[min(420px,calc((100svh-10rem)*9/16))]" : "max-w-5xl"}`}
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`overflow-hidden rounded-2xl bg-black shadow-[0_50px_120px_-20px_rgb(0_0_0/0.8)] ring-1 ring-white/10 ${
                video.vertical ? "aspect-[9/16]" : "aspect-video"
              }`}
            >
              <iframe
                src={src}
                title={video.title}
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                  {categoryLabel(video.category)}
                  {video.client && ` · ${video.client}`}
                </p>
                <h3 className="font-display text-xl font-bold">{video.title}</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-300 hover:rotate-90"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
