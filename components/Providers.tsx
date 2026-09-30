"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { Cursor } from "./ui/Cursor";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 } }}>
      <MotionConfig reducedMotion="user">
        {children}
        <Cursor />
      </MotionConfig>
    </ReactLenis>
  );
}
