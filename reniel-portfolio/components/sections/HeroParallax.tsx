"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { site } from "@/data/site";

/* ---- Your two images ---------------------------------------------------- */
const SUBJECT_SRC = "/images/hero/subject.png"; // transparent cutout (PNG/WebP with alpha)
const BACKGROUND_SRC = "/images/hero/background.jpg"; // JPG/WebP/PNG

/*
  Depth map. x/y = pixels moved at full mouse deflection (scaled down on small screens);
  scroll = pixels the layer drifts over the full scroll past the hero.
  Different signs = different directions; bigger numbers = nearer to the viewer.
*/
type Depth = { x: number; y: number; scroll: number };
const DEPTH: Record<"background" | "name" | "subject", Depth> = {
  background: { x: 6, y: 4, scroll: 48 },
  name: { x: -12, y: -6, scroll: 24 },
  subject: { x: -24, y: -10, scroll: 0 },
};
const BACKGROUND_SCALE = 1.15; // oversize so movement never exposes an edge

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function HeroParallax() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const bg = bgRef.current;
    const name = nameRef.current;
    const subject = subjectRef.current;
    if (!root || !bg || !name || !subject) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)");

    const target = { x: 0, y: 0 }; // where the pointer wants the scene (-1..1)
    const current = { x: 0, y: 0 }; // eased value actually drawn
    let scrollP = 0; // 0..1 progress of scrolling past the hero
    let raf = 0;
    let visible = true;
    let lastInput = -Infinity;

    const place = (el: HTMLElement, d: Depth, k: number, scale = 1) => {
      const x = current.x * d.x * k;
      const y = current.y * d.y * k + scrollP * d.scroll * k;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    };

    const apply = () => {
      const k = clamp(root.clientWidth / 1100, 0.5, 1);
      place(bg, DEPTH.background, k, BACKGROUND_SCALE);
      place(name, DEPTH.name, k);
      place(subject, DEPTH.subject, k);
    };

    const reset = () => {
      bg.style.transform = "";
      name.style.transform = "";
      subject.style.transform = "";
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible || reduce.matches) return;

      // Touch devices have no hover: drift gently unless the user is touching.
      const idleDrift = coarse.matches && now - lastInput > 2500;
      if (idleDrift) {
        target.x = Math.sin(now / 2600) * 0.8;
        target.y = Math.cos(now / 3300) * 0.6;
      }

      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      apply();

      const settling = Math.abs(target.x - current.x) > 0.001 || Math.abs(target.y - current.y) > 0.001;
      if (coarse.matches || settling) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onPointer = (e: PointerEvent) => {
      if (reduce.matches) return;
      target.x = clamp((e.clientX / window.innerWidth) * 2 - 1, -1, 1);
      target.y = clamp((e.clientY / window.innerHeight) * 2 - 1, -1, 1);
      lastInput = performance.now();
      wake();
    };

    const onScroll = () => {
      if (reduce.matches) return;
      const r = root.getBoundingClientRect();
      scrollP = clamp(-r.top / r.height, 0, 1);
      wake();
    };

    const onReduceChange = () => {
      if (reduce.matches) reset();
      else wake();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
        if (visible) wake();
      },
      { threshold: 0 }
    );

    io.observe(root);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    reduce.addEventListener("change", onReduceChange);
    coarse.addEventListener("change", wake);

    if (reduce.matches) reset();
    else {
      onScroll();
      wake();
    }

    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      reduce.removeEventListener("change", onReduceChange);
      coarse.removeEventListener("change", wake);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 isolate overflow-hidden">
      {/* z-0: background */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <Image src={BACKGROUND_SRC} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* z-10: name, behind the subject */}
      <div
        ref={nameRef}
        aria-hidden="true"
        className="absolute bottom-0 right-0 top-[30%] z-10 flex w-full items-center justify-center will-change-transform lg:top-0 lg:w-[62%]"
      >
        <p className="select-none text-center font-display text-[length:clamp(4.5rem,17vw,9rem)] leading-[0.82] tracking-tight text-bone lg:text-[length:clamp(5rem,11vw,13rem)]">
          Reniel
          <br />
          Tejones
        </p>
      </div>

      {/* z-20: subject, in front of the name (hero copy sits above everything at z-10 of the parent) */}
      <div
        ref={subjectRef}
        className="absolute bottom-0 right-0 z-20 h-[62%] w-[88%] will-change-transform lg:right-[4%] lg:h-[96%] lg:w-[46%]"
      >
        <Image
          src={SUBJECT_SRC}
          alt={`Portrait of ${site.name}`}
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 40vw, 90vw"
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}