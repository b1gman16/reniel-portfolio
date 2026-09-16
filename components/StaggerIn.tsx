"use client";

import type { ReactNode } from "react";

export default function StaggerIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`rise ${className}`} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}