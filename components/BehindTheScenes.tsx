import { photos } from "@/data/photos";
import { resolvePublicImage } from "@/lib/assets";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { PhotoGrid } from "./PhotoGrid";

export function BehindTheScenes() {
  // Se resuelve al compilar qué fotos existen en /public (la grilla corre en el navegador)
  const resolved = photos.map((photo) => ({ ...photo, resolved: resolvePublicImage(photo.src) }));

  return (
    <section id="bts" className="px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" eyebrow="Detrás de escena" title="Donde pasa la magia">
          <Reveal delay={0.2} className="max-w-xs text-ink/60">
            Horas de timeline, color y sonido. Así se ve el proceso detrás de cada entrega.
          </Reveal>
        </SectionHeading>

        <PhotoGrid photos={resolved} />
      </div>
    </section>
  );
}
