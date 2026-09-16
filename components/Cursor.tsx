"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const pathname = usePathname();

  return <CursorContent key={pathname} />;
}

function CursorContent() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client capability check, not a render loop
    setEnabled(fine);
    if (!fine) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    }

    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (target) {
        setLabel(target.getAttribute("data-cursor"));
        setActive(true);
      }
    }
    function onOut(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]");
      if (target) {
        setLabel(null);
        setActive(false);
      }
    }

    let frameId: number;
    function tick() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }
      frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-100 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-100 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/70 transition-[width,height,background-color,border-color] duration-200 ${
          active ? "h-20 w-20 border-transparent bg-ink" : "h-9 w-9"
        }`}
        style={{ willChange: "transform" }}
      >
        {label && (
          <span className="flex h-full w-full items-center justify-center text-center text-[11px] font-medium leading-tight text-paper">
            {label}
          </span>
        )}
      </div>
    </>
  );
}