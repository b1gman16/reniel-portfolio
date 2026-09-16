"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export default function RevealClip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const revealIfVisible = () => {
      const { top, bottom } = element.getBoundingClientRect();
      if (top < window.innerHeight + 120 && bottom > 0) {
        setVisible(true);
        observer.disconnect();
        window.removeEventListener("scroll", revealIfVisible);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
          window.removeEventListener("scroll", revealIfVisible);
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px 120px 0px" }
    );

    observer.observe(element);
    window.addEventListener("scroll", revealIfVisible, { passive: true });
    revealIfVisible();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealIfVisible);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full"
        animate={{
          clipPath: visible ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        }}
        transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ willChange: "clip-path" }}
      >
        {children}
      </motion.div>
    </div>
  );
}