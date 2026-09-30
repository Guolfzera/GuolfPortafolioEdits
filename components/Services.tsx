import { services, type Service } from "@/data/services";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Services() {
  return (
    <section id="servicios" className="px-4 py-28 md:px-8 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" eyebrow="Servicios" title="Qué puedo hacer por ti">
          <Reveal delay={0.2} className="max-w-xs text-ink/60">
            De la idea a la entrega final: grabación, edición y contenido listo para publicar.
          </Reveal>
        </SectionHeading>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.1} className={s.featured ? "md:col-span-2" : ""}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-7 shadow-soft transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:border-ink hover:bg-ink hover:text-white hover:shadow-lift md:p-8">
                <div className="mb-10 flex items-start justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-white transition-all duration-500 ease-out-expo group-hover:rotate-[-6deg] group-hover:scale-110 group-hover:bg-white group-hover:text-ink">
                    <Icon name={s.icon} />
                  </span>
                  <span className="font-display text-sm font-bold text-mute transition-colors duration-500 group-hover:text-white/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3
                  className={`font-display font-bold tracking-tight ${s.featured ? "text-3xl md:text-4xl" : "text-2xl"}`}
                >
                  {s.title}
                </h3>
                <p
                  className={`mt-3 text-ink/60 transition-colors duration-500 group-hover:text-white/70 ${
                    s.featured ? "max-w-xl text-lg" : ""
                  }`}
                >
                  {s.text}
                </p>

                <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line px-3 py-1 text-xs font-medium text-ink/70 transition-colors duration-500 group-hover:border-white/20 group-hover:text-white/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {s.featured && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -bottom-16 -right-10 font-display text-[12rem] font-bold leading-none text-ink/[0.04] transition-all duration-700 ease-out-expo group-hover:-translate-x-4 group-hover:text-white/[0.06]"
                  >
                    REC
                  </span>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Icon({ name }: { name: Service["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-6 w-6",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "camera":
      return (
        <svg {...common}>
          <rect x="2.5" y="6" width="13" height="12" rx="2.5" />
          <path d="M15.5 10.5 21.5 7v10l-6-3.5" />
        </svg>
      );
    case "idea":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <rect x="2.5" y="5" width="19" height="14" rx="4" />
          <path d="m10 9.5 5 2.5-5 2.5z" fill="currentColor" />
        </svg>
      );
    case "clips":
      return (
        <svg {...common}>
          <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
          <path d="m10.5 9.5 4 2.5-4 2.5z" fill="currentColor" />
        </svg>
      );
    case "brand":
      return (
        <svg {...common}>
          <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
        </svg>
      );
  }
}
