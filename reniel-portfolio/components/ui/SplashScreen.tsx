"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { site } from "@/data/site";

/* ---- Timing (milliseconds) ------------------------------------------------ */
const TEXT_IN_MS = 1600; // how long the letters take to blur in
const HOLD_MS = 700; // how long the finished name stays on screen
const FADE_S = 0.9; // seconds for the whole screen to fade away
/* -------------------------------------------------------------------------- */

/**
 * Full-screen intro. The layout script marks <html data-splash="on"> before first paint (once per
 * session, never with reduced motion). When the fade-out ends it clears that flag and fires
 * "splash-done", which is what lets the page's reveal animations begin.
 */
export function SplashScreen() {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  const finish = () => {
    delete document.documentElement.dataset.splash;
    document.documentElement.style.removeProperty("overflow");
    try {
      sessionStorage.setItem("splash-seen", "1");
    } catch {
      /* storage unavailable: the splash may show again on reload */
    }
    window.dispatchEvent(new Event("splash-done"));
    setDone(true);
  };

  useEffect(() => {
    const active = document.documentElement.dataset.splash === "on";
    // Not showing this time (seen already, or reduced motion): just clean up.
    const timer = window.setTimeout(active ? () => setLeaving(true) : finish, active ? TEXT_IN_MS + HOLD_MS : 0);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (done) return null;

  return (
    <motion.div
      initial={false}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: FADE_S, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (leaving) finish();
      }}
      // Hidden unless the layout script turned the splash on for this visit
      className={`fixed inset-0 z-[100] hidden items-center justify-center bg-canvas px-6 [html[data-splash=on]_&]:flex ${
        leaving ? "pointer-events-none" : ""
      }`}
    >
      <BlurReveal
        as="h1"
        delay={0.15}
        speedReveal={0.6}
        speedSegment={0.45}
        className="text-center font-display text-[length:clamp(2rem,8vw,5.5rem)] font-semibold tracking-[-0.04em] text-ink"
      >
        {site.name}
      </BlurReveal>
    </motion.div>
  );
}