export default function CatMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="A small line drawing of a cat"
    >
      <path d="M28 46 L20 20 L38 34 Q50 28 62 34 L80 20 L72 46" />
      <path d="M20 46 Q20 78 50 80 Q80 78 80 46 Q80 38 72 36 Q62 34 50 40 Q38 34 28 36 Q20 38 20 46 Z" />
      <circle cx="40" cy="50" r="2.2" fill="currentColor" />
      <circle cx="60" cy="50" r="2.2" fill="currentColor" />
      <path d="M46 58 Q50 62 54 58" />
      <path d="M28 58 L14 56 M28 62 L14 64 M72 58 L86 56 M72 62 L86 64" />
      <path d="M80 62 Q94 66 92 80 Q90 90 78 86" />
    </svg>
  );
}