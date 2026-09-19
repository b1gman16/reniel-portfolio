"use client";

import { motion } from "framer-motion";

type Step = { step: string; name: string; body: string };

export default function ProcessList({ steps }: { steps: Step[] }) {
  return (
    <ol className="mt-14 grid gap-x-10 gap-y-10 md:mt-20 md:grid-cols-5">
      {steps.map((p, i) => (
        <motion.li
          key={p.step}
          className="border-t hairline-inverse pt-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-sm text-mid-inverse">{p.step}</span>
          <p className="mt-3 font-display text-xl text-ink-inverse">{p.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-mid-inverse">{p.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}