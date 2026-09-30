import { site } from "@/data/site";
import { Magnetic } from "./ui/Magnetic";
import { Reveal } from "./ui/Reveal";
import { SplitText } from "./ui/SplitText";

export function Contact() {
  const { contact } = site;
  const socials = [
    { label: "Instagram", href: contact.instagram },
    { label: "TikTok", href: contact.tiktok },
    { label: "YouTube", href: contact.youtube },
  ].filter((s) => s.href);

  return (
    <section id="contacto" className="relative overflow-hidden bg-night px-4 pb-10 pt-28 text-white md:px-8 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal y={20}>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-white/50">05 — Contacto</p>
        </Reveal>
        <h2 className="font-display text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.04em]">
          <SplitText text="¿Tienes un" inView className="block" />
          <SplitText
            text="proyecto?"
            inView
            delay={0.2}
            className="block text-transparent [-webkit-text-stroke:2px_#fafafa]"
          />
        </h2>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-lg text-lg text-white/60">
            Cuéntame tu idea: campañas, clips de stream o contenido para redes. Tu feedback es parte del proceso, así
            que ajustamos hasta que quede perfecto.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Magnetic>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram @${contact.instagramUser}`}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-5 text-lg font-medium text-night shadow-glow transition-transform duration-300 hover:scale-[1.04]"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 transition-transform duration-500 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                  <circle cx="12" cy="12" r="4.25" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
                </svg>
                @{contact.instagramUser}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-5 text-lg font-medium transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/5"
              >
                {contact.email}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <footer className="mt-28 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
          </p>
          <ul className="flex gap-6">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-white/70 transition-colors hover:text-white"
                >
                  {s.label} ↗
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
          <a href="#top" className="text-white/70 transition-colors hover:text-white">
            Volver arriba ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
