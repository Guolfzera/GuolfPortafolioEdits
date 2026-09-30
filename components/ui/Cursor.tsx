"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

const INTERACTIVE = "a, button, [data-cursor]";

// Círculo que sigue al mouse y crece sobre elementos clickeables (solo escritorio)
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.(INTERACTIVE) as HTMLElement | null;
      setHover(el ? el.dataset.cursor ?? "" : null);
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const label = hover || "";
  const size = label ? 88 : hover !== null ? 56 : 16;
  // Blanco con borde oscuro fino y brillo; sobre links es un aro para no tapar el texto
  const edge = "shadow-[0_0_0_1.5px_rgb(0_0_0/0.55),0_0_18px_rgb(255_255_255/0.45)]";
  const ring = hover !== null && !label;
  const look = ring ? `border-2 border-white bg-transparent ${edge}` : `bg-white ${edge}`;

  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full ${look}`}
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: size, height: size, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {label && (
        <span className="text-[11px] font-semibold uppercase tracking-widest text-black">{label}</span>
      )}
    </motion.div>
  );
}
