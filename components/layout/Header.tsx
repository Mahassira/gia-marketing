import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/Logo";
import { Container } from "./Container";
import { NavLinks } from "./NavLinks";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

export async function Header() {
  const t = await getTranslations("nav");

  return (
    <header className="border-b border-border bg-surface">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />

        <nav aria-label={t("primaryNavigation")} className="hidden min-w-0 lg:block">
          <NavLinks orientation="horizontal" />
        </nav>

        <div className="hidden shrink-0 lg:block">
          <LanguageSwitcher />
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
