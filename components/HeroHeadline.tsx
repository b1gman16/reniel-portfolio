"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const word = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function HeroHeadline({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden">
          {line.split(" ").map((w, wi) => (
            <span key={wi} className="mr-[0.28em] inline-block overflow-hidden last:mr-0">
              <motion.span variants={word} className="inline-block">
                {w}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}