import { site } from "@/data/site";
import { Magnetic } from "./ui/Magnetic";
import { Reveal } from "./ui/Reveal";
import { SplitText } from "./ui/SplitText";

export function Contact() {
  const { contact } = site;
  const whatsapp = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  const socials = [
    { label: "Instagram", href: contact.instagram },
    { label: "TikTok", href: contact.tiktok },
    { label: "YouTube", href: contact.youtube },
  ].filter((s) => s.href);

  return (
    <section id="contacto" className="relative overflow-hidden bg-ink px-4 pb-10 pt-28 text-white md:px-8 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal y={20}>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-white/50">04 — Contacto</p>
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
            Cuéntame tu idea y te respondo en menos de 24 horas con una propuesta.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-wrap gap-4">
            <Magnetic>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-5 text-lg font-medium text-ink shadow-glow transition-transform duration-300 hover:scale-[1.04]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4C2.7 15.6 2.2 13.8 2.2 12 2.2 6.6 6.6 2.2 12 2.2S21.8 6.6 21.8 12 17.4 21.8 12 21.8zM12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12S18.6 0 12 0z" />
                </svg>
                WhatsApp
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
