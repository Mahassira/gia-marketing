import { getTranslations } from "next-intl/server";
import { type AppLocale } from "@/i18n/routing";
import { getServices, getIndustries } from "@/lib/content";
import { Link } from "@/i18n/navigation";
import { SubmitButton } from "@/components/ui/Button";

const inputClasses =
  "w-full min-h-11 rounded-sm border border-border bg-surface px-4 py-2.5 text-base text-ink placeholder:text-muted focus-visible:border-ink";

const labelClasses = "text-sm font-medium text-ink";

/**
 * Contact form UI. This is intentionally a Server Component with a
 * plain HTML <form> — no client-side state, no submission handler, no
 * server action. Actual submission (validation, email delivery,
 * webhook) is the explicit scope of the later Contact & Lead Flow
 * phase; building that here would be exactly the "unnecessary
 * infrastructure" this phase was told not to introduce.
 *
 * The form is nonetheless fully real and usable now: every field has
 * a proper <label>, native HTML5 validation (required, type="email")
 * provides real browser-level validation feedback today, and the
 * field names/shape match messages.contactForm exactly, so wiring a
 * real handler later is a matter of adding one, not restructuring
 * this markup.
 */
export async function ContactForm({ locale }: { locale: AppLocale }) {
  const [t, services, industries] = await Promise.all([
    getTranslations("contactForm"),
    getServices(locale),
    getIndustries(locale),
  ]);

  return (
    <form className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-name" className={labelClasses}>
            {t("name")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-company" className={labelClasses}>
            {t("company")}
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-email" className={labelClasses}>
            {t("email")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-phone" className={labelClasses}>
            {t("phone")}
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-industry" className={labelClasses}>
            {t("industry")}
          </label>
          <select id="contact-industry" name="industry" defaultValue="" className={inputClasses}>
            <option value="" disabled>
              {t("selectIndustryPlaceholder")}
            </option>
            {industries.items.map((industry) => (
              <option key={industry.slug} value={industry.slug}>
                {industry.title}
              </option>
            ))}
            <option value="other">{t("otherOption")}</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-service" className={labelClasses}>
            {t("service")}
          </label>
          <select id="contact-service" name="service" defaultValue="" className={inputClasses}>
            <option value="" disabled>
              {t("selectServicePlaceholder")}
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
            <option value="other">{t("otherOption")}</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className={labelClasses}>
          {t("message")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className={`${inputClasses} min-h-32 resize-y py-3`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            className="mt-1 h-5 w-5 shrink-0 rounded-sm border-border text-ink focus-visible:border-ink"
          />
          <label htmlFor="contact-consent" className="text-sm text-muted">
            {t("consent")}
          </label>
        </div>
        <Link
          href="/legal/privacy"
          className="ms-7 w-fit text-sm text-ink underline"
        >
          {t("privacyPolicyLink")}
        </Link>
      </div>

      <SubmitButton variant="primary" className="w-full sm:w-auto">
        {t("submit")}
      </SubmitButton>
    </form>
  );
}
