import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { IconComponent } from "@/lib/icons";

export function Button({
  href,
  children,
  variant = "solid",
  external = false,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  icon?: IconComponent;
}) {
  const Icon = icon ?? ArrowUpRight;
  const base =
    "group inline-flex min-h-11 items-center gap-2 rounded-sm px-5 py-3 text-sm font-medium transition-colors";
  const styles =
    variant === "solid"
      ? "bg-ink text-canvas hover:bg-ink/80"
      : "border border-ink text-ink hover:bg-ink hover:text-canvas";
  return (
    <a
      href={href}
      className={`${base} ${styles}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Icon size={16} weight="bold" aria-hidden className="transition-transform group-hover:scale-110" />
    </a>
  );
}