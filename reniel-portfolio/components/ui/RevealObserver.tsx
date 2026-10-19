"use client";

import { useEffect } from "react";

/**
 * Watches every [data-reveal] element (including ones streamed in later, like the GitHub panels)
 * and marks it data-visible when it scrolls into view. Once the fade finishes, data-reveal is removed
 * so the element's own hover/transition styles work normally again.
 */
export function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          el.addEventListener("transitionend", function done(e) {
            if (e.target !== el || e.propertyName !== "opacity") return;
            el.removeEventListener("transitionend", done);
            el.removeAttribute("data-reveal");
          });
          el.dataset.visible = "true";
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
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