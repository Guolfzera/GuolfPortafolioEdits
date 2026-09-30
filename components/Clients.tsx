import Image from "next/image";
import { clients, type Client } from "@/data/clients";
import { Reveal } from "./ui/Reveal";

export function Clients() {
  const creators = clients.filter((c) => c.type === "creador");
  const brands = clients.filter((c) => c.type === "marca");
  if (clients.length === 0) return null;

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <Reveal className="mb-12 px-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-mute">
          Creadores y marcas con los que he trabajado
        </p>
      </Reveal>

      <div className="flex flex-col gap-5">
        {creators.length > 0 && <Row label="Creadores" items={creators} />}
        {brands.length > 0 && <Row label="Campañas para" items={brands} reverse dark />}
      </div>
    </section>
  );
}

function Row({ label, items, reverse, dark }: { label: string; items: Client[]; reverse?: boolean; dark?: boolean }) {
  // Repetimos la lista para que el carrusel nunca quede vacío en pantallas anchas
  const row = Array.from({ length: Math.max(2, Math.ceil(10 / items.length)) }, () => items).flat();

  return (
    <div>
      <p className="mb-3 px-4 text-center text-[10px] font-medium uppercase tracking-[0.3em] text-mute">{label}</p>
      <div className="marquee-host relative [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className={`marquee ${reverse ? "marquee-reverse" : ""}`}
          style={{ "--marquee-duration": "50s" } as React.CSSProperties}
        >
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-5 py-3 pr-5" aria-hidden={k === 1}>
              {row.map((c, i) => (
                <div
                  key={i}
                  className={`flex h-24 w-56 shrink-0 flex-col items-center justify-center rounded-2xl border px-6 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift ${
                    dark ? "border-white/10 bg-night text-white" : "border-line bg-card text-ink"
                  }`}
                >
                  {c.logo ? (
                    <Image
                      src={c.logo}
                      alt={c.name}
                      width={140}
                      height={48}
                      className="max-h-12 w-auto object-contain opacity-70 grayscale transition-opacity duration-300 hover:opacity-100"
                    />
                  ) : (
                    <span
                      className={`font-display text-xl font-bold tracking-tight transition-colors duration-300 ${
                        dark ? "text-white/60 hover:text-white" : "text-ink/50 hover:text-ink"
                      }`}
                    >
                      {c.name}
                    </span>
                  )}
                  {c.note && (
                    <span className={`mt-1 text-[10px] uppercase tracking-[0.2em] ${dark ? "text-white/40" : "text-mute"}`}>
                      {c.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
