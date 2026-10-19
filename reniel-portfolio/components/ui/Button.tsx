import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { GlassButton } from "@/components/ui/glass-button";
import type { IconComponent } from "@/lib/icons";

export function Button({
  href,
  children,
  external = false,
  icon,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  icon?: IconComponent;
}) {
  const Icon = icon ?? ArrowUpRight;
  return (
    <GlassButton
      href={href}
      size="md"
      contentClassName="flex items-center gap-2"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Icon size={16} weight="bold" aria-hidden />
    </GlassButton>
  );
}