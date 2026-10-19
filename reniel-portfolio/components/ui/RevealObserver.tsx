"use client";

import { useEffect } from "react";

/** Marks an element visible; once the fade finishes, data-reveal is removed so hover styles work again. */
function show(el: HTMLElement) {
  el.addEventListener("transitionend", function done(e) {
    if (e.target !== el || e.propertyName !== "opacity") return;
    el.removeEventListener("transitionend", done);
    el.removeAttribute("data-reveal");
  });
  el.dataset.visible = "true";
}

/**
 * Reveals [data-reveal] elements as they scroll into view (including ones streamed in later,
 * like the GitHub panels). Elements marked data-reveal="now" are above the fold, so they reveal
 * immediately on load instead of waiting for the observer.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          show(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.dataset.reveal === "now") {
          // Next frame, so the hidden starting state is painted and the transition actually runs.
          requestAnimationFrame(() => show(el));
        } else {
          io.observe(el);
        }
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}