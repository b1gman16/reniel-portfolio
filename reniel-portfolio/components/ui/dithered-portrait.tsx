"use client";

import { useEffect, useRef } from "react";

// 8x8 ordered-dither (Bayer) threshold matrix, built once
const BAYER8 = (() => {
  let m = [0];
  for (let n = 1; n < 8; n *= 2) {
    const size = n * 2;
    const next = new Array<number>(size * size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const base = 4 * m[(y % n) * n + (x % n)];
        const quadrant = (y >= n ? 2 : 0) + (x >= n ? 1 : 0);
        next[y * size + x] = base + [0, 2, 3, 1][quadrant];
      }
    }
    m = next;
  }
  return m;
})();

type Props = {
  src: string;
  alt: string;
  /** Size of one dot in CSS pixels. Smaller = finer detail, larger = chunkier. */
  dotSize?: number;
  /** Raise for punchier dots, lower for softer. */
  contrast?: number;
  /** Positive lightens, negative darkens (about -40 to 40). */
  brightness?: number;
  className?: string;
};

/**
 * Draws a photo as a black-and-white ordered dither at the screen's real resolution.
 * Dots are light on the dark theme and dark on the light theme. Transparent pixels (PNG cutouts)
 * stay transparent, so the page shows through around the subject.
 */
export function DitheredPortrait({ src, alt, dotSize = 1.5, contrast = 1.15, brightness = 0, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const off = document.createElement("canvas");
    const octx = off.getContext("2d", { willReadFrequently: true });
    if (!octx) return;

    let img: HTMLImageElement | null = null;
    let raf = 0;

    const render = () => {
      raf = 0;
      if (!img) return;
      const box = canvas.getBoundingClientRect();
      if (box.width < 2 || box.height < 2) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cell = Math.max(1, Math.round(dotSize * dpr)); // device pixels per dot
      const cw = Math.round(box.width * dpr);
      const ch = Math.round(box.height * dpr);
      canvas.width = cw;
      canvas.height = ch;

      // Fit the photo inside the box (contain), centered
      const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = Math.round(img.naturalWidth * scale);
      const dh = Math.round(img.naturalHeight * scale);
      const dx = Math.round((cw - dw) / 2);
      const dy = Math.round((ch - dh) / 2);
      const gw = Math.max(1, Math.floor(dw / cell));
      const gh = Math.max(1, Math.floor(dh / cell));

      // Sample the photo down to one pixel per dot
      off.width = gw;
      off.height = gh;
      octx.imageSmoothingEnabled = true;
      octx.imageSmoothingQuality = "high";
      octx.clearRect(0, 0, gw, gh);
      octx.drawImage(img, 0, 0, gw, gh);
      const data = octx.getImageData(0, 0, gw, gh).data;

      // Luminance, plus a histogram so tones can be stretched to the full range
      const lum = new Float32Array(gw * gh);
      const hist = new Uint32Array(256);
      let count = 0;
      for (let i = 0; i < lum.length; i++) {
        const o = i * 4;
        if (data[o + 3] < 128) {
          lum[i] = -1; // transparent
          continue;
        }
        const l = 0.299 * data[o] + 0.587 * data[o + 1] + 0.114 * data[o + 2];
        lum[i] = l;
        hist[Math.min(255, Math.round(l))]++;
        count++;
      }
      let lo = 0;
      let hi = 255;
      let acc = 0;
      for (let v = 0; v < 256; v++) {
        acc += hist[v];
        if (acc >= count * 0.01) {
          lo = v;
          break;
        }
      }
      acc = 0;
      for (let v = 255; v >= 0; v--) {
        acc += hist[v];
        if (acc >= count * 0.01) {
          hi = v;
          break;
        }
      }
      if (hi - lo < 16) {
        lo = 0;
        hi = 255;
      }

      // Dots: light on dark theme, dark on light theme
      const dark = document.documentElement.dataset.theme === "dark";
      const [r, g, b] = dark ? [243, 241, 235] : [16, 16, 16];
      const out = octx.createImageData(gw, gh);
      for (let y = 0; y < gh; y++) {
        for (let x = 0; x < gw; x++) {
          const i = y * gw + x;
          const l = lum[i];
          if (l < 0) continue;
          let v = ((l - lo) / (hi - lo)) * 255;
          v = (v - 128) * contrast + 128 + brightness;
          const threshold = ((BAYER8[(y % 8) * 8 + (x % 8)] + 0.5) / 64) * 255;
          const on = dark ? v > threshold : v < threshold;
          if (!on) continue;
          const o = i * 4;
          out.data[o] = r;
          out.data[o + 1] = g;
          out.data[o + 2] = b;
          out.data[o + 3] = 255;
        }
      }
      octx.putImageData(out, 0, 0);

      // Scale up with hard pixels so dots stay crisp
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(off, 0, 0, gw, gh, dx, dy, gw * cell, gh * cell);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      img = image;
      schedule();
    };
    image.src = src;

    const resize = new ResizeObserver(schedule);
    resize.observe(canvas);
    const theme = new MutationObserver(schedule);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      resize.disconnect();
      theme.disconnect();
      cancelAnimationFrame(raf);
      image.onload = null;
    };
  }, [src, dotSize, contrast, brightness]);

  return <canvas ref={ref} role="img" aria-label={alt} className={`h-full w-full ${className ?? ""}`} />;
}