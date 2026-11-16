"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { site } from "@/data/site";
import { thumbnailOffer, thumbnails, type Thumbnail } from "@/data/thumbnails";
import { Magnetic } from "./ui/Magnetic";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Thumbnails() {
  const [active, setActive] = useState<Thumbnail | null>(null);
  const close = useCallback(() => setActive(null), []);
  if (thumbnails.length === 0) return null;

  return (
    <section id="miniaturas" className="bg-night px-4 py-28 text-white md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" eyebrow="Miniaturas" title="Miniaturas para YouTube" dark>
          <Reveal delay={0.2} className="max-w-xs text-white/50">
            Diseñadas en Photoshop para que tu video destaque y den ganas de hacer clic.
          </Reveal>
        </SectionHeading>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {thumbnails.map((t, i) => (
            <Reveal key={t.src} delay={(i % 3) * 0.1}>
              <button
                type="button"
                onClick={() => setActive(t)}
                data-cursor="Ver"
                aria-label={`Ver miniatura ${t.title}`}
                className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900 text-left ring-1 ring-white/10 transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-glow hover:ring-white/25"
              >
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 md:p-5">
                  <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/60">{t.creator}</p>
                  <h3 className="font-display text-lg font-bold leading-tight md:text-xl">{t.title}</h3>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {thumbnailOffer.launch && (
          <Reveal y={20} className="mt-5">
            <div className="relative flex flex-col gap-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:flex-row md:items-center md:justify-between md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.07] blur-3xl"
              />
              <div className="relative max-w-xl">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-night">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                  {thumbnailOffer.badge}
                </span>
                <h3 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{thumbnailOffer.title}</h3>
                <p className="mt-3 text-lg text-white/60">{thumbnailOffer.text}</p>
              </div>
              <Magnetic>
                <a
                  href={site.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 font-medium text-night shadow-glow transition-transform duration-300 hover:scale-[1.03]"
                >
                  Cotiza tu miniatura
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-night text-white">→</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        )}
      </div>

      <ThumbnailModal thumbnail={active} onClose={close} />
    </section>
  );
}

// Miniatura en grande al hacer clic
function ThumbnailModal({ thumbnail, onClose }: { thumbnail: Thumbnail | null; onClose: () => void }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!thumbnail) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [thumbnail, lenis, onClose]);

  return (
    <AnimatePresence>
      {thumbnail && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={thumbnail.title}
        >
          <motion.div
            className="relative w-full max-w-[min(64rem,calc((100svh-10rem)*16/9))]"
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black shadow-[0_50px_120px_-20px_rgb(0_0_0/0.8)] ring-1 ring-white/10">
              <Image src={thumbnail.src} alt={thumbnail.alt} fill sizes="100vw" quality={90} className="object-contain" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">Miniatura · {thumbnail.creator}</p>
                <h3 className="font-display text-xl font-bold">{thumbnail.title}</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Cerrar"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-night transition-transform duration-300 hover:rotate-90"
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
