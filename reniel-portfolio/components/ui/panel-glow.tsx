import { GlowingEffect } from "@/components/ui/glowing-effect";

/**
 * Cursor-following border glow for a panel. The parent must be `relative`.
 * tone="light" for the theme-aware glass panels, tone="dark" for the always-dark ones.
 */
export function PanelGlow({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <GlowingEffect
      variant={tone === "dark" ? "bone" : "ink"}
      glow
      disabled={false}
      spread={40}
      proximity={64}
      inactiveZone={0.01}
      borderWidth={1.5}
    />
  );
}