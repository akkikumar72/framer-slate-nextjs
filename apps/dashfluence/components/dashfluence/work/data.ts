import { dashfluenceAsset } from "../shared/assets";

export type DashfluenceWorkProject = {
  category: string;
  client: string;
  date: string;
  description: string;
  duration: string;
  heroImage: string;
  secondaryImage: string;
  slug: string;
  title: string;
};

export const dashfluenceWorkProjects = [
  {
    slug: "radiant-skincare-branding",
    title: "Radiant skincare branding",
    description: "Visual identity and packaging design for a skincare line.",
    category: "Branding Design",
    date: "Nov 8, 2024",
    client: "Webflow Inc.",
    duration: "4 months",
    heroImage: dashfluenceAsset("jAbJAmSYyYg78AqhLtKgpxB5s.png"),
    secondaryImage: dashfluenceAsset("uR5thUhquDCfp2fHpGC48qqSuo.png"),
  },
  {
    slug: "illuminate-your-natural-beauty",
    title: "Illuminate Your Natural Beauty",
    description: "Modern skincare brand identity with clean packaging design",
    category: "Web Design",
    date: "Nov 8, 2024",
    client: "Squarespace",
    duration: "2 months",
    heroImage: dashfluenceAsset("LBVZNteTWEzdyexqtenEhOIuWs.png"),
    secondaryImage: dashfluenceAsset("v3kJD3r3qAc15gbUEytDu0yEYFw.jpg"),
  },
  {
    slug: "where-radiance-meets-ritual",
    title: "Where Radiance Meets Ritual",
    description: "Natural skincare visual identity and eco friendly packaging",
    category: "UI/UX",
    date: "Nov 8, 2024",
    client: "Wix",
    duration: "1 months",
    heroImage: dashfluenceAsset("biANzq99SctY7mtsB4aCF7TAO8.png"),
    secondaryImage: dashfluenceAsset("KNur1JjFbHcOUnW8kTIZWxR7E.jpg"),
  },
  {
    slug: "brighter-skin-bolder-you",
    title: "Brighter Skin. Bolder You.",
    description: "Luxury skincare branding with elegant packaging and typography",
    category: "Marketing",
    date: "Feb 20, 2025",
    client: "Framer",
    duration: "5 months",
    heroImage: dashfluenceAsset("gSqV2QMer80qOhFG3CHJrpb8Y.png"),
    secondaryImage: dashfluenceAsset("e9ETzKwq61CblXNIwtacHxTO1M.jpg"),
  },
  {
    slug: "let-your-skin-light-the-way",
    title: "Let Your Skin Light the Way",
    description: "Minimal skincare identity with soft tones packaging design",
    category: "Branding Design",
    date: "Feb 3, 2025",
    client: "WordPress",
    duration: "4 months",
    heroImage: dashfluenceAsset("JmPuHfShaNg5IpRW4NrwPndTtg.png"),
    secondaryImage: dashfluenceAsset("QKFmfHBjXhF5ILe8T52Rcw3nJw.jpg"),
  },
  {
    slug: "clean-ingredients-visible-glow",
    title: "Clean Ingredients. Visible Glow.",
    description: "Bold skincare brand identity with impactful packaging visuals",
    category: "SEO",
    date: "Dec 12, 2024",
    client: "Shopify",
    duration: "3 months",
    heroImage: dashfluenceAsset("9na9M8wOFM03WiWuOJ8ABecf0.png"),
    secondaryImage: dashfluenceAsset("wWpPPG7m36vpFlOFgMIa2Kj0djo.jpg"),
  },
  {
    slug: "formulated-for-radiance-backed-by-science",
    title: "Formulated for Radiance, Backed by Science",
    description: "Clinical skincare branding with structured packaging and layout",
    category: "Web Design",
    date: "Mar 11, 2024",
    client: "Figma",
    duration: "6 months",
    heroImage: dashfluenceAsset("aFNIGDR8O0IxBYdPL2kDBbeuHYs.png"),
    secondaryImage: dashfluenceAsset("3N4wiMbagfKxSlfGEGUNYAlOhQ.jpg"),
  },
  {
    slug: "start-your-glow-up-from-the-skin-out",
    title: "Start your glow-up from the skin out",
    description: "Feminine skincare identity with pastel packaging aesthetics",
    category: "Marketing",
    date: "Nov 11, 2024",
    client: "Carrd",
    duration: "4 months",
    heroImage: dashfluenceAsset("xGMXKT9Y11CPnCJ9souvZ2MXTBQ.png"),
    secondaryImage: dashfluenceAsset("guVYpNYuRLovwLJoZPrHYwszr10.jpg"),
  },
] satisfies DashfluenceWorkProject[];

