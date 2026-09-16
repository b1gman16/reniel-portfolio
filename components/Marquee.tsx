export default function Marquee({ items }: { items: string[] }) {
  const content = items.join("   /   ");
  return (
    <div className="overflow-hidden border-y hairline bg-ink py-5 text-paper" aria-hidden="true">
      <div className="marquee-track flex w-max whitespace-nowrap">
        <span className="font-display text-2xl italic px-6 md:text-3xl">
          {content}
          {"   /   "}
        </span>
        <span className="font-display text-2xl italic px-6 md:text-3xl">
          {content}
          {"   /   "}
        </span>
      </div>
    </div>
  );
}