"use client";

import { useState } from "react";
import type { ContributionDay } from "@/lib/github/types";

const COLORS = ["#1c1d20", "#3a3b40", "#62646a", "#a7a9ac", "#f3f1eb"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function describe(d: ContributionDay) {
  const [y, m, day] = d.date.split("-").map(Number);
  const text = new Date(Date.UTC(y, m - 1, day)).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric", timeZone: "UTC",
  });
  return `${d.count} contribution${d.count === 1 ? "" : "s"} on ${text}`;
}

export function Heatmap({ weeks }: { weeks: ContributionDay[][] }) {
  const [tip, setTip] = useState<{ text: string; x: number; y: number } | null>(null);

    // Month labels: first week where the month changes (skip if too close to the previous label)
  const labels: string[] = [];
  let lastLabel = -10;
  let lastMonth = -1;
  for (let i = 0; i < weeks.length; i++) {
    const month = Number(weeks[i][0].date.slice(5, 7)) - 1;
    let label = "";
    if (month !== lastMonth) {
      lastMonth = month;
      if (i - lastLabel >= 3) {
        lastLabel = i;
        label = MONTHS[month];
      }
    }
    labels.push(label);
  }

  const show = (el: HTMLElement, d: ContributionDay) => {
    const r = el.getBoundingClientRect();
    setTip({ text: describe(d), x: r.left + r.width / 2, y: r.top });
  };

  return (
    <div>
      <div className="flex gap-2">
        <div aria-hidden className="mt-[18px] grid shrink-0 grid-rows-7 gap-[3px] font-mono text-[9px] uppercase text-silver">
          {DAY_LABELS.map((l, i) => (
            <span key={i} className="flex h-[11px] items-center">{l}</span>
          ))}
        </div>
        <div className="min-w-0 overflow-x-auto pb-2" onScroll={() => setTip(null)} role="group" aria-label="Contribution calendar">
          <div className="flex w-max gap-[3px]">
            {weeks.map((week, wi) => {
              const slots: (ContributionDay | null)[] = Array(7).fill(null);
              week.forEach((d) => (slots[d.weekday] = d));
              return (
                <div key={week[0].date} className="flex flex-col gap-[3px]">
                  <span aria-hidden className="h-[15px] w-[11px] whitespace-nowrap font-mono text-[9px] uppercase text-silver">{labels[wi]}</span>
                  {slots.map((d, di) =>
                    d ? (
                      <button
                        key={d.date}
                        type="button"
                        aria-label={describe(d)}
                        onMouseEnter={(e) => show(e.currentTarget, d)}
                        onMouseLeave={() => setTip(null)}
                        onFocus={(e) => show(e.currentTarget, d)}
                        onBlur={() => setTip(null)}
                        onClick={(e) => show(e.currentTarget, d)}
                        className="h-[11px] w-[11px] rounded-[2px] border border-white/5 p-0"
                        style={{ backgroundColor: COLORS[d.level] }}
                      />
                    ) : (
                      <span key={`e${wi}-${di}`} className="h-[11px] w-[11px]" aria-hidden />
                    ),
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 font-mono text-[10px] uppercase tracking-wider text-silver" aria-hidden>
        Less
        {COLORS.map((c) => (
          <span key={c} className="h-[11px] w-[11px] rounded-[2px] border border-white/5" style={{ backgroundColor: c }} />
        ))}
        More
      </div>

      {tip && (
        <div role="tooltip" className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-sm border border-silver bg-deep px-2 py-1 font-mono text-[11px] text-bone"
          style={{ left: Math.min(Math.max(tip.x, 90), (typeof window !== "undefined" ? window.innerWidth : 400) - 90), top: tip.y - 8 }}>
          {tip.text}
        </div>
      )}
    </div>
  );
}
