"use client";

import React, { memo, useEffect, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";
import { TechIcon } from "@/lib/icons";

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

const InfiniteSlider = memo(function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const size = direction === "horizontal" ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    let controls: ReturnType<typeof animate>;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prev) => prev + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: currentDuration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => translation.set(from),
      });
    }

    return () => controls.stop();
  }, [key, translation, currentDuration, width, height, gap, isTransitioning, direction, reverse]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{
          ...(direction === "horizontal" ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
});

const Item = memo(function Item({ name }: { name: string }) {
  return (
    <span className="label flex items-center gap-2 whitespace-nowrap">
      <TechIcon name={name} />
      {name}
    </span>
  );
});

const fade = "linear-gradient(to right, transparent, black 15%, black 85%, transparent)";

export const LogoMarquee = memo(function LogoMarquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  // Reduced motion: a still, keyboard-scrollable row instead of an auto-scrolling track.
  if (reduceMotion) {
    return (
      <div role="region" aria-label="Technologies" tabIndex={0} className={cn("min-w-0 overflow-x-auto py-2", className)}>
        <ul className="flex w-max items-center gap-10">
          {items.map((name) => (
            <li key={name}>
              <Item name={name} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Repeat the set so one half of the track is always wider than the screen.
  const row = [...items, ...items];

  return (
    <div
      className={cn("min-w-0 overflow-hidden py-2", className)}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <p className="sr-only">{items.join(", ")}</p>
      <div aria-hidden="true">
        <InfiniteSlider gap={40} duration={60} durationOnHover={20}>
          {row.map((name, i) => (
            <Item key={`${name}-${i}`} name={name} />
          ))}
        </InfiniteSlider>
      </div>
    </div>
  );
});

LogoMarquee.displayName = "LogoMarquee";
export default LogoMarquee;