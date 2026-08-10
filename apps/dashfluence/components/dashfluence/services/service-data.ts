import { dashfluenceAsset } from "@/components/dashfluence/shared/assets";
import { DASHFLUENCE_BASE } from "@/components/dashfluence/shared/routes";

export type DashfluenceService = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  win: string;
  image: string;
  detailImage: string;
};

export const dashfluenceServices = [
  {
    slug: "digital-strategy-funnel-mapping",
    title: "Digital Strategy & Funnel Mapping",
    subtitle: "We develop unique stories that resonate deeply.",
    description:
      "We align data-driven insights with creative storytelling and precision targeting, fueling sustainable business growth.",
    win: "🔥 Recent win: 4.5x ROAS for a sustainable fashion label.",
    image: dashfluenceAsset("8pav5SU3BnJ6wETIuurnrNxivo.png"),
    detailImage: dashfluenceAsset("LohgTD1BRdjHKMURwSv0SGJ34I8.png"),
  },
  {
    slug: "strategy-content-production",
    title: "Strategy & Content Production",
    subtitle: "Building Unique Stories With Deep Impact",
    description:
      "We merge data-driven strategy with creative storytelling for accurate targeting and long-term growth.",
    win: "🔥 Achieved 4.5x ROAS for Sustainable Fashion Brand",
    image: dashfluenceAsset("P6VdABYaeMyqzy5lJeVzQ2GSH90.jpg"),
    detailImage: dashfluenceAsset("HXG10kLDbiSVBHnjZJJak3B6wkU.jpg"),
  },
  {
    slug: "seo-organic-growth",
    title: "SEO & Organic Growth",
    subtitle: "Creating Meaningful Stories That Connect Deeply",
    description:
      "We align analytics, storytelling, and targeting precision to fuel consistent business growth.",
    win: "🔥 Driving 4.5x ROAS Growth in Sustainable Fashion Campaign",
    image: dashfluenceAsset("FZtr09azaTHn6YwdMESKE3Ss3tg.jpg"),
    detailImage: dashfluenceAsset("0RQpnmldVPTmA9PImGBZVTysU.jpg"),
  },
  {
    slug: "paid-media-management",
    title: "Paid Media Management",
    subtitle: "Designing Stories That Touch Every Audience",
    description:
      "We integrate data-driven thinking with storytelling and smart targeting to accelerate business growth.",
    win: "🔥 Recent Success: 4.5x ROAS for Eco Fashion Label",
    image: dashfluenceAsset("6hoh6HKRqD2wucm9QOitChDY4S0.png"),
    detailImage: dashfluenceAsset("nQUhssCs9TNnFYJxbenH3bPzA.jpg"),
  },
  {
    slug: "cro-analytics-optimization",
    title: "CRO & Analytics Optimization",
    subtitle: "Creating Unique Narratives With Emotional Depth",
    description:
      "We connect data, creativity, and targeting accuracy to empower long-term business growth.",
    win: "🔥 Scaling Sustainable Fashion with 4.5x ROAS Results",
    image: dashfluenceAsset("pwOCQ86eV6uTDBY7fWUfJB09WU.jpg"),
    detailImage: dashfluenceAsset("K1subD72aNDOJ5TyMVgyhwhwMk.jpg"),
  },
] satisfies DashfluenceService[];

export const dashfluenceServicesBySlug = Object.fromEntries(
  dashfluenceServices.map((service) => [service.slug, service]),
) as Record<string, DashfluenceService>;

export const serviceFaqs = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "We partner with ambitious startups, growing ecommerce brands, and established teams that want measurable, sustainable growth.",
  },
  {
    question: "What’s your pricing model?",
    answer:
      "Pricing is tailored to your goals, channel mix, and campaign scope. Every proposal includes a clear monthly investment and deliverables.",
  },
  {
    question: "What’s included in a typical engagement?",
    answer:
      "Our standard engagements include strategy, creative, campaign setup, analytics, and ongoing optimization. You also get a dedicated team, weekly reports, and real-time performance dashboards.",
  },
  {
    question: "How quickly can we launch?",
    answer:
      "Most engagements move from kickoff to launch in two to four weeks, depending on creative production and the number of channels involved.",
  },
  {
    question: "How do you ensure the website is mobile-friendly and optimized for all devices?",
    answer:
      "We design mobile-first, test common breakpoints, and validate performance and conversion paths before launch.",
  },
] as const;

export const serviceBlogCards = [
  {
    date: "Oct 10, 2024",
    title: "SEO in 2025: What Still Works",
    excerpt: "Visual identity and packaging design for industry.",
    href: `${DASHFLUENCE_BASE}/blog/seo-in-2025-what-still-works`,
    image: dashfluenceAsset("hb6YAFAUOycs9lAqN1tgYSTBmJM.png"),
  },
  {
    date: "Aug 8, 2024",
    title: "How to Create Scroll-Stopping Ads",
    excerpt: "Created wireframes to define layout structure",
    href: `${DASHFLUENCE_BASE}/blog/how-to-create-scroll-stopping-ads`,
    image: dashfluenceAsset("ZdlQl6FTcELc9ZKh2EdJGM25oNU.png"),
  },
] as const;
