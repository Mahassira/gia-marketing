"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const NAV_ITEMS = [
  { href: "/", key: "home" as const },
  { href: "/about", key: "about" as const },
  { href: "/services", key: "services" as const },
  { href: "/industries", key: "industries" as const },
  { href: "/work", key: "work" as const },
  { href: "/insights", key: "insights" as const },
  { href: "/contact", key: "contact" as const },
];

export function NavLinks({
  orientation = "horizontal",
  onNavigate,
}: {
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
}) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <ul
      className={
        orientation === "horizontal"
          ? "flex items-center gap-x-5 xl:gap-x-8"
          : "flex flex-col gap-1"
      }
    >
      {NAV_ITEMS.map(({ href, key }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={
                orientation === "horizontal"
                  ? `whitespace-nowrap text-sm font-medium transition-colors hover:underline ${
                      isActive ? "text-ink" : "text-muted"
                    }`
                  : `flex min-h-11 items-center rounded-sm px-3 text-base font-medium ${
                      isActive ? "text-ink" : "text-muted"
                    } hover:bg-surface-alt hover:text-ink`
              }
            >
              {t(key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
