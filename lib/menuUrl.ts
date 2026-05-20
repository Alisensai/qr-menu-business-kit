const fallbackSiteUrl = "https://qr-menu-business-kit.vercel.app";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/+$/, "");
}

export function getMenuUrl(slug: string) {
  return `${getSiteUrl()}/menu/${slug}`;
}
