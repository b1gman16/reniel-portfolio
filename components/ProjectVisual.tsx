type Variant = "hallguard" | "homeops" | "oceanview";

function GrainDefs({ id }: { id: string }) {
  return (
    <defs>
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <linearGradient id={`chrome-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f2f3f5" />
        <stop offset="45%" stopColor="#6c6f74" />
        <stop offset="100%" stopColor="#f2f3f5" />
      </linearGradient>
    </defs>
  );
}

function CornerMarks({ gradientId }: { gradientId: string }) {
  const s = 26;
  const pts: [number, number, string][] = [
    [24, 24, `M0 ${s} V0 H${s}`],
    [616 - 24, 24, `M0 0 H${s} V${s}`],
    [24, 456 - 24, `M0 0 V${s} H${s}`],
    [616 - 24, 456 - 24, `M${s} 0 V${s} H0`],
  ];
  return (
    <g stroke={`url(#${gradientId})`} strokeWidth="1.5" fill="none" opacity="0.8">
      {pts.map(([x, y, d], i) => (
        <path key={i} d={d} transform={`translate(${x} ${y})`} />
      ))}
    </g>
  );
}

function HallGuardArt({ accent }: { accent: string }) {
  const gid = "hg";
  return (
    <svg viewBox="0 0 640 480" className="h-full w-full" role="img" aria-label="HallGuard: dual-camera detection view over a hallway railing">
      <GrainDefs id={gid} />
      <defs>
        <radialGradient id="hg-vignette" cx="50%" cy="42%" r="75%">
          <stop offset="0%" stopColor="#1c1c1e" />
          <stop offset="100%" stopColor="#060606" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="640" height="480" fill="url(#hg-vignette)" />
      <rect x="0" y="0" width="640" height="480" filter={`url(#${gid})`} opacity="0.05" />

      <text x="592" y="440" textAnchor="end" fontFamily="var(--font-display)" fontStyle="italic" fontSize="120" fill="none" stroke="#2a2a2d" strokeWidth="1" opacity="0.6">01</text>

      <line x1="70" y1="336" x2="570" y2="336" stroke="#3a3a3d" strokeWidth="3" />
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1={95 + i * 42} y1="336" x2={95 + i * 42} y2="382" stroke="#3a3a3d" strokeWidth="3" />
      ))}

      <g fill="none" stroke={accent} strokeWidth="1" opacity="0.55">
        <path d="M118 96 L250 300 L62 300 Z" strokeDasharray="3 6" />
        <path d="M498 96 L556 300 L368 300 Z" strokeDasharray="3 6" />
      </g>
      <circle cx="118" cy="96" r="5" fill={accent} />
      <circle cx="498" cy="96" r="5" fill={accent} />

      <rect x="258" y="222" width="104" height="128" fill="none" stroke="#efece2" strokeWidth="1.5" />
      <rect x="258" y="200" width="118" height="20" fill={accent} opacity="0.9" />
      <text x="264" y="215" fontFamily="var(--font-sans)" fontSize="12" fill="#0a0a0a" fontWeight="600">PERSON · 0.94</text>
      <circle cx="270" cy="192" r="3" fill={accent} />

      <CornerMarks gradientId={`chrome-${gid}`} />

      <text x="48" y="440" fontFamily="var(--font-hand)" fontSize="20" fill={accent} opacity="0.85" transform="rotate(-3 48 440)">figured this out eventually</text>
    </svg>
  );
}

function HomeOpsArt({ accent }: { accent: string }) {
  const gid = "ho";
  return (
    <svg viewBox="0 0 640 480" className="h-full w-full" role="img" aria-label="HomeOps: server rack and dashboard at night">
      <GrainDefs id={gid} />
      <defs>
        <linearGradient id="ho-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#161618" />
          <stop offset="100%" stopColor="#050506" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="640" height="480" fill="url(#ho-bg)" />
      <rect x="0" y="0" width="640" height="480" filter={`url(#${gid})`} opacity="0.05" />

      <text x="592" y="440" textAnchor="end" fontFamily="var(--font-display)" fontStyle="italic" fontSize="120" fill="none" stroke="#2a2a2d" strokeWidth="1" opacity="0.6">02</text>

      {Array.from({ length: 6 }).map((_, r) => (
        <g key={r}>
          <rect x="64" y={70 + r * 58} width="512" height="42" fill="#131315" stroke="#2a2a2d" strokeWidth="1" />
          {Array.from({ length: 14 }).map((_, c) => {
            const on = (r * 14 + c) % 9 === 0;
            return (
              <rect
                key={c}
                x={78 + c * 34}
                y={70 + r * 58 + 16}
                width="8"
                height="8"
                fill={on ? accent : "#2c2c2f"}
                opacity={on ? 0.95 : 0.7}
              />
            );
          })}
        </g>
      ))}

      <text x="64" y="56" fontFamily="var(--font-sans)" fontSize="13" fill="#9b978c">CPU 38%   MEM 61%   DISK 44%</text>
      <text x="64" y="462" fontFamily="var(--font-sans)" fontSize="13" fill={accent}>● 6 containers running</text>

      <CornerMarks gradientId={`chrome-${gid}`} />

      <text x="420" y="56" fontFamily="var(--font-hand)" fontSize="20" fill={accent} opacity="0.85" transform="rotate(2 420 56)">still experimenting</text>
    </svg>
  );
}

function OceanViewArt({ accent }: { accent: string }) {
  const gid = "ov";
  return (
    <svg viewBox="0 0 640 480" className="h-full w-full" role="img" aria-label="Ocean View Resort: architectural line study, in daylight">
      <GrainDefs id={gid} />
      <rect x="0" y="0" width="640" height="480" fill="#f1eee4" />
      <rect x="0" y="0" width="640" height="480" filter={`url(#${gid})`} opacity="0.035" />

      <text x="592" y="440" textAnchor="end" fontFamily="var(--font-display)" fontStyle="italic" fontSize="120" fill="none" stroke="#d9d2bd" strokeWidth="1" opacity="0.9">03</text>

      <circle cx="524" cy="112" r="44" fill="none" stroke={accent} strokeWidth="1.5" />
      <line x1="0" y1="308" x2="640" y2="308" stroke="#d9d2bd" strokeWidth="1.5" />
      <path
        d="M0 308 C 90 282, 170 326, 250 300 S 410 272, 490 302 S 610 282, 640 306"
        fill="none"
        stroke={accent}
        strokeWidth="1.5"
      />

      <g stroke="#141416" strokeWidth="1.5" fill="none">
        <path d="M96 308 L96 214 L172 168 L248 214 L248 308" />
        <line x1="96" y1="236" x2="248" y2="236" />
        <rect x="158" y="258" width="30" height="50" />
      </g>
      <g stroke="#8f897a" strokeWidth="1" opacity="0.6">
        <line x1="70" y1="330" x2="120" y2="308" />
        <line x1="160" y1="334" x2="188" y2="308" />
        <line x1="270" y1="326" x2="304" y2="308" />
      </g>

      <text x="64" y="440" fontFamily="var(--font-hand)" fontSize="22" fill={accent} opacity="0.9" transform="rotate(-2.5 64 440)">built from scratch</text>
    </svg>
  );
}

export default function ProjectVisual({
  variant,
  accent = "#9c7a3f",
}: {
  variant: Variant;
  accent?: string;
}) {
  if (variant === "hallguard") return <HallGuardArt accent={accent} />;
  if (variant === "homeops") return <HomeOpsArt accent={accent} />;
  return <OceanViewArt accent={accent} />;
}