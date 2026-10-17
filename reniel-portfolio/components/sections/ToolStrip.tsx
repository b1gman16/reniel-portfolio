import { technologies } from "@/data/technologies";
import { TechIcon } from "@/lib/icons";

export function ToolStrip() {
  return (
    <section aria-labelledby="tools-label" className="glass-light flex items-center gap-6 border-b border-line px-6 py-4 md:px-10">
      <p id="tools-label" className="label shrink-0 text-muted">Currently building with</p>
      {/* tabIndex makes the scroller keyboard-scrollable with arrow keys */}
      <div role="region" aria-label="Technologies" tabIndex={0} className="min-w-0 overflow-x-auto">
        <ul className="flex w-max items-center gap-8">
          {technologies.map((t) => (
            <li key={t} className="label flex items-center gap-2 whitespace-nowrap">
              <TechIcon name={t} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}