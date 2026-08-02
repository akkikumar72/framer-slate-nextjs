export const DASHFLUENCE_BASE = "/Dashfluence";

export const dashfluenceNavigation = [
  { href: DASHFLUENCE_BASE, label: "Home" },
  { href: `${DASHFLUENCE_BASE}/about`, label: "About" },
  { href: `${DASHFLUENCE_BASE}/services`, label: "Services" },
  { href: `${DASHFLUENCE_BASE}/work`, label: "Work" },
  { href: `${DASHFLUENCE_BASE}/blog`, label: "Blog" },
  { href: `${DASHFLUENCE_BASE}/pricing`, label: "Pricing" },
  { href: `${DASHFLUENCE_BASE}/reviews`, label: "Reviews" },
  { href: `${DASHFLUENCE_BASE}/contact-us`, label: "Contact us" },
] as const;

export const dashfluenceAllPages = [
  ...dashfluenceNavigation,
  {
    href: `${DASHFLUENCE_BASE}/services/digital-strategy-funnel-mapping`,
    label: "Service details",
  },
  {
    href: `${DASHFLUENCE_BASE}/work/radiant-skincare-branding`,
    label: "Work details",
  },
  {
    href: `${DASHFLUENCE_BASE}/blog/seo-in-2025-what-still-works`,
    label: "Blog details",
  },
  {
    href: `${DASHFLUENCE_BASE}/legal/privacy-policy`,
    label: "Privacy policy",
  },
  {
    href: `${DASHFLUENCE_BASE}/legal/terms-and-conditions`,
    label: "Terms",
  },
  { href: `${DASHFLUENCE_BASE}/404`, label: "404" },
] as const;

export const dashfluenceRouteManifest = [
  "/",
  "/about",
  "/contact-us",
  "/reviews",
  "/pricing",
  "/services",
  "/services/digital-strategy-funnel-mapping",
  "/services/strategy-content-production",
  "/services/seo-organic-growth",
  "/services/paid-media-management",
  "/services/cro-analytics-optimization",
  "/work",
  "/work/radiant-skincare-branding",
  "/work/illuminate-your-natural-beauty",
  "/work/where-radiance-meets-ritual",
  "/work/brighter-skin-bolder-you",
  "/work/let-your-skin-light-the-way",
  "/work/clean-ingredients-visible-glow",
  "/work/formulated-for-radiance-backed-by-science",
  "/work/start-your-glow-up-from-the-skin-out",
  "/blog",
  "/blog/seo-in-2025-what-still-works",
  "/blog/how-to-create-scroll-stopping-ads",
  "/blog/mastering-social-media-growth",
  "/blog/the-power-of-data-driven-marketing",
  "/blog/boosting-brand-awareness-fast",
  "/blog/secrets-to-high-roi-campaigns",
  "/blog/growing-with-influencer-marketing",
  "/blog/social-media-mistakes-to-avoid",
  "/blog/storytelling-for-brand-impact",
  "/blog/trends-shaping-2025-marketing",
  "/blog/scaling-ads-without-wasting-budget",
  "/blog/how-to-improve-engagement-rates",
  "/legal/terms-and-conditions",
  "/legal/privacy-policy",
  "/404",
] as const;

export function dashfluenceHref(path = "") {
  return `${DASHFLUENCE_BASE}${path === "/" ? "" : path}`;
}
