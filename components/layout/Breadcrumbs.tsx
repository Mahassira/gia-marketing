import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export interface BreadcrumbItem {
  label: string;
  href?: string; // omitted for the current (last) page
}

export async function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const t = await getTranslations("common");

  return (
    <nav aria-label={t("breadcrumbLabel")} className="text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-x-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-border">
                /
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
