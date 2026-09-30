import Image from "next/image";
import { photos } from "@/data/photos";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function BehindTheScenes() {
  return (
    <section id="bts" className="px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" eyebrow="Detrás de escena" title="Donde pasa la magia">
          <Reveal delay={0.2} className="max-w-xs text-ink/60">
            Horas de timeline, color y sonido. Así se ve el proceso detrás de cada entrega.
          </Reveal>
        </SectionHeading>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {photos.map((photo, i) => (
            <Reveal key={i} delay={(i % 3) * 0.1} className="mb-5 break-inside-avoid">
              <figure className="group relative overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-black/5 transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-lift">
                <div className={`relative overflow-hidden ${photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  {photo.src ? (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover grayscale-[40%] transition-all duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
                    />
                  ) : (
                    <PhotoPlaceholder index={i} />
                  )}
                </div>
                <figcaption className="absolute inset-x-3 bottom-3 translate-y-3 rounded-xl bg-white/85 px-4 py-2.5 text-sm font-medium opacity-0 shadow-soft backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
                  {photo.alt}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhotoPlaceholder({ index }: { index: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-200 to-neutral-300 transition-transform duration-700 ease-out-expo group-hover:scale-105">
      <div className="text-center text-neutral-500">
        <svg viewBox="0 0 24 24" className="mx-auto mb-2 h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 7h3l2-3h8l2 3h3v13H3z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        <p className="text-xs uppercase tracking-[0.2em]">Foto {String(index + 1).padStart(2, "0")}</p>
      </div>
    </div>
  );
}
