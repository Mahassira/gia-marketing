import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware wrappers around Next.js navigation primitives.
 * Use these (not next/link or next/navigation directly) anywhere
 * in the app so links and redirects automatically carry the
 * current locale prefix.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
