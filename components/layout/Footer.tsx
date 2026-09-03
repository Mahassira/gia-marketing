import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/Logo";
import { Container } from "./Container";
import { NavLinks } from "./NavLinks";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-alt">
      <Container className="flex flex-col gap-8 py-10 sm:gap-10 sm:py-12 lg:py-14">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
          <div className="flex flex-col gap-4">
            <Logo />
          </div>

          <nav aria-label={tNav("footerNavigation")}>
            <NavLinks orientation="vertical" />
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            &copy; {year} GIA — Digital Marketing Advisory. {t("rights")}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted">
            <Link href="/legal/privacy" className="inline-flex min-h-11 items-center hover:text-ink">
              {t("privacy")}
            </Link>
            <Link href="/legal/terms" className="inline-flex min-h-11 items-center hover:text-ink">
              {t("terms")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
