type Variant = "hallguard" | "homeops" | "oceanview";

function HallGuardArt() {
  return (
    <svg viewBox="0 0 640 480" className="h-full w-full" role="img" aria-label="Diagram of HallGuard's dual-camera detection system">
      <rect x="0" y="0" width="640" height="480" fill="var(--color-dark)" />
      <g stroke="var(--color-hairline-dark)" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 80} y1="0" x2={i * 80} y2="480" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 80} x2="640" y2={i * 80} />
        ))}
      </g>
      {/* railing line */}
      <line x1="60" y1="330" x2="580" y2="330" stroke="#4a4d54" strokeWidth="3" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`bar${i}`} x1={80 + i * 42} y1="330" x2={80 + i * 42} y2="380" stroke="#4a4d54" strokeWidth="3" />
      ))}
      {/* camera cones */}
      <g fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.85">
        <path d="M120 90 L260 300 L60 300 Z" strokeDasharray="4 5" />
        <path d="M500 90 L560 300 L360 300 Z" strokeDasharray="4 5" />
      </g>
      <circle cx="120" cy="90" r="7" fill="var(--color-accent)" />
      <circle cx="500" cy="90" r="7" fill="var(--color-accent)" />
      {/* detection box */}
      <rect x="255" y="230" width="110" height="130" fill="none" stroke="#f2f1ec" strokeWidth="2" />
      <text x="255" y="222" fill="#f2f1ec" fontSize="14" fontFamily="var(--font-sans)">person · 0.94</text>
      <line x1="255" y1="230" x2="255" y2="230" stroke="#f2f1ec" />
    </svg>
  );
}

function HomeOpsArt() {
  const rows = 6;
  const cols = 10;
  return (
    <svg viewBox="0 0 640 480" className="h-full w-full" role="img" aria-label="Diagram of HomeOps server dashboard grid">
      <rect x="0" y="0" width="640" height="480" fill="var(--color-dark)" />
      <g fontFamily="var(--font-sans)">
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((__, c) => {
            const active = (r * cols + c) % 7 === 0;
            return (
              <rect
                key={`${r}-${c}`}
                x={40 + c * 56}
                y={60 + r * 62}
                width="44"
                height="46"
                rx="3"
                fill={active ? "var(--color-accent)" : "#20222a"}
                opacity={active ? 0.85 : 1}
                stroke="#33353a"
              />
            );
          })
        )}
      </g>
      <g fontFamily="var(--font-sans)" fill="#8b8d94" fontSize="13">
        <text x="40" y="42">CPU 38%</text>
        <text x="220" y="42">MEM 61%</text>
        <text x="400" y="42">DISK 44%</text>
        <text x="40" y="450" fill="var(--color-accent)">● 6 containers running</text>
      </g>
    </svg>
  );
}

function OceanViewArt() {
  return (
    <svg viewBox="0 0 640 480" className="h-full w-full" role="img" aria-label="Line illustration of the Ocean View Resort site layout">
      <rect x="0" y="0" width="640" height="480" fill="var(--color-paper-soft)" />
      <line x1="0" y1="300" x2="640" y2="300" stroke="var(--color-hairline)" strokeWidth="2" />
      <path
        d="M0 300 C 80 270, 160 320, 240 290 S 400 260, 480 295 S 600 275, 640 300"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
      />
      <path
        d="M0 320 C 90 300, 170 340, 260 315 S 420 290, 500 320 S 610 300, 640 320"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1"
        opacity="0.5"
      />
      <circle cx="540" cy="110" r="46" fill="none" stroke="var(--color-mid)" strokeWidth="1.5" />
      {/* simple structure */}
      <g stroke="var(--color-ink)" strokeWidth="1.5" fill="none">
        <path d="M80 300 L80 210 L160 160 L240 210 L240 300" />
        <line x1="80" y1="230" x2="240" y2="230" />
        <rect x="150" y="250" width="30" height="50" />
      </g>
      <g stroke="var(--color-ink)" strokeWidth="1" opacity="0.5">
        <line x1="60" y1="330" x2="120" y2="300" />
        <line x1="150" y1="335" x2="180" y2="300" />
        <line x1="260" y1="325" x2="300" y2="300" />
      </g>
    </svg>
  );
}

export default function ProjectVisual({ variant }: { variant: Variant }) {
  if (variant === "hallguard") return <HallGuardArt />;
  if (variant === "homeops") return <HomeOpsArt />;
  return <OceanViewArt />;
}
