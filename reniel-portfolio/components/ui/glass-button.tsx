import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// The glass styling lives in globals.css (.glass-button*). Shape is controlled by --glass-radius.
const glassButtonVariants = cva(
  "glass-button relative isolate inline-block cursor-pointer no-underline rounded-[var(--glass-radius)]",
  {
    variants: {
      size: {
        default: "text-base font-medium",
        sm: "text-sm font-medium",
        md: "text-sm font-medium",
        lg: "text-lg font-medium",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const glassButtonTextVariants = cva(
  "glass-button-text relative block select-none tracking-tight",
  {
    variants: {
      size: {
        default: "px-6 py-3.5",
        sm: "px-4 py-2",
        md: "px-5 py-3",
        lg: "px-8 py-4",
        icon: "flex h-10 w-10 items-center justify-center",
      },
    },
    defaultVariants: { size: "md" },
  },
);

type Base = VariantProps<typeof glassButtonVariants> & {
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
};

type AsButton = Base &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof Base> & { href?: undefined };

type AsLink = Base &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof Base> & { href: string };

export type GlassButtonProps = AsButton | AsLink;

export function GlassButton({ className, children, size, contentClassName, ...rest }: GlassButtonProps) {
  const content = (
    <span className={cn(glassButtonTextVariants({ size }), contentClassName)}>{children}</span>
  );
  const wrap = cn("glass-button-wrap w-fit cursor-pointer rounded-[var(--glass-radius)]", className);

  if ("href" in rest && typeof rest.href === "string") {
    const link = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <div className={wrap}>
        <a className={glassButtonVariants({ size })} {...link}>
          {content}
        </a>
        <div className="glass-button-shadow rounded-[var(--glass-radius)]" />
      </div>
    );
  }

  const btn = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <div className={wrap}>
      <button className={glassButtonVariants({ size })} {...btn}>
        {content}
      </button>
      <div className="glass-button-shadow rounded-[var(--glass-radius)]" />
    </div>
  );
}

export { glassButtonVariants };
export default GlassButton;