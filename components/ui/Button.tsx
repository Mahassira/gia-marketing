import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";

type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark";

const variantStyles: Record<ButtonVariant, string> = {
  // Approved brand system: gold fill, black text, subtle same-tone border.
  // This is the ONLY place gold is used as a fill rather than an accent —
  // reserved for primary calls to action.
  primary:
    "bg-gold text-ink border border-gold hover:bg-gold/85",
  // Transparent/white background, black border, black text; inverts to
  // a solid black fill on hover.
  secondary:
    "bg-transparent text-ink border border-ink hover:bg-ink hover:text-surface",
  ghost:
    "bg-transparent text-ink border border-transparent hover:border-ink",
  // Outlined variant for use on a dark (bg-ink) section when a *secondary*
  // action is needed there (the primary gold-fill button already reads
  // fine on dark backgrounds and should be used as-is in that case).
  onDark:
    "bg-transparent text-surface border border-surface hover:bg-surface hover:text-ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-sm px-6 text-sm font-medium tracking-wide transition-colors sm:text-base ${variantStyles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

/**
 * Same visual system as Button, for use inside an actual <form> as a
 * native submit control (Button always renders a navigation <Link>,
 * which isn't right for a form submit action). Kept as a separate
 * export so Button's own signature and every existing call site —
 * including the homepage — are completely untouched.
 */
export function SubmitButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <button
      type="submit"
      className={`inline-flex min-h-11 items-center justify-center rounded-sm px-6 text-sm font-medium tracking-wide transition-colors sm:text-base ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
