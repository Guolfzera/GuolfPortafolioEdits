"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { videos } from "@/data/videos";
import { categories, type Category, type Video } from "@/lib/video";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { ShowMoreButton } from "./ui/ShowMoreButton";
import { VideoCard } from "./VideoCard";
import { VideoModal } from "./VideoModal";

// Cuántos videos se ven antes de "Mostrar más", y cuántos de cada categoría en "Todos"
const INITIAL = 8;
const PER_CATEGORY = INITIAL / 2;

function shuffle<T>(list: T[]) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Orden de "Todos": los primeros 8 llevan 4 campañas y 4 de entretenimiento intercalados,
// y después el resto. Con random = false es el orden de la lista (para el primer render).
// Para los primeros 8 se prefieren videos verticales: uno horizontal ocupa 2 columnas y
// deja un hueco en la grilla; los horizontales aparecen al pulsar "Mostrar más".
function buildAllOrder(random: boolean) {
  const mix = random ? shuffle : <T,>(l: T[]) => l;
  const pick = (category: Category) => {
    const list = videos.filter((v) => v.category === category);
    return [...mix(list.filter((v) => v.vertical)), ...mix(list.filter((v) => !v.vertical))];
  };
  const brands = pick("marca");
  const ent = pick("entretenimiento");
  const first: Video[] = [];
  for (let i = 0; i < PER_CATEGORY; i++) {
    if (brands[i]) first.push(brands[i]);
    if (ent[i]) first.push(ent[i]);
  }
  const rest = mix([...brands.slice(PER_CATEGORY), ...ent.slice(PER_CATEGORY)]);
  // Si alguna categoría tiene menos de 4, se completa con otros para llegar a 8
  while (first.length < INITIAL && rest.length) first.push(rest.shift()!);
  return [...first, ...rest];
}

export function VideoGallery() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [active, setActive] = useState<Video | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [allOrder, setAllOrder] = useState(() => buildAllOrder(false));
  const lenis = useLenis();
  const close = useCallback(() => setActive(null), []);

  // Se mezcla en el navegador (no en el servidor) para que cada visita vea un orden distinto
  useEffect(() => setAllOrder(buildAllOrder(true)), []);

  const list = filter === "all" ? allOrder : videos.filter((v) => v.category === filter);
  const visible = expanded ? list : list.slice(0, INITIAL);
  const hidden = list.length - INITIAL;

  function selectFilter(id: Category | "all") {
    setFilter(id);
    setExpanded(false);
  }

  function toggleExpanded() {
    if (expanded) lenis?.scrollTo("#trabajos", { offset: -40 });
    setExpanded((e) => !e);
  }

  return (
    <section id="trabajos" className="relative bg-night px-4 py-28 text-white md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" eyebrow="Trabajos" title="Proyectos seleccionados" dark>
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
                    onClick={() => selectFilter(c.id)}
                    className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 md:px-5 ${
                      selected ? "text-night" : "text-white/60 hover:text-white"
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

        {hidden > 0 && <ShowMoreButton expanded={expanded} hidden={hidden} onClick={toggleExpanded} />}
      </div>

      <VideoModal video={active} onClose={close} />
    </section>
  );
}
