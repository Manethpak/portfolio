export const PERSON_NAME = "Maneth Pak";
export const SITE_NAME = "Maneth Pak Portfolio";
export const DEFAULT_TITLE = "Maneth Pak | Software Engineer";
export const DEFAULT_DESCRIPTION =
  "Software engineer focused on full-stack product development, AI systems, and developer-friendly digital experiences.";
export const CONTACT_EMAIL = "manethpak.dev@gmail.com";
export const SAME_AS = [
  "https://www.linkedin.com/in/maneth-pak/",
  "https://github.com/manethpak",
];

type SiteLike = URL | string | undefined;

export function resolveSiteOrigin(
  site: SiteLike,
  publicUrl?: string,
  fallbackUrl?: URL,
) {
  if (site instanceof URL) {
    return site;
  }

  if (typeof site === "string" && site.length > 0) {
    return new URL(site);
  }

  if (publicUrl) {
    return new URL(publicUrl);
  }

  return fallbackUrl ? new URL(fallbackUrl.origin) : undefined;
}

export function buildAbsoluteUrl(
  pathname: string,
  site: SiteLike,
  publicUrl?: string,
  fallbackUrl?: URL,
) {
  const origin = resolveSiteOrigin(site, publicUrl, fallbackUrl);
  if (!origin) {
    return undefined;
  }

  return new URL(pathname, origin).toString();
}

export function normalizeDate(date: string) {
  if (date === "Present") {
    return undefined;
  }

  if (/^\d{4}-\d{2}$/.test(date)) {
    return `${date}-01`;
  }

  return date;
}
