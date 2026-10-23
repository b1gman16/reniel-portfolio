"use client";

import { useEffect, useRef } from "react";

// 8x8 ordered-dither (Bayer) threshold matrix, built once. Used as the halftone texture.
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

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Props = {
  src: string;
  alt: string;
  /** Size of one texture dot in CSS pixels. Smaller = finer, larger = chunkier. */
  dotSize?: number;
  /** How much halftone texture is mixed into the grayscale photo: 0 = smooth photo, 1 = full halftone. */
  texture?: number;
  /** 1 = neutral, higher = punchier, lower = softer. */
  contrast?: number;
  /** Positive lightens, negative darkens (about -40 to 40). */
  brightness?: number;
  /** Where the photo sits inside its box. "bottom" makes the photo's lower edge meet the box's bottom. */
  align?: "center" | "bottom";
  className?: string;
};

/**
 * Draws a photo as a grayscale image with a halftone-style dot texture, at the screen's real
 * resolution. Transparent pixels (PNG cutouts) stay transparent, so the page shows through.
 */
export function DitheredPortrait({
  src,
  alt,
  dotSize = 1.5,
  texture = 0.45,
  contrast = 1.05,
  brightness = 0,
  align = "center",
  className,
}: Props) {
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
      const cell = Math.max(1, Math.round(dotSize * dpr)); // device pixels per texture dot
      const cw = Math.round(box.width * dpr);
      const ch = Math.round(box.height * dpr);
      canvas.width = cw;
      canvas.height = ch;

      // Fit the photo inside the box (contain) at full device resolution
      const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = Math.max(1, Math.round(img.naturalWidth * scale));
      const dh = Math.max(1, Math.round(img.naturalHeight * scale));
      const dx = Math.round((cw - dw) / 2);
      const dy = align === "bottom" ? ch - dh : Math.round((ch - dh) / 2);

      off.width = dw;
      off.height = dh;
      octx.imageSmoothingEnabled = true;
      octx.imageSmoothingQuality = "high";
      octx.clearRect(0, 0, dw, dh);
      octx.drawImage(img, 0, 0, dw, dh);
      const frame = octx.getImageData(0, 0, dw, dh);
      const data = frame.data;

      // Pass 1: luminance + histogram (to stretch tones to the full range)
      const lum = new Float32Array(dw * dh);
      const hist = new Uint32Array(256);
      let count = 0;
      for (let i = 0; i < lum.length; i++) {
        const o = i * 4;
        if (data[o + 3] === 0) {
          lum[i] = -1; // fully transparent
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
        if (acc >= count * 0.02) {
          lo = v;
          break;
        }
      }
      acc = 0;
      for (let v = 255; v >= 0; v--) {
        acc += hist[v];
        if (acc >= count * 0.02) {
          hi = v;
          break;
        }
      }
      if (hi - lo < 16) {
        lo = 0;
        hi = 255;
      }

      // Pass 2: grayscale tone + halftone texture. Whites are capped and blacks lifted slightly so
      // highlights keep visible texture and shadows keep detail.
      const dark = document.documentElement.dataset.theme === "dark";
      const shadow = dark ? [11, 11, 12] : [16, 16, 16];
      const light = dark ? [243, 241, 235] : [232, 229, 220];
      const LOW = 0.04;
      const HIGH = 0.84;
      for (let y = 0; y < dh; y++) {
        const cy = Math.floor(y / cell) % 8;
        for (let x = 0; x < dw; x++) {
          const i = y * dw + x;
          const l = lum[i];
          if (l < 0) continue;
          let v = ((l - lo) / (hi - lo)) * 255;
          v = (v - 128) * contrast + 128 + brightness;
          const m = LOW + clamp01(v / 255) * (HIGH - LOW);
          const t = (BAYER8[cy * 8 + (Math.floor(x / cell) % 8)] + 0.5) / 64;
          const halftone = m > t ? 1 : 0;
          const b = m * (1 - texture) + halftone * texture;
          const o = i * 4;
          data[o] = shadow[0] + (light[0] - shadow[0]) * b;
          data[o + 1] = shadow[1] + (light[1] - shadow[1]) * b;
          data[o + 2] = shadow[2] + (light[2] - shadow[2]) * b;
          // alpha is left as-is, so the cutout's soft edges stay smooth
        }
      }
      octx.putImageData(frame, 0, 0);

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(off, dx, dy);
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
  }, [src, dotSize, texture, contrast, brightness, align]);

  return <canvas ref={ref} role="img" aria-label={alt} className={`h-full w-full ${className ?? ""}`} />;
}