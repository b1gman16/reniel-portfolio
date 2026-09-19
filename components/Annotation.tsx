export default function Annotation({
  children,
  rotate = -3.5,
  className = "",
}: {
  children: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={`annotation ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}