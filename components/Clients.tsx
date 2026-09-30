import Image from "next/image";
import { clients } from "@/data/clients";
import { Reveal } from "./ui/Reveal";

export function Clients() {
  if (clients.length === 0) return null;
  // Repetimos la lista para que el carrusel nunca quede vacío en pantallas anchas
  const row = Array.from({ length: Math.max(2, Math.ceil(12 / clients.length)) }, () => clients).flat();

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <Reveal className="mb-12 px-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-mute">Marcas y clientes que confiaron en mí</p>
      </Reveal>

      <div className="marquee-host relative [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee" style={{ "--marquee-duration": "45s" } as React.CSSProperties}>
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-5 pr-5" aria-hidden={k === 1}>
              {row.map((c, i) => (
                <div
                  key={i}
                  className="flex h-24 w-52 shrink-0 items-center justify-center rounded-2xl border border-line bg-white px-6 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift"
                >
                  {c.logo ? (
                    <Image
                      src={c.logo}
                      alt={c.name}
                      width={140}
                      height={48}
                      className="max-h-12 w-auto object-contain opacity-60 grayscale transition-opacity duration-300 hover:opacity-100"
                    />
                  ) : (
                    <span className="font-display text-xl font-bold tracking-tight text-ink/40 transition-colors duration-300 hover:text-ink">
                      {c.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
