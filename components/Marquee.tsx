export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="overflow-hidden border-y hairline bg-bg-soft py-5" aria-hidden="true">
      <div className="marquee-track flex w-max whitespace-nowrap">
        {[0, 1].map((rep) => (
          <span key={rep} className="flex items-center">
            {items.map((item, i) => (
              <span key={`${rep}-${i}`} className="flex items-center">
                <span className="px-6 font-display text-2xl italic md:text-3xl">
                  {item}
                </span>
                <span className="chrome-text px-1 font-display text-2xl md:text-3xl">/</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}