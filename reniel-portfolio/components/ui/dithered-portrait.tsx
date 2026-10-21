"use client";

import { useEffect, useRef } from "react";

// 4x4 ordered-dither (Bayer) threshold matrix
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

type Props = {
  src: string;
  alt: string;
  /** Internal pixel width. Lower = chunkier dots. */
  width?: number;
  /** Tone controls: raise contrast for punchier dots, brightness to lighten/darken overall. */
  contrast?: number;
  brightness?: number;
  className?: string;
};

/**
 * Draws a photo as a black-and-white ordered dither on a canvas. Dots are light on the dark theme and
 * dark on the light theme; the rest stays transparent so the page shows through.
 */
export function DitheredPortrait({ src, alt, width = 480, contrast = 1.35, brightness = 8, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let lum: Uint8ClampedArray | null = null;
    let w = 0;
    let h = 0;

    const paint = () => {
      if (!lum) return;
      const dark = document.documentElement.dataset.theme === "dark";
      const [r, g, b] = dark ? [243, 241, 235] : [16, 16, 16];
      const out = ctx.createImageData(w, h);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = y * w + x;
          const threshold = ((BAYER[(y % 4) * 4 + (x % 4)] + 0.5) / 16) * 255;
          const on = dark ? lum[i] > threshold : lum[i] < threshold;
          if (!on) continue;
          const o = i * 4;
          out.data[o] = r;
          out.data[o + 1] = g;
          out.data[o + 2] = b;
          out.data[o + 3] = 255;
        }
      }
      ctx.putImageData(out, 0, 0);
    };

    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      w = width;
      h = Math.round((width * img.naturalHeight) / img.naturalWidth);
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      const values = new Uint8ClampedArray(w * h);
      for (let i = 0; i < values.length; i++) {
        const o = i * 4;
        const l = 0.299 * data[o] + 0.587 * data[o + 1] + 0.114 * data[o + 2];
        values[i] = (l - 128) * contrast + 128 + brightness; // clamped to 0-255 automatically
      }
      lum = values;
      ctx.clearRect(0, 0, w, h);
      paint();
    };
    img.src = src;

    // Repaint when the theme toggles
    const observer = new MutationObserver(paint);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      observer.disconnect();
      img.onload = null;
    };
  }, [src, width, contrast, brightness]);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label={alt}
      className={`h-full w-full object-contain object-bottom [image-rendering:pixelated] ${className ?? ""}`}
    />
  );
}