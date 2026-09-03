import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";

/**
 * Localized 404 boundary for the [locale] segment. Needed because the
 * service and insight detail routes call notFound() for invalid slugs
 * — without this, Next.js would fall back to its generic, unlocalized
 * 404 page.
 */
export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <Section tone="light" className="flex min-h-[50vh] items-center">
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 text-center">
        <h1 className="font-heading text-3xl text-ink sm:text-4xl">{t("title")}</h1>
        <p className="text-base text-muted sm:text-lg">{t("body")}</p>
        <Button href="/" variant="secondary">
          {t("back")}
        </Button>
      </div>
    </Section>
  );
}
