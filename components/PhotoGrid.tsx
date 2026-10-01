"use client";

import { useState } from "react";
import Image from "next/image";
import { useLenis } from "lenis/react";
import type { Photo } from "@/data/photos";
import { Reveal } from "./ui/Reveal";
import { ShowMoreButton } from "./ui/ShowMoreButton";

// Cuántas fotos se ven antes de "Mostrar más"
const INITIAL = 8;

type ResolvedPhoto = Photo & { resolved: string | null };

export function PhotoGrid({ photos }: { photos: ResolvedPhoto[] }) {
  const [expanded, setExpanded] = useState(false);
  const lenis = useLenis();
  const visible = expanded ? photos : photos.slice(0, INITIAL);
  const hidden = photos.length - INITIAL;

  function toggleExpanded() {
    if (expanded) lenis?.scrollTo("#bts", { offset: -40 });
    setExpanded((e) => !e);
  }

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {visible.map((photo, i) => (
          <Reveal key={photo.src || i} delay={(i % 3) * 0.1} className="mb-5 break-inside-avoid">
            <figure className="group relative overflow-hidden rounded-2xl bg-card shadow-soft ring-1 ring-white/5 transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-lift">
              <div
                className={`relative overflow-hidden ${photo.ratio ? "" : photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                style={photo.ratio ? { aspectRatio: photo.ratio } : undefined}
              >
                {photo.resolved ? (
                  <Image
                    src={photo.resolved}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale-[40%] transition-all duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
                  />
                ) : (
                  <PhotoPlaceholder index={i} expected={photo.src} />
                )}
              </div>
              <figcaption className="absolute inset-x-3 bottom-3 translate-y-3 rounded-xl bg-night/80 px-4 py-2.5 text-sm font-medium opacity-0 shadow-soft backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
                {photo.alt}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {hidden > 0 && <ShowMoreButton expanded={expanded} hidden={hidden} onClick={toggleExpanded} />}
    </>
  );
}

// En desarrollo muestra el nombre de archivo que falta; en el sitio publicado solo "Foto 01"
function PhotoPlaceholder({ index, expected }: { index: number; expected: string }) {
  const hint = process.env.NODE_ENV === "development" && expected;
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900 transition-transform duration-700 ease-out-expo group-hover:scale-105">
      <div className="text-center text-neutral-500">
        <svg viewBox="0 0 24 24" className="mx-auto mb-2 h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 7h3l2-3h8l2 3h3v13H3z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        <p className="text-xs uppercase tracking-[0.2em]">Foto {String(index + 1).padStart(2, "0")}</p>
        {hint && <p className="mt-2 px-4 font-mono text-[11px] normal-case text-neutral-500">public{expected}</p>}
      </div>
    </div>
  );
}
