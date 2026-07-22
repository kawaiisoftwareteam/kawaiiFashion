/** Canonical site origin used for sitemap, robots, and Open Graph URLs. */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    "http://localhost:3000";

  const withProtocol = raw.startsWith("http") ? raw : `https://${raw}`;
  return withProtocol.replace(/\/$/, "");
}

export const SITE_NAME = "Kawaii Beauty";
export const SITE_TAGLINE = "Deep Moisture Japanese Skincare";
export const SITE_DESCRIPTION =
  "Shop premium Japanese skincare at Kawaii Beauty. Discover fermented rice, camellia oil, matcha, and peach blossom formulas for glass skin, hydration, and gentle care for the whole family.";
