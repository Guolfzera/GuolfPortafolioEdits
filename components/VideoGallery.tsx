"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { videos } from "@/data/videos";
import { categories, type Category, type Video } from "@/lib/video";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";

export function VideoGallery() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [active, setActive] = useState<Video | null>(null);
  const close = useCallback(() => setActive(null), []);
  const visible = filter === "all" ? videos : videos.filter((v) => v.category === filter);

  return (
    <section id="trabajos" className="relative bg-ink px-4 py-28 text-white md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" eyebrow="Trabajos" title="Proyectos seleccionados" dark>
          <Reveal delay={0.2} className="text-sm text-white/50">
            {videos.length} proyectos
          </Reveal>
        </SectionHeading>

        <Reveal y={20}>
          <div className="-mx-4 mb-10 overflow-x-auto px-4 [scrollbar-width:none]">
            <div className="inline-flex gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur">
              {categories.map((c) => {
                const selected = filter === c.id;
                const count = c.id === "all" ? videos.length : videos.filter((v) => v.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    onClick={() => setFilter(c.id)}
                    className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 md:px-5 ${
                      selected ? "text-ink" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-white shadow-[0_8px_30px_-8px_rgb(255_255_255/0.5)]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {c.label}
                      <sup className="ml-1 text-[10px] opacity-50">{count}</sup>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="video-grid-host">
          <motion.div layout className="video-grid">
            <AnimatePresence mode="popLayout">
              {visible.map((video) => (
                <motion.div
                  key={video.title + video.url}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={video.vertical ? "row-span-2" : "col-span-2"}
                >
                  <VideoCard video={video} onPlay={() => setActive(video)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <VideoModal video={active} onClose={close} />
    </section>
  );
}
