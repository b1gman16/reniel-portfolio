import type { CSSProperties } from "react";

/** Stagger helper: <div data-reveal style={revealDelay(120)} /> */
export const revealDelay = (ms: number) =>
  ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;