"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { youtubeVideos } from "@/data/youtube";
import type { Video } from "@/lib/video";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { ShowMoreButton } from "./ui/ShowMoreButton";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";

// Cuántos videos se ven antes de "Mostrar más"
const INITIAL = 6;

const videos: Video[] = youtubeVideos.map((v) => ({
  title: v.title,
  client: v.channel,
  url: v.url,
  category: "entretenimiento",
  label: "YouTube",
}));

const channels = [...new Set(youtubeVideos.map((v) => v.channel))];

export function YoutubeSection() {
  const [filter, setFilter] = useState<string>("all");
  const [active, setActive] = useState<Video | null>(null);
  const [expanded, setExpanded] = useState(false);
  const lenis = useLenis();
  const close = useCallback(() => setActive(null), []);

  // Con "Todos" se intercalan los canales para que se vea variedad desde el inicio
  const list = useMemo(() => {
    if (filter !== "all") return videos.filter((v) => v.client === filter);
    const byChannel = channels.map((c) => videos.filter((v) => v.client === c));
    const longest = Math.max(...byChannel.map((l) => l.length));
    return Array.from({ length: longest }, (_, i) => byChannel.map((l) => l[i])).flat().filter(Boolean);
  }, [filter]);

  const visible = expanded ? list : list.slice(0, INITIAL);
  const hidden = list.length - INITIAL;
  const filters = [{ id: "all", label: "Todos", count: videos.length }].concat(
    channels.map((c) => ({ id: c, label: c, count: videos.filter((v) => v.client === c).length })),
  );

  function toggleExpanded() {
    if (expanded) lenis?.scrollTo("#youtube", { offset: -40 });
    setExpanded((e) => !e);
  }

  return (
    <section id="youtube" className="px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" eyebrow="YouTube" title="Videos largos">
          <Reveal delay={0.2} className="max-w-xs text-ink/60">
            Videos completos para YouTube: gaming, IRL y vlogs de viaje, editados para que se vean de principio a fin.
          </Reveal>
        </SectionHeading>

        <Reveal y={20}>
          <div className="-mx-4 mb-10 overflow-x-auto px-4 [scrollbar-width:none]">
            <div className="inline-flex gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur">
              {filters.map((f) => {
                const selected = filter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => {
                      setFilter(f.id);
                      setExpanded(false);
                    }}
                    className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 md:px-5 ${
                      selected ? "text-night" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="youtube-filter-pill"
                        className="absolute inset-0 rounded-full bg-white shadow-[0_8px_30px_-8px_rgb(255_255_255/0.5)]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {f.label}
                      <sup className="ml-1 text-[10px] opacity-50">{f.count}</sup>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <motion.div layout className="grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((video) => (
              <motion.div
                key={video.url}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-video"
              >
                <VideoCard video={video} onPlay={() => setActive(video)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {hidden > 0 && <ShowMoreButton expanded={expanded} hidden={hidden} onClick={toggleExpanded} />}
      </div>

      <VideoModal video={active} onClose={close} />
    </section>
  );
}
