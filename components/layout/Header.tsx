import { getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/Logo";
import { Container } from "./Container";
import { NavLinks } from "./NavLinks";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import { HeaderScrollWrapper } from "./HeaderScrollWrapper";

export async function Header() {
  const t = await getTranslations("nav");

  return (
    <HeaderScrollWrapper>
      <Container className="flex h-full items-center justify-between gap-4">
        <Logo />

        <nav aria-label={t("primaryNavigation")} className="hidden min-w-0 lg:block">
          <NavLinks orientation="horizontal" />
        </nav>

        <div className="hidden shrink-0 lg:block">
          <LanguageSwitcher />
        </div>

        <MobileNav />
      </Container>
    </HeaderScrollWrapper>
  );
}
