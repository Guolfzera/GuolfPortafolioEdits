"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { site } from "@/data/site";
import { embedUrl } from "@/lib/video";
import { SplitText } from "./ui/SplitText";
import { Magnetic } from "./ui/Magnetic";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const reelScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const reelRotate = useTransform(scrollYProgress, [0, 1], [-3, 0]);

  const [first, ...rest] = site.name.split(" ");
  const reel = embedUrl(site.showreel, { background: true });

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-4 pb-20 pt-32 md:px-8"
    >
      {/* Grilla de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <motion.div style={{ y: titleY, opacity: titleOpacity }}>
          <motion.p
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mute shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
            </span>
            Disponible para proyectos
          </motion.p>

          <h1 className="font-display text-[clamp(3.5rem,13vw,9.5rem)] font-bold leading-[0.85] tracking-[-0.04em]">
            <SplitText text={first} delay={0.15} className="block" />
            {rest.length > 0 && (
              <SplitText
                text={rest.join(" ")}
                delay={0.35}
                className="block text-transparent [-webkit-text-stroke:2px_#0a0a0a]"
              />
            )}
          </h1>

          <motion.p
            className="mt-8 max-w-md text-lg text-ink/70 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
          >
            <span className="font-medium text-ink">{site.role}.</span> {site.tagline}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
          >
            <Magnetic>
              <a
                href="#trabajos"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-medium text-white shadow-lift transition-transform duration-300 hover:scale-[1.03]"
              >
                Ver trabajos
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-ink transition-transform duration-500 ease-out-expo group-hover:-rotate-45">
                  →
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contacto"
                className="inline-flex rounded-full border border-ink/15 bg-white px-7 py-4 font-medium shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                Hablemos
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Tarjeta de showreel */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotate: -8 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
        >
          <motion.div
            style={{ scale: reelScale, rotate: reelRotate }}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink shadow-lift sm:aspect-video lg:aspect-[4/5]"
          >
            {reel ? (
              <iframe
                src={reel}
                title="Showreel"
                allow="autoplay; encrypted-media"
                className="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-110 grayscale"
              />
            ) : (
              <TimelineArt />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">Showreel</p>
                <p className="font-display text-2xl font-bold">{site.name}</p>
              </div>
              <span className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" /> Rec
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#bts"
        aria-label="Bajar"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-mute md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-ink/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-ink"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

// Animación de "línea de tiempo" de edición mientras no haya showreel
function TimelineArt() {
  const tracks = [
    [22, 14, 30, 18, 26, 20],
    [12, 28, 16, 24, 14, 30],
    [34, 18, 22, 12, 28, 16],
    [16, 22, 12, 36, 18, 24],
  ];
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-2 overflow-hidden p-5 pb-24 sm:gap-3 sm:p-6">
      <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
        <span>00:00:12:04</span>
        <span>V1 · V2 · A1</span>
      </div>
      {tracks.map((clips, t) => (
        <div key={t} className="relative h-7 shrink-0 overflow-hidden rounded-md bg-white/5 sm:h-10">
          <motion.div
            className="flex h-full w-max gap-1.5"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 14 + t * 3, repeat: Infinity, ease: "linear" }}
          >
            {[...clips, ...clips].map((w, i) => (
              <div
                key={i}
                className={`h-full rounded ${t === 3 ? "bg-white/15" : i % 3 === 0 ? "bg-white/80" : "bg-white/30"}`}
                style={{ width: `${w * 4}px` }}
              />
            ))}
          </motion.div>
        </div>
      ))}
      <motion.div
        className="absolute bottom-0 top-0 w-0.5 bg-red-500 shadow-[0_0_12px_rgb(239_68_68)]"
        animate={{ left: ["10%", "90%", "10%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
