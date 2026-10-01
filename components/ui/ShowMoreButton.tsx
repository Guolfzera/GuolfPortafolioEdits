"use client";

import { motion } from "motion/react";

type Props = { expanded: boolean; hidden: number; onClick: () => void };

// Botón "Mostrar más / Mostrar menos" que comparten Trabajos y Detrás de escena
export function ShowMoreButton({ expanded, hidden, onClick }: Props) {
  return (
    <motion.div layout className="mt-12 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={expanded}
        className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-7 py-4 font-medium text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-night hover:shadow-glow"
      >
        {expanded ? "Mostrar menos" : "Mostrar más"}
        {!expanded && <span className="text-sm opacity-50">+{hidden}</span>}
        <span
          className={`grid h-6 w-6 place-items-center rounded-full bg-white text-night transition-transform duration-500 ease-out-expo group-hover:bg-night group-hover:text-white ${
            expanded ? "rotate-180" : ""
          }`}
        >
          ↓
        </span>
      </button>
    </motion.div>
  );
}