export const dashfluenceWorkProjectsBySlug = Object.fromEntries(
  dashfluenceWorkProjects.map((project) => [project.slug, project]),
) as Record<string, DashfluenceWorkProject>;

export const dashfluenceWorkFaqs = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "Our standard engagements include strategy, creative, campaign setup, analytics, and ongoing optimization. You’ll also get access to a dedicated team, weekly reports, and real-time performance dashboards.",
  },
  {
    question: "What’s your pricing model?",
    answer:
      "We offer project-based scopes and flexible monthly partnerships. Every proposal is tailored to your goals, channels, and the pace at which you want to grow.",
  },
  {
    question: "What’s included in a typical engagement?",
    answer:
      "A typical engagement combines strategy, creative production, campaign management, conversion analysis, and a clear reporting rhythm with your team.",
  },
  {
    question: "How quickly can we launch?",
    answer:
      "Most projects move from kickoff to launch in two to four weeks. Larger brand and web programs follow a phased roadmap agreed during discovery.",
  },
  {
    question: "How do you ensure the website is mobile-friendly and optimized for all devices?",
    answer:
      "We design responsively from the start, test across common screen sizes, and verify typography, imagery, interactions, and performance before launch.",
  },
] as const;

export const dashfluenceWorkArticles = [
  {
    title:
      "Crafting a Distinctive Brand Identity That Resonates Deeply with Your Target Audience",
    body:
      "Building a strong brand identity is more than just designing a logo. It’s about creating a cohesive visual and emotional experience that connects with your audience on a profound level. At Dashfluence, we specialize in developing brand identities that reflect your company’s core values, mission, and unique personality. Our process begins with thorough research and discovery sessions, where we dive deep into your industry landscape, competitor positioning, and customer insights. This foundational work allows us to craft a brand identity that not only stands out visually but also tells a compelling story that resonates with your ideal customers, fostering trust and loyalty from the very first impression.",
  },
  {
    title: "Developing Comprehensive Brand Guidelines",
    body:
      "Consistency is key to building a recognizable and trustworthy brand. To maintain this consistency, we create detailed brand guidelines that serve as a roadmap for how your brand should be represented across all mediums and channels. This guide includes clear instructions on logo usage, color specifications, typography rules, tone of voice, and visual style standards. By providing your team, partners, and vendors with these guidelines, you ensure that every communication, campaign, and design piece reinforces your brand identity. This cohesion builds familiarity and confidence among your audience, making your brand instantly recognizable.",
  },
  {
    title: "Designing Impactful Marketing Collateral and Digital Assets",
    body:
      "Beyond identity design, we extend your brand’s visual language to create compelling marketing materials that drive engagement and conversions. From business cards, brochures, and packaging to social media templates, email campaigns, and website visuals, we ensure every asset reflects your brand’s personality and quality. Our designs are strategically crafted not just to look beautiful but to communicate effectively, guide customer journeys, and motivate action. By aligning your collateral with your brand identity, we help you present a unified, professional, and persuasive image that elevates your market presence and builds lasting connections with your audience.",
  },
  {
    title:
      "Designing Memorable Logos and Visual Elements That Embody Your Brand’s Essence",
    body:
      "The logo is often the first visual touchpoint between your brand and your audience. We approach logo design as a strategic art form, carefully balancing creativity with purpose. Our team explores multiple design concepts, each thoughtfully developed to communicate your brand’s values and differentiate you in a crowded market. Beyond the logo itself, we design complementary visual elements, including color palettes, typography, iconography, and imagery, that work harmoniously to create a consistent and powerful brand presence across all platforms. These elements are crafted to be versatile, ensuring your brand looks impeccable whether on digital screens, print materials, or merchandise.",
  },
] as const;

export const dashfluenceWorkConclusion = {
  title: "Why Choose This Service",
  body:
    "Your brand is more than just a logo. It’s the story, emotion, and promise you deliver to your audience. With our Brand Identity & Visual Design service, we craft designs that connect deeply, inspire trust, and leave a lasting impression. From concept to creation, we ensure your brand visually communicates exactly who you are and what you stand for.",
} as const;

export const dashfluenceWorkBlogPreview = [
  {
    date: "Oct 10, 2024",
    description: "Visual identity and packaging design for industry.",
    image: dashfluenceAsset("hb6YAFAUOycs9lAqN1tgYSTBmJM.png"),
    slug: "seo-in-2025-what-still-works",
    title: "SEO in 2025: What Still Works",
  },
  {
    date: "Aug 8, 2024",
    description: "Created wireframes to define layout structure",
    image: dashfluenceAsset("ZdlQl6FTcELc9ZKh2EdJGM25oNU.png"),
    slug: "how-to-create-scroll-stopping-ads",
    title: "How to Create Scroll-Stopping Ads",
  },
] as const;
