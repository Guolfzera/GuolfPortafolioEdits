"use client";

import { motion } from "motion/react";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  inView?: boolean;
};

// Texto que entra letra por letra desde abajo
export function SplitText({ text, className, delay = 0, stagger = 0.035, inView = false }: Props) {
  const words = text.split(" ");
  let index = 0;
  const trigger = inView
    ? { whileInView: "show", viewport: { once: true, margin: "-40px" } }
    : { animate: "show" };

  return (
    <motion.span className={className} initial="hidden" {...trigger} aria-label={text}>
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap" aria-hidden>
          {word.split("").map((char) => {
            const i = index++;
            return (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
                  transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
}
