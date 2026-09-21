"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;

    if (!background) return;

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      background.style.setProperty("--mouse-x", `${x}%`);
      background.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="interactive-background"
      aria-hidden="true"
    >
      <div className="background-grid" />
      <div className="background-glow" />
      <div className="background-orbit" />
    </div>
  );
}