export default function TagList({
  tags,
  accent,
  className = "",
}: {
  tags: string[];
  accent: string;
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-1.5 ${className}`}>
      {tags.map((tag) => (
        <li key={tag} className="inline-flex items-center gap-2 text-sm text-mid">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: accent }}
            aria-hidden
          />
          {tag}
        </li>
      ))}
    </ul>
  );
}