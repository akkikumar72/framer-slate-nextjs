import { dashfluenceAsset } from "@/components/dashfluence/shared/assets";

export type DashfluenceBlogPost = {
  category: string;
  date: string;
  dateIso: string;
  excerpt: string;
  heroImage: string;
  role: string;
  secondaryImages: readonly [string, string];
  slug: string;
  title: string;
};

const post = (
  value: Omit<DashfluenceBlogPost, "date" | "dateIso"> &
    Partial<Pick<DashfluenceBlogPost, "date" | "dateIso">>,
): DashfluenceBlogPost => ({
  date: "Oct 10, 2024",
  dateIso: "2024-10-10",
  ...value,
});

export const dashfluenceBlogPosts = [
  post({
    slug: "seo-in-2025-what-still-works",
    title: "SEO in 2025: What Still Works",
    excerpt: "Visual identity and packaging design for industry.",
    category: "Search Strategy",
    role: "SEO Specialist",
    heroImage: dashfluenceAsset("hb6YAFAUOycs9lAqN1tgYSTBmJM.png"),
    secondaryImages: [
      dashfluenceAsset("ZeAEroYkxIrgTIAwJAMlJW8CPHM.png"),
      dashfluenceAsset("BBWxyYAcoJokV48jILrvpgWCac.png"),
    ],
  }),
  post({
    slug: "how-to-create-scroll-stopping-ads",
    title: "How to Create Scroll-Stopping Ads",
    excerpt: "Created wireframes to define layout structure",
    category: "Creative Direction",
    role: "Art Director",
    date: "Aug 8, 2024",
    dateIso: "2024-08-08",
    heroImage: dashfluenceAsset("ZdlQl6FTcELc9ZKh2EdJGM25oNU.png"),
    secondaryImages: [
      dashfluenceAsset("hxG8EaIEFfK1B4h1bTwubyy2vk.jpg"),
      dashfluenceAsset("aa2zaDwkpb6oF4uuEOCaiQKs.jpg"),
    ],
  }),
  post({
    slug: "mastering-social-media-growth",
    title: "Mastering Social Media Growth",
    excerpt:
      "Creative strategy is no longer just design — it’s the driver of engagement, retention, and long-term growth.",
    category: "Creative Branding",
    role: "Graphic Designer",
    heroImage: dashfluenceAsset("AKTxPp6QmoolcD3UqROwiJXF3BU.png"),
    secondaryImages: [
      dashfluenceAsset("ryCACXt6nLeApc9SysMVxiRbXf0.jpg"),
      dashfluenceAsset("FIQy2BzBsBnfjP9ZITeu8eEo2A8.jpg"),
    ],
  }),
  post({
    slug: "the-power-of-data-driven-marketing",
    title: "The Power of Data-Driven Marketing",
    excerpt:
      "Content marketing has moved past trial phases — it’s now the backbone of awareness and trust-building.",
    category: "Strategic Branding",
    role: "Product Designer",
    heroImage: dashfluenceAsset("kVTCyUzuzaIWw160WsWC4dSOlqw.png"),
    secondaryImages: [
      dashfluenceAsset("YROtwI5xJ6JCARvbbVMP6eotM4o.jpg"),
      dashfluenceAsset("aXhLVELYecSQwt2VKKfK3dkoDn8.jpg"),
    ],
  }),
  post({
    slug: "boosting-brand-awareness-fast",
    title: "Boosting Brand Awareness Fast",
    excerpt:
      "Analytics has gone beyond surface metrics — it’s now the roadmap to smarter, faster business decisions.",
    category: "Powerful Branding",
    role: "Web Developer",
    heroImage: dashfluenceAsset("wnB0IiVKMZsdBAuJiLqitpPNeE.png"),
    secondaryImages: [
      dashfluenceAsset("hhzFan5KCxlQR74MLhioO8tzU.jpg"),
      dashfluenceAsset("dDMYgFDGKLjO0Vjv0Wd9YO80wIo.jpg"),
    ],
  }),
  post({
    slug: "secrets-to-high-roi-campaigns",
    title: "Secrets to High-ROI Campaigns",
    excerpt:
      "Customer experience has outpaced product alone — it’s now the true differentiator for brands seeking loyalty.",
    category: "Minimal Branding",
    role: "Software Engineer",
    heroImage: dashfluenceAsset("H8RbsnWgmX26ccwOzJOtTNGAU.png"),
    secondaryImages: [
      dashfluenceAsset("cofLlvrdf71d7i5raChitGnKzB0.jpg"),
      dashfluenceAsset("xrNycugLIQ5S75H59FCnJSGHMs.jpg"),
    ],
  }),
  post({
    slug: "growing-with-influencer-marketing",
    title: "Growing with Influencer Marketing",
    excerpt:
      "Digital transformation is no longer a buzzword — it’s the reality shaping competitive advantage across industries.",
    category: "Branding Solutions",
    role: "Content Writer",
    heroImage: dashfluenceAsset("SspTlgUzqqmyEwoYUmGmvFhWiIk.png"),
    secondaryImages: [
      dashfluenceAsset("vPKSzBJnKUa9RtNxps8YVNs.jpg"),
      dashfluenceAsset("KrszBALKvfhxCWgWDbwew5sk0.jpg"),
    ],
  }),
  post({
    slug: "social-media-mistakes-to-avoid",
    title: "Social Media Mistakes to Avoid",
    excerpt:
      "Performance marketing has moved past experimentation — it’s now the engine behind consistent revenue growth.",
    category: "Visual Branding",
    role: "Digital Marketer",
    heroImage: dashfluenceAsset("J1dKr5VZQKkdxUwEhlEcc6ycU.png"),
    secondaryImages: [
      dashfluenceAsset("9dH8Iqfcfze1bP1jDZIThkw0w.jpg"),
      dashfluenceAsset("BBWxyYAcoJokV48jILrvpgWCac.png"),
    ],
  }),
  post({
    slug: "storytelling-for-brand-impact",
    title: "Storytelling for Brand Impact",
    excerpt:
      "Build a memorable brand narrative that earns attention, trust, and lasting customer loyalty.",
    category: "Brand Storytelling",
    role: "Content Strategist",
    heroImage: dashfluenceAsset("kSaHt44sOB2aW77zV5fxjaGk3s.png"),
    secondaryImages: [
      dashfluenceAsset("IBsaKb4IHQdySgpgqHpRGKzx2o.jpg"),
      dashfluenceAsset("BBWxyYAcoJokV48jILrvpgWCac.png"),
    ],
  }),
  post({
    slug: "trends-shaping-2025-marketing",
    title: "Trends Shaping 2025 Marketing",
    excerpt:
      "The strategies, channels, and creative signals setting the pace for ambitious brands this year.",
    category: "Market Trends",
    role: "Growth Strategist",
    heroImage: dashfluenceAsset("yVxSMO5J057GY4I6Kxd757YYFKM.png"),
    secondaryImages: [
      dashfluenceAsset("TOqZTlIqt2ONvNudRig1FAclkME.jpg"),
      dashfluenceAsset("BBWxyYAcoJokV48jILrvpgWCac.png"),
    ],
  }),
  post({
    slug: "scaling-ads-without-wasting-budget",
    title: "Scaling Ads Without Wasting Budget",
    excerpt:
      "A performance-first framework for increasing reach while keeping every campaign accountable.",
    category: "Paid Media",
    role: "Performance Lead",
    heroImage: dashfluenceAsset("UDdoqh8wPb0xxAWdOiex701l5Xk.png"),
    secondaryImages: [
      dashfluenceAsset("Q33uL0HKpSbmg1R7JCE2CxioWU.jpg"),
      dashfluenceAsset("BBWxyYAcoJokV48jILrvpgWCac.png"),
    ],
  }),
  post({
    slug: "how-to-improve-engagement-rates",
    title: "How to Improve Engagement Rates",
    excerpt:
      "Turn passive scrolling into meaningful interaction with content built around real audience intent.",
    category: "Audience Growth",
    role: "Social Strategist",
    heroImage: dashfluenceAsset("gXyR2KYJKmIZtOEXeOrtegvYA.png"),
    secondaryImages: [
      dashfluenceAsset("ctQL8H9l9XmOzrwkw1VmETXWqEk.jpg"),
      dashfluenceAsset("BBWxyYAcoJokV48jILrvpgWCac.png"),
    ],
  }),
] as const satisfies readonly DashfluenceBlogPost[];

export const dashfluenceBlogBySlug = Object.fromEntries(
  dashfluenceBlogPosts.map((item) => [item.slug, item]),
) as Record<string, DashfluenceBlogPost>;

export const dashfluenceIndexPosts = [
  "mastering-social-media-growth",
  "the-power-of-data-driven-marketing",
  "boosting-brand-awareness-fast",
  "secrets-to-high-roi-campaigns",
  "growing-with-influencer-marketing",
  "social-media-mistakes-to-avoid",
] as const;

export const dashfluenceFeaturedPosts = [
  "seo-in-2025-what-still-works",
  "how-to-create-scroll-stopping-ads",
] as const;
