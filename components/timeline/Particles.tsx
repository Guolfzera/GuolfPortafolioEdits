"use client";

import { useEffect, useRef } from "react";

// Partículas grises que flotan de fondo, más concentradas en los costados (junto a los íconos).
// Suben lento, parpadean suave y se arrastran un poco con el scroll. Se dibujan en un canvas para que sea liviano.
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; phase: number; speed: number };
    let parts: P[] = [];

    // Más partículas hacia los bordes: x se elige con mayor probabilidad cerca de los lados
    const edgeX = () => {
      const t = Math.random() ** 1.8 * 0.5;
      return (Math.random() < 0.5 ? t : 1 - t) * w;
    };
    const make = (y = Math.random() * h): P => ({
      x: edgeX(),
      y,
      r: 0.6 + Math.random() * 1.8,
      vy: -(0.08 + Math.random() * 0.3),
      vx: (Math.random() - 0.5) * 0.15,
      a: 0.15 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.5,
    });

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(110, (w * h) / 14000));
      parts = Array.from({ length: count }, () => make());
    };
    resize();

    let lastScroll = window.scrollY;
    let drift = 0;
    let raf = 0;
    let t = 0;

    const draw = () => {
      t += 0.016;
      // El scroll empuja las partículas (con inercia)
      const sy = window.scrollY;
      drift += (sy - lastScroll) * 0.08;
      lastScroll = sy;
      drift *= 0.9;

      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.vy - drift * (p.r / 2.4);
        p.x += p.vx + Math.sin(t * 0.6 + p.phase) * 0.08;
        if (p.y < -10) Object.assign(p, make(h + 10));
        if (p.y > h + 10) Object.assign(p, make(-10));
        const twinkle = 0.55 + 0.45 * Math.sin(t * p.speed + p.phase);
        const alpha = p.a * twinkle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 210, ${alpha})`;
        ctx.shadowColor = `rgba(220, 220, 230, ${alpha})`;
        ctx.shadowBlur = p.r * 4;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      // Sin movimiento: se dibujan una sola vez
      drift = 0;
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />;
}
