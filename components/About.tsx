"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import { site } from "@/data/site";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

// photo: ruta de la foto si existe en /public (la resuelve page.tsx al compilar)
export function About({ photo }: { photo: string | null }) {
  const { about } = site;
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="sobre-mi" className="px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" eyebrow="Sobre mí" title={`${about.fullName}, alias ${about.alias}`} />

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <div
              ref={photoRef}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-200 shadow-lift transition-transform duration-700 ease-out-expo hover:-rotate-1 hover:scale-[1.01]"
            >
              <motion.div style={{ y: photoY }} className="absolute -inset-[10%]">
                {photo ? (
                  <Image
                    src={photo}
                    alt={`${about.fullName} «${about.alias}», ${site.role.toLowerCase()}`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-400">
                    <span className="font-display text-[10rem] font-bold leading-none text-white/60">
                      {about.alias.charAt(0)}
                    </span>
                  </div>
                )}
              </motion.div>
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/85 px-4 py-2 text-sm font-medium shadow-soft backdrop-blur-md">
                  {about.age} años
                </span>
                <span className="rounded-full bg-ink/85 px-4 py-2 text-sm font-medium text-white shadow-soft backdrop-blur-md">
                  {site.role}
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            {about.bio.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className={`mb-6 leading-relaxed text-ink/70 ${i === 0 ? "text-xl text-ink md:text-2xl" : "text-lg"}`}>
                  {p}
                </p>
              </Reveal>
            ))}

            <div className="mt-10 grid gap-3">
              {about.highlights.map((h, i) => (
                <Reveal key={h.title} delay={0.1 * i}>
                  <div className="group flex gap-5 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift">
                    <span className="font-display text-sm font-bold text-mute transition-colors duration-300 group-hover:text-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold tracking-tight">{h.title}</h3>
                      <p className="mt-1 text-ink/60">{h.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <p className="mb-4 mt-10 text-xs font-medium uppercase tracking-[0.25em] text-mute">Herramientas principales</p>
              <div className="flex flex-wrap gap-2">
                {about.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium shadow-soft transition-all duration-300 hover:-translate-y-1 hover:bg-ink hover:text-white hover:shadow-lift"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-3 gap-3 md:gap-5">
              {about.stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 * i}>
                  <div className="rounded-2xl border border-line bg-white p-4 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-lift md:p-6">
                    <p className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                      <Counter to={s.value} />
                      {s.suffix}
                    </p>
                    <p className="mt-1 text-xs text-mute md:text-sm">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value}</span>;
}
